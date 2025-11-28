import React from "react";
import { WalletProvider } from "./WalletContext";
import { ChatProvider } from "./ChatContext";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { ChatUI } from "./components/ChatUI";
import { Toasts } from "./components/Toasts";

export default function App() {
  return (
    <WalletProvider>
      <ChatProvider>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
          <h1>Web3 Chat Wallet Starter</h1>
          <ConnectWalletButton />
          <ChatUI />
          <Toasts />
        </div>
      </ChatProvider>
    </WalletProvider>
  );
}