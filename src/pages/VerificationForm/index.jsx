import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./Styles.module.scss";
import { Navbar } from '../../components'

const VerificationForm = ({ web3Api, account }) => {
  const [code, setCode] = useState("");
  const [productDetails, setProductDetails] = useState({});
  // const [toShow, setToShow] = useState(false);

  const handleSubmit = async() => {
    const res = await web3Api.contract.getDetailsNotOwner(code);
    // console.log(res);
    setProductDetails(res);
  };
  console.log(productDetails);

  return (
    <>
      <Navbar />
      <div className={styles.form_container}>
        <TextField
          size="small"
          placeholder="Enter product number..."
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          size="large"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default VerificationForm;
