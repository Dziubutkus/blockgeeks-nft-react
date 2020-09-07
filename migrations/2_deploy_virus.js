const Virus = artifacts.require("InfectKitties");

module.exports = function (deployer) {
  deployer.deploy(Virus);
};
