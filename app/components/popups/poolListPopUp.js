"use client";

import { useEffect, useState } from "react";
import { UserGlobalContext } from "@/provider/contextProvider";
import PoolListComponent from "../poolList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ListOfPool() {
  const { popUpPool, setPopUpPool, poolArray, setPool, setSwap } = UserGlobalContext();

  const [search, setSearch] = useState("");

  const [showData, setShowData] = useState([
    {
      poolName: "BNB/BTC",
      assets: ["BNB", "BTC"],
      poolId: 18,
    },
  ]);

  const selectPool = (data) => {
    setPool(data);
    setPopUpPool(!popUpPool);
    setSwap({
      idCurrencySend: "",
      idCurrencyReceive: "",
      amountSend: "0.00",
      amountReceive: "0.00",
      price: "0",
      slippage: "0",
      fee: "0",
      priceQuote: "0",
      priceBase: "0",
    })
  };

  useEffect(() => {
    if (poolArray) {
      setShowData(poolArray);
    }
  }, [popUpPool, poolArray]);

  const showPools = showData.map((data, ind) => {
    if (search != "") {
      if (data.poolName.toLowerCase().includes(search.toLowerCase())) {
        return (
          <li
            onClick={() => selectPool(data)}
            key={ind}
            className="flex justify-between md:cursor-pointer snap-always snap-center text-white my-3 bg-list-pool rounded-2xl transition-all duration-500 ease-in p-3 w-10/12 mx-auto relative"
          >
            {data.poolName}
            <Image
              src={"/assets/miniLogo.png"}
              key={ind}
              alt={data.poolName}
              width={20}
              height={20}
            />
          </li>
        );
      }
    } else {
      return (
        <li
          onClick={() => selectPool(data)}
          key={ind}
          className="flex justify-between md:cursor-pointer snap-always snap-center text-white my-3 bg-list-pool rounded-2xl transition-all duration-500 ease-in p-3 w-10/12 mx-auto relative"
        >
          {data.poolName}
          <Image
            src={"/assets/miniLogo.png"}
            key={ind}
            alt={data.poolName}
            width={20}
            height={20}
          />
        </li>
      );
    }
  });

  return (
    <div
      className={`${popUpPool ? "heithPopupShow" : "heithPopup"
        } z-50 flex justify-start items-center flex-col fixed bg-fondOne mt-4 py-4 border-2 rounded-2xl border-white`}
    >
      <div
        className="absolute top-2 right-4 text-white cursor-pointer"
        onClick={() => setPopUpPool(false)}
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
      <input
        type="text"
        className="w-8/12 border-none rounded-2xl h-2/6 text-center"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-none h-4/6 	overflow-y-scroll scroll-smooth w-11/12 mt-5 snap-y snap-mandatory">
        {showPools}
      </ul>
    </div>
  );
}
