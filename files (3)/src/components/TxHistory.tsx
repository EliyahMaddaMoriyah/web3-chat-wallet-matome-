import React, { useEffect, useState } from "react";
import { useWallet } from "../WalletContext";
import { getEthTxHistory } from "../utils/fetchTransactions";

export const TxHistory: React.FC<{ peer: string }> = ({ peer }) => {
  const { account } = useWallet();
  const [txs, setTxs] = useState<any[]>([]);

  useEffect(() => {
    if (!account || !peer) return;
    getEthTxHistory(account, peer).then(setTxs).catch(console.error);
  }, [account, peer]);

  if (!peer) return null;

  return (
    <div style={{ marginBottom: 12 }}>
      <h4>Transaction History</h4>
      <ul>
        {txs.length === 0 && <li>No transactions between you and this address.</li>}
        {txs.map((tx) => (
          <li key={tx.hash}>
            <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer">
              {(Number(tx.value) / 1e18).toFixed(6)} ETH
            </a>{" "}
            — {tx.from.toLowerCase() === account?.toLowerCase() ? "Sent" : "Received"} —{" "}
            {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};