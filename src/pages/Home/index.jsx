import React, { useEffect, useState } from 'react'
import styles from './Styles.module.scss'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

const Home = () => {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });

  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async() => {
    const provider = await detectEthereumProvider();

    if(provider){
      console.log('provider:', provider);
      provider.request({method: "eth_requestAccounts"});
      
      setWeb3Api({
        web3: new Web3(provider),
        provider,
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
    <div className={styles.home}>
      {!isConnected && (
        <div>
          <Button variant='outlined' onClick={connectWallet}>Login</Button>
        </div>
      )}
      {isConnected && (
        <div>
          {account}
        </div>
      )}
      <div>
        <Link to="/verify">
          <Button variant='outlined'>Verify product</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home