import {ethers} from 'ethers';
import abi from './Trustmed.json'

const ContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
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