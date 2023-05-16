"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBalance } from "wagmi";

const WithdrawalPopUp = () => {
  const { currencys, popUpWithdral, setPopUpWithdral, address } =
    UserGlobalContext();

  const { data } = useBalance({
    address: address,
  });

  const [search, setSearch] = useState("");

  const [dataArray, setData] = useState([]);

  useEffect(() => {
    console.log(currencys);
    if (currencys) {
      if (currencys.length <= 0 && typeof currencys != "string") {
        setData(currencys);
      }
    }
  }, [currencys]);

  useEffect(() => {
    setPopUpWithdral(false);
  }, [data, setPopUpWithdral]);

  const showList =
    dataArray.length <= 0 && typeof dataArray != "string"
      ? ""
      : dataArray.map((element, ind) => {
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
      onClick={() => setPopUpWithdral(false)}
      className={`${
        popUpWithdral ? "heithPopupShow" : "heithPopup"
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
