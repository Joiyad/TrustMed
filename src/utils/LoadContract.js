import {ethers} from 'ethers';
import abi from './Trustmed.json'

const ContractAddress = '0x2F178fcF0b73F54ec580314DEf4a41adF8049F42';
const ContractAbi = abi.abi;

export default function loadContract(ethereum){
    if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(ContractAddress, ContractAbi, signer);
    } else {
        return undefined;
    }
}