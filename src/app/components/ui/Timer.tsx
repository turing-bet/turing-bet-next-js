import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useTimer } from "use-timer";

const Timer = () => {
  const { time, start, reset, status } = useTimer({
    initialTime: 30,
    timerType: "DECREMENTAL",
    onTimeOver: () => console.log("Time over"),
    autostart: true,
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Typography component="h2" variant="h5">
        Time left: {time}
      </Typography>
    </div>
  );
};

export default Timer;
