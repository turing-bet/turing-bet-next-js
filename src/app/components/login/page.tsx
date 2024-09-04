"use client";
import { web3auth } from "../../lib/web3auth";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import {
  ThemeProvider,
  createTheme,
  styled,
  PaletteMode,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { getWalletProvider, IWalletProvider } from "../../lib/walletProvider";
import RPC from "../../lib/ethersRPC";

import { ethers } from "ethers";
import {
  Web3AuthInnerContext,
  Web3AuthProvider,
} from "@web3auth/modal-react-hooks";
import { web3AuthContextConfig } from "../../lib/web3auth";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "",
  ...theme.applyStyles("dark", {
    boxShadow: "",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",

  padding: 20,
  backgroundImage: "",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage: "",
  }),
}));
export default function LoginPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const initWeb3Auth = useCallback(async () => {
    try {
      await web3auth.initModal();
      setProvider(web3auth.provider);
      setLoggedIn(web3auth.connected);
    } catch (error) {
      console.error("failed to init web3 auth error: " + error);
    }
  }, []);
  useEffect(() => {
    initWeb3Auth();
  }, [initWeb3Auth]);
  const login = useCallback(async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(web3auth.connected);
    } catch (error) {
      console.error("failed to login web3auth error: " + error);
    }
  }, []);
  const getUserInfo = useCallback(async () => {
    if (!provider) {
      console.error("provider not initialized yet");
      return;
    }
    try {
      const userInfo = await web3auth.getUserInfo();
      console.log(userInfo);
      uiConsole(userInfo);
    } catch (error) {
      console.error("failed to get user info error: " + error);
    }
  }, [provider]);
  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };
  const getAccounts = useCallback(async () => {
    if (!provider) {
      console.log("provider not initalized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      const address = await RPC.getAccounts(provider);
      uiConsole(address);
      printUrl(address, "address");
    } catch (error) {
      console.error("failed to get accounts error: " + error);
    }
  }, [provider]);
  const printUrl = (
    hash: string,
    type: "transaction" | "address" = "address",
  ) => {
    const explorerLink = `https://sepolia.etherscan.io/${type === "transaction" ? "tx" : "address"}/${hash}`;
    const anchor = `<a href="${explorerLink}" target="_blank" rel="noopener noreferrer">${hash}</a>`;

    const consoleElement = document.querySelector("#console>p");
    if (consoleElement) {
      consoleElement.innerHTML = anchor;
    }
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };
  function uiConsole(...args: any[]): void {
    const el = document.getElementById("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  }

  const onBrowseLobbiesClickHandler = () => {
    router.push("/globalLobbies/GlobalLobbyPage");
  };

  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <SignInContainer
          direction="column"
          justifyContent="space-between"
        ></SignInContainer>
      </WalletServicesProvider>
    </Web3AuthProvider>
  );
}
