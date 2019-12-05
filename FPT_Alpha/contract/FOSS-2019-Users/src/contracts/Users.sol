pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Users {

    struct User {
        uint id;
        string username;
        string password;
        uint elo;
    }

    event UserAdded(
        uint id,
        string username,
        string password,
        uint elo
    );

    event UserRetrieved(
        uint id,
        string username,
        string password,
        uint elo
    );

    event EloUpdated(
        uint id,
        uint elo
    );

    uint public userCount = 0;
    mapping (uint => User) public users;

    /// add a user
    function addUser(string memory _username, string memory _password) public returns (uint _id) {
        require(bytes(_username).length>0, "Username can't be empty!");
        require(bytes(_password).length>5, "Password must contain at least 6 characters!");
        userCount++;
        users[userCount] = User(userCount, _username, _password, 1200);
        emit UserAdded(userCount, _username, _password, 1200);
        return userCount;
    }

    /// get a user
    function getUser(uint _id) public returns (User memory _user) {
        require(_id > 0 && _id <= userCount, "");
        User memory u = users[_id];
        emit UserRetrieved(_id, u.username, u.password, u.elo);
        return u;
    }

    /// get elo of a user
    function getElo(uint _id) public returns (uint _elo) {
        require(_id > 0 && _id <= userCount, "");
        User memory u = users[_id];
        return u.elo;
    }

    /// update elo
    function updateElo(uint _id, uint _newElo) public {
        require(_id > 0 && _id <= userCount);
        User memory _user = users[_id];
        _user.elo = _newElo;
        users[_id] = _user;
        emit EloUpdated(_id, _newElo);
    }

}