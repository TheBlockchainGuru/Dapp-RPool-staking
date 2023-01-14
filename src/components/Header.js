import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

class Header extends React.Component {
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
            backgroundColor: "#101359",
            py: 1,
            boxShadow:
              "0px 2px 4px -1px rgb(255 255 255 / 20%), 0px 4px 5px 0px rgb(255 255 255 / 14%), 0px 1px 10px 0px rgb(255 255 255 / 12%)",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Box component="img" src="./logo.png" height={50} />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
export default Header;
