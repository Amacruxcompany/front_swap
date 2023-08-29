"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import CalculatedComponent from "./swapComponents/calculateComponent";
import OptionsComponent from "./swapComponents/optionsComponent";
import PayButton from "./swapComponents/payButton";
import InputSendComponent from "./swapComponents/sendAmountInputComponent";

const HomeSwap = () => {
  const { graph } = UserGlobalContext();

  return (
    <div
      className={`bg-white py-4 px-2 rounded-xl ${
        graph ? "w-full" : "w-full md:w-6/12"
      } flex flex-col`}
    >
      <OptionsComponent />
      <InputSendComponent />
      <CalculatedComponent />
      <PayButton
        text={"PAGAR"}
        btnStyle={
          "border-2 border-sweet hover:text-sweet w-11/12 py-2 mt-2 rounded-lg mx-auto hover:bg-white bg-sweet text-white ease-in duration-300"
        }
      />
    </div>
  );
};

export default HomeSwap;
