"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { Lobby } from "../../model/lobby";
import { useState } from "react";

export default function LobbyPage() {
  //  initialLobby: Lobby
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen ">
      <Typography component="h2" variant="h5">
        Lobby ID: {}
      </Typography>
      <div>
        <Typography component="h2" variant="h5">
          Current players in lobby: {}
        </Typography>
      </div>
      <div>
        <Typography component="h2" variant="h5">
          Current bet pool: {}
        </Typography>

        <Button variant="contained" color="primary">
          Start Game
        </Button>
      </div>
    </div>
  );
}
