import { Web3Auth } from "@web3auth/modal";
import { Web3AuthOptions } from "@web3auth/modal";
import { UX_MODE } from "@toruslabs/openlogin-utils";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
require("dotenv").config();
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1",
      rpcTarget: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`,
      displayName: "Ethereum Mainnet",
      blockExplorerUrl: "https://etherscan.io",
      ticker: "ETH",
      tickerName: "Ethereum",
    },
  },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId:
    "BFgC-t8ORSrW-OgKox8K5dQxH15zT38c16ctn6DCNuZdZS3Z6rwDUeu--fFLddUfPAfvRHeI8PDYYp5INzriUV0",
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};
const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "optional",
  },
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT, // "redirect" | "popup"
  },
});

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: {
    whiteLabel: { showWidgetButton: true, buttonPosition: "bottom-right" },
  },
});

export const web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [openloginAdapter],
  plugins: [walletServicesPlugin],
};
export const web3auth = new Web3Auth(web3AuthOptions);
// export default web3auth;
