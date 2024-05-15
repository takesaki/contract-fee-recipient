import { ethers, JsonRpcProvider, WebSocketProvider, Contract } from 'ethers'
import ContractInfo from '../../config/FeeReceiver.json'

const RPCEndpoint = 'https://ethereum-holesky-rpc.publicnode.com';
const WebSocketEndpoint = 'wss://ethereum-holesky-rpc.publicnode.com';

const CONTRACT_ADDRESS :string = import.meta.env.VITE_CONTRACT_ADDRESS;
const ABI = ContractInfo.abi;

// Contract Call用
//const provider = new WebSocketProvider(WebSocketEndpoint);
const provider = new JsonRpcProvider(RPCEndpoint);
const contract: Contract = new Contract(CONTRACT_ADDRESS, ABI, provider);

const getContractObject = ():Contract => {
  return new Contract(CONTRACT_ADDRESS, ABI, provider);
}

const getOwner = async () => {
  return contract.owner();
}

const getBalanceString = async (): Promise<string> => {
  return ethers.formatEther(await contract.getBalance());
}



export default {
  CONTRACT_ADDRESS,
  getContractObject,
  getBalanceString,
  getOwner
};