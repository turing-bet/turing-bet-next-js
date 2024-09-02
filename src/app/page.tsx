import Image from "next/image";
import RoundPage from "./components/submission/SubmissionPage";
import LoginPage from "./components/login/LoginPage";
import CreateLobbyPage from "./components/createLobby/CreateLobby";
import GlobalLobbiesPage from "./components/globalLobbies/GlobalLobbyPage";
import { Round } from "./model/round";
import ScratchLobbyGameDemoPage from "./ScratchLobbyGameDemo";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative h-min">
        <LoginPage />
        <ScratchLobbyGameDemoPage />
      </div>
    </div>
  );
}
