import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";



class Header extends React.Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1, mb: 8 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <IconButton color="inherit" sx={{ px: 0 }}>
              LOGO
            </IconButton>
            <Button
              sx={{
                border: "1px solid #7b85e0",
                borderRadius: "10px",
                backgroundColor: "#1B2A41",
                color: "white",
                px: 3,
              }}
            >
              Connect Wallet
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
export default Header;
