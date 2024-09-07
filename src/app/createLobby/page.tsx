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
import { Round } from "../model/round";
import LobbyService from "../services/LobbyService";
import BetInput from "../components/ui/BetInput";
import { parse } from "path";
import { Container } from "@mui/material";
import ButtonPrimary from "../components/ui/ButtonPrimary";

export default function CreateLobbyPage() {
  const [privacy, setPrivacy] = useState<string>("");
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
    <div className="flex flex-col items-center justify-center h-screen input-group">
      <div className="bg-white rounded-3xl p-8 text-black flex flex-col gap-6">
        <span className="text-3xl font-bold">Create a New Lobby</span>
        <BetInput submitBet={submitBet} />
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Privacy Setting</span>
          <div className="grid grid-cols-2">
            <FormControlLabel
              onClick={() => setPrivacy("unlisted")}
              control={<Checkbox checked={privacy === "unlisted"} />}
              label="Unlisted"
            />
            <FormControlLabel
              onClick={() => setPrivacy("public")}
              control={<Checkbox checked={privacy === "public"} />}
              label="Public"
            />
          </div>
        </div>
        <div className="text-white">
          <ButtonPrimary
            onClick={submitCreateLobby}
            label={"New Lobby"}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}
