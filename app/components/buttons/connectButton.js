"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { UserGlobalContext } from "@/provider/contextProvider";

const ConnectButton = () => {
  const {
    setAddress,
    setPopUpPool,
    setPopUpPay,
    setPopUpWithdral,
    userId,
    setUserId,
  } = UserGlobalContext();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const [data, setData] = useState(false);
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const event = async () => {
      const res = await fetch(
        `${process.env.AMAX_URL}/api/userInfo?` +
          new URLSearchParams({
            address: address,
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      console.log(res.data);
      setUserId(res.data[0].users_id);
    };

    setData(isConnected);
    setAddress(address);

    if (address) {
      setWallet(address);
    } else {
      setWallet("");
    }

    if (!address) {
      setPopUpPool(false);
      setPopUpPay(false);
      setPopUpWithdral(false);
      setUserId(0);
    }

    if (address) {
      event();
    }
  }, [
    isConnected,
    address,
    setAddress,
    setPopUpPool,
    setPopUpPay,
    setPopUpWithdral,
    setUserId,
  ]);
  return (
    <>
      {data ? (
        <button
          className="w-full py-2 px-2 col-start-1 col-end-4 md:col-start-7 md:col-end-9 flex justify-center  truncate ... overflow-hidden     rounded-3xl	hover:bg-intColorOne text-intColorOne hover:text-black	border-intColorOne border-2 transition-all	duration-500"
          onClick={() => disconnect()}
        >
          {wallet.slice(0, 15) + "..."}
        </button>
      ) : (
        <button
          className="w-full py-2 px-2 col-start-1 col-end-4 md:col-start-7 md:col-end-9 flex justify-center  truncate ... overflow-hidden     rounded-3xl	hover:bg-intColorOne text-intColorOne hover:text-black	border-intColorOne border-2 transition-all	duration-500"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default ConnectButton;
