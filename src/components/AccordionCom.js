import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

const Accordion = styled((props) => <MuiAccordion {...props} />)(
  ({ theme }) => ({
    "&.Mui-expanded": { margin: 0 },
    backgroundColor: "#1B2A41",
    color: "white",
    border: "solid 2px #7b85e0",
    "&:last-child": {
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    "&:not(:last-child)": {
      borderBottom: "solid 1px #7b85e0",
    },
    "&:not(:first-of-type)": {
      borderTop: "none",
    },
    "&:first-of-type": {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    // borderRadius:"15px"
  })
);

class AccordionCom extends React.Component {
  render() {
    return (
      <Box
        className="content"
        sx={{ borderRadius: "15px", textAlign: "left", color: "white" }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", my: 3, fontWeight: 700 }}
        >
          FREQUENTLY ASK QUESTION
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography>What is Prosperity RugPool??</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Prosperity RugPool is a defi project that operates directly
              through a smart contract. By depositing into our smart contract
              you understand that we will use 75% of the funds from our smart
              contract pool to funnel into LP staking and bot trading.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography>How do i deposit on the smart contract?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You need to fund either a Metamask wallet or a Trust wallet with a
              minimum of 100 usdt bep20. Along with at least 0.005 BNB for
              network fees. Once you have done so you can then do your deposit
              directly from our website or via our smart contract. Please
              understand that there is also a 1% dev fee on all deposits and
              withdrawals. This is how the project creator earns from the
              project.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography>Do you make any guarantees?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No, under no circumstance do we make any guarantees. Our smart
              contracts reward you with up to 2% daily on your full deposit.
              This means there may be weeks where you are rewarded with .5 a day
              or even less. This can change from week to week based upon what is
              produced through LP staking and bot trading.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography>
              Is there a minimum withdrawal amount? also, When i can withdraw?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, the minimum withdrawal amount is 50 USDT. You may only
              withdraw once per week (every 7 days). Once you have done your
              first withdrawal, a timer will appear on your dashboard counting
              down from 7 days so you know exactly when you can do your next
              withdrawal.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography>
              Can I request a full deposit refund? Also, What is the refund
              process?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes you can request a full deposit refund. The process is simple.
              First, you need to fill out the “contact us form” below providing
              us with three things. The name of the contract you deposited on
              (for example, bsc contract, tron contract, or polygon contract),
              the wallet address used to make deposits onto our smart contract,
              and a screen shot showing the inside of your wallet showing proof
              the wallet belongs to you. Once you have submitted the “contact us
              form” with all those details it will then take 3-5 days for us to
              process your refund at which point it will be sent directly to
              your wallet. Please understand that you may only request a full
              deposit refund after 15 days of your initial deposit. Also, please
              understand once you have received a full deposit refund your
              wallet will be banned from our contract. This means you can no
              longer use that wallet address to make any deposits If you decide
              to come back later. You would need to use a whole new wallet
              address to make a new deposit.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography>Can my wallet get banned?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, your wallet can be banned from our smart contract if we find
              out any fraudulent activity is being done such as creating
              multiple wallets for your benefit, false advertising such as
              guaranteeing results, etc. If your wallet is banned you will no
              longer be able to deposit or withdraw from our smart contract at
              which point you will be provided with a full deposit refund within
              3-5 days.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
}
export default AccordionCom;
