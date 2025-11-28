import React from "react";
import { useChat } from "../ChatContext";
import { ConversationList, MessageList, MessageInput } from "@xmtp/react-components";
import { SendCryptoButton } from "./SendCryptoButton";
import { TxHistory } from "./TxHistory";

export const ChatUI = () => {
  const { xmtpClient } = useChat();
  const [recipient, setRecipient] = React.useState<string>("");

  if (!xmtpClient) return <div>Please connect your wallet to initialize chat (XMTP).</div>;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ width: 300 }}>
        <h3>Conversations</h3>
        <ConversationList client={xmtpClient} onConversationSelected={(conv: any) => setRecipient(conv.peerAddress)} />
      </div>

      <div style={{ flex: 1 }}>
        {recipient ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>Chat with {recipient}</h3>
              <SendCryptoButton to={recipient} />
            </div>
            <TxHistory peer={recipient} />
            <div style={{ height: 400, overflow: "auto", border: "1px solid #eee", padding: 8 }}>
              <MessageList client={xmtpClient} peerAddress={recipient} />
            </div>
            <MessageInput client={xmtpClient} peerAddress={recipient} />
          </>
        ) : (
          <div>Select a conversation from the left.</div>
        )}
      </div>
    </div>
  );
};