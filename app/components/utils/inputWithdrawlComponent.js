"use client";

import { withdrawSaveService } from "@/app/services/paymentServices";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useState } from "react";
import { useNetwork } from "wagmi";

// import Web3 from "web3";

const InputWComponent = ({ data }) => {
  const [amount, setAmount] = useState("0");
  const [text, setText] = useState("0");
  const { chain } = useNetwork();
  const { address } = UserGlobalContext();

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

    if (+final > data.ammount) {
      return;
    }

    setText(final);
    setAmount(final);
  };

  const withdraw = async () => {
    if (amount && +amount != 0) {
      const response = await withdrawSaveService(
        data.coinName,
        address,
        amount,
        chain.network,
        data.coinName
      );
    }
  };

  return (
    <li className="flex justify-between items-center border border-0 h-14 border-b-2 border-b-sweet text-sweet">
      <div className="w-4/12 pl-2">
        <span>
          {data.coinName} {data.ammount}
        </span>
      </div>
      <input
        className="w-5/12 border h-full px-2 border-x-sweet"
        type="text"
        placeholder={data.ammount}
        onChange={(e) => amountControl(e)}
        value={text}
      />
      <button
        onClick={withdraw}
        className="h-full w-3/12 hover:bg-sweet hover:text-white  ease-in duration-300"
      >
        RETIRAR
      </button>
    </li>
  );
};

export default InputWComponent;
