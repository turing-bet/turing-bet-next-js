import { useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import { Typography } from "@mui/material";
type Props = {
  voteChoices: string[];
  selectEnabled: boolean;
  selectionHandler: (index: number) => void;
};

const VoteInput: React.FC<Props> = ({
  voteChoices,
  selectEnabled,
  selectionHandler,
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleSubmit = (index: number) => {
    setDisabled(true);
    selectionHandler(index);
    setDisabled(false);
  };

  return (
    <>
      <Typography component="h2" variant="h5">
        Select your vote!
      </Typography>
      {voteChoices.map((choice, index) => (
        <ButtonPrimary
          label={choice}
          onClick={() => handleSubmit(index)}
          disabled={disabled || !selectEnabled}
        ></ButtonPrimary>
      ))}
    </>
  );
};
export default VoteInput;
