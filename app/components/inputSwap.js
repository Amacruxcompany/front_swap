"use client";

import Image from "next/image";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

import { toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InputSwap = ({ pool, selected, setTimerExternal }) => {
  const { userId, setSwap, completeSwap, lang } = UserGlobalContext();

  const [waitData, setWaitData] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [timer, setTimer] = useState(10);

  const [firstSwap, setFirstSwap] = useState(false);



  const [listUserCoins, setListUserCoins] = useState([]);

  const [maxAmmount, setMaxAmmount] = useState("0.00");

  const [poolSelected, setPoolSelected] = useState("LOADING...");

  const [user, setUser] = useState(0)

  useEffect(() => {
    setUser(userId)
  }, [userId])



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
    if (firstSwap) {
      setTimeout(() => {
        if (timer > 0 && firstSwap) {
          setTimer(timer - 1);
          setTimerExternal(timer - 1)
        } else {
          setTimer(10);
          setTimerExternal(10)
          setFirstSwap(false)
        }
      }, 1000);
    } else {
      setTimer(10);
      setTimerExternal(10)
    }
  }, [firstSwap, timer, setTimerExternal]);

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

    const finalResult = resultStr;
    if (finalResult > maxAmmount) {
      return;
    }

    setInputValue(finalResult);
  };

  const alertsEvent = (data) => {
    toast(data.message, { hideProgressBar: false, autoClose: 5000, type: data.type, position: 'top-right', transition: Zoom })
  }

  const swapEvent = async () => {
    if (user == 0) {
      return;
    }

    if (timer != 10) {
      return
    }

    if (!waitData && Number(inputValue) != NaN && Number(inputValue) > 0) {
      setWaitData(true);

      const numberData = inputValue;

      const res = await fetch(
        `${process.env.AMAX_URL}/api/swapcalculated?` +
        new URLSearchParams({
          idCurrencySend: pool.assets[selected],
          idCurrencyReceive: selected == 0 ? pool.assets[1] : pool.assets[0],
          amountSend: numberData,
        }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      if (res.data) {
        setSwap(res.data);
        setWaitData(false);
        setFirstSwap(true);
        alertsEvent({ type: 'success', message: lang ? 'Cambio generado correctamente' : 'Successfully Generated Change' })


      } else {
        setWaitData(false)
        alertsEvent({ type: 'error', message: res.message })
      }


    }
  };

  useEffect(() => {
    setFirstSwap(false);
    setTimer(10)
    setTimerExternal(10)
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
    setInputValue("0.00")
  }, [completeSwap, setSwap, setTimerExternal])

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
    setPoolSelected(pool.assets[selected]);
    setInputValue("0");
  }, [selected, pool]);
  return (
    <div
      className={`${true ? "opacity-100" : "opacity-0"
        } h-32 w-10/12 flex justify-around items-center relative transition duration-500 ease-in-out`}
    >
      <button className="flex  justify-center items-center left-0 top-2 text-black font-bold text-lg absolute  h-max  select-none">
        {poolSelected}
        <span className={`text-xs pl-2`}>{maxAmmount}</span>
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
        {timer == 10 ? <FontAwesomeIcon icon={faCalculator} /> : timer + 's'}
      </button>
    </div>
  );
};

export default InputSwap;
