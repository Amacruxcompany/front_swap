'use client'
import { useState } from "react"
import InputCurrency from "./inputCurrencyComponeent"


export default  function  SwapBox({selected}){

    //?manejo de los estados del la moneda seleccionada
    const [firstCurrency, setFirstCurrency] = useState(0)
    const [secondCurrency, setSecondCurrency] = useState(1)
    const [opacity, setOpacity] = useState(true)
    //*funcion que manejara toda la logica de los swaps


    //*funcion que intercambia las monedas
    const changeControl = () =>{
        if(opacity){
            setOpacity(false)
            setTimeout(() => {
                setFirstCurrency(secondCurrency)
                setSecondCurrency(firstCurrency)
            }, 600);
            setTimeout(() => {
                setOpacity(true)
            }, 600);
        }
    }

    return(
        <div className="flex justify-center w-10/12 mx-auto md:w-full  items-center flex-col md:col-start-7 md:col-end-9 mt-5"> 
            <div className="pb-3 pt-5 flex flex-col justify-items-center items-center h-80 bg-white-transparent w-full rounded-lg">
                {selected ? <InputCurrency styleData={opacity} poolOption={selected[firstCurrency]}/> : null}

                <div className="flex justify-center items-center md:cursor-pointer hover:rotate-180 transition duration-700	 ease-in-out" onClick={changeControl}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>

                {selected ? <InputCurrency styleData={opacity}  poolOption={selected[secondCurrency]}/> : null}
            </div>


        </div>
    )
}

