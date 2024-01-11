// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers} = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: ", deployer.address);
  const quizContrat = await ethers.getContractFactory("Chat");
  const quiz = await quizContrat.deploy('0xabbe6325ea0d23629e7199100ba1e9ba2278c0a33a9c4bfc6cd091e5a2608f1a', '0x7a4b354a32c27a83597817ec5071ebc31c4dbe3b95f47c1216af1d5a9f110c82', '0x25471ace97aef3505bb4091399d9826090a619cafb20a2f46e4ab44d5cb64556');

  console.log("Quiz deployed to: ", quiz.target);
  console.log("Quiz deployed to: ", quiz.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
