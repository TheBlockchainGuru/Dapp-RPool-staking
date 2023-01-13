import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";

class Info extends React.Component {
  render() {
    return (
      <Box
        sx={{
          background:
            "linear-gradient(90deg, rgb(16 19 89) 0%, rgba(9,9,121,1) 25%, rgba(0,212,255,1) 100%)",
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
              RugPool is one of the only defi projects allowing each user to
              request a full deposit refund after 15 days of initial deposit
              without any deductions.
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
              A real defi project using AI trading bots 24 hour a day 7 days a
              week for long term sustainability. All bots have been back tested
              for over 6 months.
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{ textAlign: "left", my: 3, fontWeight: 700 }}
            >
              SMART CONTRACT POOL
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "left", my: 3 }}>
              A smart contract pool offering up to 0.5% daily with the ability
              to claim rewards weekly. There are no guarantees percentages can
              change from week to week.
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  }
}
export default Info;
