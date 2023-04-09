"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import InputSwap from "./inputSwap";
import { UserGlobalContext } from "@/provider/contextProvider";
import CalculatedBox from "./calculateBox";
export default function SwapBox() {
  const { pool } = UserGlobalContext();

  return (
    <div className="flex justify-center w-10/12 mx-auto md:w-full  items-center flex-col md:col-start-7 md:col-end-9 mt-5">
      <div className="pb-3 pt-8 flex flex-col justify-items-center items-center h-max bg-white-transparent w-full rounded-lg">
        <InputSwap pool={pool} selected={0} read={false} />

        <div className="h-8 flex justify-center items-center md:cursor-pointer hover:scale-150	 transition duration-700	 ease-in-out pb-3 w-max">
          <FontAwesomeIcon icon={faExchangeAlt} className="rotate-90 h-6" />
        </div>

        <InputSwap pool={pool} selected={1} read={true} />

        <CalculatedBox />

        <button
          className={`mt-3 bg-intColorTwo text-white px-3 py-1 rounded-md ${
            true ? "" : "hidden"
          }`}
        >
          COMPLETAR
        </button>
      </div>
    </div>
  );
}
