"use client";

import { useEffect, useState } from "react";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useContractWrite, useNetwork, usePrepareContractWrite } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ABI from "../../abi.json";
import Web3 from "web3";
import Image from "next/image";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useBalance } from "wagmi";

export default function ListOfPay() {
  const { popUpPay, setPopUpPay, payArray, address } = UserGlobalContext();

  const { chain } = useNetwork();

  //?pasos del formulario
  const [counter, setCounter] = useState(0);
  const [info, setInfo] = useState({});
  const [inputValue, setInputValue] = useState("0");
  const [formatAmmount, setFormatAmmount] = useState("0");

  //? logica externa para hacer pagos
  const { config } = usePrepareContractWrite({
    address: info.token_address,
    abi: ABI,
    chainId: chain ? chain.id : 1,
    contractInterface: "abi file",
    functionName: "transfer",
    args: ["0x464100a0700b8101784cbb71ada5a5d138545a15", formatAmmount],
    enabled: Boolean(formatAmmount),
  });

  const { write, isLoading, isError, isSuccess } = useContractWrite(config);
  //TODO Contratos
  const contract = async () => {
    write?.();
  };

  const { data } = useBalance({
    address: address,
  });

  useEffect(() => {}, [payArray]);

  useEffect(() => {
    const valu = inputValue ? inputValue : "0";
    setFormatAmmount(Web3.utils.toWei(valu, "ether"));
  }, [inputValue]);

  useEffect(() => {
    if (isSuccess && !isLoading && !isError) {
      setPopUpPay(false);
      setInputValue("0");
      setCounter(0);
      setInfo({});
    }
  }, [isSuccess, isError, setPopUpPay, isLoading]);

  useEffect(() => {
    setPopUpPay(false);
    setInputValue("0");
    setCounter(0);
    setInfo({});
  }, [data, setPopUpPay]);

  const formPay = (data) => {
    setInfo(data);
    setCounter(1);
  };

  const payEvent = (e) => {
    e.preventDefault();
    if (Number(inputValue) == NaN || inputValue < 0 || inputValue == "0") {
      return;
    }
    contract();
  };

  const formatInput = (event) => {
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

    if (Number(resultStr) > Number(Web3.utils.fromWei(info.balance, "ether"))) {
      event.preventDefault();
      return;
    }
    setInputValue(resultStr);
  };

  const closeEvent = () => {
    setPopUpPay(false);
    setInputValue("0");
    setCounter(0);
    setInfo({});
  };

  const showData =
    payArray.length <= 0 ? (
      <h3>No Data</h3>
    ) : (
      payArray.map((data, ind) => (
        <div
          onClick={() => formPay(data)}
          key={ind}
          className={`${
            counter == 0 ? "" : "hidden"
          } grid grid-cols-3	w-10/12 mx-auto cursor-pointer items-center hoverPay`}
        >
          <span className="text-center text-white border-2  border-y-transparent">
            {data.symbol}
          </span>
          <span className="text-center text-white border-2  border-y-transparent">
            {data.decimals}
          </span>
          <span className="text-center text-white border-2  border-y-transparent">
            {Web3.utils.fromWei(data.balance, "ether")}
          </span>
        </div>
      ))
    );

  return (
    <div
      className={`${
        popUpPay ? "heithPopupShow" : "heithPopup"
      } z-50   fixed overflow-hidden	 bg-fondOne mt-4 py-4 border-2 rounded-2xl border-white`}
    >
      <div className="w-full relative">
        <div
          className="absolute -top-2 right-4 text-white cursor-pointer"
          onClick={() => closeEvent()}
        >
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div
          className={`${
            counter == 0 ? "" : "hidden"
          } grid grid-cols-3	w-10/12 mx-auto items-center`}
        >
          <span className="text-center text-white">Simbolo</span>
          <span className="text-center text-white">Decimales</span>
          <span className="text-center text-white">Monto</span>
        </div>
        {showData}
      </div>
      <form
        className={` ${
          counter == 1 ? "" : "hidden"
        } w-10/12 mx-auto flex flex-col justify-around items-center h-48 relative`}
      >
        <label htmlFor="amount" className="text-white">
          Ingrese el Monto en {info.symbol ? info.symbol : "No data"}
        </label>
        <input
          className="inputPay"
          id="amount"
          type="text"
          value={inputValue}
          onChange={(e) => formatInput(e)}
        />

        <span className="text-white">
          Monto maximo:{" "}
          {info.balance ? Web3.utils.fromWei(info.balance, "ether") : "0.00"}
        </span>

        <button
          onClick={(e) => payEvent(e)}
          className="w-full py-2 px-2 col-start-1 col-end-4 md:col-start-7 md:col-end-9 flex justify-center  truncate ... overflow-hidden     rounded-3xl	hover:bg-intColorOne text-intColorOne hover:text-black	border-intColorOne border-2 transition-all	duration-500"
        >
          DEPOSITAR
        </button>
        <div
          className={`${
            isLoading && !isSuccess ? "" : "hidden"
          } absolute top-8`}
        >
          <Image
            src={
              "https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif"
            }
            alt="loading"
            width={500}
            height={500}
          />
        </div>
      </form>
    </div>
  );
}
