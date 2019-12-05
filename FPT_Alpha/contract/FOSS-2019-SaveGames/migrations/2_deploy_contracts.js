const SaveGames = artifacts.require("SaveGames");

module.exports = function(deployer) {
    deployer.deploy(SaveGames);
};