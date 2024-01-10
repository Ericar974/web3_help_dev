// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Backup {

    // Acces au chats:

    string public chat1 = "Chat 1";

    bytes32 private passwordChat1Hash;
    address private owner;
    bool public accessChat1;

    event CorrectAnswer(address responder);
    event WrongAnswer(address responder);
    event LogQuestion(string, string[4]);

    constructor(bytes32 _passwordChat1Hash) {
        owner = msg.sender;
        passwordChat1Hash = _passwordChat1Hash;
        accessChat1 = false;
    }

    function EnterChat1(string memory _response) public {        
        if (keccak256(abi.encodePacked(_response)) == passwordChat1Hash) {
            emit CorrectAnswer(msg.sender);
            accessChat1 = true;
        } else {
            emit WrongAnswer(msg.sender);
        }
    }

    //Messages:

    // Structure de notre message (utilisateur, contenu et date d'envoie)
    struct Message {
        address user;
        string content;
        uint256 timestamp;
    }

    // Un utilisateur possède une liste de message qui a envoyé
    mapping(address => Message[]) private userMessages;
    Message[] private  chat1AllMessages;

    // Definition de notre événement message
    event MessagePosted(address indexed user, string content, uint256 timestamp);

    // Vérifie que l'utilisateur est connecté à MetaMask
    modifier onlyConnected() {
        require(msg.sender == tx.origin, "Must be connected with MetaMask");
        _;
    }

    // Envoie un message
    function chat1PostMessage(string memory content) public onlyConnected {
        require(accessChat1, "Enter the Chat1 password to send a message");
        require(bytes(content).length > 0, "message empty");
        require(bytes(content).length < 200, "message to long");

        Message memory newMessage = Message({
            user: msg.sender,
            content: content,
            timestamp: block.number
        });

        userMessages[msg.sender].push(newMessage);
        chat1AllMessages.push(newMessage);
        emit MessagePosted(msg.sender, content, newMessage.timestamp);
    }

    // Récupere les 10 derniers messages envoyés peut importe l'utilisateur chat1
    function Chat1GetLast10MessagesFromAllUsers() public view returns (Message[] memory) {
        require(accessChat1, "Enter the Chat1 password to access it");
        uint256 totalMessages = chat1AllMessages.length;

        if (totalMessages == 0) {
            return new Message[](0);
        }

        uint256 startIndex = (totalMessages > 10) ? totalMessages - 10 : 0;
        uint256 endIndex = (totalMessages < 10) ? totalMessages : 10;
        Message[] memory result = new Message[](10);

        for (uint256 i = 0; i < endIndex; i++) {
            if (startIndex + i < totalMessages) {
                result[i] = chat1AllMessages[startIndex + i];
            } else {
                break;
            }
        }

        return result;
    }
}