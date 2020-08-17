// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Virus is ERC721 {
    constructor() public ERC721("CryptoVirus", "Virus") {

    }
}