import { v4 as uuidv4 } from "uuid";
import { Lobby, LobbyStatus } from "../model/lobby";
import redis from "../lib/db";
import { Bet, BetStatus } from "../model/bet";
import { Round, RoundStatus } from "../model/round";
class LobbyService {
  async setupLobby(
    minimumBet: number,
    initialAddress: string,
  ): Promise<Lobby> {
    const lobbyId = uuidv4();
    const initBet: Bet =  {
      address: initialAddress,
      amount: minimumBet,
      roundId: lobbyId,
      betStatus: BetStatus.PENDING,
    };
    const lobby: Lobby = {
      id: lobbyId,
      voterAddresses: [initialAddress],
      totalBettingPool: minimumBet,
      playerBets: { [initialAddress]: initBet },
      roundStartTime: Date.now(),
      roundEndTime: Date.now() + 1000 * 60 * 60 * 24,
      lobbyStatus: LobbyStatus.ACTIVE,
    };
    return lobby;
  }
  async storeLobby(lobby: Lobby): Promise<void> {
    await redis.set(`lobby:${lobby.id}`, JSON.stringify(lobby));
  }

  async fetchLobby(id: string)  {
    const res: Lobby | null = await redis.hgetall(`lobby:${id}`);
    return res;
  }

  async getRemainingRoundTime(roundId: string): Promise<number> {
    const now: number = Date.now();
    const end: number = (await redis.get(`round:${roundId}:roundEndTime`)) || 0;
    return end - now;
  }
}

export default new LobbyService();
