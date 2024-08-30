"use client";
import web3auth from "../../lib/web3auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { ethers } from "ethers";
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
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const validateInputs = () => {};
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  async function onSignClickHandler() {
    const ethersProvider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await ethersProvider.send("eth_requestAccounts", []);
    const account = accounts[0];
    console.log(`Account: ${account}`);
  }
  async function onCreateLobbyClickHandler() {
    router.push("/createLobby");
  }
  async function onBrowseLobbiesClickHandler() {
    router.push("globalLobbies");
  }
  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       await web3auth.init();
  //       setProvider(web3auth.provider);
  //       if (web3auth.status === ADAPTER_EVENTS.CONNECTED) {
  //         setLoggedIn(true);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   init();
  // }, []);
  // const login = async () => {
  //   const web3authProvider = await web3auth.connect();
  //   setProvider(web3auth.provider);
  //   if (web3auth.connected) {
  //     setLoggedIn(true);
  //   }
  // }
  function uiConsole(...args: any[]): void {
    const el = document.getElementById("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  }

  return (
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
            <Button variant="outlined" onClick={onSignClickHandler}>
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
  );
}
