import React, { useState } from "react";
import { Navbar } from "../../components";
import styles from "./Styles.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import Animation from "../../assets/animations/47779-product-delivery-and-sign-in-the-paper.json";

const ProductRegistrationForm = ({isConnected, connectWallet, account, web3Api}) => {
  const [code, setCode] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [manufName, setManufName] = useState('');
  const [manufLocation, setManufLocation] = useState('');
  const [manufTimestamp, setManufTimestamp] = useState('');

  const handleSubmit = () => {
    if (account === null)
      window.alert("address is invalid, Reconnect to Metamask");
    else {
      web3Api.contract.registerProduct(code, 1, brand, model, description, manufName, manufLocation, manufTimestamp);
      console.log(code);
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
          <Typography variant="h3">Register New Product</Typography>
          <br />
          <div className={styles.lottie_container}>
            <Lottie animationData={Animation} />
          </div>
        </div>
        <div className={styles.form_container}>
          <TextField placeholder="Enter product code..." onChange={(e) => setCode(e.target.value)} />
          <TextField placeholder="Enter product brand..." onChange={(e) => setBrand(e.target.value)} />
          <TextField placeholder="Enter product model..." onChange={(e) => setModel(e.target.value)} />
          <TextField placeholder="Enter product description..." onChange={(e) => setDescription(e.target.value)} />
          <TextField placeholder="Enter manufacturer name..." onChange={(e) => setManufName(e.target.value)} />
          <TextField placeholder="Enter manufacturer location..." onChange={(e) => setManufLocation(e.target.value)} />
          <TextField placeholder="Enter manuf.time (HH:MM)..." onChange={(e) => setManufTimestamp(e.target.value)} />
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductRegistrationForm;
