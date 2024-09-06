"use client";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import LobbyService from "../../services/LobbyService";
import { Lobby } from "../../model/lobby";
export default function LobbyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalBettingPool, setTotalBettingPool] = useState(0);
  const [playerAddresses, setPlayerAddresses] = useState<string[]>([]);
  const [currentAddress, setCurrentAddress] = useState<string>("");

  async function fetchLobby() {
    const lobby = await LobbyService.getLobby(params.id);
    if (lobby) {
      console.log("lobby fetched: ", lobby);
      setLobby(lobby);
    }
  }

  async function fetchTotalBettingPool() {
    const totalBettingPool = await LobbyService.getTotalBetPool(params.id);
    if (totalBettingPool) {
      console.log("total betting pool fetched: ", totalBettingPool);
      setTotalBettingPool(totalBettingPool);
    }
  }

  const init = async () => {
    await fetchLobby();
    await fetchTotalBettingPool();
  };

  useEffect(() => {
    init();
  }, []);

  const handleNewPlayerJoin = async () => {};
  return (
    <div className="flex flex-col h-screen ">
      <>
        <Container>
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
              Current bet pool: {totalBettingPool} ETH
            </Typography>
            <div>
              <Button variant="contained" color="primary">
                Start Game
              </Button>
            </div>
          </div>
        </Container>
      </>
    </div>
  );
}
