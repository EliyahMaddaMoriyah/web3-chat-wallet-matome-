const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export async function getEthTxHistory(user: string, peer: string): Promise<any[]> {
  if (!ETHERSCAN_API_KEY) return [];
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.result) return [];
  return data.result.filter(
    (tx: any) =>
      tx.to?.toLowerCase() === peer.toLowerCase() || tx.from?.toLowerCase() === peer.toLowerCase()
  );
}