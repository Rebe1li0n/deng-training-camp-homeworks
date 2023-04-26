// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Counter {
    uint256 public counter;
    address public owner;

    constructor() {
        owner = msg.sender;
        counter = 0;
    }

    function increment() public {
        require(msg.sender == owner, "Only owner can call increment()");
        counter += 1;
    }

    //this function does not consider integer overflow scenarios;
    //this functino does not have access control
    function incrementBy(uint256 x) public {
        counter += x;
    }
}
