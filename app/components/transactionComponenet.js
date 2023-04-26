"use client";
import { UserGlobalContext } from "@/provider/contextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DepositButtonComponent from "./buttons/depositButton";
const TransactionComponent = () => {
  const { address } = UserGlobalContext();
  const [options, setOptions] = useState(false);
  return (
    <>
      <button
        onClick={() => setOptions(!options)}
        className="z-20 optionButton text-white flex items-center justify-center border-2 border-intColorOne w-12 h-12 cursor-pointer	 rounded-full	fixed bottom-4  right-4"
      >
        <FontAwesomeIcon icon={faWallet} />
      </button>
      <DepositButtonComponent close={setOptions} options={options} />
      <button
        className={`optionButton transition-all	duration-500 bg-fondTwo text-white flex items-center justify-center border-2 border-intColorOne w-12 h-12 cursor-pointer	 rounded-full	fixed ${
          options ? "bottom-20" : "bottom-4"
        }  right-4`}
      >
        <FontAwesomeIcon icon={faArrowAltCircleDown} />
      </button>
    </>
  );
};
export default TransactionComponent;
