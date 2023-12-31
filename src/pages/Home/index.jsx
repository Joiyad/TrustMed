import React from "react";
import styles from "./Styles.module.scss";
import { Button, Typography } from "@mui/material";
import { FeatureCard, Navbar } from "../../components";
import Lottie from "lottie-react";
import Animation from '../../assets/animations/4180-blockchain-animation.json'
import { useNavigate } from "react-router-dom";
import { data } from "../../data/whyBlockchain";
import Footer from "../../components/Footer";

const Home = ({ isConnected, connectWallet, account, web3Api }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    if(!isConnected){
      window.alert("Connect Metamask")
    }
    else{
      const checkAccount = async() => {
        const {contract} = web3Api;
        if(await contract.isSuperAdmin({from: account})){
          navigate("/add-manufacturer");
        }
        else if(await contract.isManufacturer({from: account})){
          navigate("/manufacturer");
        }
        else if(await contract.isRetailer({from: account})){
          navigate("/retailer");
        }
        else navigate("/add-retailer");
      }
      account && checkAccount();
    }
  }

  const handleVerify = () => {
    if(!isConnected){
      window.alert("Connect Metamask");
    }
    else{
      navigate("/verify-product");
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
            <Typography sx={{textAlign:{xs:'center', md:'left'}, fontSize:{xs:'44px', md:'50px', lg:'50px'}}}>Blockchain Powered Anti Counterfeit System</Typography>
            <br />
            <Typography variant="h5" sx={{color:'#7F7E7F', textAlign:{xs:'center', md:'left'}}}>Transforming the Fight Against Counterfeiting: Empowering Brands with Blockchain </Typography>
            <br />
            <br />
            <div className={styles.button_container}>
              <Button size="large" variant="contained" onClick={handleRegister}>Register</Button>
              <Button size="large" variant="outlined" onClick={handleVerify}>Verify Product</Button>
            </div>
          </div>
        </div>
        <div className={styles.lottie_container}>
          <Lottie animationData={Animation} />
        </div>
      </div>
      <Typography variant="h2" sx={{textAlign:'center', paddingTop:{xs:'200px', md:'100px'}, fontSize:{xs:'44px', md:'52px', lg:'50px'}}}>Why Blockchain</Typography>
      <div className={styles.card_group}>
        {data.map(({id, title, description, imageLink}) => (
          <FeatureCard key={id} title={title} description={description} imageLink={imageLink}/>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
