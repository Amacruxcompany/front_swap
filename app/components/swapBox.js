"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import InputSwap from "./inputSwap";
import { UserGlobalContext } from "@/provider/contextProvider";
import CalculatedBox from "./calculateBox";
import InputAmount from "./inputAmount";
import { useState, useEffect } from "react";
export default function SwapBox() {
  const { pool, swap, userId, completeSwap, setCompleteSwap, lang } = UserGlobalContext();

  const [data, setData] = useState([0, 1]);


  const [timer, setTimer] = useState(10)



  const [swapData, setSwapData] = useState({})

  useEffect(() => {
    if (swap) {
      setSwapData(swap)
    }
  }, [swap])

  const changeSwap = () => {
    if (data[0] == 0) {
      setData([1, 0]);
    } else {
      setData([0, 1]);
    }
  };

  const swapEvent = async () => {
    console.log(timer)
    if (timer == 10 || swapData.amountSend == 0 || swapData.amountSend == "0.00" || !userId) {
      return
    }


    const data = await fetch(
      `${process.env.AMAX_URL}/api/swapEvent?` +
      new URLSearchParams({
        userId: +userId,
        coinSend: swapData.idCurrencySend,
        coinRecibe: swapData.idCurrencyReceive,
        amountSend: swapData.amountSend,
        amountRecibe: swapData.amountReceive
      }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (data.data) {
      setCompleteSwap(!completeSwap)
      setTimer(10)
    }
  }


  return (
    <div className="flex justify-center w-10/12 mx-auto md:w-full  items-center flex-col md:col-start-7 md:col-end-9 mt-5">
      <div className="pb-3 pt-8 flex flex-col justify-items-center items-center h-max bg-white-transparent w-full rounded-lg">
        <InputSwap pool={pool} selected={data[0]} read={false} setTimerExternal={setTimer} />

        <div
          className="h-8 flex justify-center items-center md:cursor-pointer hover:scale-150	 transition duration-700	 ease-in-out pb-3 w-max"
          onClick={changeSwap}
        >
          <FontAwesomeIcon icon={faExchangeAlt} className="rotate-90 h-6" />
        </div>

        <InputAmount pool={pool} selected={data[1]} read={true} />

        <CalculatedBox />

        <button
          onClick={swapEvent}
          className={`mt-3 bg-intColorTwo text-white px-3 py-1 rounded-md ${true ? "" : "hidden"
            }`}
        >
          {lang ? 'CAMBIAR' : 'CHANGE'}
        </button>
      </div>
    </div>
  );
}
