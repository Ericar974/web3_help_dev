const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const Conversation = await ethers.getContractFactory("Conversation");
  const conversationContract = await Conversation.deploy();

  console.log("Conversation contract deployed to:", conversationContract.target);
  console.log("Conversation contract deployed to:", conversationContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});