pragma solidity ^0.5.11;
contract Lottery {
    address public manager;
    address payable[] public players;
    address public lastestWinner;
    constructor () public {
        manager = msg.sender;
    }
    modifier restricted {
        require(msg.sender == manager, "You must be manager to be able to call this function");
        _;
    }
    function enter () public payable {
        require(msg.value >= 1 ether, "Pay at least 1 ether to enter");
        uint count = 0;
        if ( players.length == 0 )
            players.push(msg.sender);
        else {
            for ( uint i = 0; i < players.length; i++ ) {
                if (msg.sender == players[i])
                    count++;
            }
            if ( count == 0 )
                players.push(msg.sender);
        }
    }
    function pickWinner (uint randomNumber) public restricted{
        if ( players.length != 0 ) {
            uint index = randomNumber % players.length;
            lastestWinner = players[index];
            players[index].transfer(address(this).balance);
            players.length = 0;
        }
    }
    function getPlayers () public view returns (address payable[] memory) {
        return players;
    }
}
