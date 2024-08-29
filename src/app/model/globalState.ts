import { Round, RoundStatus } from "./round";
import { Lobby } from "./lobby";
export interface GlobalState {
  rounds?: Round[];
  lobbies?: Lobby[];
  voters?: string[];
  //TODO: add roundId
  betsRounds?: { [address: string]: number };
  roundsStatus?: { [id: string]: RoundStatus };
}
