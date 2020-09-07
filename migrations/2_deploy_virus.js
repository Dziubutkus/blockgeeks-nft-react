const Virus = artifacts.require("VirusInfect");

module.exports = function (deployer) {
  deployer.deploy(Virus);
};
