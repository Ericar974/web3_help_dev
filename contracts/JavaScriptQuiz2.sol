// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JavaScriptQuiz2 {
    string public question =
        "Quel est le resultat de '2' + '3' en JavaScript ?";
    string[4] public choices = ["23", "5", "undefined", "Error"];

    string question2 =
        "Quel est la lettre apres s dans l'alphabet ?";
    string[4] choices2 = ["u", "t", "y", "v"];

    bytes32 private answerHash;
    bytes32 private answerHash2;
    address private owner;
    bool private firstAnswerCorrect;

    event CorrectAnswer(address responder);
    event WrongAnswer(address responder);
    event LogQuestion(string, string[4]); // LogQuestion(question , choices)

    constructor(bytes32 _answerHash, bytes32 _answerHash2) {
        owner = msg.sender;
        answerHash = _answerHash;
        answerHash2 = _answerHash2;
        firstAnswerCorrect = false;
    }

    function answerQuiz(string memory _response) public {
        require(msg.sender != owner, "Owner cannot answer the quiz.");
        
        if (keccak256(abi.encodePacked(_response)) == answerHash) {
            emit CorrectAnswer(msg.sender);
            firstAnswerCorrect = true;
        } else {
            emit WrongAnswer(msg.sender);
        }
    }

    function answerQuiz2(string memory _response) public {
        require(msg.sender != owner, "Owner cannot answer the quiz.");
        require(firstAnswerCorrect, "Answer the first question correctly before attempting the second");

        if (keccak256(abi.encodePacked(_response)) == answerHash2) {
            emit CorrectAnswer(msg.sender);
        } else {
            emit WrongAnswer(msg.sender);
        }
    }

    function updateQuiz(
        string memory _newQuestion,
        string[4] memory _newChoices,
        string memory _newQuestion2,
        string[4] memory _newChoices2,
        bytes32 _newAnswerHash,
        bytes32 _newAnswerHash2
    ) public {
        require(msg.sender == owner, "Only owner can update the quiz.");
        question = _newQuestion;
        choices = _newChoices;
        question2 = _newQuestion2;
        choices2 = _newChoices2;
        answerHash = _newAnswerHash;
        answerHash2 = _newAnswerHash2;
        firstAnswerCorrect = false;
    }

    function getAllQuestions() public {
        emit LogQuestion(question, choices);

        emit LogQuestion(question2, choices2);
    }

}
