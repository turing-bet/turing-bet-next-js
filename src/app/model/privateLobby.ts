import { Lobby } from "./lobby";
export interface PrivateLobby extends Lobby {
  whiteList: string[];
}

export type PrivateLobbyAction = {
  type: "setWhiteList";
  payload: PrivateLobby["whiteList"];
};
