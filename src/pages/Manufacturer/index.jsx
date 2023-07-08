import React from "react";
import { Navbar, OptionsCard } from "../../components";
import styles from "./Styles.module.scss";

const Manufacturer = ({ isConnected, account, connectWallet }) => {
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
          button1="Add a product"
          button2="See Requests"
          path1="/add-product"
          path2="/requests"
        />
      </div>
    </>
  );
};

export default Manufacturer;
