import React from "react";
import { Button, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Stack } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import Web3 from 'web3';
import { ethers } from 'ethers';
import { usdtAddress, usdtABI , stakingAddress , RPC, stakingABI} from './config';



const web3                 = new Web3(new Web3.providers.HttpProvider(RPC));
const usdtContract         = new web3.eth.Contract(usdtABI, usdtAddress);
const stakingContract      = new web3.eth.Contract(stakingABI, stakingAddress);



class Deposit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDeposit: 0,
      sponserAddress: "",
      withdrawDate : '',
      claimable    : 0,
      linkedAccount : '',

      linkedWalletBNBBalance : 0,
      linkedWalletUSDTBalance : 0,
      linkedWalletDepositAmount : 0,
      linkedWalleTotalEarning : 0,
      linkedWalletNextWithdrawDate : 0,
      linkedWalletClaimable :0,

      metamaskWeb3 : []
    };
    this.handleAmount = this.handleAmount.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  async walletConnect(){
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(5) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId:  web3.utils.toHex(56),
                chainName: 'Goerli test network',
                rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                nativeCurrency: {
                  name: "GoerliETH",
                  symbol: "GoerliETH", // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls : "https://goerli.etherscan.io",
              },
            ],
          });

          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(5) }],
          });

        } catch (addError) {
        }
      }
    }
  
        if(window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          const clientWeb3    = window.web3;

          const accounts = await clientWeb3.eth.getAccounts();
          this.setState({
              linkedAccount : accounts[0],
              metamaskWeb3 : clientWeb3
          }) 
        } 
        else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            const clientWeb3    = window.web3;
            const accounts = await clientWeb3.eth.getAccounts();
            this.setState({
                linkedAccount : accounts[0],
                metamaskWeb3 : clientWeb3
            }) 
        } 
        if(this.state.linkedAccount === ''){
            return
        }


        const { ethereum } = window;
        ethereum.on('accountsChanged',  async(accounts) => {
          try{
            accounts =   web3.utils.toChecksumAddress(accounts + '')
          }catch(err){
          }
          
          this.setState({
            linkedAccount : accounts
          })
          this.checkDashBoard(this.state.linkedAccount)
        });

        ethereum.on('chainChanged', async(chainId) => {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(5) }],
          });
        });
        this.checkDashBoard(this.state.linkedAccount) 
  }

  async checkDashBoard (address)  {
      let bnbAmount, usdtAmount, myDeposit, totalEarning, nextWithdrawDate, claimable
      bnbAmount = await web3.eth.getBalance(address)
      usdtAmount = await usdtContract.methods.balanceOf(address).call()
      let data =await stakingContract.methods.players(address).call()
      myDeposit = data.total_invested
      totalEarning = data.total_withdrawn


      nextWithdrawDate = await stakingContract.methods.nextWithdraw(address).call()
      claimable = await stakingContract.methods.computePayout(address).call()


      this.setState({
          linkedWalletBNBBalance : ((bnbAmount / Math.pow(10,18)).toFixed(4)) * 1 ,
          linkedWalletUSDTBalance : ((usdtAmount/ Math.pow(10,18)).toFixed(2)) * 1,
          linkedWalletDepositAmount : ((myDeposit / Math.pow(10,18)).toFixed(2)) * 1,
          linkedWalleTotalEarning : (totalEarning / Math.pow(10,18)).toFixed(2) * 1,
          linkedWalletNextWithdrawDate : nextWithdrawDate,
          linkedWalletClaimable : (claimable / Math.pow(10, 18)).toFixed(2) * 1
      })



      
  }   

  async deposit (sponsorWallet, depositAmount) {
    console.log(sponsorWallet, depositAmount, "22222", this.state.linkedWalletUSDTBalance)

      if (this.state.linkedAccount  == "") {
        alert ("please connect your wallet")
        return
      }

      if (depositAmount > this.state.linkedWalletUSDTBalance ) {
        alert ("low usdt balance!")
        return
      }

      if (this.state.linkedWalletBNBBalance < 0.001) {
        alert ("low bnb balance")
        return
      }


      const linkedUsdtContract = new this.state.metamaskWeb3.eth.Contract(usdtABI, usdtAddress)
      const linkedStakingContract = new this.state.metamaskWeb3.eth.Contract (stakingABI, stakingAddress)
      await linkedStakingContract.methods.Deposit(sponsorWallet, ethers.BigNumber.from(depositAmount * Math.pow(10, 18) + '') ).send ({from:this.state.linkedAccount,})
  }

  async claim () {
    if (this.state.linkedAccount  == "") {
      alert ("please connect your wallet")
      return
    }
    const linkedStakingContract = new this.state.metamaskWeb3.eth.Contract (stakingABI, stakingAddress)
    await linkedStakingContract.methods.Payout().send ({from:this.state.linkedAccount,})
  }


  async reDeposit () {
    
    if (this.state.linkedAccount  == "") {
      alert ("please connect your wallet")
      return
    }

    const linkedStakingContract = new this.state.metamaskWeb3.eth.Contract (stakingABI, stakingAddress)
    await linkedStakingContract.methods.Reinvest().send ({from:this.state.linkedAccount,})
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
              {this.state.linkedAccount.slice(0,7)}...{this.state.linkedAccount.slice(35,42)}
            </Typography>
            <Button
                variant="contained"
                sx={{
                  backgroundColor: "#26A1F9",
                  color: "white",
                  p: 1,
                  px: 3,
                  mx: "auto",
                }}
                onClick = { () => this.walletConnect()}
            > Wallet Connect</Button>
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
                    <Typography variant="h6">{this.state.linkedWalletBNBBalance} BNB</Typography>
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
                    <Typography variant="h6">{this.state.linkedWalletUSDTBalance} BUSD</Typography>
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
                    <Typography variant="h6">{this.state.linkedWalletDepositAmount} BUSD</Typography>
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
                    <Typography variant="h6">{this.state.linkedWalleTotalEarning} BUSD</Typography>
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
                onClick = { () => this.deposit(this.state.sponserAddress, this.state.amountDeposit)}
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
              <Typography variant="h6">{this.state.linkedWalletClaimable} BUSD</Typography>
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
                onClick = { () => this.claim()}
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
                onClick = { () => this.reDeposit()}
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
