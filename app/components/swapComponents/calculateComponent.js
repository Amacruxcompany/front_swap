"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Web3 from "web3";

const CalculatedComponent = () => {
  const { swap, setRealSwap } = UserGlobalContext();

  const [info, setInfo] = useState({
    idCurrencySend: "BNB",
    idCurrencyReceive: "BTC",
    amountSend: "0",
    amountReceive: "0",
    price: "0",
    slippage: "0",
    fee: "0",
    priceQuote: "0",
    priceBase: "0",
  });

  useEffect(() => {
    if (swap.fee) {
      setInfo(swap);
      setRealSwap(swap);
    }
  }, [swap, setRealSwap]);

  return (
    <div className="break-all	 mt-2 min-h-fit  w-11/12 mx-auto flex flex-col items-center group ">
      <div className="my-2 border text-xs px-2  ease-in duration-300	group-hover:border-sweet border-gray-400	border-2 w-full  rounded flex justify-between items-center ">
        <span className=" ease-in duration-300 md:w-max border  border-r-gray-400 group-hover:border-sweet  border-0 border-r-2 py-2 pr-2">
          Total {info.idCurrencyReceive}
        </span>
        <span>
          {info.amountReceive != "N/D"
            ? Web3.utils.fromWei(
                Web3.utils.toWei(info.amountReceive, "ether"),
                "ether"
              )
            : "0"}
        </span>
      </div>

      <div className="my-2 border text-xs px-2  ease-in duration-300	group-hover:border-sweet border-gray-400	border-2 w-full  rounded flex justify-between items-center ">
        <span className=" ease-in duration-300 md:w-max border  border-r-gray-400 group-hover:border-sweet  border-0 border-r-2 py-2 pr-2">
          Precio {info.idCurrencySend}
        </span>
        <span>
          {info.priceQuote != "N/D"
            ? Web3.utils.fromWei(
                Web3.utils.toWei(info.priceQuote, "ether"),
                "ether"
              )
            : "0"}
        </span>
      </div>

      <div className="my-2 border text-xs px-2  ease-in duration-300	group-hover:border-sweet border-gray-400	border-2 w-full  rounded flex justify-between items-center ">
        <span className=" ease-in duration-300 md:w-max border  border-r-gray-400 group-hover:border-sweet  border-0 border-r-2 py-2 pr-2">
          Precio {info.idCurrencyReceive}
        </span>
        <span>
          {info.priceBase != "N/D"
            ? Web3.utils.fromWei(
                Web3.utils.toWei(info.priceBase, "ether"),
                "ether"
              )
            : "0"}
        </span>
      </div>

      <div className="my-2 border text-xs pl-2  ease-in duration-300	group-hover:border-sweet border-gray-400	border-2 w-full  rounded flex justify-between items-center ">
        <span className=" ease-in duration-300 border md:w-max   border-r-gray-400 group-hover:border-sweet  border-0 border-r-2 py-2 pr-2">
          Comisión
        </span>
        <div>
          <span className="pr-2">{info.fee}</span>
          <span className="border border-0 border-l-2 text-xs px-2 py-2	group-hover:border-sweet border-gray-400">
            {info.idCurrencyReceive}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalculatedComponent;
