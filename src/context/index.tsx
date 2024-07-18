"use client";

import React, { ReactNode } from "react";
import { config, projectId } from "@/config";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  themeMode: "light",
  defaultChain: bsc,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: false, // Optional - false as default
  featuredWalletIds: [
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // trust
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // meta mask
  ],
  // featuredWalletIds: [],
  allowUnsupportedChain: true,
  connectorImages: {
    coinbaseWallet: "https://images.mydapp.com/coinbase.png",
    metamask: "https://images.mydapp.com/metamask.png",
  },
  excludeWalletIds: [
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // coinbase
    // "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  ],
  // themeVariables: {
  //   "--w3m-color-mix": "#00BB7F",
  //   "--w3m-color-mix-strength": 40,
  // },
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
