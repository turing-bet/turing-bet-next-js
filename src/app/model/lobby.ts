import { Round } from "./round";
import { Bet } from "./bet";
export interface Lobby extends Round {
  inner: Round;
  voterAddresses?: string[];
  totalBettingPool?: number;
  isPrivate?: boolean;
  pendingBets: { [address: string]: Bet };
}

export type LobbyAction =
  | {
      type: "updateLobby";
      payload: Partial<Lobby>;
    }
  | {
      type: "setBetAmount";
      payload: Lobby["pendingBets"];
    }
  | {
      type: "setRound";
      payload: Round;
    };

export function lobbyReducer(lobby: Lobby, action: LobbyAction): Lobby {
  switch (action.type) {
    case "updateLobby":
      return { ...lobby, ...action.payload };
    case "setBetAmount":
      return { ...lobby, ...action.payload };
    case "setRound":
      return { ...lobby, ...action.payload };
    default:
      throw new Error("Invalid action type");
  }
}
