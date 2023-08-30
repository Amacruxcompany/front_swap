"use client";
import { calculateSwap } from "@/app/services/swapService";
import { UserGlobalContext } from "@/provider/contextProvider";
import { faCalculator, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const InputSendComponent = () => {
  const { setSwap, group } = UserGlobalContext();

  const [index, setIndex] = useState(0);
  const [amount, setAmount] = useState("0");
  const [pool, setPool] = useState({
    poolId: 18,
    poolName: "BNB/BTC",
    assets: ["BNB", "BTC"],
  });
  const [text, setText] = useState("0");

  const swap = async (send, recibe, amount) => {
    const data = await calculateSwap(send, recibe, amount);

    setSwap(data);
  };

  const amountControl = (event) => {
    const result = event.target.value.replace(
      /[A-Za-z\s!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g,
      ""
    );
    const firstOccuranceIndex =
      result.search(/\./) != -1 ? result.search(/\./) : result.length;

    let formatText =
      result.slice(0, firstOccuranceIndex + 1) +
      result.slice(firstOccuranceIndex).replaceAll(".", "");

    let final = formatText[0] == "." ? "0." : formatText;

    setText(final);
    setAmount(final);
  };

  const swapCoins = async () => {
    let num = 0;
    if (index == 0) {
      num = 1;
      setIndex(1);
    } else {
      num = 0;
      setIndex(0);
    }

    if (amount && amount != "0") {
      await swap(pool.assets[num], pool.assets[num == 0 ? 1 : 0], amount);
    }
  };

  useEffect(() => {
    if (group.assets) {
      setIndex(0);
      setSwap({
        idCurrencySend: group.assets[0],
        idCurrencyReceive: group.assets[1],
        amountSend: "0",
        amountReceive: "0",
        price: "0",
        slippage: "0",
        fee: "0",
        priceQuote: "0",
        priceBase: "0",
      });
      setText("0");
    }
  }, [group, setSwap]);

  useEffect(() => {
    if (group.assets) {
      setPool(group);
    }
  }, [group]);

  return (
    <div className="w-11/12 min-h-fit  mx-auto flex justify-between items-center">
      <div className=" flex justify-center w-6/12 md:w-8/12 pr-2 ">
        <div className="w-full flex relative">
          <label className=" top-0 text-sweet left-2 absolute bg-white px-1 text-xs">
            Monto
          </label>
          <input
            className={`border h-11 mt-2	border-sweet
            }	border-2 w-full  rounded p-2 text-black rounded-r-none border-r-0  text-xs`}
            placeholder="0.00"
            onChange={(e) => amountControl(e)}
            value={text}
          />
        </div>
        <span className="w-2/12 text-sweet h-11 mt-2 border border-sweet border-2 rounded-r text-xs text-center flex items-center justify-center px-4">
          {pool.assets[index]}
        </span>
      </div>
      <button
        className="w-3/12 h-11 text-center py-1  ml-0  mt-2 text-2xl md:text-xl md:m-0 md:mr-2  md:w-2/12   border border-sweet border-2 mr-2 rounded text-sweet md:mt-2 hover:bg-sweet hover:text-white ease-in duration-300"
        onClick={() =>
          swap(group.assets[index], group.assets[index == 0 ? 1 : 0], amount)
        }
      >
        <FontAwesomeIcon icon={faCalculator} />
      </button>
      <button
        className="w-3/12 h-11  text-center py-1 mr-0 ml-auto text-2xl md:text-xl   md:py-0	 mt-2 md:m-0 md:w-2/12  border border-sweet border-2 rounded  text-sweet  md:mt-2  hover:bg-sweet hover:text-white ease-in duration-300"
        onClick={swapCoins}
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
  );
};

export default InputSendComponent;
