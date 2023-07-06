import React, { useState } from 'react'
import { Navbar } from '../../components'
import styles from './Styles.module.scss'
import { Button, TextField, Typography } from '@mui/material'
import Lottie from 'lottie-react'
import Animation from '../../assets/animations/107800-login-leady.json'

const RetailerRegistration = ({isConnected, account, connectWallet}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleLocation = (e) => {
    setLocation(e.target.value);
  }

  const handleSubmit = () => {
    setAddress(account);
    if(address === null) window.alert('address is invalid');
    else console.log(name + " " + location);
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
          <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </>
  )
}

export default RetailerRegistration