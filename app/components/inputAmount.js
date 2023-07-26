"use client";

import Image from "next/image";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";

const InputAmount = ({ pool, selected }) => {
  const { swap, currencys, userId, completeSwap } = UserGlobalContext();

  const [amount, setAmount] = useState("0.00");

  const [data, setData] = useState([]);

  const [maxAmmount, setMaxAmmount] = useState("0.00");

  const [listUserCoins, setListUserCoins] = useState([]);

  useEffect(() => {
    if (currencys) {
      if (currencys.length > 0) {
        setData(currencys);
      }
    }
  }, [currencys]);

  useEffect(() => {
    if (userId && pool) {
      const getData = async () => {
        const list = await fetch(
          `${process.env.AMAX_URL}/api/allcoins?` +
            new URLSearchParams({
              userId: userId,
            }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json());

        setListUserCoins(list);
      };

      getData();
    }
  }, [pool, userId, completeSwap]);

  useEffect(() => {
    if (swap) {
      setAmount(swap?.amountReceive);
    } else {
      setAmount("0.00");
    }
  }, [swap]);

  useEffect(() => {
    const valueToShow = listUserCoins.filter(
      (data) => data.coinName == pool.assets[selected]
    );

    if (valueToShow.length > 0) {
      setMaxAmmount(valueToShow[0].ammount);
    } else {
      setMaxAmmount("0.00");
    }
  }, [listUserCoins, pool, selected]);

  useEffect(() => {
    setAmount("0.00");
  }, [completeSwap]);

  return (
    <div
      className={`${
        true ? "opacity-100" : "opacity-0"
      } h-32 w-10/12 flex justify-around items-center relative transition duration-500 ease-in-out`}
    >
      <button className="flex  justify-center items-center left-0 top-2 text-black font-bold text-lg absolute  h-max  select-none">
        {pool.assets[selected]}
        <span className={`text-xs pl-2`}>{maxAmmount}</span>
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
