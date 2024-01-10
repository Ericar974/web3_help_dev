// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Conversation {

    // Structure de notre message (utilisateur, contenu et date d'envoie)
    struct Message {
        address user;
        string content;
        uint256 timestamp;
    }

    // Un utilisateur possède une liste de message qui l'a envoyé
    mapping(address => Message[]) public userMessages;
    Message[] public allMessages;

    // Definition de notre événement message
    event MessagePosted(address indexed user, string content, uint256 timestamp);

    // Vérifie que l'utilisateur est connecté à MetaMask
    modifier onlyConnected() {
        require(msg.sender == tx.origin, "Must be connected with MetaMask");
        _;
    }

    // Envoie un message
    function postMessage(string memory content) public onlyConnected {
        require(bytes(content).length > 0, "Message cannot be empty");

        Message memory newMessage = Message({
            user: msg.sender,
            content: content,
            timestamp: block.number
        });

        userMessages[msg.sender].push(newMessage);
        allMessages.push(newMessage);
        emit MessagePosted(msg.sender, content, newMessage.timestamp);
    }

    // Récupere les 10 derniers messages envoyés peut importe l'utilisateur
    function getLast10MessagesFromAllUsers() public view returns (Message[] memory) {
        uint256 totalMessages = allMessages.length;

        if (totalMessages == 0) {
            return new Message[](0);
        }

        uint256 startIndex = (totalMessages > 10) ? totalMessages - 10 : 0;
        Message[] memory result = new Message[](10);

        for (uint256 i = 0; i < 10; i++) {
            if (startIndex + i < totalMessages) {
                result[i] = allMessages[startIndex + i];
            } else {
                break;
            }
        }

        return result;
    }
}