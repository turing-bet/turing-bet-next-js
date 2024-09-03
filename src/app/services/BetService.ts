import { Bet, BetStatus } from "../model/bet";
import redis from "../lib/db";

class BetService {
  async setupBet(amount: number, address: string): Promise<Bet> {
    const bet: Bet = {
      address: address,
      amount: amount,
      betStatus: BetStatus.PENDING,
    };
    return bet;
  }
  async storeBet(bet: Bet, lobbyId: string): Promise<void> {
    try {
      await redis.hset(`lobby:${lobbyId}`, { playerBets: JSON.stringify(bet) });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new BetService();
