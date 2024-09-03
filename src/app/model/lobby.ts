import { Bet } from "./bet";
export enum LobbyStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
}

export interface Lobby  {
  voterAddresses?: string[];
  totalBettingPool?: number;
  playerBets: { [address: string]: Bet };
  id?: string;
  roundStartTime?: number;
  roundEndTime?: number;
  lobbyStatus?: LobbyStatus;
}

export type LobbyAction =
  | {
      type: "updateLobby";
      payload: Partial<Lobby>;
    }
  | {
      type: "setBets";
      payload: Lobby["playerBets"];
    }

export function lobbyReducer(lobby: Lobby, action: LobbyAction): Lobby {
  switch (action.type) {
    case "updateLobby":
      return { ...lobby, ...action.payload };
    case "setBets":
      return { ...lobby, ...action.payload };
    default:
      throw new Error("Invalid action type");
  }
}
