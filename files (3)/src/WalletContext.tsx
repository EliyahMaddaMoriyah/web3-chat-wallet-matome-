import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

type WalletContextType = {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [web3Modal, setWeb3Modal] = useState<any>(null);

  useEffect(() => {
    const w3m = new Web3Modal({
      cacheProvider: true
    });
    setWeb3Modal(w3m);
  }, []);

  useEffect(() => {
    if (!web3Modal) return;
    if (web3Modal.cachedProvider) {
      connectWallet().catch(console.error);
    }
    // eslint-disable-next-line
  }, [web3Modal]);

  const connectWallet = async () => {
    if (!web3Modal) throw new Error("Web3Modal not initialized");
    const externalProvider = await web3Modal.connect();
    const ethersProvider = new ethers.BrowserProvider(externalProvider);
    setProvider(ethersProvider);
    const signer = await ethersProvider.getSigner();
    const addr = await signer.getAddress();
    setAccount(addr);
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    try {
      web3Modal?.clearCachedProvider();
    } catch {}
  };

  return (
    <WalletContext.Provider value={{ account, provider, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};