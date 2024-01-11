const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Chat", function () {
  async function deployConversation() {
    const [deployer, addr1, addr2] = await ethers.getSigners();
    const chatContract = await ethers.getContractFactory("Chat");
    const chat = await chatContract.deploy(
      "0xabbe6325ea0d23629e7199100ba1e9ba2278c0a33a9c4bfc6cd091e5a2608f1a",
      "0x7a4b354a32c27a83597817ec5071ebc31c4dbe3b95f47c1216af1d5a9f110c82",
      "0x25471ace97aef3505bb4091399d9826090a619cafb20a2f46e4ab44d5cb64556"
    );

    return { deployer, chat, addr1, addr2 };
  }

  describe("Deployment", function () {

    it('should block the user from accessing chat 1 with wrong password', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await expect(chat.connect(addr1).EnterChat1("wrong1")).to.emit(chat, "WrongAnswer");
    });

    it('should allow the user to access chat 1 with the correct password', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await expect(chat.connect(addr1).EnterChat1("password1")).to.emit(chat, "CorrectAnswer");
    });

    it('should block the user from accessing chat 2 with wrong password', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await expect(chat.connect(addr1).EnterChat2("wrong2")).to.emit(chat, "WrongAnswer");
    });

    it('should allow the user to access chat 2 with the correct password', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await expect(chat.connect(addr1).EnterChat2("password2")).to.emit(chat, "CorrectAnswer");
    });

    it('should block the user from accessing chat 3 with wrong password', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await expect(chat.connect(addr1).EnterChat3("wrong3")).to.emit(chat, "WrongAnswer");
    });

    it('should allow the user to access chat 3 with the correct password', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await expect(chat.connect(addr1).EnterChat3("password3")).to.emit(chat, "CorrectAnswer");
    });

    it('should allow user to connect to Chat 1, write a message, and retrieve messages', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await chat.connect(addr1).EnterChat1("password1");
      const messageContent = "Hello, Chat 1!";
      await chat.connect(addr1).chat1PostMessage(messageContent);
      const lastMessages = await chat.connect(addr1).getChat1Last10Messages();
      expect(lastMessages.length).to.equal(10);
      expect(lastMessages[0].user).to.equal(addr1.address);
      expect(lastMessages[0].content).to.equal(messageContent);
    });

    it('should allow user to connect to Chat 2, write a message, and retrieve messages', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await chat.connect(addr1).EnterChat2("password2");
      const messageContent = "Hello, Chat 2!";
      await chat.connect(addr1).chat2PostMessage(messageContent);
      const lastMessages = await chat.connect(addr1).getChat2Last10Messages();
      expect(lastMessages.length).to.equal(10);
      expect(lastMessages[0].user).to.equal(addr1.address);
      expect(lastMessages[0].content).to.equal(messageContent);
    });

    it('should allow user to connect to Chat 3, write a message, and retrieve messages', async function () {
      const { chat, addr1 } = await loadFixture(deployConversation);
      await chat.connect(addr1).EnterChat3("password3");
      const messageContent = "Hello, Chat 3!";
      await chat.connect(addr1).chat3PostMessage(messageContent);
      const lastMessages = await chat.connect(addr1).getChat3Last10Messages();
      expect(lastMessages.length).to.equal(10);
      expect(lastMessages[0].user).to.equal(addr1.address);
      expect(lastMessages[0].content).to.equal(messageContent);
    });
  });
})