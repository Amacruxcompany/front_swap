'use client'
import { useEffect, useState } from "react"
import InputCurrency from "./inputCurrencyComponeent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons"
import { getSwapprice } from "@/services/swapServices"
import InputCalculated from "./InputCalculated"
import ListOfPool from "./listOfpool"
import Swal from "sweetalert2"
import AmountComponet from "./amountComponenet"


export default  function  SwapBox({selected, handlreSearching, pool, selectPool, searching , handlreShow}){

    //?manejo de los estados del la moneda seleccionada
    const [firstCurrency, setFirstCurrency] = useState(0)
    const [secondCurrency, setSecondCurrency] = useState(1)
    const [opacity, setOpacity] = useState(true)
    //? booleano con el que evito que se hagan peticiones a cada rato cuando se escriba
    const [waitData , setWaitData] = useState(false)

    //?estado de la prefactura
    const [calculatedData, setCalculatedData] = useState({})

    //? estado del valor buscado
    const [amount, setAmount] = useState('0')


    //? Estado ide de joseline
    const [beforeAmount, setBeforeAmount] = useState('0')

    //?estado que manipula la seleccion desde arriba del pool
    const [newPool, setNewPool] = useState(true)

    //? estado de la prefactura
    const [preventViewAmoun, setPrevenViewAmount] = useState(false)


    const [priceBase, setPriceBase] = useState('')
    const [priceQuote , setPriceQuote] = useState('')

    

    //*Funcion que hara el calculo del Swap
    useEffect(() =>{
        if(amount != '0'){
                if(!waitData && amount != beforeAmount){
                    setPrevenViewAmount(false)
                    setWaitData(true)
                    getSwapprice(selected[firstCurrency], selected[secondCurrency], amount)
                    .then(res => {
                        if(res.data){
                            setPriceBase(res.data.priceBase)
                            setPriceQuote(res.data.priceQuote)
                            setCalculatedData(res.data)
                            setOpacity(true)
                            setWaitData(false)
                            setBeforeAmount(res.data.amountSend)
                            setPrevenViewAmount(true)
                        }else{
                            Swal.fire({
                                position: 'top-end',
                                icon: 'info',
                                title: res.message,
                                showConfirmButton: false,
                                timer: 2000
                              })
                            setBeforeAmount(amount)
                            setWaitData(false)
                            setOpacity(true)
                        }
                    }).catch((err) =>{
                        setBeforeAmount(amount)
                        setWaitData(false)
                    })
                }
        }
    }, [amount, firstCurrency, secondCurrency, selected, waitData, beforeAmount])

    const selectNewPoolCalculated = async (value) =>{
        setFirstCurrency(0)
        setSecondCurrency(1)
        handlreShow(value)
        setNewPool(false)
    }

    useEffect(() =>{
        if(!newPool){
            setPrevenViewAmount(false)
            getSwapprice(selected[firstCurrency], selected[secondCurrency], amount)
            .then((res) => {
                if(res.data){
                    setCalculatedData(res.data)
                    setPriceBase(res.data.priceBase)
                    setPriceQuote(res.data.priceQuote)
                    setPrevenViewAmount(true)
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 2000
                      })
                }
            })
            .then((res) => setNewPool(true))
        }
    }, [amount, firstCurrency, secondCurrency, selected, newPool])



    //*funcion que intercambia las monedas
    const changeControl = async () =>{
       if(opacity){
        setOpacity(false)

        setPrevenViewAmount(false)
        await getSwapprice(selected[secondCurrency], selected[firstCurrency], amount).then((res) => 
        {
        setFirstCurrency(secondCurrency)
        setSecondCurrency(firstCurrency)
        setPriceBase(res.data.priceBase)
        setPriceQuote(res.data.priceQuote)
        setOpacity(true)
        setCalculatedData(res.data)
        setPrevenViewAmount(true)
        }
        )
       }
    }


    

    return(
        <div className="flex justify-center w-10/12 mx-auto md:w-full  items-center flex-col md:col-start-7 md:col-end-9 mt-5"> 
            <div className="pb-3 pt-8 flex flex-col justify-items-center items-center h-max bg-white-transparent w-full rounded-lg">
                {selected[0] ? <InputCurrency currencyValue={ priceQuote}   handlerCalculate={setAmount} handlreSearching={handlreSearching} styleData={opacity} poolOption={selected[firstCurrency]}/> : null}
                <div className="h-14 flex justify-center items-center md:cursor-pointer hover:scale-150	 transition duration-700	 ease-in-out pb-3 w-max" onClick={changeControl}>
                    <FontAwesomeIcon icon={faExchangeAlt} className='rotate-90 h-6'/>
                </div>
                {selected[0] ? <InputCalculated currencyValue={priceBase} amountRecibe={calculatedData} handlreSearching={handlreSearching} styleData={opacity}  poolOption={selected[secondCurrency]}/> : null}
            
                <AmountComponet    classEevent={preventViewAmoun} amount={calculatedData}/>

                <button className="mt-3 bg-intColorTwo text-white px-3 py-1 rounded-md	">
                    COMPLETAR
                </button>
            </div>

            <ListOfPool poolData={pool} selectPool={selectPool} handlreShow={selectNewPoolCalculated} searching={searching}/>
        </div>
    )
}

