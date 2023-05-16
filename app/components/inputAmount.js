"use client";

import Image from "next/image";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";

const InputAmount = ({ pool, selected }) => {
  const { swap, currencys } = UserGlobalContext();

  const [amount, setAmount] = useState("0.00");

  const [data, setData] = useState([]);

  useEffect(() => {
    if (currencys) {
      if (currencys.length > 0) {
        setData(currencys);
      }
    }
  }, [currencys]);

  useEffect(() => {
    if (swap) {
      setAmount(swap?.amountReceive);
    } else {
      setAmount("0.00");
    }
  }, [swap]);

  return (
    <div
      className={`${
        true ? "opacity-100" : "opacity-0"
      } h-32 w-10/12 flex justify-around items-center relative transition duration-500 ease-in-out`}
    >
      <button className="flex  justify-center items-start left-0 top-2 text-black font-bold text-lg absolute  h-max  select-none">
        <Image
          src={
            data.length > 0
              ? data.filter(
                  (data) => data.symbol == pool.assets[selected].toLowerCase()
                )[0]?.image
                ? data.filter(
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
      <input
        value={amount}
        className="w-full text-end border-4 border-violet-400  h-12 rounded-lg pr-5"
        type="text"
        readOnly
      />
    </div>
  );
};

export default InputAmount;
