var TodoList = artifacts.require("./TodoList.sol");
var Player = artifacts.require("./EloGame.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
  deployer.deploy(Player);
};
