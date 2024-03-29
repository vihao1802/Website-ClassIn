// CountdownComponent.jsx
import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { AccessAlarmsRounded } from "@mui/icons-material";
import theme from "../theme";
const CountdownComponent = ({ timeInMinute }) => {
  return (
    <Countdown
      date={Date.now() + timeInMinute * 1000 * 60}
      renderer={({ hours, minutes, seconds }) => {
        // Render a countdown
        return (
          <FlexBetween width="170px">
            <AccessAlarmsRounded sx={{ color: theme.main_theme }} />
            <Typography variant="h4" color={theme.main_theme} fontWeight="bold">
              {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
            </Typography>
          </FlexBetween>
        );
      }}
      zeroPadTime={2}
    />
  );
};

export default CountdownComponent;
