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
  const quizContrat = await ethers.getContractFactory("Backup");
  const quiz = await quizContrat.deploy('0xb68fe43f0d1a0d7aef123722670be50268e15365401c442f8806ef83b612976b');

  console.log("Quiz deployed to: ", quiz.target);
  console.log("Quiz deployed to: ", quiz.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
