import React from "react";

import { Button, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Stack } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import PaymentIcon from "@mui/icons-material/Payment";
import Info from "./Info";
import Web3 from "web3";
import { ethers } from "ethers";
import {
  usdtAddress,
  usdtABI,
  stakingAddress,
  RPC,
  stakingABI,
  ownerWallet,
} from "./config";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const web3 = new Web3(new Web3.providers.HttpProvider(RPC));
const usdtContract = new web3.eth.Contract(usdtABI, usdtAddress);
const stakingContract = new web3.eth.Contract(stakingABI, stakingAddress);

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDeposit: 0,
      sponserAddress: "",
      withdrawDate: "",
      claimable: 0,
      linkedAccount: "",
      totalLockedValue : "___",

      linkedWalletBNBBalance: "___",
      linkedWalletUSDTBalance: "___",
      linkedWalletDepositAmount: "___",
      linkedWalleTotalEarning: "___",
      linkedWalletNextWithdrawDate: "___",
      linkedWalletClaimable: "___",

      allowance : 0,
      isApproved : false,
      metamaskWeb3: [],

      isINTransaction : false
    };
    this.handleAmount = this.handleAmount.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  async componentWillMount() {
    this.walletConnect();
    setInterval(() => {
      if (this.state.linkedAccount != ""){
        this.checkDashBoard(this.state.linkedAccount)
        this.caputureWallet()
      }
    }, 3000);
  }

  async walletConnect() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(5) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: web3.utils.toHex(56),
                chainName: "Goerli test network",
                rpcUrls: [
                  "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                ],
                nativeCurrency: {
                  name: "GoerliETH",
                  symbol: "GoerliETH", // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: "https://goerli.etherscan.io",
              },
            ],
          });

          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: web3.utils.toHex(5) }],
          });
        } catch (addError) {}
      }
    }

    this.caputureWallet()
  }

  async caputureWallet (){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const clientWeb3 = window.web3;
      const accounts = await clientWeb3.eth.getAccounts();
      this.setState({
        linkedAccount: accounts[0],
        metamaskWeb3: clientWeb3,
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      const clientWeb3 = window.web3;
      const accounts = await clientWeb3.eth.getAccounts();
      this.setState({
        linkedAccount: accounts[0],
        metamaskWeb3: clientWeb3,
      });
    }
    const { ethereum } = window;
  }

  async checkDashBoard(address) {
    console.log("start check dashboard")
    let bnbAmount,
      usdtAmount,
      myDeposit,
      totalEarning,
      nextWithdrawDate,
      claimable,
      allowance,
      isApproved,
      invested

    bnbAmount  =  await web3.eth.getBalance(address);
    usdtAmount =  await usdtContract.methods.balanceOf(address).call();
    let data   =  await stakingContract.methods.players(address).call();
    invested   =  await stakingContract.methods.invested().call()
    allowance   =  await usdtContract.methods.allowance(this.state.linkedAccount, stakingAddress).call()
    isApproved = allowance / 1 > this.state.amountDeposit + Math.pow(10,18)

    myDeposit = data.total_invested;
    totalEarning = data.total_withdrawn;
    nextWithdrawDate = await stakingContract.methods
      .nextWithdraw(address)
      .call();
    claimable = await stakingContract.methods.computePayout(address).call();

    this.setState({
      linkedWalletBNBBalance: (bnbAmount / Math.pow(10, 18)).toFixed(4) * 1,
      linkedWalletUSDTBalance: (usdtAmount / Math.pow(10, 18)).toFixed(2) * 1,
      linkedWalletDepositAmount: (myDeposit / Math.pow(10, 18)).toFixed(2) * 1,
      linkedWalleTotalEarning: (totalEarning / Math.pow(10, 18)).toFixed(2) * 1,
      linkedWalletNextWithdrawDate: nextWithdrawDate,
      linkedWalletClaimable: (claimable / Math.pow(10, 18)).toFixed(2) * 1,
      allowance : allowance,
      isApproved : isApproved,
      totalLockedValue : (invested / Math.pow(10, 18)).toFixed(2) * 1,
    });
  }

  async approve(depositAmount){
      if (depositAmount > this.state.linkedWalletUSDTBalance) {
        NotificationManager.error("Low USDT Balance!", "Balance", 2000);
        return;
      }

      if (this.state.linkedWalletBNBBalance < 0.001) {
        NotificationManager.error("Low BNB Balance!", "Balance", 2000);
        return;
      }

      if (this.state.sponserAddress == "") {
        NotificationManager.error(
          "Please Add Sponsor's Address",
          "Sponser Address",
          2000
        );
      }

      const linkedUsdtContract = new this.state.metamaskWeb3.eth.Contract(
        usdtABI,
        usdtAddress
      );

      this.setState({
        isINTransaction : true
      })

      await linkedUsdtContract.methods
      .approve(
        stakingAddress,
        ethers.BigNumber.from('0xFFFFFFFFFFFFFFFFFFFF')
      )
      .send({ from: this.state.linkedAccount })
      .once("confirmation", async () => {
        NotificationManager.success("Approved!", "Success", 2000);
        this.deposit(this.state.sponserAddress, this.state.amountDeposit);
        this.setState({
          isINTransaction : true
        })
      });


  }

  async deposit(sponsorWallet, depositAmount) {
    if (this.state.linkedAccount == "") {
      NotificationManager.error("Please connect your wallet", "Wallet", 2000);
      return;
    }

    if (depositAmount > this.state.linkedWalletUSDTBalance) {
      NotificationManager.error("Low USDT Balance!", "Balance", 2000);
      return;
    }

    if (this.state.linkedWalletBNBBalance < 0.001) {
      NotificationManager.error("Low BNB Balance!", "Balance", 2000);
      return;
    }

    if (this.state.sponserAddress == "") {
      NotificationManager.error(
        "Please Add Sponsor's Address",
        "Sponser Address",
        2000
      );
    }

    const linkedStakingContract = new this.state.metamaskWeb3.eth.Contract(
      stakingABI,
      stakingAddress
    );
    
    this.setState({
      isINTransaction : true
    })
    await linkedStakingContract.methods
      .Deposit(
        sponsorWallet,
        ethers.BigNumber.from(depositAmount * Math.pow(10, 9) + "")
      )
      .send({ from: this.state.linkedAccount })
      .once("confirmation", async () => {
        NotificationManager.success("Deposit Transaction has beed conr", "Success", 2000);
        this.checkDashBoard();
        this.setState({
          isINTransaction : false
        })
      });
  }

  async claim() {


    if (this.state.linkedAccount == "") {
      NotificationManager.error("Please connect your wallet", "Wallet", 2000);
      return;
    }

    if (this.state.linkedWalletClaimable < 50) {
      NotificationManager.error("Claimable should be over 50BUSD", "Low Claimable", 2000);
      return;
    }


    const linkedStakingContract = new this.state.metamaskWeb3.eth.Contract(
      stakingABI,
      stakingAddress
    );

    this.setState({
      isINTransaction : true
    })

    await linkedStakingContract.methods
      .Payout()
      .send({ from: this.state.linkedAccount })
      .once("confirmation", async () => {
        NotificationManager.success("Deposit Success", "Success", 2000);
        this.checkDashBoard();
        this.setState({
          isINTransaction : true
        })
      });
  }

  async reDeposit() {
    if (this.state.linkedAccount == "") {
      NotificationManager.error("Please connect your wallet", "Error", 2000);
      return;
    }

    const linkedStakingContract = new this.state.metamaskWeb3.eth.Contract(
      stakingABI,
      stakingAddress
    );
    this.setState({
      isINTransaction : true
    })
    await linkedStakingContract.methods
      .Reinvest()
      .send({ from: this.state.linkedAccount })
      .once("confirmation", async () => {
        NotificationManager.success("Deposit Success", "Success", 2000);
        this.checkDashBoard();
        this.setState({
          isINTransaction : true
        })
      });
  }

  handleAmount = (event) => {
    this.setState({
      amountDeposit: event.target.value,
    });
  };

  handleAddress = (event) => {
    this.setState({
      sponserAddress: event.target.value,
    });
  };

  ownerSponsor(e) {
    let isChecked = e.target.checked;
    this.setState ({
      sponserAddress : ownerWallet
    })
  } 

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
      <Box>
        <Info />
        <br/>


        <Box className="content">
          <Button sx={{width:"100%"}} component="a" target="_blank" href="https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56">
            <Box
                sx={{
                  flex: 1,
                  color: "white",
                  backgroundColor: "#30224e",
                  border: "solid 2px #7b85e0",
                  borderRadius: "15px",
                  p: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
                }}
              >
              <Box component="img" src="./pancakeswapIcon.png" height={50} />
              <Typography variant="h6" sx={{ ml:6 }}>
                Click here to visit Pancakeswap and buy $BUSD!  
              </Typography>
              <Box component="img" src="./BUSD.png" height={65} marginLeft = {5}/>
            </Box>
          </Button><br/><br/><br/>

            <Box
                sx={{
                  color: "white",
                  backgroundColor: "#1B2A41",
                  color: "white",
                  p: 3,
                  textAlign: "center",
                  boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
                  border: "solid 2px #7b85e0",
                  borderRadius: "15px",
                }}
              >
              <Typography variant="h6" sx={{ fontFamily: "DM Sans" }}>
              TOTAL LOCKED VALUE
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, fontFamily: "DM Sans" }}>
                {this.state.totalLockedValue} BUSD
              </Typography>
            </Box>

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
                boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
              }}
            >
              <PermIdentityIcon sx={{ fontSize: "100px" }} />

              <Typography sx={{ mt: 2 }}>
                {this.state.linkedAccount.slice(0, 7)}...
                {this.state.linkedAccount.slice(35, 42)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#26A1F9",
                  display:this.state.linkedAccount == ""? "block":"none",
                  color: "white",
                  p: 1,
                  px: 3,
                  mx: "auto",
                }}
                onClick={() => this.walletConnect()}
              >
                {" "}
                Wallet Connect
              </Button>

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
                  boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
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
                    <AccountBalanceWalletOutlinedIcon
                      sx={{ fontSize: "50px" }}
                    />
                    <Box sx={{ px: 2 }}>
                      <Typography variant="h6">
                        {this.state.linkedWalletBNBBalance} BNB
                      </Typography>
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
                    <AccountBalanceWalletOutlinedIcon
                      sx={{ fontSize: "50px" }}
                    />
                    <Box sx={{ px: 2 }}>
                      <Typography variant="h6">
                        {this.state.linkedWalletUSDTBalance} BUSD
                      </Typography>
                      <Typography sx={{ opacity: "0.5" }}>
                        Wallet BUSD Balance
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
                  boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
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
                      <Typography variant="h6">
                        {this.state.linkedWalletDepositAmount} BUSD
                      </Typography>
                      <Typography sx={{ opacity: "0.5" }}>
                        My Deposit
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
                    <PaymentIcon sx={{ fontSize: "50px" }} />
                    <Box sx={{ px: 2 }}>
                      <Typography variant="h6">
                        {this.state.linkedWalleTotalEarning} BUSD
                      </Typography>
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
                boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 3 }}>
                Deposit
              </Typography>
              <Checkbox  onChange={e => this.ownerSponsor(e)} />I heard about Rugpool from the community.
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
                  value={this.state.amountDeposit}
                  onChange={this.handleAmount}
                  endAdornment={
                    <InputAdornment position="end">BUSD</InputAdornment>
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
                  value={this.state.sponserAddress}
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
                  onClick={this.state.isApproved?  () =>
                    this.deposit(
                      this.state.sponserAddress,
                      this.state.amountDeposit
                    ): ()=>this.approve()
                  }
                >
                  {this.state.isApproved?"Deposit":"Approve"}
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
                boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 4.5 }}>
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
                {this.state.linkedWalletNextWithdrawDate}
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
                <Typography variant="h6">
                  {this.state.linkedWalletClaimable} BUSD
                </Typography>
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
                  onClick={() => this.claim()}
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
                  onClick={() => this.reDeposit()}
                >
                  Re-Deposit 
                </Button>
              </Box>
            </Box>
          </Stack>

          <br/><br/>
          <Button sx={{width:"100%"}} component="a" target="_blank" href={"https://bscscan.com/address/" + stakingAddress} >
            <Box
                sx={{
                  flex: 1,
                  color: "white",
                  backgroundColor: "#30224e",
                  border: "solid 2px #7b85e0",
                  borderRadius: "15px",
                  p: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
                }}
              >
              <Box component="img" src="./bscscam.png" height={50} />
              <Typography variant="h6" sx={{ ml:6 }}>
                Verified Contrct
              </Typography>
            </Box>
          </Button>
          <Box sx={{ textAlign: "left" }}>
            <NotificationContainer />
          </Box>
        </Box>
      </Box>
    );
  }
}
export default Deposit;
