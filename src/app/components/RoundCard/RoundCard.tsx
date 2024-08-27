type RoundCardProps = {
  status: RoundStatus;
  roundId: string;
  selectedAccount: string;
  bettingPool: number;
  voters: string[];
};

const RoundCard: React.FC<RoundCardProps> = (props) => {
  const { status, roundId, selectedAccount, bettingPool, voters } = props;
  return <div></div>;
};
