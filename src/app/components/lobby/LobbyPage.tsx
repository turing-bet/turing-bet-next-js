"use client";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function LobbyPage() {
  return (
    <div className="flex flex-col h-screen ">
      <Typography component="h2" variant="h5">
        Lobby ID:
      </Typography>
      <div>
        <Typography component="h2" variant="h5">
          Current players in lobby:
        </Typography>
      </div>
      <div>
        <Typography component="h2" variant="h5">
          Total bet pool: 0.01 ETH
        </Typography>

        <Button variant="contained" color="primary">
          Start Game
        </Button>
      </div>
    </div>
  );
}
