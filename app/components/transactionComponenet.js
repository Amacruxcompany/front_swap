"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DepositButtonComponent from "./buttons/depositButton";
import WithdrawlButtonComponent from "./buttons/withdrawlButton";
import ListClientButton from "./buttons/listClientButton";
import LangButtonComponent from "./buttons/langButton";
const TransactionComponent = () => {
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
      <WithdrawlButtonComponent close={setOptions} options={options} />
      <ListClientButton close={setOptions} options={options} />
      <LangButtonComponent close={setOptions} options={options} />
    </>
  );
};
export default TransactionComponent;
