# Web3 Chat Wallet Starter

This is a starter prototype for a Web3 wallet + chat + P2P transfers using:
- React + Vite
- ethers.js
- Web3Modal for wallet connect
- XMTP for encrypted messaging
- Etherscan API for transaction history

## Quick start

1. Clone:
   git clone <your-repo-url>
2. Install:
   npm install
3. Create .env from .env.example and add your Etherscan API key:
   cp .env.example .env
   # set VITE_ETHERSCAN_API_KEY in .env
4. Run locally:
   npm run dev
5. Deploy:
   - Push to GitHub and import into Vercel (add VITE_ETHERSCAN_API_KEY in Vercel env vars)
   - Deploy from Vercel dashboard

## Notes
- XMTP requires signer-based wallet (MetaMask/WalletConnect). When you connect, XMTP client will initialize.
- For tokens and additional networks, update provider endpoints and network switching logic.
- This is a prototype—do not use for custody or production without security review.
