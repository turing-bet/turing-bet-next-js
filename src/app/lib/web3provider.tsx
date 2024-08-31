// "use client"
// import React from 'react';

// import { WagmiProvider, createConfig, http } from 'wagmi';
// import {mainnet} from "wagmi/chains"
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

// const config = createConfig(
//   getDefaultConfig({
//     appName: 'turing.bet',
//     chains: [mainnet],
//     transports: {
//       [mainnet.id]: http(
//         `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`,
//       ),
//     },
//     walletConnectProjectId: process.env.WALLETCONNECT_ID,
//   }),
// );

// const queryClient = new QueryClient();

// export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// };
