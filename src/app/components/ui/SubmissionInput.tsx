import React, { useState, useEffect } from "react";
import ButtonPrimary from "./ButtonPrimary";

type Props = {
  submitAnswer: (e: React.FormEvent, answer: string) => void;
};

const SubmissionInput = ({ submitAnswer }: Props) => {
  const [answer, setAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAnswer(e, answer);
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border-2 border-black p-2 rounded-lg"
      />
      <ButtonPrimary
        label="Submit"
        onClick={handleSubmit}
        disabled={submitted}
      />
    </form>
  );
};

export default SubmissionInput;
