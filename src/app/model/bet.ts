export enum BetStatus {
  PENDING = "PENDING",
  WIN = "WIN",
  LOSE = "LOSE",
  DRAW = "DRAW",
}

export interface Bet {
  address?: string;
  amount?: number;
  lobbyId?: string;
  betStatus?: BetStatus;
}
