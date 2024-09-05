"use client";
import TextField from "@mui/material/TextField";
import type { FormEvent } from "react";
import { useState } from "react";
import redis from "../../lib/db";
import { Lobby } from "../../model/lobby";
import { Submission } from "../../model/submission";
import { BotSubmission } from "../../model/botSubmission";
import { UserSubmission } from "../../model/userSubmission";
import SubmissionService from "../../services/SubmissionService";
import BotSubmissionService from "../../services/BotSubmissionService";
import LobbyService from "@/app/services/LobbyService";
import FormLabel from "@mui/material/FormLabel";
import { Button, Checkbox, Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { purple, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ButtonPrimary from "../ui/ButtonPrimary";
import { getQuestion } from "../../lib/jokes";
import SubmissionInput from "../ui/SubmissionInput";
export default function SubmissionPage(lobby: Lobby) {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentBetPool, setCurrentBetPool] = useState<number>(0);
  const [playerAddresses, setPlayerAddresses] = useState<string[]>([]);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [submissionNumber, setSubmissionNumber] = useState<number>(0);
  // const getQuestion = async () => {
  //   const question: string = await getQuestion();
  //   setQuestion(question);
  //   console.log(question);
  // };
  const submit = async () => {
    setLoading(true);
    if (!userAnswer) {
      return;
    }
    if (!lobby.id) {
      return;
    }

    await SubmissionService.createUserSubmission(
      lobby?.id,
      userAnswer,
      currentAddress,
    );
    setLoading(false);
    setSubmitted(true);
  };
  const submitAnswer = (e: React.FormEvent, answer: string) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col  h-screen">
      <Typography component="h2" variant="h5">
        Round ID: {lobby?.id}
      </Typography>
      <Typography component="h2" variant="h5">
        Players: {playerAddresses}
      </Typography>
      <Typography component="h2" variant="h5">
        Betting pool: {currentBetPool} ETH
      </Typography>

      <Container>
        <div>
          <Typography component="h2" variant="h4">
            Question: {question}
          </Typography>
        </div>
      </Container>
      <div></div>
      <Container>
        <SubmissionInput submitAnswer={submitAnswer}></SubmissionInput>
      </Container>
      <Button onClick={submit} variant="outlined">
        Submit
      </Button>
    </div>
  );
}

export function VotingRoundPage(lobby: Lobby) {
  const [userVote, setUserVote] = useState<string | null>(null);
  const [currentBetPool, setCurrentBetPool] = useState<number>(0);
  const [playerAddresses, setPlayerAddresses] = useState<string[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [BotSubmission, setBotSubmission] = useState<BotSubmission | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const shuffle = (submissions: Submission[]) => {
    SubmissionService.shuffleSubmissionsNumbers(submissions);
    setSubmissions(submissions);
  };

  return (
    <div className="flex flex-col  h-screen">
      <Typography component="h2" variant="h5">
        Round ID: {lobby?.id}
      </Typography>
      <Typography component="h2" variant="h5">
        Players: {lobby?.voterAddresses}
      </Typography>
      <Typography component="h2" variant="h5">
        Betting pool: {currentBetPool} ETH
      </Typography>

      <Container>
        <div>
          <Typography component="h2" variant="h4">
            Question: Why did the scarecrow get a promotion?
          </Typography>
        </div>
      </Container>
      <Container></Container>
      <div></div>
      <Container>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2} direction="row">
            <Typography gutterBottom variant="h5" component="div">
              A)
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: grey[400] }}>
            Because he was outstanding in his field!
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2} direction="row">
            <Typography gutterBottom variant="h5" component="div">
              B)
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: grey[400] }}>
            Because he slept with the boss!
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2} direction="row">
            <Typography gutterBottom variant="h5" component="div">
              C)
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: grey[400] }}>
            Beep boop this is definetly a human answering 0100101!
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2} direction="row">
            <Typography gutterBottom variant="h5" component="div">
              D)
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: grey[400] }}>
            Because he worked overtime for sub-living standard wages
            #AMericanDream!
          </Typography>
        </Box>
      </Container>
      <Typography component="h2" variant="h5">
        Who is the bot?
      </Typography>
      <Container>
        <FormControl>
          <FormControlLabel
            control={<Checkbox sx={{ color: purple[800] }} />}
            label="A"
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={<Checkbox sx={{ color: purple[800] }} />}
            label="B"
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={<Checkbox sx={{ color: purple[800] }} />}
            label="C"
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={<Checkbox sx={{ color: purple[800] }} />}
            label="D"
          />
        </FormControl>
      </Container>
    </div>
  );
}
