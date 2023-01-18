import React from "react";
import { Box,Typography } from "@mui/material";
import Countdown from "react-countdown";

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.renderer = this.renderer.bind(this);
    }

    renderer = ({ days, hours, minutes, seconds, completed }) => {
        console.log(days, hours, minutes, seconds, completed)
        if (completed) return <>00:00:00:00</>;
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
        {this.props.time ?
        <Countdown date={this.props.time} render={this.renderer} />
        : <>00:00:00:00</>
  }
      </Box>
    );
  }
}
export default Timer;
