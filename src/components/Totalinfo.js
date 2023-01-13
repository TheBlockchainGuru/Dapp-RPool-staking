import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

class Totalinfo extends React.Component {
  render() {
    return (
      <Box>
        <Box
          sx={{
            color: "white",
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "DM Sans" }}>
            TOTAL LOCKED VALUE
          </Typography>
          <Typography variant="h4" sx={{ mt: 2, fontFamily: "DM Sans" }}>
            $200,000
          </Typography>
        </Box>
      </Box>
    );
  }
}
export default Totalinfo;
