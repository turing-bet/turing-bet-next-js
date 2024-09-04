import { v4 as uuidv4 } from "uuid";
import redis from "../lib/db";
import { Round, RoundStatus } from "../model/round";
import { Bet, BetStatus } from "../model/bet";
import SubmissionService from "./SubmissionService";
class RoundService {
  async setupRound(
    // selectedAccount: string,
    betAmount: number,
    voterAddress: string,
  ): Promise<Round> {
    const roundId = uuidv4();
    const bet: Bet = {
      address: voterAddress,
      amount: betAmount,
      betStatus: BetStatus.PENDING,
    };
    const round: Round = {
      id: roundId,

      roundStartTime: Date.now(),
      //TODO: make sure this is X time from now
      roundEndTime: Date.now() + 1000 * 60 * 60 * 24,
      status: RoundStatus.ACTIVE,
    };
    return round;
  }
  async storeRound(round: Round): Promise<void> {
    await redis.set(`round:${round.id}`, JSON.stringify(round));
  }

  async getRemainingRoundTime(roundId: string): Promise<number> {
    const now: number = Date.now();
    const end: number = (await redis.get(`round:${roundId}:roundEndTime`)) || 0;
    return end - now;
  }
}

export default new RoundService();
