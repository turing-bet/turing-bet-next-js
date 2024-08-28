import { Bet } from "../../model/bet";
import { RoundStatus } from "../../model/round";

type RoundCardProps = {
  roundId: string;
  selectedAccountHandle: string;
  voterAddresses: string[];
  totalBettingPool: number;

  voterBets: { [address: string]: Bet };
  roundStartTime: number;
  roundEndTime: number;
  status: RoundStatus;
};

const RoundCard: React.FC<RoundCardProps> = (props) => {
  const {
    status,
    roundId,
    selectedAccountHandle,
    totalBettingPool,
    voterBets,
    roundStartTime,
    roundEndTime,
  } = props;
  return <div></div>;
};
