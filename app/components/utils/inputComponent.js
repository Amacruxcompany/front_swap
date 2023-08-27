"use client";

import Web3 from "web3";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ABI from "../../../public/abi.json";
import { useEffect, useState } from "react";
import { UserGlobalContext } from "@/provider/contextProvider";
import {
  depositSaveService,
  saveCoinService,
} from "@/app/services/paymentServices";

const InputComponent = ({ data }) => {
  const [info, setInfo] = useState({});
  const [chains, setChains] = useState({});
  const [amount, setAmount] = useState("0");
  const [text, setText] = useState("0");

  const { chain, setRefresh, address } = UserGlobalContext();

  //? logica externa para hacer pagos
  const { config } = usePrepareContractWrite({
    address: info.token_address,
    abi: ABI,
    chainId: chains.id ? chains.id : 1,
    contractInterface: "abi file",
    functionName: "transfer",
    args: [process.env.WALLET, Web3.utils.toWei(amount, "ether")],
    enabled: Boolean(Web3.utils.toWei(amount, "ether")),
  });

  const { write, isLoading, isError, isSuccess } = useContractWrite(config);

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

    if (+final > Number(Web3.utils.fromWei(data.balance, "ether")).toFixed(4)) {
      return;
    }

    setText(final);
    setAmount(final);
  };

  useEffect(() => {
    setInfo(data);
    if (chain) {
      setChains(chain);
    }
  }, [data, chain]);

  const depositEvent = async () => {
    if (!isLoading && +amount > 0) {
      await saveCoinService(data.symbol);
      write?.();
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess && !isError) {
      const saveDeposit = async () => {
        const data = await depositSaveService(address, data.symbol, amount);
      };

      saveDeposit();
      setRefresh(true);
    }
  }, [isLoading, isError, isSuccess, setRefresh, data, amount, address]);

  return (
    <li className="flex justify-between items-center border border-0 h-14 border-b-2 border-b-sweet">
      <div className="w-4/12 pl-2">
        <span>
          {Number(Web3.utils.fromWei(data.balance, "ether")).toFixed(4)}{" "}
          {data.symbol}
        </span>
      </div>
      <input
        className="w-5/12 border h-full px-2 border-x-sweet"
        type="text"
        placeholder="0.00"
        onChange={(e) => amountControl(e)}
        value={text}
      />
      <button onClick={depositEvent} className="w-3/12">
        Depositar
      </button>
    </li>
  );
};

export default InputComponent;
