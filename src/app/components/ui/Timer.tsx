import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useTimer } from "react-timer-hook";

function Timer({ expiryTimestamp }) {
  const { totalSeconds, seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Typography component="h2" variant="h5" gutterBottom>
        Timer
      </Typography>
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}

export default Timer;
