"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";

const PoolListComponent = ({ searchPool }) => {
  const { currencys } = UserGlobalContext();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (currencys) {
      if (currencys.length > 0) {
        setData(currencys);
      }
    }
  }, [currencys]);

  return (
    <div className="cursor-pointer text-xs	text-center	 flex w-full justify-center  ">
      {searchPool.assets[0]}/{searchPool.assets[1]}
    </div>
  );
};

export default PoolListComponent;
