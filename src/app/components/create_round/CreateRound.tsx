"use client";
import TextField from "@mui/material/TextField";
import type { FormEvent } from "react";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import redis from "../../lib/db";
import { Round } from "../../model/round";
export default function CreateRoundPage() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  async function amountSelect(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.elements.namedItem("amountInput") as HTMLInputElement;
    if (!input.value || input.value.length == 0) return;
    setBetAmount(parseInt(input.value));
    console.log("Bet amount: ", input.value);
  }
  function accountSelect(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.elements.namedItem("accountInput") as HTMLInputElement;
    if (!input.value || input.value.length == 0) return;
    setSelectedAccount(input.value);
    console.log("Selected account: ", input.value);
  }
  async function submitCreateRound(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

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
