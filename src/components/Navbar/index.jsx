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
              background: "none",
              boxShadow: "none",
              m: "0",
              fontFamily: "BlinkMacSystemFont",
              padding:'10px',
            }}
          >
            <Toolbar>
              <Box>
                <img alt="logo" src={Trustmed} width="40px" />
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "plum" }}
              >
                Trustmed
              </Typography>
              <Link to="/">
                <Button sx={{margin:'0 2vw'}}>Home</Button>
              </Link>
              {isConnected ? (
                <Button variant="outlined" sx={{maxWidth:"400px", overflow:'hidden'}}>{account}</Button>
              ) : (
                <Button
                  startIcon={<img alt="logo" src={Metamask} width="20px"/>}
                  variant="outlined"
                  onClick={connectWallet}
                >
                  Connect
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
