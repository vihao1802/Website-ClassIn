// CountdownComponent.jsx
import React, { useMemo } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { AccessAlarmsRounded } from "@mui/icons-material";
const CountdownComponent = ({ timeInMinute, onComplete }) => {
  return useMemo(() => {
    return (
      <Countdown
        date={Date.now() + timeInMinute * 1000 * 60}
        renderer={({ hours, minutes, seconds }) => {
          // Render a countdown
          return (
            <FlexBetween width="170px">
              <AccessAlarmsRounded sx={{ color: "#009265" }} />
              <Typography
                variant="h4"
                fontWeight="bold"
                color={
                  minutes < 1
                    ? "red"
                    : minutes < timeInMinute / 2
                    ? "#ffcc00"
                    : "#009265"
                }
              >
                {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
              </Typography>
            </FlexBetween>
          );
        }}
        zeroPadTime={2}
        onComplete={onComplete}
      />
    );
  }, []);
};

export default CountdownComponent;
