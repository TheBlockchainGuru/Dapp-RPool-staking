import React from "react";
import Header from "./Header";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

class Message extends React.Component {
  render() {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundImage: "url('./background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          display: "flex",
        }}
      >
        <Header />
        <Box
          className="content"
          sx={{ my: "auto", display: "flex", flexDirection: "column" }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "30px", sm: "3.5vw" },
              color : "#cccccc",
            }}
          >
            Enabling a new
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "30px", sm: "5vw" },
            }}
            className="custom-font"
          >
            Rugpool Economy
          </Typography>

          <Typography
            sx={{
              width: "80%",
              fontSize: { xs: "10px", sm: "20px" },
              lineHeight: "normal",
              mx: "auto",
              mt: 3,
              color : "#ffffff"
            }}
          >
            JOIN OUR COMMUNITY OF EXCLUSIVE INVESTORS AS WE STRIVE FOR
            SUSTAINABLE GROWTH AND STABILITY.
          </Typography>
        </Box>
      </Box>
    );
  }
}
export default Message;
