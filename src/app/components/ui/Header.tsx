"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import { Web3Auth } from "@web3auth/modal";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import {
  Web3AuthInnerContext,
  Web3AuthProvider,
} from "@web3auth/modal-react-hooks";
import { web3AuthContextConfig } from "../../lib/web3auth";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import RPC from "../../lib/ethersRPC";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

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
  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
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
    console.log(user);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    console.log("logged out");
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    console.log(address);
  };

  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
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
            {/* {loggedIn && userInfo.email && (
          <span className="px-4">Logged in as: {userInfo.email}</span>
        )} */}
            <ButtonPrimary
              label={loggedIn ? "Logout" : "Login"}
              onClick={loggedIn ? logout : login}
              disabled={!web3auth}
            />
          </div>
        </div>
      </WalletServicesProvider>
    </Web3AuthProvider>
  );
};

export default Header;
