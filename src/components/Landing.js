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
          backgroundImage: "url('./back.gif')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "600px",
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
              fontSize: { xs: "35px", sm: "45px" },
              color : "#101359"
            }}
          >
            STAKE YOUR BUSD AND GET YOUR REWARD DAILY !
          </Typography>
          <Typography
            sx={{
              width: "80%",
              fontSize: { xs: "10px", sm: "20px" },
              lineHeight: "normal",
              mx: "auto",
              mt: 3,
              color : "#101359"
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
