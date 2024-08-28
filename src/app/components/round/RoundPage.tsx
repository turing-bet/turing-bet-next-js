"use client";
import TextField from "@mui/material/TextField";
import type { FormEvent } from "react";
import { useState } from "react";
import redis from "../../lib/db";
import { Round } from "../../model/round";

export default function RoundPage(roundLobby: Round) {
  const [roundId, setRoundId] = useState<string | null>(null);
  //  const [lobby, updateLobby] =
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Round id: {roundId}</h1>
      <p> Players : </p>
      <div className="relative h-min"></div>
    </div>
  );
}
