"use client";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { FormEvent } from "react";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import FormControl from "@mui/material/FormControl";
import redis from "../lib/db";
import { Round } from "../model/round";
import LobbyService from "../services/LobbyService";
import BetInput from "../components/ui/BetInput";
import { parse } from "path";
import { Container } from "@mui/material";
export default function CreateLobbyPage() {
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const router = useRouter();

  async function amountSelect(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.elements.namedItem("amountInput") as HTMLInputElement;
    if (!input.value || input.value.length == 0) return;
    setBetAmount(parseInt(input.value));
    console.log("Bet amount: ", input.value);
  }
  const submitCreateLobby = async () => {
    setButtonLoading(true);
    if (!betAmount) {
      console.log("Invalid bet amount");
      return;
    }
    const lobby = await LobbyService.setupLobby(betAmount, "mishka.eth");
    await LobbyService.storeLobby(lobby);
    console.log("lobby created: ", lobby);
    if (lobby) {
      router.push(`/lobby/${lobby?.id}`);
      console.log("lobby created at: /lobby/" + lobby?.id);
    } else {
      setButtonLoading(false);
    }
  };
  const submitBet = (e: React.FormEvent, bet: string) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-4 sm:m-20 input-group">
      <Typography component="h2" variant="h3">
        Create a new lobby
      </Typography>
      <Container>
        <BetInput submitBet={submitBet} />
      </Container>
      <div>
        <Typography component="h2" variant="h3">
          Privacy settings
        </Typography>
        <FormControlLabel required control={<Checkbox />} label="Unlisted" />
        <FormControlLabel required control={<Checkbox />} label="Public" />
      </div>
      <div>
        <Button
          className="newRound"
          variant="contained"
          onClick={submitCreateLobby}
        >
          New lobby
        </Button>
      </div>
    </div>
  );
}
