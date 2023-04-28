// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Bank {
    address public owner;
    mapping(address => uint256) public deposits;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this contract");
        _;
    }

    function checkMyDepositBalance() public view returns (uint256) {
        return deposits[msg.sender];
    }

    receive() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        deposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function checkBankBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) public {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        payable(msg.sender).transfer(amount);
        deposits[msg.sender] -= amount;
        emit Withdraw(msg.sender, amount);
    }

    //there is a situaiton: After the onwer call this function, deposit of
    //this bank is empty, but record of balance are still there. consumer
    // will fail when they try to withdraw there money.
    function withdrawAll() public onlyOwner {
        uint256 allDeposits = address(this).balance;
        payable(owner).transfer(allDeposits);
    }
}
