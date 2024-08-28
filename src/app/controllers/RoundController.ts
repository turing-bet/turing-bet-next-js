import RoundService from "../services/RoundService";
import redis from "../lib/db";
import { Request, Response } from "express";
class RoundController {
  async getRoundList(req: Request, res: Response) {
    const rounds = await redis.hget("globalState", "rounds");
    if (!rounds) {
      return res.status(404).json({ error: "Rounds not found" });
    }
    return res.status(200).json(rounds);
  }

  async getRound(req: Request, res: Response) {
    const { roundId } = req.params;
    if (!roundId) {
      return res.status(400).json({ error: "Round ID is required" });
    }
    const round = await redis.hgetall(`round:${roundId}`);
    if (!round) {
      return res.status(404).json({ error: "Round not found" });
    }
    return res.status(200).json(round);
  }
}

export default new RoundController();
