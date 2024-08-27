import Image from "next/image";
import RoundPage from "./components/round/RoundPage";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative h-min">
        <RoundPage />
      </div>
    </div>
  );
}
