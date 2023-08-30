"use client";

import { getUserData } from "@/app/services/getDataServices";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function ButtonWallet() {
  const [data, setData] = useState("Conectar wallet");
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const conectBtn = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  useEffect(() => {
    const user = async () => {
      await getUserData(address);
    };

    if (address) {
      user();
    }
  }, [address]);

  useEffect(() => {
    if (address && isConnected) {
      setData(address.slice(0, 20) + "...");
    } else {
      setData("Conectar wallet");
    }
  }, [isConnected, address]);

  return (
    <>
      <button
        className="w-full py-2 px-2 col-start-1 col-end-4 md:col-start-7 md:col-end-9 flex justify-center  rounded-3xl	hover:bg-intColorOne text-intColorOne hover:text-black	border-intColorOne border-2 transition-all	duration-500 break-all"
        onClick={() => conectBtn()}
      >
        {data}
      </button>
    </>
  );
}
