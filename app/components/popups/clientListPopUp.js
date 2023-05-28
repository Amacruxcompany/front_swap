"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowDown,
  faArrowUp,
  faExchange,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import DepositList from "../userComponents/depositList.js";
import WithdrawlList from "../userComponents/withdrawlList.js";
import SwapList from "../userComponents/swapList.js";
export default function ListDataUser() {
  const { listUserData, setListUserData, lang } = UserGlobalContext();

  const { chain } = useNetwork();

  useEffect(() => {
    setListUserData(false);
  }, [chain, setListUserData]);

  const [counter, setCounter] = useState(0)
  return (
    <div
      className={`${listUserData ? "heithPopupShow" : "heithPopup"
        } z-50   fixed overflow-hidden	 bg-fondOne mt-4 py-1 border-2 rounded-2xl border-white`}
    >
      <div className="w-full relative">
        <div
          className="absolute top-2 right-4 text-white cursor-pointer"
          onClick={() => setListUserData(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </div>

        <div className="flex w-full justify-around p-4">
          <button className="border py-3 px-4 rounded-3xl	border-intColorOne border-2" onClick={() => setCounter(2)}>
            <FontAwesomeIcon icon={faExchange} className="text-white text-lg" />
          </button>
          <button className="border py-3 px-4 rounded-3xl	border-intColorOne border-2" onClick={() => setCounter(0)}>
            <FontAwesomeIcon
              icon={faArrowDown}
              className="text-white text-lg"
            />
          </button>
          <button className="border py-3 px-4 rounded-3xl	border-intColorOne border-2" onClick={() => setCounter(1)}>
            <FontAwesomeIcon icon={faArrowUp} className="text-white text-lg" />
          </button>
        </div>
        <div className="w-full text-center text-white py-2">
          <h3>{counter == 0 ? lang ? 'DEPOSITOS' : 'DEPOSIT' : counter == 1 ?
            lang ? 'RETIROS' : 'WITHDRAWALS' : lang ? 'CAMBIOS' : 'CHANGES'}</h3>
        </div>
        {counter == 0 ? <DepositList /> : counter == 1 ?
          <WithdrawlList /> : <SwapList />}
      </div>
    </div>
  );
}
