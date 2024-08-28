"use client";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import type { FormEvent } from "react";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import redis from "../../lib/db";
import { Round } from "../../model/round";
import RoundService from "../../services/RoundService";
export default function CreateRoundPage() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
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
    if (!betAmount) return;
    setButtonLoading(true);
    const target = e.target as HTMLFormElement;
    // const betInput = target.elements.namedItem("amountInput") as HTMLInputElement;
    const round = await RoundService.setupRound(
      betAmount,
      "0x0123456789" as `0x${string}`,
    );
    if (round) {
      router.push(`/lobby/${round.id}`);
      console.log("lobby created at: /lobby/" + round.id);
    } else {
      setButtonLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen input-group">
      <form className="form-control" onSubmit={submitCreateRound}>
        <label className="label" htmlFor="amountInput">
          <TextField
            id="amountInput"
            label="Bet amount"
            variant="outlined"
            color="success"
            focused
          />
        </label>
        <Button className="btn btn-primary" type="submit">
          Submit
        </Button>
      </form>

      <div className="flex flex-col items-center justify-center rounded-lg p-4">
        <LoadingButton variant="outlined" type="submit">
          New round
        </LoadingButton>
      </div>
    </div>
  );
}
