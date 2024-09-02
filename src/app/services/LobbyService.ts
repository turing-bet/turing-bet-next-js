import { v4 as uuidv4 } from "uuid";
import { Lobby } from "../model/lobby";
import redis from "../lib/db";
import { Bet, BetStatus } from "../model/bet";
import { Round, RoundStatus } from "../model/round";
class LobbyService {
  async setupLobby(
    round: Round,
    betPool: number,
    addresses: string[],
  ): Promise<Lobby> {
    const lobbyId = uuidv4();
    const lobby: Lobby = {
      inner: round,
      voterAddresses: addresses,
      totalBettingPool: betPool,
      pendingBets: {},
    };
    return lobby;
  }
  async storeLobby(lobby: Lobby): Promise<void> {
    await redis.set(`round:${lobby.inner.id}`, JSON.stringify(lobby));
  }

  async getRemainingRoundTime(roundId: string): Promise<number> {
    const now: number = Date.now();
    const end: number = (await redis.get(`round:${roundId}:roundEndTime`)) || 0;
    return end - now;
  }
}

export default new LobbyService();
