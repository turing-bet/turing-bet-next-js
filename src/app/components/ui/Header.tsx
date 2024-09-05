"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { useQuirkyName } from "@/app/hooks/useQuirkyName";

const pages = [
  { name: "Create Lobby", href: "/createLobby/" },
  { name: "Global Lobbies", href: "/globalLobbies/" },
];

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const Header = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const quirkyName = useQuirkyName(userInfo?.idToken || "");

  console.log("LoggedIn", loggedIn);
  console.log("Provider", provider);
  console.log("UserInfo", userInfo);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
      console.log("logged in");

      // Fetch user info after successful login
      await getUserInfo();
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    setUserInfo(user);
    console.log(user);
  };

  const logout = async () => {
    if (provider) {
      try {
        await web3auth.logout();
        setProvider(null);
        setLoggedIn(false);
        console.log("logged out");
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      console.log("Wallet is not connected");
    }
  };

  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center p-4 z-50">
      <div className="flex items-baseline">
        <Link href="/">
          <span className="pl-2 text-xl font-bold">Turing.bet</span>
        </Link>
        <div className="flex gap-2 px-4">
          {pages.map((page) => (
            <Link key={page.href} href={page.href}>
              <span className="text-sm cursor-pointer">{page.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center cursor-default">
        {loggedIn && userInfo && (
          <span className="px-4">
            Logged in as: <span className="font-bold">{quirkyName}</span>
          </span>
        )}
        <ButtonPrimary
          label={loggedIn ? "Logout" : "Login"}
          onClick={loggedIn ? logout : login}
          disabled={!web3auth}
        />
      </div>
    </div>
  );
};

export default Header;
