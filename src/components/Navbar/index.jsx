import React, { Fragment } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Metamask from "../../assets/images/metamask.svg";
import Trustmed from "../../assets/images/trustmed.png";
import { Link } from "react-router-dom";
import styles from './Styles.module.scss'

const Navbar = ({ isConnected, connectWallet, account }) => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <CssBaseline />
          <AppBar
            position="static"
            sx={{
              background: "#F5F6F6",
              boxShadow: "none",
              m: "0",
              fontFamily: "BlinkMacSystemFont",
              padding:'10px',
            }}
          >
            <Toolbar>
              <Box sx={{flexGrow:{xs:1, md:0}}}>
                <img alt="logo" src={Trustmed} width="40px" />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, color: "#F739E1", display:{xs:'none', md:'block'}}}
              >
                Trustmed
              </Typography>
              <Link to="/" className={styles.link}>
                <Button variant="contained">Home</Button>
              </Link>
              {isConnected ? (
                <Button variant="outlined" sx={{width:{xs:'100px', md:'400px'}, overflow:'hidden', fontWeight:'450'}}><Typography variant="body2">{account}</Typography></Button>
              ) : (
                <Button
                  startIcon={<img alt="logo" src={Metamask} width="20px"/>}
                  variant="outlined"
                  size="md"
                  onClick={connectWallet}
                >
                  <Typography sx={{fontWeight:'450'}}>Connect</Typography>
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default Navbar;
