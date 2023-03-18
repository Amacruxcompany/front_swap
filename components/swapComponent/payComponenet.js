import { useEffect, useState } from "react"

export default function PayComponent({showPay, data, handler}){


    const [counter, setCounter] = useState(10)
    
    
    useEffect(() =>{


        if(showPay && counter > 0){
            setTimeout(() => {
                setCounter(counter - 1)
            }, 1000);
        }else{
            setCounter(10)
            handler(false)
        }

    }, [showPay, counter, handler])


    if(data.price){
        return(
            <div className={`${showPay ? 'heithPopupShow' : 'heithPopup'} text-white z-50 flex flex-col items-center fixed bg-fondOne mt-4 py-4 border-2 rounded-2xl border-white`}>
                <ul className=" h-96 justify-around w-full flex flex-col p-5">
                    <li className="flex justify-between">Precio de compra :  <span>{data.price} $</span></li>
                    <li className="flex justify-between">Monto enviado :  <span>{data.amountSend} {data.idCurrencySend}</span></li>
                    <li className="flex justify-between">Monto recibido :  <span>{data.amountReceive} {data.idCurrencyReceive}</span></li>
                    <li className="flex justify-between">Comision :  <span>{data.fee}</span></li>
                    <li className="flex justify-between">Precio base {data.idCurrencyReceive} :  <span>{data.priceBase}</span></li>
                    <li className="flex justify-between">Cotizacion de {data.idCurrencySend} :  <span>{data.priceQuote}</span></li>
                    <li className="flex justify-between">Variacion :  <span>{data.slippage}</span></li>
                </ul>

                <button className="border-intColorOne hover:bg-intColorOne hover:text-black transition-all	duration-300 ease-in rounded-lg border-2 px-3 py-2 text-white w-5/12  mx-auto col-start-7 col-end-9 col-end-10 text-xs md:text-lg md:cursor-pointer" onClick={() => console.log('listo')}>Cambiar {counter} seg </button>
            </div>
        )

    }else{
        return null
        
    }
}
