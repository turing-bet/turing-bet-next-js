import { v4 as uuidv4 } from "uuid";
import { Lobby, LobbyStatus } from "../model/lobby";
import redis from "../lib/db";
class LobbyService {
  async setupLobby(minimumBet: number, initialAddress: string): Promise<Lobby> {
    const lobbyId = uuidv4();
    const lobby: Lobby = {
      id: lobbyId,
      voterAddresses: [initialAddress],
      betAmount: minimumBet,
      roundStartTime: Date.now(),
      roundEndTime: Date.now() + 1000 * 60 * 60 * 24,
      lobbyStatus: LobbyStatus.ACTIVE,
    };
    return lobby;
  }
  async storeLobby(lobby: Lobby): Promise<void> {
    try {
      await redis.hmset(`lobby:${lobby.id}`, {
        lobbyId: lobby.id,
        voterAddresses: JSON.stringify(lobby.voterAddresses),
        betAmount: lobby.betAmount,
        roundStartTime: lobby.roundStartTime,
        roundEndTime: lobby.roundEndTime,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getLobby(lobbyId: string): Promise<Lobby | null> {
    const res = await redis.hgetall(`lobby:${lobbyId}`);
    if (res) {
      return res;
    }
    return null;
  }

  async getTotalBetPool(lobbyId: string): Promise<number> {
    const betAmount = await redis.get(`lobby:${lobbyId}:betAmount`);
    const numUsers = await redis.llen(`lobby:${lobbyId}:voterAddresses`);
    return Number(betAmount) * Number(numUsers);
  }

  async getRemainingRoundTime(roundId: string): Promise<number> {
    const now: number = Date.now();
    const end: number = (await redis.get(`round:${roundId}:roundEndTime`)) || 0;
    return end - now;
  }
  async getExpiryTime(roundId: string): Promise<number> {
    const end: number = (await redis.get(`round:${roundId}:roundEndTime`)) || 0;
    return end;
  }

  async handleNewPlayer(lobbyId: string, newAddress: string): Promise<void> {
    await redis.lpush(`lobby:${lobbyId}:voterAddresses`, newAddress);
  }
}

export default new LobbyService();
