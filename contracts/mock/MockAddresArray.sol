// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "../Address.OrderedArray.sol";

contract MockAddress {
    address[] public array;

    function add(uint160 toAdd) external {
        AddressOrderedArray.insertInOrder(array, address(toAdd));
    }

    function exist(uint160 target) external view returns (bool) {
        return AddressOrderedArray.binarySearch(array, address(target)) != -1;
    }

    function findIndex(address target) external view returns (int256) {
        return AddressOrderedArray.binarySearch(array, target);
    }

    function getArray() external view returns (address[] memory) {
        return array;
    }
}
