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
        }}
      >
        <Header />
        <Box className="content">
          <Box
            sx={{
              backgroundColor: "#050819",
              color: "#A888BB",
              p: 3,
              boxShadow: "10px 10px #0508196b",
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: "DM Sans" }}>
              TOTAL LOCKED VALUE
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, fontFamily: "DM Sans" }}>
              $200,000
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 8,
              fontWeight: 700,
              fontSize: { xs: "25px", sm: "35px" },
              lineHeight: "normal",
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
