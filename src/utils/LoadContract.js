import {ethers} from 'ethers';
import abi from './Trustmed.json'

const ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
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