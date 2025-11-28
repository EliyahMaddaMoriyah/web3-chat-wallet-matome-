import React from "react";
import { useWallet } from "../WalletContext";

export const ConnectWalletButton = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  if (account)
    return (
      <div style={{ marginBottom: 12 }}>
        <span style={{ marginRight: 8 }}>
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </span>
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    );

  return (
    <div style={{ marginBottom: 12 }}>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};