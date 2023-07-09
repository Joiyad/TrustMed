import React, { useState } from 'react'
import { Navbar } from '../../components'
import styles from './Styles.module.scss'
import { Button, TextField, Typography } from '@mui/material'
import Lottie from 'lottie-react'
import Animation from '../../assets/animations/107800-login-leady.json'
import { useNavigate } from 'react-router-dom'

const RetailerRegistrationForm = ({isConnected, account, connectWallet, web3Api}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleLocation = (e) => {
    setLocation(e.target.value);
  }

  const handleSubmit = async() => {
    if(account === null) window.alert('address is invalid, Reconnect to Metamask');
    else{
      if(name === '' || location === '') window.alert('Fill all the fields');
      else{ 
        const res = await web3Api.contract.createRetailer(account, name, location);
        if(res) {
          window.alert("Retailer registered successfully");
          navigate("/retailer");
        }
        else window.alert("retailer already exists");
      }
    }
    setName(''); setLocation('');
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
          <TextField value={name} placeholder='Enter your name...' onChange={handleName}/>
          <TextField value={location} placeholder='Enter your location...' onChange={handleLocation}/>
          <Button variant='contained' size='large' onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </>
  )
}

export default RetailerRegistrationForm