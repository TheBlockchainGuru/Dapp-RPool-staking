import React from "react";
import { Box, Typography, Button,Link } from "@mui/material";
import { FaDiscord } from "react-icons/fa";
class Footer extends React.Component {
  render() {
    return (
      <Box sx={{ mt: 4, color: "white", borderTop: "solid 1px #0e8aa8" }}> 
        <Box className="content" sx={{ mt: 3 }}>
        <Link sx={{width:"100%"}} component="a" target="_blank" href={"https://discord.gg/vdSrcKWUtQ"} >
          <FaDiscord style={{ fontSize: "50px", color : '#ffffff' }} />
        </Link>
        
        <Box sx={{ mt: 3 }}>
        <Link sx={{width:"100%"}} component="a" target="_blank" href={"https://rugdoc.io/project/rug-pool/"} >
        <Box component="img" src="https://rugdoc.io/assets/2021/06/rugdoc-review-badge-with-glow.png" height={100} />
        </Link>
          <Typography variant="h6">
            © Copyright.Rugpool All Rights Reserved 2023.
          </Typography>
          <Typography variant="h6">Disclaimer | Refund Policy</Typography>
        </Box>
        </Box>
      </Box>
    );
  }
}
export default Footer;
