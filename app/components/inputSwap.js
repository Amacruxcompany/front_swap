"use client";

import Image from "next/image";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useState } from "react";

const InputSwap = ({ pool, selected, read }) => {
  const { swap, setSwap, currencys } = UserGlobalContext();

  const [waitData, setWaitData] = useState(false);

  const swapEvent = async (data) => {
    if (!waitData) {
      setWaitData(true);
      const change = await fetch(
        `${process.env.AMAX_URL}/api/swapcalculated?` +
          new URLSearchParams({
            idCurrencySend: pool.assets[selected],
            idCurrencyReceive: selected == 0 ? pool.assets[1] : pool.assets[0],
            amountSend: data,
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      setWaitData(false);
    }
  };

  return (
    <div
      className={`${
        true ? "opacity-100" : "opacity-0"
      } h-32 w-10/12 flex justify-center  flex-col relative transition duration-500 ease-in-out`}
    >
      <button className="flex  justify-center items-start left-0 top-2 text-black font-bold text-lg absolute  h-max  select-none">
        <Image
          src={
            currencys.length > 0
              ? currencys.filter(
                  (data) => data.symbol == pool.assets[selected].toLowerCase()
                )[0]?.image
                ? currencys.filter(
                    (data) => data.symbol == pool.assets[selected].toLowerCase()
                  )[0]?.image
                : `/assets/nodata.jpg`
              : "https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"
          }
          key={pool.assets[selected]}
          alt={pool.assets[selected]}
          width={20}
          height={20}
        />
        <span className={`text-xs pl-2`}>0.00</span>
      </button>
      {read ? (
        <input
          value={swap.amountRecibe}
          className="w-full text-end border-4 border-violet-400  h-12 rounded-lg pr-5"
          readOnly
        />
      ) : (
        <input
          className="w-full text-end border-4 border-violet-400  h-12 rounded-lg pr-5"
          type="text"
          onKeyUp={(e) => swapEvent(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputSwap;
