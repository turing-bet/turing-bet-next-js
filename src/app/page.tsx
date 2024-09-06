"use client";

import { useRouter } from "next/navigation";
import ButtonPrimary from "./components/ui/ButtonPrimary";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-1/2 m-auto">
      <div className="flex flex-col gap-4 p-8 bg-white rounded-xl shadow">
        <span className="text-4xl text-[#0C092A]">Turing.bet</span>
        <span className="text-xl text-[#0C092A]">Lorem ipsum...</span>
        <div className="flex pt-4 gap-4">
          <ButtonPrimary
            onClick={() => router.push("/createLobby")}
            label={"Create Lobby"}
            disabled={false}
          />
          <ButtonPrimary
            onClick={() => router.push("/globalLobbies")}
            label={"Public Lobbys"}
            disabled={false}
          />
          {/* <ButtonPrimary
            label={"Login"}
            onClick={() => router.push('/login')}
            disabled={false}
          /> */}
        </div>
      </div>
    </div>
  );
}
