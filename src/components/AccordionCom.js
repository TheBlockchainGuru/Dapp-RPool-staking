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
        <Box
          sx={{
            borderRadius: "15px",
            boxShadow: "10px 10px 20px -4px rgb(255 255 255 / 20%)",
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <Typography variant="h6">What is Prosperity RugPool??</Typography>
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
              <Typography variant="h6">
                How do i deposit on the smart contract?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You need to fund either a Metamask wallet or a Trust wallet with
                a minimum of 100 BUSD bep20. Along with at least 0.005 BNB for
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
              <Typography variant="h6">Do you make any guarantees?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No, under no circumstance do we make any guarantees. Our smart
                contracts reward you with up to 0.5% daily on your full deposit.
                This means there may be weeks where you are rewarded with .5 a
                day or even less. This can change from week to week based upon
                what is produced through LP staking and bot trading.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <Typography variant="h6">
                Is there a minimum withdrawal amount? also, When i can withdraw?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, the minimum withdrawal amount is 50 BUSD. You may only
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
              <Typography variant="h6">
                Can I request a full deposit refund? Also, What is the refund
                process?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes you can request a full deposit refund. The process is
                simple. please visit Discord community and contact us!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <Typography variant="h6">Can my wallet get banned?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, your wallet can be banned from our smart contract if we
                find out any fraudulent activity is being done such as creating
                multiple wallets for your benefit, false advertising such as
                guaranteeing results, etc. If your wallet is banned you will no
                longer be able to deposit or withdraw from our smart contract at
                which point you will be provided with a full deposit refund
                within 3-5 days.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    );
  }
}
export default AccordionCom;
