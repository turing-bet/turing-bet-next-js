"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import LobbyService from "../../services/LobbyService";
export default async function LobbyPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const lobby = await LobbyService.fetchLobby(params.id);
  return (
    <div className="flex flex-col h-screen ">
      <Typography component="h2" variant="h5">
        Lobby ID: {lobby?.inner.id}
      </Typography>
      <div>
        <Typography component="h2" variant="h5">
          Current players in lobby: {lobby?.voterAddresses}
        </Typography>
      </div>
      <div>
        <Typography component="h2" variant="h5">
          Current bet pool: {lobby?.totalBettingPool}
        </Typography>
        <div>
          <Button variant="contained" color="primary">
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}
