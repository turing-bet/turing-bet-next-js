import React, { useState, useEffect } from "react";
import ButtonPrimary from "./ButtonPrimary";

type Props = {
  submitBet: (e: React.FormEvent, bet: string) => void;
};

const BetInput = ({ submitBet }: Props) => {
  const [bet, setBet] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleBet = (e: React.FormEvent) => {
    e.preventDefault();
    submitBet(e, bet);
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleBet}
      className="flex items-center justify-between border-2 border-black bg-white pr-4 rounded-2xl"
    >
      <input
        type="text"
        placeholder="Enter bet amount"
        value={bet}
        onChange={(e) => setBet(e.target.value)}
        className="w-full p-5 px-6 rounded-2xl text-black text-xl"
      />
      <div className="text-white">
        <ButtonPrimary
          label="Submit"
          onClick={handleBet}
          disabled={submitted}
        />
      </div>
    </form>
  );
};

export default BetInput;
