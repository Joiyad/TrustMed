import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Styles.module.scss";
import { Navbar } from "../../components";

const VerificationForm = ({ isConnected, connectWallet, account, web3Api }) => {
  const [code, setCode] = useState("");
  const [productDetails, setProductDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const copyData = (data) => {
    const obj = {
      status: data[0],
      model: data[1],
      brand: data[2],
      description: data[3],
      manufName: data[4],
      manufLocation: data[5],
      manufTimestamp: data[6],
    };
    setProductDetails(obj);
  };

  const handleSubmit = async () => {
    const res = await web3Api.contract.getDetailsNotOwner(code);
    copyData(res);
    if (res[2] !== "") setShowDetails(true);
    else {
      setShowDetails(false);
      window.alert("Product not found");
    }
  };

  return (
    <>
      <Navbar
        isConnected={isConnected}
        connectWallet={connectWallet}
        account={account}
      />
      <div className={styles.form_container}>
        <div className={styles.search_container}>
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
        {showDetails && (
          <div className={styles.table_container}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell variant="head">Code</TableCell>
                    <TableCell>{code}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Brand</TableCell>
                    <TableCell>{productDetails.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Model</TableCell>
                    <TableCell>{productDetails.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Manufacturer name</TableCell>
                    <TableCell>{productDetails.manufName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Manufacturer Location</TableCell>
                    <TableCell>{productDetails.manufLocation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      Manufacturing Timestamp
                    </TableCell>
                    <TableCell>{productDetails.manufTimestamp}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default VerificationForm;
