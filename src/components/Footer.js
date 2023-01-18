import React from "react";
import { Box, Typography } from "@mui/material";
import { FaDiscord } from "react-icons/fa";
class Footer extends React.Component {
  render() {
    return (
      <Box sx={{ mt: 4, color: "white", borderTop: "solid 1px #0e8aa8" }}>
        <Box className="content" sx={{ mt: 3 }}>
          <FaDiscord style={{ fontSize: "50px" }} />
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">
              © Copyright.Prosperity RugPool. All Rights Reserved 2023.
            </Typography>
            <Typography variant="h6">Disclaimer | Refund Policy</Typography>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default Footer;
