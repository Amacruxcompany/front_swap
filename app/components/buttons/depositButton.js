"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
const Moralis = require("moralis").default;
import { useEffect, useState } from "react";
const { EvmChain } = require("@moralisweb3/common-evm-utils");
import { useNetwork } from "wagmi";
import { UserGlobalContext } from "@/provider/contextProvider";
const DepositButtonComponent = ({ options, close }) => {
  //? Estados
  const [init, setInit] = useState(true);

  //? exportaciones funcioones wallets
  const { chain } = useNetwork();
  const { address, setPopUpPay, setPayArray } = UserGlobalContext();

  const [prueba, setPrueba] = useState(0);

  const myBalance = async () => {
    const chainsData = [
      EvmChain.ETHEREUM,
      EvmChain.ARBITRUM,
      EvmChain.AVALANCHE,
      EvmChain.BSC,
      EvmChain.BSC_TESTNET,
      EvmChain.CRONOS,
      EvmChain.CRONOS_TESTNET,
      EvmChain.FANTOM,
      EvmChain.FUJI,
      EvmChain.GOERLI,
      EvmChain.MUMBAI,
      EvmChain.PALM,
      EvmChain.POLYGON,
      EvmChain.SEPOLIA,
    ];
    if (!chain || !address) {
      return;
    }

    close(false);

    if (init) {
      setInit(false);
      await Moralis.start({
        apiKey: process.env.API_KEY_MORALIS,
      });
    }
    const chainData = chainsData.filter(
      (data) => data._chainlistData.chainId == chain.id
    );

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain: chainData[0],
    });

    const data = response.toJSON();

    if (data.length <= 0) {
      alert("No tiene fondos");
      return;
    }

    setPayArray(data);
    setPopUpPay(true);
  };

  return (
    <button
      onClick={myBalance}
      className={`optionButton transition-all	duration-500 bg-fondTwo text-white flex items-center justify-center border-2 border-intColorOne w-12 h-12 cursor-pointer	 rounded-full	fixed ${
        options ? "bottom-36" : "bottom-4"
      }  right-4`}
    >
      <FontAwesomeIcon icon={faArrowAltCircleUp} />
    </button>
  );
};

export default DepositButtonComponent;
