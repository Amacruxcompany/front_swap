import { useSelector } from "react-redux"

export default function AmountComponet({amount, classEevent}){

    return(
            <div className={`overflow-hidden  p-2 h-18 flex flex-col  items-center w-10/12	bg-white rounded-lg`}>
                <span className={` ${classEevent ? 'opacity-100' : 'opacity-0'} w-full flex justify-between transition-all delay-300  ease-in duration-300 `}>Tarifa: <span className="text-xs">{amount.fee ? amount.fee : 0}</span></span>
                <span className={` ${classEevent ? 'opacity-100' : 'opacity-0'} w-full flex justify-between transition-all delay-300  ease-in duration-300 `}>Precio: <span className="text-xs">{amount.price ? amount.price : 0}$</span></span>
            </div>
    )
}
