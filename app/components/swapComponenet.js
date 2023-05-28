"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import PoolListComponent from "./poolList";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";
import SwapBox from "./swapBox";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toast, Zoom } from "react-toastify";
import Spinner from "./spinnersComponents/spinner";

const SwapComponent = ({ pools, list }) => {
  //Estados Globales
  const { setPoolArray, setPopUpPool, popUpPool, pool, setCurrencys } =
    UserGlobalContext();

  const showDataEvent = () => {
    setPopUpPool(!popUpPool);
  };

  const [init, setInit] = useState(3)

  useEffect(() => {
    setPoolArray(pools);
    if (list) {
      setCurrencys(list.data);
    } else {
      setCurrencys([]);
    }
  }, [pools, setPoolArray, list, setCurrencys]);

  useEffect(() => {
    if (init > 0) {
      setTimeout(() => {
        setInit(init - 1)
      }, 1000);
    }
  }, [init])


  return (
    <>
      <ToastContainer />
      {init > 0 || !pools ? <div class="background z-50">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> : ''}
      <div className="z-0 mx-auto flex justify-center md:justify-around items-center flex-col md:flex-row w-full w-max-full container heighSwapComponenet mt-8">
        <div className="w-full md:w-80 flex flex-col swapResponsive">
          <div className=" w-10/12 md:w-full mx-auto p-2  mb-3 flex justify-around bg-fondOne border-2 border-purple-400 rounded-2xl">
            <span
              className="md:cursor-pointer flex justify-center w-20 py-4 px-2 border-x-2  text-white  items-center h-8 mt-2"
              onClick={showDataEvent}
            >
              <PoolListComponent searchPool={pool} />
            </span>
            <button className="w-2/12  py-2 my-2 px-4 text-white border-x-2 flex justify-center">
              <FontAwesomeIcon icon={faChartLine} />
            </button>
          </div>

          <SwapBox />
        </div>

      </div>

    </>
  );
};

export default SwapComponent;
