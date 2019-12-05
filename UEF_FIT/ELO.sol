pragma solidity ^0.5.11;

contract Cryptos {
    string public name = "ELO POINT";
    string public symbol = "ELO";
    uint public decimals = 0;
    
    uint public supply;
    address public founder;
    
    mapping(address => uint) public balances;
    
    mapping(address => mapping(address => uint)) allowed;
    
    mapping(address => uint) public amountOfTradedToken;

    
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);


    constructor() public{
        supply = 1000000000;
        founder = msg.sender;
        balances[founder] = supply;
    }
    
    
    function allowance(address tokenOwner, address spender) view public returns(uint){
        return allowed[tokenOwner][spender];
    }
    
    
    function approve(address spender, uint tokens) public returns(bool){
        require(balances[msg.sender] >= tokens);
        require(tokens > 0);
        
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    
    function transferFrom(address from, address to, uint tokens) public returns(bool){
        require(allowed[from][to] >= tokens);
        require(balances[from] >= tokens);
        
        balances[from] -= tokens;
        balances[to] += tokens;
        
        
        allowed[from][to] -= tokens;
        
        return true;
    }
    
    function totalSupply() public view returns (uint){
        return supply;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint balance){
         return balances[tokenOwner];
     }
     
     
    function transfer(address to, uint tokens) public returns (bool success){
         require(balances[msg.sender] >= tokens && tokens > 0);
         
         balances[to] += tokens;
         balances[msg.sender] -= tokens;
         emit Transfer(msg.sender, to, tokens);
         return true;
    }
    
    function getHeSoElo(address user) public returns (uint){
        if (balanceOf(msg.sender) == 0) return 5;
        if (balanceOf(msg.sender) < 5) return 10;
        if (balanceOf(msg.sender) < 10) return 15;
        if (balanceOf(msg.sender) >= 15) return 20;
    }
    
}
