"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { UserGlobalContext } from "@/provider/contextProvider";


const ListCoinsComponent = ({ data, event }) => {
    const { lang } = UserGlobalContext()

    const [inputValue, setInputValue] = useState("0.00")

    const [counter, setCounter] = useState(0)

    const inputEvent = (event) => {
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

        const finalResult = resultStr;
        if (finalResult > data.ammount) {
            return;
        }

        setInputValue(finalResult);
    };


    const sendInfo = () => {
        if (counter == 1) {
            event({
                ...data,
                ammount: inputValue
            })
            setInputValue("0.00")
            setCounter(0)
        } else {
            setCounter(1)
        }
    }

    return (
        <div className=" h-32 md:h-20 gap-x-1.5 py-2 grid  grid-row-2  md:grid-cols-3 text-center items-center w-10/12 mx-auto">
            <span className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-full flex items-center justify-center border-4 border-indigo-500/100 text-xs	break-words	 ">{data.coinName} ({data.ammount})</span>


            <div className="rounded-b-lg md:rounded-bl-none md:rounded-r-lg h-full md:col-span-2 border-4 border-indigo-500/100  grid grid-cols-3">
                <input value={inputValue} onChange={inputEvent} type="text" className={`rounded-bl-md md:rounded-bl-none w-fulll col-span-2  px-2 text-black ${counter == 0 ? '' : 'hidden'}`} placeholder="0.00" />
                <span className={` ${counter == 1 ? '' : 'hidden'}  h-full w-full flex justify-center items-center text-xs break-words	`}>{inputValue}</span>
                <button onClick={() => setCounter(0)} className={` ${counter == 1 ? '' : 'hidden'}  h-full w-full flex justify-center items-center hover:text-black hover:bg-rose-600		transition-all	duration-500  bg-rose-500	`}><FontAwesomeIcon icon={faClose} /></button>
                <button onClick={sendInfo} className={`h-full w-full  hover:text-black hover:bg-intColorOne 	transition-all	duration-500 ${counter == 1 ? 'bg-green-500' : ''}`} >{counter == 0 ? lang ? 'Retirar' : 'Withdraw' : <FontAwesomeIcon icon={faCheck} />}</button>
            </div>
        </div>
    );
};

export default ListCoinsComponent;
