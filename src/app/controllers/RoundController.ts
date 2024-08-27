import RoundService from "../services/RoundService";
import { Request, Response } from "express";
class RoundController {
  async getRoundList(req: Request, res: Response) {
    const rounds;
    // const rounds = await RoundService.roundList();
    // return res.json(rounds);
  }

  async getRound(req: Request, res: Response) {
    const { roundId } = req.params;
    if (!roundId) {
      return res.status(400).json({ error: "Round ID is required" });
    }

    // const round = await RoundService.round(req.params.id);
    // return res.json(round);
  }
}
