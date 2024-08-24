enum RoundStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
}

type Round = {
  id: string;
  selectedAccountHandle: string;
  voterAddresses: string[];
  totalBettingPool: number;
  voterBets: { [address: string]: number };
  roundStartTime: number;
  roundEndTime: number;
  status: RoundStatus;
};
