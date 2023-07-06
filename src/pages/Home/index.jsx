import React from "react";
import styles from "./Styles.module.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";

const Home = ({ isConnected, connectWallet, account }) => {
  return (
    <>
      <Navbar
        isConnected={isConnected}
        connectWallet={connectWallet}
        account={account}
      />
      <Link to="/verify">
        <Button variant="outlined">Verify product</Button>
      </Link>
    </>
  );
};

export default Home;
