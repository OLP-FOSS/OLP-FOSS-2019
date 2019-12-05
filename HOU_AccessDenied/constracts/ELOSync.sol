// HOU_AccessDenied
pragma solidity ^0.5.0;

contract ELOSync {
    
    struct ELOStruct {
        uint player;
        uint opponent;
    }

    mapping (address => ELOStruct) elo;

    constructor () public {
        elo[msg.sender].player = 0;
        elo[msg.sender].opponent = 0;
    }

    function action (uint act) public {
        uint point = 0;
        uint point_op = 0;
            // win
            if (act == 1) {
                point = 1000;
                point_op = 0;
            // tie tie
            } else if (act == 2) {
                point = 500;
                point_op = 500;
            // lose
            } else if (act == 3) {
                point = 0;
                point_op = 1000;
            // 50 turns
            } else if (act == 4) {
                point = 250;
                point_op = 250;
            // 80 turns
            } else if (act == 5) {
                point = 475;
                point_op = 475;
            }
        //if (x == 0) {
            elo[msg.sender].player += point;
        //} else if (x == 1) {
            elo[msg.sender].opponent += point_op;
        //}
    }

    function get () public view returns(uint, uint) {
        return (elo[msg.sender].player, elo[msg.sender].opponent);
    }
    
    function reset () public {
        elo[msg.sender].player = 0;
        elo[msg.sender].opponent = 0;
    }
}
