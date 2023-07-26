"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { UserGlobalContext } from "@/provider/contextProvider";
import { toast, Zoom } from "react-toastify";
const ConnectButton = () => {
  const {
    setAddress,
    setPopUpPool,
    setPopUpPay,
    setPopUpWithdral,
    userId,
    setUserId,
    lang,
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

      if (res.data) {
        setUserId(res.data[0].users_id);
        toast(lang ? "Exito al iniciar sesion" : "Successful login", {
          hideProgressBar: false,
          autoClose: 5000,
          type: "success",
          position: "top-right",
          transition: Zoom,
        });
      } else {
        toast(lang ? "Error al conectar wallet" : "Error connecting wallet", {
          hideProgressBar: false,
          autoClose: 5000,
          type: "error",
          position: "top-right",
          transition: Zoom,
        });
      }
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

    if (address && userId == 0) {
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
    userId,
    lang,
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
