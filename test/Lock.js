const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("JavascriptQuiz", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployQuiz() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, addr1, addr2] = await ethers.getSigners();

    const quizContrat = await ethers.getContractFactory("JavaScriptQuiz");
    const quiz = await quizContrat.deploy("0x1572b593c53d839d80004aa4b8c51211864104f06ace9e22be9c4365b50655ea");

    return { deployer, quiz, addr1, addr2 };
  }

  describe("Deployment", function () {
    it('should block the owner', async function () {
      const {quiz} = await loadFixture(deployQuiz);

      await expect(quiz.answerQuiz("0x1572b593c53d839d80004aa4b8c51211864104f06ace9e22be9c4365b50655ea")).to.be.revertedWith('Owner cannot answer the quiz.');
    });

    it('should emit WrongAnswer event', async function () {
      const {quiz, addr1} = await loadFixture(deployQuiz);

      await expect(await quiz.connect(addr1).answerQuiz("5")).to.emit(quiz, "WrongAnswer");
    })

    it('should emit CorrectAnswer event', async function () {
      const {quiz, addr1} = await loadFixture(deployQuiz);

      await expect(await quiz.connect(addr1).answerQuiz("23")).to.emit(quiz, "CorrectAnswer");
    })

  });
});