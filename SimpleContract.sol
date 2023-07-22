// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint public result;

    function add(uint number1, uint number2) public {
        result = number1 + number2;
    }

    function subtract(uint number1, uint number2) public {
        result = number1 - number2;
    }
}
