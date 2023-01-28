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
    backgroundColor: "#0e8aa8",
    color: "white",
    border: "solid 2px #ffffff",
    "&:last-child": {
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    "&:not(:last-child)": {
      borderBottom: "solid 1px #ffffff",
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
        sx={{ borderRadius: "15px", textAlign: "left", color: "#e2e6fc" }}
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
              expandIcon={<ExpandMoreIcon sx={{ color: "#e2e6fc" }} />}
            >
              <Typography variant="h6">What is  RugPool?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              RugPool is a defi project that operates directly through a smart contract. By depositing into our smart contract you understand that we will use 75% of the funds from our smart contract pool to funnel into bot trading, and creating long term reserves.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#e2e6fc" }} />}
            >
              <Typography variant="h6">
                How to deposit on the smart contract?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              You need to fund either a Metamask wallet or a Trust wallet with a minimum of 500 BUSD bep20. Along with at least 0.005 BNB for network fees. Once you have done so you can then do your deposit directly from our website or via our smart contract. Please understand that there is also a 1% dev fee on all deposits and withdrawals. This is how the project creator earns from the project.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#e2e6fc" }} />}
            >
              <Typography variant="h6">Do you make any guarantees?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Rug Pool does not provide any guarantees about the potential returns or profits that investors may earn through their platform. The monthly yield of up to 9% on the full deposit may fluctuate and is not guaranteed.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#e2e6fc" }} />}
            >
              <Typography variant="h6">
                Minumum withdrawal amount? and When can you Withdraw?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>

              On Rug Pool, the minimum amount that can be withdrawn is 100 BUSD. Withdrawals are allowed once per week, and a timer on the dashboard will show the remaining time until the next withdrawal can be made after the first withdrawal is completed.
               
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#e2e6fc" }} />}
            >
              <Typography variant="h6">
                Can I request a full deposit refund? Also, What is the refund
                process?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Yes you can request a full deposit refund. Please note that you can only request a full deposit refund after 15 days from your initial deposit. Refunds will take 3-5 days to process. Please visit Discord community and get a support Ticket!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#e2e6fc" }} />}
            >
              <Typography variant="h6">Can my wallet get banned?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Yes, your wallet can be banned from our smart contract if we find out any fraudulent activity is being done such as creating multiple wallets for your benefit, false advertising such as guaranteeing results, etc. If your wallet is banned you will no longer be able to deposit or withdraw from our smart contract at which point you will be provided with a full deposit refund within 3-5 days.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    );
  }
}
export default AccordionCom;
