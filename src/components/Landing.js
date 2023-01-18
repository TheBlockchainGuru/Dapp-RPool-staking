import React from "react";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

class Message extends React.Component {
  render() {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundImage: "url('./back3.gif')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          display: "flex",
        }}
      >
        <Box
          className="content"
          sx={{ my: "auto", display: "flex", flexDirection: "column" }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "30px", sm: "10vw" },
            }}
            className="custom-font"
          >
            RUGPOOL
          </Typography>

          <Typography
            sx={{
              width: "80%",
              fontSize: { xs: "10px", sm: "30px" },
              lineHeight: "normal",
              mx: "auto",
              mt: 3,
              color : "#000000"
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
