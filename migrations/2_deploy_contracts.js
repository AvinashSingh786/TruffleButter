var NGO = artifacts.require("./NGO.sol");

module.exports = function(deployer) {
  deployer.deploy(NGO);
};
