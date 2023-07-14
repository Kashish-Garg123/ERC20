// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
//import "@openzeppelin/contracts";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract A is ERC20 {
    address public owner;
    constructor() ERC20("GOLD", "Sona") {
        owner=msg.sender;
        _mint(owner, 7000 );
    }
}