import React, { useState } from "react";
import { Navbar } from "../../components";
import styles from "./Styles.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import Animation from "../../assets/animations/19602-contract.json";

const SellProduct = ({isConnected, connectWallet, account, web3Api}) => {
  const [address, setAddress] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = async() => {
    if (account === null)
      window.alert("address is invalid, Reconnect to Metamask");
    else {
      const res = await web3Api.contract.transferOwnership(code, address, {from: account});
      console.log(res);
    }
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
          <Typography variant="h3">Welcome</Typography>
          <Typography variant="h5" sx={{color:'#7F7E7F'}}>Sell product by transfering ownership</Typography>
          <br />
          <div className={styles.lottie_container}>
            <Lottie animationData={Animation} />
          </div>
        </div>
        <div className={styles.form_container}>
          <TextField placeholder="Enter product code" onChange={(e) => setCode(e.target.value)} />
          <TextField placeholder="Enter Metamask address..." helperText="Address of new Owner" onChange={(e) => setAddress(e.target.value)} />
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default SellProduct