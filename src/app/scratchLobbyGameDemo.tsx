"use client";
// Scratch / poc for lobby to game
// TODO:
// [] Redis gamestate stuff
// [] routing from lobby to submission phase then voting phase , results, then back again
// [] backend game logic
// [] AI gen thingy
// web3 stuff
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lobby, lobbyReducer } from "./model/lobby";
import RoundService from "./services/RoundService";
import LobbyService from "./services/LobbyService";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function ScratchLobbyGameDemoPage() {
  //Routing TODO:
  //  /lobby -> /submission -> /voting -> /results -> /lobby
  const router = useRouter();
  const [addresses, setAddresses] = useState<string[]>([]);
  const [dummyLobby, setLobby] = useState<Lobby | null>(null);
  //DUMMY LOBBY
  useEffect(() => {
    const initLobby = async () => {
      try {
        const round = await RoundService.setupRound(0.01, "mishka.eth");
        const dummyLobby: Lobby = await LobbyService.setupLobby(round, 0.04, [
          "mishka.eth",
          "hemlock.eth",
        ]);
        await LobbyService.storeLobby(dummyLobby);
        console.log(dummyLobby);
      } catch (error) {
        console.error(error);
      }
    };

    initLobby();
  }, []);

  return (
    <div className="flex flex-col h-screen ">
      <Typography component="h2" variant="h5">
        Lobby ID: {dummyLobby?.inner.id}
      </Typography>
      <div>
        <Typography component="h2" variant="h5">
          Current players in lobby: {dummyLobby?.voterAddresses}
        </Typography>
      </div>
      <div>
        <Typography component="h2" variant="h5">
          Current bet pool: {dummyLobby?.totalBettingPool}
        </Typography>

        <Button variant="contained" color="primary">
          Start Game
        </Button>
      </div>
    </div>
  );

  // const [lobby, setLobby] = lobbyReducer(
  //   dummyLobby,
  //   {type: "ADD_PLAYER", payload: "mishka.eth"}
  //     );
  // ) ;
}
