import React, { useState } from "react";
import { Navbar } from "../../components";
import styles from "./Styles.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import Animation from "../../assets/animations/119588-task-assigning.json";

const ManufacturerRegistrationForm = ({isConnected, connectWallet, account, web3Api}) => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async() => {
    if (account === null) window.alert("address is invalid, Reconnect to Metamask");
    else {
      if(address === '' || name === '' || location === '') window.alert("Fill all the fields");
      else{ 
        const res = await web3Api.contract.createManufacturer(address, name, location, {from: account});
        if(res) window.alert("Manufacturer registed");
        else window.alert("Manufacturer already exists");
      }
    }
    setAddress(''); setName(''); setLocation('');
  };

  return (
    <>
      <Navbar
        isConnected={isConnected}
        account={account}
        connectWallet={connectWallet}
      />
      <div className={styles.container}>
        <div className={styles.animation_container}>
          <Typography variant="h3">Welcome Admin</Typography>
          <Typography variant="h5" sx={{color:'#7F7E7F'}}>Register new Manufacturer</Typography>
          <br />
          <div className={styles.lottie_container}>
            <Lottie animationData={Animation} />
          </div>
        </div>
        <div className={styles.form_container}>
          <TextField value={address} placeholder="Enter Metamask address..." onChange={(e) => setAddress(e.target.value)} />
          <TextField value={name} placeholder="Enter Name..." onChange={(e) => setName(e.target.value)} />
          <TextField value={location} placeholder="Enter Location..." onChange={(e) => setLocation(e.target.value)} />
          <Button fullWidth={true} variant="contained" size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ManufacturerRegistrationForm