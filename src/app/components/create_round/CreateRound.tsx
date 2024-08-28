"use client";
import TextField from "@mui/material/TextField";
import type { FormEvent } from "react";
import { useState } from "react";
import redis from "../../lib/db";
import { Round } from "../../model/round";
export default function CreateRoundPage({ roundLobby }: { roundLobby: Round }) {
  const [roundId, setRoundId] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative h-min">
        <div className="bg-base-300 flex flex-col items-center justify-center rounded-lg p-4">
          <form className="input-group mt-auto" onSubmit={accountSelect}>
            {" "}
            <input
              type="text"
              placeholder="Social media account"
              className="input input-bordered flex-grow"
              name="accountInput"
              id="accountInput"
              required
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="bg-base-300 flex flex-col items-center justify-center rounded-lg p-4">
          <form className="input-group mt-auto" onSubmit={amountSelect}>
            {" "}
            <input
              type="text"
              placeholder="Amount to bet"
              className="input input-bordered flex-grow"
              name="amountInput"
              id="amountInput"
              required
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>

          <div className="flex flex-col items-center justify-center rounded-lg p-4">
            <button className="btn btn-primary" type="submit">
              New round
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function createRound(e: FormEvent<HTMLFormElement>) {}

async function amountSelect(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const input = target.elements.namedItem("amountInput") as HTMLInputElement;
  if (!input.value || input.value.length == 0) return;
  // await redis.hset(`round:${roundId}`, {betAmount: input.value});
}

function accountSelect(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const input = target.elements.namedItem("accountInput") as HTMLInputElement;
  if (!input.value || input.value.length == 0) return;
  // setSelectedAccount(input.value);
}
