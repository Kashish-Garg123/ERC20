import { ethers } from "hardhat";
async function main() {
  const [deployer] = await ethers.getSigners();

  const weiAmount = (await deployer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const TokenLottery = await ethers.getContractFactory("TokenLottery");
  const token = await TokenLottery.deploy();
  console.log("TokenLottery address:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
