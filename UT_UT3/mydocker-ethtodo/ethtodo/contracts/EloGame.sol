pragma solidity ^0.5.0;

contract EloGame {
  uint public taskCountPlayer = 0;
  uint public player1 = 0;
  uint public player2 = 0;
  struct Player {
    uint id;
    uint value;
  }

  mapping(uint => Player) public player;
  
  event PlayerCreated(
    uint id,
    uint eloValue
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    createPlayer();
  }

  function createPlayer() public {
    taskCountPlayer ++;
    player[taskCountPlayer] = Player(taskCountPlayer, 2400);
    emit PlayerCreated(taskCountPlayer, 2400);
  }
  function startGame(uint so) public{
    if(player1 == 0){
      player1 = so;
    }else{
      player2 = so;
    }
  }
  // function _kCatulate(uint _b) public view returns(uint){
  //         uint  K=0;
  //         if(_b<1600) K=25;
  //         else
  //         if(_b<2000) K=20;
  //         else
  //         if(_b<2400) K=15;
  //         else
  //         if(_b<2400) K=10;
  //         return K;
  // }
  function endGame(uint playerWin) public {
    // uint eloA = 0;
    // uint eloB = 0;
    // uint check = 1;
    // if(playerWin == 1){
    //   eloA = player[player1].value;
    //   eloB = player[player2].value;
    //   uint Qa= 10**(eloA/400);
    //   uint Qb= 10**(eloB/400);
    //   uint Eb= Qb/(Qa+Qb); 
    //   uint Ea=Qa/(Qa+Qb);
    //   player[player1].value = eloA + _kCatulate(check-Ea); 
    //   player[player2].value = eloB + _kCatulate(1-check-Eb);
    // }else if(playerWin==2){
    //   eloA = player[player2].value;
    //   eloB = player[player1].value;
    //   uint Qa=10**(eloA/400);
    //   uint Qb= 10**(eloB/400);
    //   uint Eb= Qb/(Qa+Qb); 
    //   uint Ea=Qa/(Qa+Qb);
    //   player[player2].value = eloA + _kCatulate(check-Ea); 
    //   player[player1].value = eloB + _kCatulate(1-check-Eb);
    // }
   

    if(playerWin == 1){
      player[player1].value += 1;
      player[player2].value -= 1;
    }else if(playerWin==2){
      player[player2].value += 1;
      player[player1].value -= 1;
    }
    player1 = 0;
    player2 = 0;
  }

  // function toggleCompleted(uint _id) public {
  //   Task memory _task = tasks[_id];
  //   // _task.completed = !_task.completed;
  //   // tasks[_id] = _task;
  //   emit TaskCompleted(_id, _task.completed);
  // }

}
