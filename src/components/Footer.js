import React from "react";
import { Box, Typography } from "@mui/material";

class Footer extends React.Component {
  render() {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#1B2A41",
          borderRadius: "15px",
          border: "solid 2px #7b85e0",
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            borderBottom: 2,
            borderColor: "#26a1f91a",
            height: "48px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "white", my: "auto", ml: 3, fontWeight: 700 }}
          >
            Footer
          </Typography>
        </Box>
        <Box sx={{ my: 2, mx: 3 }}>
          <Box>
            <Typography
              variant="body"
              component="div"
              sx={{ color: "white", opacity: "0.5", fontWeight: 400 }}
            >
              Anonymity set
            </Typography>
            <Typography
              variant="body"
              component="div"
              sx={{ color: "white", fontWeight: 400, my: 1 }}
            >
              26773 equal user deposits
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body"
              component="div"
              sx={{ color: "white", opacity: "0.5", fontWeight: 400 }}
            >
              Latest Deposits
            </Typography>
            <Box sx={{ height: "229px", overflowY: "scroll" }}>
              {arr.map((ele, index) => {
                return (
                  <Box key={index} sx={{ my: 1 }}>
                    <Typography
                      variant="body"
                      sx={{ color: "white", fontWeight: 400 }}
                    >
                      25773.
                    </Typography>
                    <Typography
                      variant="body"
                      sx={{ color: "#A888BB", fontWeight: 400 }}
                    >
                      &nbsp;a day ago
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default Footer;
