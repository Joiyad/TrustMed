import React from "react";
import styles from "./Styles.module.scss";
import { Button, Typography } from "@mui/material";
import { Navbar } from "../../components";
import Lottie from "lottie-react";
import Animation from '../../assets/animations/4180-blockchain-animation.json'
import { Link, useNavigate } from "react-router-dom";

const Home = ({ isConnected, connectWallet, account }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    if(isConnected){
      navigate("/register")
    }
    else{
      window.alert("Connect Metamask")
    }
  }

  return (
    <>
      <Navbar
        isConnected={isConnected}
        connectWallet={connectWallet}
        account={account}
      />
      <div className={styles.container}>
        <div className={styles.text_container}>
          <div className={styles.text_section}>
            <Typography variant="h2">Blockchain Powered Anti Counterfeit System</Typography>
            <br />
            <Typography variant="h5" sx={{color:'#7F7E7F'}}>Transforming the Fight Against Counterfeiting: Empowering Brands with Blockchain </Typography>
            <br />
            <br />
            <div className={styles.button_container}>
              <Button size="large" variant="contained" onClick={handleRegister}>Register</Button>
              <Link to="/verify"><Button size="large" variant="outlined">Verify Product</Button></Link>
            </div>
          </div>
        </div>
        <div className={styles.lottie_container}>
          <Lottie animationData={Animation} />
        </div>
      </div>
    </>
  );
};

export default Home;
