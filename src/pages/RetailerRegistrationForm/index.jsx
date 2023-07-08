import React, { useState } from 'react'
import { Navbar } from '../../components'
import styles from './Styles.module.scss'
import { Button, TextField, Typography } from '@mui/material'
import Lottie from 'lottie-react'
import Animation from '../../assets/animations/107800-login-leady.json'

const RetailerRegistrationForm = ({isConnected, account, connectWallet, web3Api}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleLocation = (e) => {
    setLocation(e.target.value);
  }

  const handleSubmit = () => {
    if(account === null) window.alert('address is invalid, Reconnect to Metamask');
    else{
      web3Api.contract.createRetailer(account, name, location);
      console.log(name+location);
    }
  }

  return (
    <>
      <Navbar isConnected={isConnected} account={account} connectWallet={connectWallet} />
      <div className={styles.container}>
        <div className={styles.animation_container}>
            <Typography variant="h3">Register as Retailer</Typography>
            <br />
            <div className={styles.lottie_container}>
              <Lottie animationData={Animation} />
            </div>
        </div>
        <div className={styles.form_container}>
          <TextField placeholder='Enter your name...' onChange={handleName}/>
          <TextField placeholder='Enter your location...' onChange={handleLocation}/>
          <Button variant='contained' size='large' onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </>
  )
}

export default RetailerRegistrationForm