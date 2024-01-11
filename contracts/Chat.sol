// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {

    string public chat1 = "Chat 1";
    string public chat2 = "Chat 2";
    string public chat3 = "Chat 3";

    bytes32 private passwordChat1Hash;
    bytes32 private passwordChat2Hash;
    bytes32 private passwordChat3Hash;

    address private owner;

    // Mapping pour stocker l'accès à chaque chat pour chaque utilisateur
    mapping(address => bool) public accessChat1;
    mapping(address => bool) public accessChat2;
    mapping(address => bool) public accessChat3;

    event CorrectAnswer(address responder);
    event WrongAnswer(address responder);
    event LogQuestion(string, string[4]);

    constructor(bytes32 _passwordChat1Hash, bytes32 _passwordChat2Hash, bytes32 _passwordChat3Hash) {
        owner = msg.sender;
        passwordChat1Hash = _passwordChat1Hash;
        passwordChat2Hash = _passwordChat2Hash;
        passwordChat3Hash = _passwordChat3Hash;
    }

    function EnterChat1(string memory _response) public {        
        enterChat(_response, passwordChat1Hash, accessChat1);
    }

    function EnterChat2(string memory _response) public {
        enterChat(_response, passwordChat2Hash, accessChat2);
    }

    function EnterChat3(string memory _response) public {
        enterChat(_response, passwordChat3Hash, accessChat3);
    }

    function enterChat(string memory _response, bytes32 _passwordHash, mapping(address => bool) storage accessMapping) private {
        if (keccak256(abi.encodePacked(_response)) == _passwordHash) {
            emit CorrectAnswer(msg.sender);

            // Lier l'accès au chat pour l'utilisateur qui a réussi
            accessMapping[msg.sender] = true;
        } else {
            emit WrongAnswer(msg.sender);
        }
    }

    struct Message {
        address user;
        string content;
        uint256 timestamp;
    }

    mapping(address => Message[]) private userMessages;
    mapping(address => Message[]) private userMessagesChat2;
    mapping(address => Message[]) private userMessagesChat3;

    Message[] private chat1AllMessages;
    Message[] private chat2AllMessages;
    Message[] private chat3AllMessages;

    event MessagePosted(address indexed user, string content, uint256 timestamp);

    modifier onlyConnected() {
        require(msg.sender == tx.origin, "Must be connected with MetaMask");
        _;
    }

    function chat1PostMessage(string memory content) public onlyConnected {
        postMessage(content, accessChat1, chat1AllMessages);
    }

    function chat2PostMessage(string memory content) public onlyConnected {
        postMessage(content, accessChat2, chat2AllMessages);
    }

    function chat3PostMessage(string memory content) public onlyConnected {
        postMessage(content, accessChat3, chat3AllMessages);
    }

    function postMessage(string memory content, mapping(address => bool) storage accessMapping, Message[] storage messages) private {
        // Vérifier l'accès au chat pour l'utilisateur
        require(accessMapping[msg.sender], "Enter the chat password to send a message");
        require(bytes(content).length > 0, "message empty");
        require(bytes(content).length < 200, "message too long");

        Message memory newMessage = Message({
            user: msg.sender,
            content: content,
            timestamp: block.number
        });

        userMessages[msg.sender].push(newMessage);
        messages.push(newMessage);
        emit MessagePosted(msg.sender, content, newMessage.timestamp);
    }

    function getChat1Last10Messages() public view returns (Message[] memory) {
        return getLast10Messages(accessChat1, chat1AllMessages);
    }

    function getChat2Last10Messages() public view returns (Message[] memory) {
        return getLast10Messages(accessChat2, chat2AllMessages);
    }

    function getChat3Last10Messages() public view returns (Message[] memory) {
        return getLast10Messages(accessChat3, chat3AllMessages);
    }

    function getLast10Messages(mapping(address => bool) storage accessMapping, Message[] storage messages) private view returns (Message[] memory) {
        require(accessMapping[msg.sender], "Enter the chat password to access it");

        uint256 totalMessages = messages.length;

        if (totalMessages == 0) {
            return new Message[](0);
        }

        uint256 startIndex = (totalMessages > 10) ? totalMessages - 10 : 0;
        uint256 endIndex = (totalMessages < 10) ? totalMessages : 10;
        Message[] memory result = new Message[](10);

        for (uint256 i = 0; i < endIndex; i++) {
            if (startIndex + i < totalMessages) {
                result[i] = messages[startIndex + i];
            } else {
                break;
            }
        }

        return result;
    }
}
