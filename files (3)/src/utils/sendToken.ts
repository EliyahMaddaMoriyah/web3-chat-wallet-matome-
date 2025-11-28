import { ethers } from "ethers";
const ERC20_ABI = ["function transfer(address to, uint amount) public returns (bool)", "function decimals() view returns (uint8)"];

export async function sendErc20(signer: ethers.Signer, to: string, amount: string, tokenAddress: string) {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const decimals = await contract.decimals();
  const tx = await contract.transfer(to, ethers.parseUnits(amount, decimals));
  return tx;
}