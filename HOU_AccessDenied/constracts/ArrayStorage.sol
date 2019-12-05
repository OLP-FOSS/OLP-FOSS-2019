// HOU_AccessDenied
pragma solidity ^0.5.0;

contract ArrayStorage {
    struct ArrayStruct {
        string[] array;
    }
    mapping (address => ArrayStruct) array;
    function set(string memory x) public {
        array[msg.sender].array.push(x);
    }
    function remove(uint x) public {
        delete array[msg.sender].array[x];
    }
    function get(uint x) public view returns(string memory){
        return array[msg.sender].array[x];
    }
    function count() public view returns(uint) {
        return array[msg.sender].array.length;
    }
}
