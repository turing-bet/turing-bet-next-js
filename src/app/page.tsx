import Image from "next/image";
import RoundPage from "./components/round/RoundPage";
import CreateRoundPage from "./components/create_round/CreateRound";
import { Round } from "./model/round";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative h-min">
        <CreateRoundPage />
      </div>
    </div>
  );
}
