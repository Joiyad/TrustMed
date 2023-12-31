import React, { useEffect, useState } from 'react'
import { BuyProduct, Error404, Home, Manufacturer,
   ManufacturerRegistrationForm, ProductRegistrationForm, 
   RequestDetails, 
   Retailer, 
   RetailerRegistrationForm, VerificationForm } from '../pages';
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
  };

  useEffect(() => {
    const getAccount = async() => {
      const {web3} = web3Api;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    web3Api.web3 && getAccount();
  }, [web3Api]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home isConnected={isConnected} connectWallet={connectWallet} account={account} web3Api={web3Api}/>} />
          <Route exact path="/verify-product" element={<VerificationForm isConnected={isConnected} connectWallet={connectWallet} account={account} web3Api={web3Api}/>} />
          <Route exact path="/add-manufacturer" element={<ManufacturerRegistrationForm isConnected={isConnected} connectWallet={connectWallet} account={account} web3Api={web3Api}/>} />
          <Route exact path="/manufacturer" element={<Manufacturer isConnected={isConnected} connectWallet={connectWallet} account={account}/>} />
          <Route exact path="/retailer" element={<Retailer isConnected={isConnected} connectWallet={connectWallet} account={account}/>} />
          <Route exact path="/add-product" element={<ProductRegistrationForm isConnected={isConnected} connectWallet={connectWallet} account={account} web3Api={web3Api}/>} />
          <Route exact path="/add-retailer" element={<RetailerRegistrationForm isConnected={isConnected} connectWallet={connectWallet} account={account} web3Api={web3Api}/>} />
          <Route exact path="/buy-product" element={<BuyProduct isConnected={isConnected} connectWallet={connectWallet} account={account} web3Api={web3Api}/>} />
          <Route exact path="/requests" element={<RequestDetails isConnected={isConnected} connectWallet={connectWallet} account={account} web3Api={web3Api}/>} />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
