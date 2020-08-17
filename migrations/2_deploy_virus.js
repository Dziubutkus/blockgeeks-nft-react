const Virus = artifacts.require("VirusFactory");

module.exports = function (deployer) {
  deployer.deploy(Virus);
};
