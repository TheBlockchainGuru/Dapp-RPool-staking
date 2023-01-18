import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          zIndex: "999",
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#0e8aa8",
            py: 1,
            boxShadow:
              "0px 2px 4px -1px rgb(39 164 176 / 62%), 0px 4px 5px 0px rgb(39 164 176 / 62%), 0px 1px 10px 0px rgb(39 164 176 / 62%)",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Box component="img" src="./logo.png" height={50} />
            <Box>
              <Box sx={{display:"flex",display:this.props.linkedAccount == ""? "none":"flex", alignItems:"center"}}>
                <AccountBalanceWalletOutlinedIcon sx={{ fontSize: "25px" }}/>
                <Typography sx={{ml:2}}>{this.props.linkedAccount.slice(0, 7)}...{this.props.linkedAccount.slice(35, 42)} </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0e8aa8",
                  display:this.props.linkedAccount == ""? "block":"none",
                  color: "white",
                  p: 1,
                  px: 3,
                  mx: "auto",
                  borderRadius : '30px'
                }}
                onClick={()=>{this.props.walletConnect()}}
              >
                {" "}
                Wallet Connect
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
export default Header;
