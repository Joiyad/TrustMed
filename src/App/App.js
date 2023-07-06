import React, { useEffect, useState } from 'react'
import { Error404, Home, RetailerRegistration, VerificationForm } from '../pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import loadContract from '../utils/LoadContract'

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async() => {
    const provider = await detectEthereumProvider();
    const contract = await loadContract(window.ethereum);

    if(provider){
      provider.request({method: "eth_requestAccounts"});
      
      setWeb3Api({
        web3: new Web3(provider),
        provider,
        contract,
      });
      setIsConnected(true);
    }
    else{
      console.log("Please install the Metamask");
    }
    console.log(contract);
  };

  useEffect(() => {
    const getAccount = async() => {
      const {web3, contract} = web3Api;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    web3Api.web3 && getAccount();
  }, [web3Api]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home isConnected={isConnected} connectWallet={connectWallet} account={account}/>} />
          <Route exact path="/verify" element={<VerificationForm />} />
          <Route exact path="/register" element={<RetailerRegistration isConnected={isConnected} connectWallet={connectWallet} account={account} web3Api={web3Api}/>} />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
