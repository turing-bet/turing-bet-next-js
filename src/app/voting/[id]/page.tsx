"use client";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import { use, useEffect, useState } from "react";
import { Lobby, LobbyStatus } from "../../model/lobby";
import { Submission } from "../../model/submission";
import { BotSubmission } from "../../model/botSubmission";
import LobbyService from "@/app/services/LobbyService";

export default function VotingPage({ params }: { params: { id: string } }) {
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [botSubmission, setBotSubmission] = useState<BotSubmission | null>(
    null,
  );
  const [playerVote, setPlayerVote] = useState<number | null>(null);
  const [betPool, setBetPool] = useState<number | null>(null);

  const getLobby = async () => {
    console.log("fetching lobby with id: " + params.id);
    const lobby = LobbyService.getLobby(params.id);
    if (lobby) {
      console.log("lobby fetched: " + lobby);
    }
  };
  const getSubmissions = async () => {
    console.log("fetching submissions");

    const getRemainingTime = async () => {
      console.log("fetching remaining time");
      const remainingTime = await LobbyService.getRemainingRoundTime(params.id);
      if (remainingTime) {
        console.log("remaining time fetched: " + remainingTime);
        setRemainingTime(remainingTime);
      }
    };
    const getBetPool = async () => {
      console.log("fetching bet pool");
      const betPool = await LobbyService.getTotalBetPool(params.id);
      if (betPool) {
        console.log("bet pool fetched: " + betPool);
        setBetPool(betPool);
      }
    };

    return (
      <div className="flex flex-col h-screen ">
        <Typography component="h2" variant="h5">
          Lobby ID: {lobby?.id}
        </Typography>
        <div>
          <Typography component="h2" variant="h5">
            Current players in lobby: {lobby?.voterAddresses}
          </Typography>
        </div>
        <div>
          <Typography component="h2" variant="h5">
            Current bet pool: {betPool}
          </Typography>
        </div>
        <div>
          <Typography component="h2" variant="h5">
            Remaining time: {remainingTime}
          </Typography>
        </div>
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
  };
}
