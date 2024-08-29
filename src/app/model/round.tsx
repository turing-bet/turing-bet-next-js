import { Bet } from "./bet";

export enum RoundStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
}

export interface Round {
  id?: string;
  voterAddresses?: string[];
  totalBettingPool?: number;
  voterBets?: { [address: string]: Bet };
  roundStartTime?: number;
  roundEndTime?: number;
  status?: RoundStatus;
  isPrivate?: boolean;
}
