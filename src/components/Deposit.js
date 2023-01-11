import React from "react";
import { Button, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Stack } from "@mui/material";
import Countdown from "react-countdown";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentIcon from "@mui/icons-material/Payment";

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0.1,
      address: "",
    };
    this.handleAmount = this.handleAmount.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }
  handleAmount = (event) => {
    this.setState({
      amount: event.target.value,
    });
  };
  handleAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) return <></>;
    else {
      return (
        <Typography variant="h6">
          {`${("0" + days).slice(-2)}:${("0" + hours).slice(-2)}:${(
            "0" + minutes
          ).slice(-2)}:${("0" + seconds).slice(-2)}`}{" "}
        </Typography>
      );
    }
  };

  render() {
    return (
      <Box className="content">
        <Stack
          flexDirection={{ sm: "row", xs: "column" }}
          gap={5}
          sx={{ mt: 5 }}
        >
          <Box
            sx={{
              flex: 1,
              color: "white",
              backgroundColor: "#1B2A41",
              border: "solid 2px #7b85e0",
              borderRadius: "15px",
              p: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PermIdentityIcon sx={{ fontSize: "100px" }} />
            <Typography sx={{ color: "#A888BB", mt: 2 }}>
              0x3c0a63...6D0109
            </Typography>
          </Box>
          <Box sx={{ flex: 3 }}>
            <Box
              sx={{
                color: "white",
                textAlign: "left",
                backgroundColor: "#1B2A41",
                border: "solid 2px #7b85e0",
                borderRadius: "15px",
                p: 3,
                mb: 2,
              }}
            >
              <Stack flexDirection={{ sm: "row", xs: "column" }}>
                <Box
                  sx={{
                    flex: 1,
                    color: "white",
                    textAlign: "left",
                    backgroundColor: "#1B2A41",
                    borderRight: { xs: "none", sm: "solid 2px #7b85e0" },
                    borderBottom: { xs: "solid 2px #7b85e0", sm: "none" },
                    px: 3,
                    py: { xs: 3, sm: 0 },
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <AccountBalanceWalletOutlinedIcon sx={{ fontSize: "50px" }} />
                  <Box sx={{ px: 2 }}>
                    <Typography variant="h6">1000 BNB</Typography>
                    <Typography sx={{ opacity: "0.5" }}>
                      Wallet BNB Balance
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    color: "white",
                    textAlign: "left",
                    backgroundColor: "#1B2A41",
                    borderLeft: { xs: "none", sm: "solid 2px #7b85e0" },
                    borderTop: { xs: "solid 2px #7b85e0", sm: "none" },
                    px: 3,
                    py: { xs: 3, sm: 0 },
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <AccountBalanceWalletOutlinedIcon sx={{ fontSize: "50px" }} />
                  <Box sx={{ px: 2 }}>
                    <Typography variant="h6">1000 USDT</Typography>
                    <Typography sx={{ opacity: "0.5" }}>
                      Wallet USDT Balance
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
            <Box
              sx={{
                color: "white",
                textAlign: "left",
                backgroundColor: "#1B2A41",
                border: "solid 2px #7b85e0",
                borderRadius: "15px",
                p: 3,
                mt: 2,
              }}
            >
              <Stack flexDirection={{ sm: "row", xs: "column" }}>
                <Box
                  sx={{
                    flex: 1,
                    color: "white",
                    textAlign: "left",
                    backgroundColor: "#1B2A41",
                    borderRight: { xs: "none", sm: "solid 2px #7b85e0" },
                    borderBottom: { xs: "solid 2px #7b85e0", sm: "none" },
                    px: 3,
                    py: { xs: 3, sm: 0 },
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <PaymentIcon sx={{ fontSize: "50px" }} />
                  <Box sx={{ px: 2 }}>
                    <Typography variant="h6">1000 BNB</Typography>
                    <Typography sx={{ opacity: "0.5" }}>My Deposit</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    color: "white",
                    textAlign: "left",
                    backgroundColor: "#1B2A41",
                    borderLeft: { xs: "none", sm: "solid 2px #7b85e0" },
                    borderTop: { xs: "solid 2px #7b85e0", sm: "none" },
                    px: 3,
                    py: { xs: 3, sm: 0 },
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <PaymentIcon sx={{ fontSize: "50px" }} />
                  <Box sx={{ px: 2 }}>
                    <Typography variant="h6">1000 USDT</Typography>
                    <Typography sx={{ opacity: "0.5" }}>
                      Total Earning
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
        <Stack
          flexDirection={{ sm: "row", xs: "column" }}
          gap={5}
          sx={{ mt: 5 }}
        >
          <Box
            sx={{
              flex: 1,
              color: "white",
              textAlign: "left",
              backgroundColor: "#1B2A41",
              border: "solid 2px #7b85e0",
              borderRadius: "15px",
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Deposit
            </Typography>
            <Box>
              <Typography>Amount</Typography>
              <OutlinedInput
                placeholder="Please insert amount"
                size="small"
                sx={{
                  mt: 1,
                  width: "100%",
                  color: "#202020",
                  backgroundColor: "white",
                  "& fieldset": { border: "solid 1px white !important" },
                }}
                value={this.state.amount}
                onChange={this.handleAmount}
                endAdornment={
                  <InputAdornment position="end">USDT</InputAdornment>
                }
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography>Referral wallet</Typography>
              <OutlinedInput
                placeholder="Please insert wallet address"
                size="small"
                sx={{
                  mt: 1,
                  width: "100%",
                  color: "#202020",
                  backgroundColor: "white",
                  "& fieldset": { border: "solid 1px white !important" },
                }}
                value={this.state.address}
                onChange={this.handleAddress}
              />
            </Box>
            <Box sx={{ mt: 3, display: "flex" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#26A1F9",
                  color: "white",
                  p: 1,
                  px: 3,
                  mx: "auto",
                }}
              >
                Deposit
              </Button>
            </Box>
          </Box>

          {/* Claim part */}

          <Box
            sx={{
              flex: 1,
              color: "white",
              textAlign: "left",
              backgroundColor: "#1B2A41",
              border: "solid 2px #7b85e0",
              borderRadius: "15px",
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 4.5 }}>
              Claim
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                border: "solid 2px #7b85e0",
                borderLeft: "none",
                borderRight: "none",
              }}
            >
              <Typography variant="h6" sx={{ opacity: "0.5" }}>
                Withdraw Time
              </Typography>{" "}
              <Countdown date={1675444905520} renderer={this.renderer} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "solid 2px #7b85e0",
                py: 2,
                mb: 5,
              }}
            >
              <Typography variant="h6" sx={{ opacity: "0.5" }}>
                Claimable
              </Typography>
              <Typography variant="h6">1000 USDT</Typography>
            </Box>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#26A1F9",
                  color: "white",
                  p: 1,
                  px: 3,
                  mx: "auto",
                }}
              >
                Claim
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#26A1F9",
                  color: "white",
                  p: 1,
                  px: 3,
                  mx: "auto",
                }}
              >
                Re-Deposit
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  }
}
export default Deposit;
