"use client";

import Image from "next/image";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

const InputSwap = ({ pool, selected }) => {
  const { swap, setSwap, currencys } = UserGlobalContext();

  const [waitData, setWaitData] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [timer, setTimer] = useState(10);

  const [firstSwap, setFirstSwap] = useState(false);

  useEffect(() => {
    const repeat = async () => {
      if (!waitData && Number(inputValue) != NaN && Number(inputValue) > 0) {
        setWaitData(true);

        const res = await fetch(
          `${process.env.AMAX_URL}/api/swapcalculated?` +
            new URLSearchParams({
              idCurrencySend: pool.assets[selected],
              idCurrencyReceive:
                selected == 0 ? pool.assets[1] : pool.assets[0],
              amountSend: inputEvent,
            }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json());
        setSwap(res.data);
        setWaitData(false);
      }
    };

    if (firstSwap && !waitData) {
      setTimeout(() => {
        if (timer > 0 && firstSwap) {
          setTimer(timer - 1);
          console.log(timer);
        } else {
          repeat();
          setTimer(10);
        }
      }, 1000);
    }
  }, [inputValue, timer, waitData, selected, firstSwap, pool, setSwap]);

  const inputEvent = (event) => {
    const result = event.target.value.replace(
      /[A-Za-z\s!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g,
      ""
    );
    const firstOccuranceIndex = result.search(/\./) + 1;
    let resultStr =
      result.substr(0, firstOccuranceIndex) +
      result.slice(firstOccuranceIndex).replace(/\./g, "");
    if (resultStr[0] == ".") {
      resultStr = "0" + resultStr;
    }

    setInputValue(resultStr);
  };

  const swapEvent = async () => {
    if (!waitData && Number(inputValue) != NaN && Number(inputValue) > 0) {
      setWaitData(true);

      const res = await fetch(
        `${process.env.AMAX_URL}/api/swapcalculated?` +
          new URLSearchParams({
            idCurrencySend: pool.assets[selected],
            idCurrencyReceive: selected == 0 ? pool.assets[1] : pool.assets[0],
            amountSend: inputEvent,
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      console.log(res);
      setSwap(res.data);
      setWaitData(false);
      setFirstSwap(true);
    }
  };

  return (
    <div
      className={`${
        true ? "opacity-100" : "opacity-0"
      } h-32 w-10/12 flex justify-around items-center relative transition duration-500 ease-in-out`}
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
      <input
        value={inputValue}
        className="w-9/12 text-end border-4 border-violet-400  h-12 rounded-lg pr-5"
        type="text"
        onChange={(e) => inputEvent(e)}
      />
      <button
        onClick={swapEvent}
        className="w-2/12 border-4 border-purple-600 bg-fondOne text-white h-12 rounded-lg"
      >
        <FontAwesomeIcon icon={faCalculator} />
      </button>
    </div>
  );
};

export default InputSwap;
