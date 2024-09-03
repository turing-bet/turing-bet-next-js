"use client";
// Scratch / poc for lobby to game
// TODO:
// [] Redis gamestate stuff
// [] routing from lobby to submission phase then voting phase , results, then back again
// [] backend game logic
// [] AI gen thingy
// web3 stuff
import Image from "next/image";
import { useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";

import { Lobby, lobbyReducer } from "./model/lobby";
import RoundService from "./services/RoundService";
import LobbyService from "./services/LobbyService";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Link from "next/link";
export default function ScratchLobbyGameDemoPage(initLobby: Lobby) {
  //Routing TODO:
  //  /lobby -> /submission -> /voting -> /results -> /lobby
  const router = useRouter();
  const [addresses, setAddresses] = useState<string[]>([]);
  //init LOBBY
  // useEffect(() => {
  //   const initLobby = async () => {
  //     try {
  //       console.log("init lobby: " + initLobby);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   initLobby();
  // }, []);
  function onStartGameClickHandler() {
    startTransition(() => {
      router.push(`./submission/${initLobby?.inner.id}`);
    });
  }

  return (
    <div className="flex flex-col h-screen ">
      <Typography component="h2" variant="h5">
        Lobby ID:
        <> {initLobby?.inner.id}</>
      </Typography>
      <div>
        <Typography component="h2" variant="h5">
          Current players in lobby: {initLobby?.voterAddresses}
        </Typography>
      </div>
      <div>
        <Typography component="h2" variant="h5">
          Current bet pool: {initLobby?.totalBettingPool}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={onStartGameClickHandler}
        >
          Start Game
        </Button>
      </div>
    </div>
  );

  // const [lobby, setLobby] = lobbyReducer(
  //   initLobby,
  //   {type: "ADD_PLAYER", payload: "mishka.eth"}
  //     );
  // ) ;
}
