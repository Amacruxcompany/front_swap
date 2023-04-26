"use client";

import { useEffect, useState } from "react";
import { UserGlobalContext } from "@/provider/contextProvider";
import PoolListComponent from "../poolList";
import Image from "next/image";

export default function ListOfPool() {
  const { popUpPool, setPopUpPool, poolArray, setPool } = UserGlobalContext();

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
            className="md:cursor-pointer snap-always snap-center text-white my-3 bg-list-pool rounded-2xl transition-all duration-500 ease-in p-3 w-10/12 mx-auto relative"
          >
            {data.poolName}
            <PoolListComponent searchPool={data} />
          </li>
        );
      }
    } else {
      return (
        <li
          onClick={() => selectPool(data)}
          key={ind}
          className="md:cursor-pointer snap-always snap-center text-white my-3 bg-list-pool rounded-2xl transition-all duration-500 ease-in p-3 w-10/12 mx-auto relative"
        >
          {data.poolName}
          <PoolListComponent searchPool={data} />
        </li>
      );
    }
  });

  return (
    <div
      className={`${
        popUpPool ? "heithPopupShow" : "heithPopup"
      } z-50 flex justify-start items-center flex-col fixed bg-fondOne mt-4 py-4 border-2 rounded-2xl border-white`}
    >
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
