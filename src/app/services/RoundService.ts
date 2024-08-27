import { v4 as uuidv4 } from "uuid";
import redis from "../lib/db";
class RoundService {
  async setupRound(
    selectedAccount: string,
    betAmount: number,
    voterAddress: string,
  ): Promise<Round> {
    const roundId = uuidv4();
    const round: Round = {
      id: roundId,
      selectedAccountHandle: selectedAccount,
      voterAddresses: [voterAddress],
      totalBettingPool: betAmount,
      voterBets: { voterAddress: betAmount },
      roundStartTime: Date.now(),
      //TODO: make sure this is 24 hours from start
      roundEndTime: Date.now() + 1000 * 60 * 60 * 24,
      status: RoundStatus.ACTIVE,
    };
    return round;
  }

  async getRemainingRoundTime(roundId: string): Promise<number> {
    const now: number = Date.now();
    const end: number = (await redis.get(`round:${roundId}:roundEndTime`)) || 0;
    return end - now;
  }
}

export default new RoundService();
