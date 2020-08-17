const { expectRevert } = require('@openzeppelin/test-helpers')
const { assert } = require('chai')

const Virus = artifacts.require('VirusFactory')

contract('CryptoVirus', function([Alice, Bob]) {
    before(async function () {
        this.virus = await Virus.new()
    })

    it('should set Symbol and Name', async function() {
        assert.equal(await this.virus.name(), 'CryptoVirus')
        assert.equal(await this.virus.symbol(), 'Virus')
    })

    it('should not mint when level is 10', async function() {
        await expectRevert.unspecified(
            this.virus.mintVirus("yo", 10, Alice)
        )
    })

    it('should mint when level 0 < level < 10', async function() {
        await this.virus.mintVirus("yo", 3, Alice)
        let token = await this.virus.viruses(0)
        assert.equal(token.level.toString(), '3')
        assert.equal(await this.virus.balanceOf(Alice), 1)
        assert.equal(await this.virus.ownerOf(0), Alice)
    })

    it('should generate a new level if level == 0', async function() {
        await this.virus.mintVirus("yoyo", 0, Bob)
        let token = await this.virus.viruses(1)
        assert.notEqual(token.level.toString(), '0')
        assert.equal(await this.virus.balanceOf(Bob), 1)
        assert.equal(await this.virus.ownerOf(1), Bob)
    })
})