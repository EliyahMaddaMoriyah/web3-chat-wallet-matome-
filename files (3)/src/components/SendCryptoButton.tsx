import React, { useState } from "react";
import { useWallet } from "../WalletContext";
import { ethers } from "ethers";
import { useChat } from "../ChatContext";

export const SendCryptoButton: React.FC<{ to: string }> = ({ to }) => {
  const { provider, account } = useWallet();
  const { xmtpClient } = useChat();
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendEth = async () => {
    setError(null);
    if (!provider || !account || !ethers.isAddress(to)) {
      setError("Wallet not connected or invalid recipient");
      return;
    }
    setSending(true);
    try {
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount)
      });
      setTxHash(tx.hash);
      await tx.wait();
      // Optional: notify via XMTP
      if (xmtpClient) {
        try {
          const conv = await xmtpClient.conversations.newConversation(to);
          await conv.send(`💸 ${amount} ETH sent. Tx: https://etherscan.io/tx/${tx.hash}`);
        } catch {}
      }
    } catch (e: any) {
      setError(e?.message ?? "Failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (ETH)"
        style={{ width: 120 }}
        disabled={sending}
      />
      <button onClick={sendEth} disabled={sending || !amount}>
        {sending ? "Sending..." : "Send"}
      </button>
      {txHash && (
        <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer">
          View tx
        </a>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};