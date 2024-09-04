import { Bet } from "./bet";

export enum RoundStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
}

export interface Round {
  id?: string;
  roundStartTime?: number;
  roundEndTime?: number;
  status?: RoundStatus;
}
