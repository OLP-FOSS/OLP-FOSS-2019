pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract SaveGames {

    struct Game {
        uint id;
        int[] posxX;
        int[] posyX;
        int[] posxO;
        int[] posyO;
        uint status;
    }

    event GameSaved(
        uint id,
        int[] posxX,
        int[] posyX,
        int[] posxO,
        int[] posyO,
        uint status
    );

    event GameLoaded(
        uint id,
        int[] posxX,
        int[] posyX,
        int[] posxO,
        int[] posyO,
        uint status
    );

    uint public gameCount = 0;
    mapping (uint => Game) public games;
    uint constant public IN_PROGRESS = 0;
    uint constant public X_WON = 1;
    uint constant public O_WON = 2;

    /// save a game
    function saveGame(int[] memory _posxX, int[] memory _posyX, int[] memory _posxO, int[] memory _posyO, uint _status) public returns (uint gId) {
        require(_posxX.length > 0 || _posxO.length > 0, "Do not save an empty game!");
        require(_status == IN_PROGRESS || _status == X_WON || _status == O_WON, "Game must be in one of three legal states!");
        gameCount++;
        games[gameCount] = Game(gameCount, _posxX, _posyX, _posxO, _posyO, _status);
        emit GameSaved(gameCount, _posxX, _posyX, _posxO, _posyO, _status);
        return gameCount;
    }

    /// load a game
    function loadGame(uint _gId) public returns (Game memory g) {
        require(_gId <= gameCount && _gId > 0, "Game ID must be between 1 and gameCount!");
        Game memory _game = games[_gId];
        emit GameLoaded(gameCount, _game.posxX, _game.posyX, _game.posxO, _game.posyO, _game.status);
        return _game;
    }
}