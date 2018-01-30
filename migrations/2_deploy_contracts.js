var NGO = artifacts.require("./NGO.sol");
var Bank = artifacts.require("./Bank.sol");

module.exports = function(deployer) {
  deployer.deploy(NGO);
  deployer.deploy(Bank);
};
