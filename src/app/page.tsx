import LoginPage from "./components/login/page";
import CreateLobbyPage from "./createLobby/page";

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
