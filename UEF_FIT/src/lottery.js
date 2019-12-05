import Web3 from 'web3'
//Lay ABI
import abi from './lotteryABI.json'

//Ket noi den hop dong Lottery
const accessLotteryContract = async () => {
    //Ket noi voi metamask
    await window.ethereum.enable()
    //Tao 1 instance web3 tu constructor Web3
    const web3 = new Web3(window.web3.currentProvider);
    
    //Lay hop dong lottery tu blockchain
    //web3.eth.Contract co 2 tham so, 1: abi, 2: dia chi lottery
    const lotteryContract = new web3.eth.Contract(abi, "0xE47911Bd207116F5B53A5413a8AACfB7B454539a") 
    
    return lotteryContract
}

export default accessLotteryContract()