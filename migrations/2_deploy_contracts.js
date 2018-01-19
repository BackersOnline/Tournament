var Tournament = artifacts.require("../contracts/tournament.sol");

module.exports = function(deployer) {
  deployer.deploy(Tournament)
}