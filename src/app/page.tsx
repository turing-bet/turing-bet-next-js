import Image from "next/image";
import LoginPage from "./components/login/LoginPage";
import CreateLobbyPage from "./components/createLobby/CreateLobbyPage";
import { Round } from "./model/round";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative h-min">
        <LoginPage />

        <CreateLobbyPage />
      </div>
    </div>
  );
}
