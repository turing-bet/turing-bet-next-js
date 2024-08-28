import { Round, RoundStatus } from "./round";

export interface GlobalState {
  rounds?: Round[];
  selectedAccounts?: string[];
  voters?: string[];
  //TODO: add roundId
  betsRounds?: { [address: string]: number };
  roundsStatus?: { [id: string]: RoundStatus };
}
