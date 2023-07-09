import React, { useState } from "react";
import { Navbar } from "../../components";
import styles from "./Styles.module.scss";
import { Button, Typography } from "@mui/material";

const RequestDetails = ({ isConnected, account, connectWallet, web3Api }) => {
  const [requests, setRequests] = useState(null);
  const [isRequestPreset, setIsRequestPresent] = useState(true);

  const seeRequests = async () => {
    if (account === null)
      window.alert("address is invalid, Reconnect to Metamask");
    else {
      const res = web3Api.contract.getRequest({ from: account });
      res.then((response) => {
        if(response[1] !== ""){ 
          setIsRequestPresent(true);
          setRequests(response);
        } else setIsRequestPresent(false);
      });
    }
  };

  const handleAccept = async () => {
    await web3Api.contract.acceptRequest(requests[0], requests[2], {
      from: account,
    });
    setRequests(null);
    setIsRequestPresent(false);
  };

  const handleDecline = async () => {
    await web3Api.contract.declineRequest();
    setRequests(null);
    setIsRequestPresent(false);
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
        <Typography>You will see all incoming requests of buy here</Typography>
        {requests && (
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
        )}
        {isRequestPreset ? null : <h2>No requests</h2>}
      </div>
    </>
  );
};

export default RequestDetails;
