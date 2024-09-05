import { Vote } from "../model/vote";
class VoteService {
  async setupVote(
    lobbyId: string,
    playerAddress: string,
    votedFor: number,
  ): Promise<Vote> {
    const vote: Vote = {
      lobbyId,
      playerAddress,
      votedFor,
    };
    return vote;
  }
  async getVotes(): Promise<Vote[]> {
    const votes: Vote[] = [];
    return votes;
  }

  async tallyScoresWithVotes(votes: Vote[]): Promise<Record<string, number>> {
    const scores: Record<string, number> = {};
    for (const vote of votes) {
    }
    return scores;
  }
}
