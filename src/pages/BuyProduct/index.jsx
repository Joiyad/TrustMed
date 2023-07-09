import React, { useState } from "react";
import { Navbar } from "../../components";
import styles from "./Styles.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import Animation from "../../assets/animations/19602-contract.json";

const SellProduct = ({isConnected, connectWallet, account, web3Api}) => {
  const [code, setCode] = useState('');

  const handleSubmit = async() => {
    if (account === null)
      window.alert("address is invalid, Reconnect to Metamask");
    else {
      if(await web3Api.contract.isProduct(code)){
        const res = await web3Api.contract.makeRequest(code, {from: account});
        console.log(res);
      }
      else window.alert("Product does not exist");
    }
    setCode('');
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
          <Typography variant="h5" sx={{color:'#7F7E7F'}}>Send a buy request to owner</Typography>
          <br />
          <div className={styles.lottie_container}>
            <Lottie animationData={Animation} />
          </div>
        </div>
        <div className={styles.form_container}>
          <TextField value={code} placeholder="Enter product code" helperText="please verify product number first" onChange={(e) => setCode(e.target.value)} />
          <Button fullWidth={true} variant="contained" size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default SellProduct