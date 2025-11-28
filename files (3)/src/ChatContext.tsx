import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Client as XmtpClient } from "@xmtp/xmtp-js";
import { useWallet } from "./WalletContext";

type ChatContextType = {
  xmtpClient: XmtpClient | null;
  initXmtpClient: () => Promise<void>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { provider } = useWallet();
  const [xmtpClient, setXmtpClient] = useState<XmtpClient | null>(null);

  const initXmtpClient = async () => {
    if (!provider) return;
    const signer = await provider.getSigner();
    const client = await XmtpClient.create(signer);
    setXmtpClient(client);
  };

  useEffect(() => {
    if (provider) initXmtpClient();
    else setXmtpClient(null);
    // eslint-disable-next-line
  }, [provider]);

  return <ChatContext.Provider value={{ xmtpClient, initXmtpClient }}>{children}</ChatContext.Provider>;
};