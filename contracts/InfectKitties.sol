// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.12;

import "./VirusInfect.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface CryptoKittiesInterface {
    function getKitty(uint256 _id)
        external
        view
        returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    );
}

contract InfectKitties is VirusInfect, Ownable {
    CryptoKittiesInterface public cryptoKitties;

    function setCryptoKittiesAddress(address _address) external onlyOwner {
        cryptoKitties = CryptoKittiesInterface(_address);
    }

    function infectKitty(uint _virusId, uint _kittyId) public onlyOwnerOf(_virusId) {
        // (,,,,,,,,,genes) = cryptoKitties.getKitty(_kittiesId); // real code
        uint kittyWinProbability = _kittyId % 10;
        CryptoVirus storage virus = viruses[_virusId];
        uint chanceToWin = _generateNumber(10);
        if(chanceToWin > kittyWinProbability) {
            virus.level = virus.level.add(1);
            _mintVirus("KittyVirus", _kittyId, msg.sender);
        }
    }
}