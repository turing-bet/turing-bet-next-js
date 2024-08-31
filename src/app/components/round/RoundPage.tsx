"use client";
import TextField from "@mui/material/TextField";
import type { FormEvent } from "react";
import { useState } from "react";
import redis from "../../lib/db";
import { Round } from "../../model/round";
import { Lobby } from "../../model/lobby";
import FormLabel from "@mui/material/FormLabel";
import { Button, Checkbox, Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { purple, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function RoundPage(lobby: Lobby) {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  return (
    <div className="flex flex-col  h-screen">
      <Typography component="h2" variant="h5">
        Round ID: {lobby.id} 01234567-abcd
      </Typography>
      <Typography component="h2" variant="h5">
        Players: {lobby.voterAddresses} mishka.eth, hemlock.eth
      </Typography>
      <Typography component="h2" variant="h5">
        Betting pool: {lobby.totalBettingPool} 0.01 ETH
      </Typography>

      <Container>
        <div>
          <Typography component="h2" variant="h4">
            Question: Why did the scarecrow get a promotion?
          </Typography>
        </div>
      </Container>
      <div></div>
      <Container>
        <FormControl>
          <FormLabel htmlFor="answerInput">Your answer</FormLabel>
          <TextField
            id="answerInput"
            label="Answer"
            variant="outlined"
            autoFocus
            required
            multiline
            maxRows={4}
            color="primary"
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </FormControl>
      </Container>
    </div>
  );
}

export function VotingRoundPage(lobby: Lobby) {
  const [userVote, setUserVote] = useState<string | null>(null);

  return (
    <div className="flex flex-col  h-screen">
      <Typography component="h2" variant="h5">
        Round ID: {lobby.id} 01234567-abcd
      </Typography>
      <Typography component="h2" variant="h5">
        Players: {lobby.voterAddresses} mishka.eth, hemlock.eth
      </Typography>
      <Typography component="h2" variant="h5">
        Betting pool: {lobby.totalBettingPool} 0.01 ETH
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
