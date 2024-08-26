export type GlobalState = {
  rounds: [];
  selectedAccounts: string[];
  voters: string[];
  //TODO: add roundId
  betsRounds: { [address: string]: number };
  roundsStatus: { [id: string]: RoundStatus };
};
