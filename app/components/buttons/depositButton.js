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
  const { address, setPopUpPay, setPayArray, popUpPay } = UserGlobalContext();

  const myBalance = async () => {
    if (!chain) {
      return;
    }

    close(false);

    if (init) {
      setInit(false);
      await Moralis.start({
        apiKey: process.env.API_KEY_MORALIS,
      });
    }
    const chainData = chain.network == "bsc" ? EvmChain.BSC : EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain: chainData,
    });

    const data = response.toJSON();

    if (data.length <= 0) {
      alert("No tiene fondos");
      return;
    }

    setPayArray(data);
    setPopUpPay(true);
  };

  useEffect(() => {}, [chain]);

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
