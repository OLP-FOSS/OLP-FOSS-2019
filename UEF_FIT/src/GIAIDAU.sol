pragma solidity ^0.5.11;


contract DauGiai {
    address public manager;
    address payable[] public players;
    address public lastestWinner;
    enum GiaiState {startRegister, endRegister} 
    GiaiState public defaultStatus;
    
    constructor () public {
        manager = msg.sender;
        defaultStatus = GiaiState.startRegister;
    }
    modifier restricted {
        require(msg.sender == manager, "You must be manager to be able to call this function");
        _;
    }
    
    function endRegister () public restricted {
        require(players.length % 2 == 0, "Not enough player");
        defaultStatus = GiaiState.endRegister;
    }
    
    function enter () public payable {
        require(msg.value >= 0.1 ether && defaultStatus == GiaiState.startRegister, "Pay at least 0.1 ether to enter" );
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
    
    function pickWinner (address payable winner) public restricted{
        if ( players.length != 0 ) {
            lastestWinner = winner;
            winner.transfer(address(this).balance);
            players.length = 0;
        }
    }
    function getPlayers () public view returns (address payable[] memory) {
        return players;
    }
    
    function getReward() public view returns (uint) {
        return address(this).balance;
    }

}