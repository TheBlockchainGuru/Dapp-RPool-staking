import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";

class Info extends React.Component {
  render() {
    return (
      <Box
        sx={{
          // background:
          //   "linear-gradient(90deg, rgb(16 19 89) 0%, rgba(9,9,121,1) 25%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Stack
          className="content"
          gap={2}
          flexDirection={{ sm: "row", xs: "column" }}
          sx={{
            color: "white",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{ textAlign: "left", my: 3, fontWeight: 700 }}
            >
              REDUCING RISK IN DEFI
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "left", my: 3 }}>
            By taking a slow and incremental approach to increasing the TVL, This allows Users to grow without the risk of rapid growth becoming overwhelming
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{ textAlign: "left", my: 3, fontWeight: 700 }}
            >
              REAL SUSTAINABILITY
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "left", my: 3 }}>
            Our goal is to achieve a designated total value locked (TVL) and then close deposits to ensure sustainable growth for our users.
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{ textAlign: "left", my: 3, fontWeight: 700 }}
            >
              THE RUGPOOL
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "left", my: 3 }}>
            A smart contract pool offering up to 0.5% daily with the ability to claim rewards weekly. There are no guarantees percentages can change from week to week.
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  }
}
export default Info;
