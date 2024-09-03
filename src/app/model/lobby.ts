export enum LobbyStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
}

export interface Lobby {
  voterAddresses?: string[];
  betAmount?: number;
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
      type: "setBetAmount";
      payload: Lobby["betAmount"];
    };

export function lobbyReducer(lobby: Lobby, action: LobbyAction): Lobby {
  switch (action.type) {
    case "updateLobby":
      return { ...lobby, ...action.payload };
    // case "setBetAmount":
    //   return { ...lobby, ...action.payload };
    default:
      throw new Error("Invalid action type");
  }
}
