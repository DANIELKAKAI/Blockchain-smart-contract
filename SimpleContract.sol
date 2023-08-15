// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint public result;

    address private owner;

    bool private deployed = false;

    modifier isOwner() {
        require(msg.sender == owner, "Only Owner can do this");
        _;
    }

    constructor() {
        owner = msg.sender;
        deployed = true;
    }

    function add(uint number1, uint number2) public isOwner {
        result = number1 + number2;
    }

    function subtract(uint number1, uint number2) public isOwner {
        result = number1 - number2;
    }
}
