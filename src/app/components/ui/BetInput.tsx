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
    <form onSubmit={handleBet} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter bet amount"
        value={bet}
        onChange={(e) => setBet(e.target.value)}
        className="border-2 border-black p-2 rounded-lg"
      />
      <ButtonPrimary label="Submit" onClick={handleBet} disabled={submitted} />
    </form>
  );
};

export default BetInput;
