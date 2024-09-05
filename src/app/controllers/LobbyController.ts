import LobbyService from "../services/LobbyService";
import redis from "../lib/db";
import { Request, Response } from "express";
class LobbyController {
  async getlobbyList(req: Request, res: Response) {
    const lobbies = await redis.hget("globalState", "lobbies");
    if (!lobbies) {
      return res.status(404).json({ error: "lobbies not found" });
    }
    return res.status(200).json(lobbies);
  }

  async getLobby(req: Request, res: Response) {
    const { lobbyId } = req.params;
    if (!lobbyId) {
      return res.status(400).json({ error: "lobby ID is required" });
    }
    const lobby = await redis.hgetall(`lobby:${lobbyId}`);
    if (!lobby) {
      return res.status(404).json({ error: "lobby not found" });
    }
    return res.status(200).json(lobby);
  }
}

export default new LobbyController();
