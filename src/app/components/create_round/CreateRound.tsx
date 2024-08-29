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
import redis from "../../lib/db";
import { Round } from "../../model/round";
import RoundService from "../../services/RoundService";
export default function CreateRoundPage() {
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
  async function submitCreateRound(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setButtonLoading(true);
    const target = e.target as HTMLFormElement;
    //TODO: un-dummy this once target.elements works
    // const betInput  = (target.elements.namedItem("amountInput") as HTMLInputElement).value;
    const betInput = parseInt("0.01");
    console.log("Bet amount: ", betInput);
    const round = await RoundService.setupRound(
      betInput,
      "0x0123456789" as `0x${string}`,
    );
    console.log("Round created: ", round);
    if (round) {
      router.push(`/lobby/${round.id}`);
      console.log("lobby created at: /lobby/" + round.id);
    } else {
      setButtonLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen input-group">
      <Typography component="h2" variant="h7">
        Create a new round
      </Typography>
      <FormControl component="fieldset" fullWidth>
        <label className="label" htmlFor="amountInput">
          <TextField
            id="amountInput"
            label="Bet amount"
            variant="outlined"
            color="success"
            focused
          />
        </label>

        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
        <div>
          <Typography component="h2" variant="h7">
            Privacy settings
          </Typography>
          <FormControlLabel required control={<Checkbox />} label="Unlisted" />
          <FormControlLabel required control={<Checkbox />} label="Public" />
        </div>
        <div>
          <Button type="submit" variant="outlined" onClick={submitCreateRound}>
            New round
          </Button>
        </div>
      </FormControl>
    </div>
  );
}
