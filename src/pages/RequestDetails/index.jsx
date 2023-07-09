import React, { useState } from "react";
import { Navbar } from "../../components";
import styles from "./Styles.module.scss";
import { Button, Typography } from "@mui/material";

const RequestDetails = ({ isConnected, account, connectWallet, web3Api }) => {
  const [requests, setRequests] = useState(null);
  const [isRequestPresent, setIsRequestPresent] = useState(false);

  const seeRequests = async () => {
    if (account === null)
      window.alert("address is invalid, Reconnect to Metamask");
    else {
      const res = web3Api.contract.getRequest({ from: account });
      res.then((response) => {
        if (response[1] !== "") {
          setIsRequestPresent(true);
          setRequests(response);
        } else setIsRequestPresent(false);
      });
      console.log(res);
      console.log(requests);
    }
  };

  const handleAccept = async () => {
    await web3Api.contract.acceptRequest(requests[0], requests[2], {
      from: account,
    });
    if (requests[0] === "") setIsRequestPresent(false);
  };

  const handleDecline = async () => {
    await web3Api.contract.declineRequest();
    if (requests[0] === "") setIsRequestPresent(false);
  };

  return (
    <>
      <Navbar
        isConnected={isConnected}
        account={account}
        connectWallet={connectWallet}
      />
      <div className={styles.container}>
        <Button size="large" variant="contained" onClick={seeRequests}>
          See all requests
        </Button>
        {isRequestPresent ? (
          <div className={styles.card_container}>
            <Typography variant="h4">Pending Requests</Typography>
            <div className={styles.request_container}>
              <Typography variant="h6">{requests[0]}</Typography>
              <Typography variant="h6">{requests[1]}</Typography>
              <Typography variant="h6">{requests[2]}</Typography>
            </div>
            <div className={styles.button_container}>
              <Button size="large" variant="contained" onClick={handleAccept}>
                Accept
              </Button>
              <Button size="large" variant="outlined" onClick={handleDecline}>
                Decline
              </Button>
            </div>
          </div>
        ) : (
          <h2>No Requests</h2>
        )}
      </div>
    </>
  );
};

export default RequestDetails;
