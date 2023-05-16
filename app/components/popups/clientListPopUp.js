"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowDown,
  faArrowUp,
  faExchange,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNetwork } from "wagmi";
import SwapsList from "../userComponents/swapsList";
export default function ListDataUser() {
  const { listUserData, setListUserData } = UserGlobalContext();

  const { chain } = useNetwork();

  useEffect(() => {
    setListUserData(false);
  }, [chain, setListUserData]);
  return (
    <div
      className={`${
        listUserData ? "heithPopupShow" : "heithPopup"
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
          <button className="border py-3 px-4 rounded-3xl	border-intColorOne border-2">
            <FontAwesomeIcon icon={faExchange} className="text-white text-lg" />
          </button>
          <button className="border py-3 px-4 rounded-3xl	border-intColorOne border-2">
            <FontAwesomeIcon
              icon={faArrowDown}
              className="text-white text-lg"
            />
          </button>
          <button className="border py-3 px-4 rounded-3xl	border-intColorOne border-2">
            <FontAwesomeIcon icon={faArrowUp} className="text-white text-lg" />
          </button>
        </div>

        <SwapsList />
      </div>
    </div>
  );
}
