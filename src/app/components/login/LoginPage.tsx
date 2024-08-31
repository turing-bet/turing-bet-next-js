"use client";
import { web3auth } from "../../lib/web3auth";
import { useEffect, useState } from "react";
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
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",

  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));
export default function LoginPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [provider, setProvider] = useState<IProvider | null>(null);
  const [walletProvider, setWalletProvider] = useState<IWalletProvider | null>(
    null,
  );
  const [loggedIn, setLoggedIn] = useState(false);
  async function onCreateLobbyClickHandler() {
    router.push("../createLobby/CreateLobby");
  }
  async function onBrowseLobbiesClickHandler() {
    router.push("../globalLobbies/globalLobbies");
  }
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
    }
  };
  const getUserInfo = async () => {
    const userInfo = await web3auth.getUserInfo();
    uiConsole(userInfo);
  };
  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    uiConsole(address);
    printUrl(address, "address");
  };
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

  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign in
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <Button
                  variant="outlined"
                  onClick={() => {
                    uiConsole(getUserInfo);
                  }}
                >
                  Web3 sign in
                </Button>
              </FormControl>
            </Box>
            <Button variant="outlined" onClick={onCreateLobbyClickHandler}>
              Create lobby
            </Button>
            <Button variant="outlined" onClick={onBrowseLobbiesClickHandler}>
              Browse lobbies
            </Button>
          </Card>
        </SignInContainer>
      </WalletServicesProvider>
    </Web3AuthProvider>
  );
}
