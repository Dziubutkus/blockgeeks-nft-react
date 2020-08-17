// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Virus is ERC721 {
    constructor() public ERC721("CryptoVirus", "Virus") {

    }

    struct CryptoVirus {
        string name;
        uint level;
        uint wins;
        uint losses;
        uint32 cooldown;
    }

    CryptoVirus[] public viruses;

    mapping (uint => address) public virusToOwner;
    mapping (address => uint) public ownerVirusCount;

    modifier onlyOwnerOf(uint _tokenId) {
        require(virusToOwner[_tokenId] == msg.sender, "msg.sender is not the owner");
        _;
    }
    
    modifier virusExists(uint _tokenId) {
        require(virusToOwner[_tokenId] != address(0), "this tokenId does not exist");
        _;
    }

}