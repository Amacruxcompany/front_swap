"use client";

import Image from "next/image";
import { Web3Button } from "@web3modal/react";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
const Moralis = require("moralis").default;
import { useEffect, useState } from "react";
const { EvmChain } = require("@moralisweb3/common-evm-utils");
import Web3 from "web3";
import ABI from "../abi.json";

const NavbarComponenet = () => {
  const [init, setInit] = useState(true);

  const { address } = useAccount();

  const { chain, chains } = useNetwork();

  const myBalance = async () => {
    if (init) {
      setInit(false);
      await Moralis.start({
        apiKey: process.env.API_KEY_MORALIS,
      });
    }

    //todo IMPORTANTE AGREGAR DEMAS CADENAS
    const chainData = (chain.network = "bsc"
      ? EvmChain.BSC
      : EvmChain.ETHEREUM);

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain: chainData,
    });

    const data = response.toJSON();

    console.log(data);

    const num = Web3.utils.fromWei(data[0].balance, "ether");

    console.log(num);
  };

  useEffect(() => {
    console.log(address, 1);
    console.log(chain);
  }, [address, chain]);

  const { config } = usePrepareContractWrite({
    address: "0x55d398326f99059ff775485246999027b3197955",
    abi: ABI,
    chainId: chain ? chain.id : 1,
    functionName: "transfer",
    args: ["0x464100a0700b8101784cbb71ada5a5d138545a15", "5000000000000000000"],
    enabled: Boolean("5000000000000000000"),
  });

  const { write } = useContractWrite(config);
  //TODO Contratos
  const contract = async () => {
    write?.();
  };

  return (
    <nav className="bg-fondThree  flex justify-center w-full z-50">
      <div className="bg-fondThree  justify-items-center	 z-50 p-3 grid grid-cols-2	items-center container mx-auto  md:grid-cols-9 gap-x-4">
        <Image
          src="/assets/miniLogo.png"
          alt="Logo"
          width={30}
          height={30}
          className="md:hidden"
        />
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="hidden md:block col-span-2 md:col-start-2"
        />

        <div className=" col-start-2 col-end-4 md:w-full flex justify-center md:justify-end	items-center md:col-start-4 md:col-end-7">
          <span className="text-white px-2">302.5$</span>
          <Image
            src="/assets/icons/webPage.png"
            alt="world-icon"
            width={20}
            height={20}
            className="mr-3 md:cursor-pointer hover:rotate-180 transition-all	duration-500 ease-in"
          />
          <Image
            src="/assets/icons/options.png"
            alt="option-icon"
            width={20}
            height={20}
            className="mr-3 md:cursor-pointer hover:rotate-180 transition-all	duration-500 ease-in"
          />
        </div>
        <div
          className={
            "w-full pt-4 md:pt-0 col-start-1 col-end-4 md:col-start-7 md:col-end-9 flex justify-center md:justify-end"
          }
        >
          <button onClick={() => contract()}>balance</button>
          <button onClick={() => myBalance()}>22222</button>
          <Web3Button id="connection" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponenet;
