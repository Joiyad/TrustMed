import React from "react";
import { Navbar, OptionsCard } from "../../components";
import styles from "./Styles.module.scss";

const Retailer = ({ isConnected, account, connectWallet }) => {
  return (
    <>
      <Navbar
        isConnected={isConnected}
        account={account}
        connectWallet={connectWallet}
      />
      <div className={styles.card_container}>
        <OptionsCard
          text="Welcome, Select what you want to perform"
          button1="Buy a product"
          button2="See Requests"
          path1="/buy-product"
          path2="/requests"
        />
      </div>
    </>
  );
};

export default Retailer;
