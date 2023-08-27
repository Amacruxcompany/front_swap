"use client";

import Image from "next/image";
import ButtonWallet from "../utils/buttonConectWalletComponent";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faChartBar,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { getUserWalletBalance } from "@/app/services/getDataServices";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
  const {
    setModal,
    modal,
    setChain,
    refresh,
    setRefresh,
    setAddress,
    setGraph,
    graph,
  } = UserGlobalContext();
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });
  const [listBalance, setListBalance] = useState([]);
  const [balance, setBalance] = useState("0.0");

  const { chain } = useNetwork();

  const showData = async (type) => {
    if (!address || !chain) {
      return;
    }
    let data;

    if (type == "Deposito" && modal.status == false) {
      if (listBalance.length > 0) {
        data = listBalance;
      } else {
        data = await getUserWalletBalance(address, chain.id);
      }

      setModal({
        ...modal,
        status: !modal.status,
        type: "Deposito",
        despositData: data,
      });
    } else if (type == "Retiro" && modal.status == false) {
      setModal({ ...modal, status: !modal.status, type: "Retiro" });
    } else if (type == "List" && modal.status == false) {
      setModal({ ...modal, status: !modal.status, type: "List" });
    } else {
      setModal({ ...modal, status: false });
    }
  };

  useEffect(() => {
    if (refresh) {
      const refreshAmounts = async () => {
        const data = await getUserWalletBalance(address, chain.id);
        setModal({
          ...modal,
          status: false,
          type: "Deposito",
          despositData: data,
        });
        setListBalance(data);
        setRefresh(false);
      };

      refreshAmounts();
    }

    if (address) {
      setAddress(address);
    }
  }, [refresh, setRefresh, address, chain, modal, setModal, setAddress]);

  useEffect(() => {
    const getBalance = async () => {
      const data = await getUserWalletBalance(address, chain.id);
      setListBalance(data);
    };

    if (chain && address && listBalance.length <= 0) {
      getBalance();
    }
  }, [chain, address, listBalance]);

  useEffect(() => {
    if (data && data.symbol && data.formatted) {
      setBalance(data.formatted + data.symbol);
    } else {
      setBalance("0.0");
    }
  }, [data]);

  useEffect(() => {
    setChain(chain);
  }, [chain, setChain]);

  return (
    <nav className="bg-fondThree fixed  justify-center w-full z-50 maxNav">
      <div className="bg-fondThree grid grid-cols-2 p-4 md:p-2 w-full md:flex  justify-between items-center container mx-auto">
        <div className="col-span-2 pb-2 w-full md:w-4/12 flex items-center justify-center">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={300}
            height={300}
            priority
          />
        </div>

        <div className=" w-10/12 md:w-4/12  grid grid-cols-2 md:grid-cols-4 gap-2 justify-around">
          <button
            onClick={() => showData("Deposito")}
            className="text-2xl text-white"
          >
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </button>
          <button
            onClick={() => showData("Retiro")}
            className="text-2xl text-white"
          >
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
          </button>

          <button
            onClick={() => showData("List")}
            className="text-2xl text-white"
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <button
            onClick={() => setGraph(!graph)}
            className="text-2xl text-white"
          >
            <FontAwesomeIcon icon={faChartBar} />
          </button>
        </div>

        <div
          className={
            " flex flex-col-reverse	 md:flex-row items-center  w-full md:w-4/12 "
          }
        >
          <span className="text-white px-2">{balance}</span>
          <ButtonWallet />
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
