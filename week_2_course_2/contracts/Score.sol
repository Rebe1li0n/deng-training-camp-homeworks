// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Score {
    address private teacher;
    address private owner;
    mapping(address => uint8) private scores;

    error notTeacher();
    error notOwner();
    error invalidScore();

    constructor(address _teacher) {
        owner = msg.sender;
        teacher = _teacher;
    }

    modifier OnlyTeacher() {
        if (msg.sender != teacher) revert notTeacher();
        _;
    }

    modifier OnlyOwner() {
        if (msg.sender != owner) revert notOwner();
        _;
    }

    function setTeacher(address _teacher) public OnlyOwner {
        teacher = _teacher;
    }

    function checkScoreForStudent() external view returns (uint8) {
        return scores[msg.sender];
    }

    function checkScoreForTeacher(
        address student
    ) external view OnlyTeacher returns (uint8) {
        return scores[student];
    }

    function modifyScore(address student, uint8 _scores) external OnlyTeacher {
        if (_scores > 100) revert invalidScore();
        // require(_scores <= 100, "Invalid scores");
        scores[student] = _scores;
    }
}

interface IScore {
    function checkScoreForStudent() external view returns (uint8);

    function checkScoreForTeacher(
        address student
    ) external view returns (uint8);

    function modifyScore(address student, uint8 _scores) external;
}

contract Teacher {
    address owner;
    IScore score;

    constructor(address _scoreAddress) {
        owner = msg.sender;
        score = IScore(_scoreAddress);
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "You are not owner");
        _;
    }

    function modify(address _student, uint8 _score) public OnlyOwner {
        // require(_score <= 100, "Invalid score!");
        score.modifyScore(_student, _score);
    }

    function checkScore(
        address _student
    ) public view OnlyOwner returns (uint8) {
        return score.checkScoreForTeacher(_student);
    }
}
