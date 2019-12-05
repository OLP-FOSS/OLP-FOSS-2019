import abi from "./abi";
import Web3 from "web3";

var web3;
var contract;
const contractAddress = "0x8fEf8Cf6A99dEB797d9686f843c3def1B670289C";

const checkCompatible = async () => {
  // Modern dapp browsers...
  if (window.ethereum || window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    contract = new web3.eth.Contract(abi, contractAddress);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
    } catch (error) {
      // User denied account access...
    }
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
    return false;
  }
  return true;
};

const saveGAME = () => {
  contract.methods
    .widthdrawFunds()
    .send({
      from: window.ethereum.selectedAddress,
      gas: 3000000
    })
};
const openGAME = () => {
    contract.methods
      .widthdrawFunds()
      .send({
        from: window.ethereum.selectedAddress,
        gas: 3000000
      })
  };
  
const gameContract = {
  data,
  codeTHISGAME,
  saveGAME,
  openGAME,
  checkCompatible
};

export default gameContract;
