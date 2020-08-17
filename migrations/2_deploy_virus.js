const Virus = artifacts.require("Virus");

module.exports = function (deployer) {
  deployer.deploy(Virus);
};
