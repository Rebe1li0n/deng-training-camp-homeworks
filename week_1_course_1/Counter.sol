// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Counter {
    uint256 public counter;

    constructor() {
        counter = 0;
    }

    function count() public {
        counter++;
    }

    //this function does not consider integer overflow scenarios;
    //
    function add(uint256 x) public {
        counter = counter + x;
    }
}
