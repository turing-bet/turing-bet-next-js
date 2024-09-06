import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

type Props = {
  question: string;
};

const Question: React.FC = (props) => {
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    setQuestion(question);
    setLoading(true);
  };
  return (
    <div>
      <Typography component="h2" variant="h4">
        Question: {question}
      </Typography>
    </div>
  );
};
