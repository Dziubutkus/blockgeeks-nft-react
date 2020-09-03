// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.12;

import "./VirusFactory.sol";

contract VirusInfect is VirusFactory {

    event Winner(uint tokenId);

    uint public cooldownPeriod = 1 minutes;
    uint public requiredToWin = 6;

    function infect(uint _virusId, uint _enemyId) external onlyOwnerOf(_virusId) {
        require(_isReady(_virusId), "virus is still in cooldown");
        CryptoVirus storage myVirus = viruses[_virusId];
        CryptoVirus storage enemyVirus = viruses[_enemyId];

        uint chanceToWin = _generateNumber(10);
        if(chanceToWin > requiredToWin) {
            _calculateWinsAndLosses(myVirus, enemyVirus);
            emit Winner(_virusId);
        }
        else {
            _calculateWinsAndLosses(enemyVirus, myVirus);
            emit Winner(_enemyId);
        }
        _activeCooldown(myVirus);
    }

    function _isReady(uint _virusId) internal view returns (bool) {
        CryptoVirus memory tempVirus = viruses[_virusId];
        return tempVirus.cooldown <= now;
    }

    function _calculateWinsAndLosses(CryptoVirus storage _winner, CryptoVirus storage _loser) internal {
        _winner.wins = _winner.wins.add(1);
        _winner.level = _winner.level.add(1);
        _loser.losses = _loser.losses.add(1);
    }

    function _activeCooldown(CryptoVirus storage _virus) internal {
        _virus.cooldown = uint32(now + cooldownPeriod);
    }

}