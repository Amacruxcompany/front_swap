"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import Image from "next/image";
import { useEffect, useState } from "react";

const WithdrawalPopUp = () => {
  const { currencys } = UserGlobalContext();

  const [search, setSearch] = useState("");

  const showList =
    currencys.length <= 0
      ? ""
      : currencys.map((element, ind) => {
          if (search != "") {
            if (element.symbol.toLowerCase().includes(search.toLowerCase())) {
              return (
                <div
                  key={ind}
                  className="flex w-10/12 mx-auto cursor-pointer  justify-around items-center my-4 listCoins"
                >
                  <span>{element.symbol}</span>
                  <Image
                    src={element.image}
                    width={30}
                    height={30}
                    alt={element.symbol}
                  />
                </div>
              );
            }
          } else {
            return (
              <div
                key={ind}
                className="flex w-10/12 mx-auto cursor-pointer  justify-around items-center my-4 listCoins"
              >
                <span>{element.symbol}</span>
                <Image
                  src={element.image}
                  width={30}
                  height={30}
                  alt={element.symbol}
                />
              </div>
            );
          }
        });

  return (
    <div
      className={`${
        false ? "heithPopupShow" : "heithPopup"
      } z-50   fixed overflow-hidden	 bg-fondOne mt-4 py-4 border-2 rounded-2xl border-white text-center text-white`}
    >
      <h3>Retiro</h3>
      <div className="overflow-y-scroll  w-10/12 mx-auto h-96 ">
        <input
          type="text"
          className="w-8/12 border-none rounded-2xl h-6 text-center text-black"
          onChange={(e) => setSearch(e.target.value)}
        />
        {showList}
      </div>
    </div>
  );
};

export default WithdrawalPopUp;
