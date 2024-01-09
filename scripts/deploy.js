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
  const quizContrat = await ethers.getContractFactory("JavaScriptQuiz2");
  const quiz = await quizContrat.deploy('0x1572b593c53d839d80004aa4b8c51211864104f06ace9e22be9c4365b50655ea',"0xcac1bb71f0a97c8ac94ca9546b43178a9ad254c7b757ac07433aa6df35cd8089");

  console.log("Quiz deployed to: ", quiz.target);
  console.log("Quiz deployed to: ", quiz.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
