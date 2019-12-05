pragma solidity ^0.5.11;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721Full.sol";



contract Caro is ERC721Full {
    address public founder;
    mapping(uint256 => GameSet) private gameSetAddresses;
    
    constructor() public ERC721Full("gameId", "GID") {
        founder = msg.sender;
    }
   
     function setGameAddress(uint256 tokenId, GameSet gameAddress) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        gameSetAddresses[tokenId] = gameAddress;
    }
    
    function getGameSetAddress(uint256 tokenId) public view returns (GameSet) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        
        return gameSetAddresses[tokenId];
    }
   
   function saveGame(uint[] memory positionX, uint[] memory positionO) public {
        GameSet gameAddress = new GameSet(positionX, positionO);
        
        uint tokenId = totalSupply();
        
        
        _mint(msg.sender, tokenId);
        
        setGameAddress(tokenId, gameAddress);
        
    }
   
}

contract GameSet {
    uint [] public positionX;
    uint[] public positionO;
    
    constructor (uint[] memory Xposition, uint[] memory Oposition) public {
        positionX = Xposition;
        positionO = Oposition;
    }
    
    function getPositionXFunction() public view returns (uint[] memory){
        return positionX;
    }
    
    function getPositionOFunction() public view returns (uint[] memory){
        return positionO;
    }
    
    function updateGame(uint[] memory Xposition, uint[] memory Oposition) public {
        positionX = Xposition;
        positionO = Oposition;
    }
}




