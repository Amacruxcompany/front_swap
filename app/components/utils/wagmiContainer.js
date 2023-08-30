"use client";

import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, bsc, bscTestnet } from "wagmi/chains";
import BasicModal from "../modals/basicModal";
import HomeSwap from "../swapComponenet";
import NavbarComponent from "../navBar/navBarComponent";
import { useEffect } from "react";
import { UserGlobalContext } from "@/provider/contextProvider";
import TradingViewWidget from "./graphComponent";

const chains = [arbitrum, mainnet, polygon, bsc, bscTestnet];

const projectId = process.env.wagmiConfig;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

export const WagmiContainerComponent = ({ pools }) => {
  const { setPoolArray, graph } = UserGlobalContext();

  useEffect(() => {
    setPoolArray(pools);
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key == 123) {
        return false;
      }
    });
  }, [pools, setPoolArray]);
  return (
    <WagmiConfig config={wagmiConfig}>
      <NavbarComponent />
      <BasicModal />

      <div
        className={`container h-screen p-4 grid grid-cols-1 place-items-center ${
          graph ? " md:grid-cols-2" : "md:grid-cols-1"
        } gap-4 mx-auto items-center min-h-min	pt-24 md:pt-0	`}
      >
        <div
          className={`p-2 w-10/12 ${
            graph ? "" : "hidden"
          } rounded-xl border-sweet border-2 bg-white bottom-2 z-20 absolute  md:static h-4/6 md:w-full`}
        >
          <TradingViewWidget />
        </div>
        <HomeSwap />
      </div>
    </WagmiConfig>
  );
};
