import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default  function InputCalculated({poolOption, styleData , handlreSearching, amountRecibe, currencyValue}){

    const selector = useSelector(state => state.image.imagesArray)
    const poolImg = selector.filter((element) => element.asset == poolOption)
    const image = poolImg.map((element, ind) => <Image key={ind} priority src={element.pic} alt='currency-img' width={20} height={20} className='mr-3' />)


    //?estado de cambio de values
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if(amountRecibe?.amountReceive){
            setInputValue(amountRecibe.amountReceive)
        }
    },[amountRecibe])

    return(
        <div className={`${styleData ? 'opacity-100' : 'opacity-0'} h-32 w-10/12 flex justify-center  flex-col relative transition duration-500 ease-in-out`}> 
            <button className="flex flex-col justify-end h-4 items-start left-0 top-2 text-black font-bold text-lg absolute  h-3/6 px-5 select-none" onClick={() => handlreSearching(true, poolOption)}>
                <span className="flex justify-start	items-center w-full">
                    {image}
                    {poolOption}
                </span>
                <span className={`text-xs`}>{currencyValue}</span>
            </button>
           <input type='text' readOnly value={inputValue} onKeyDown={(e) => e.preventDefault()} placeholder={`0.000 ${poolOption}`} className="w-full text-end border-4 border-violet-400  h-12 rounded-lg pr-5"/>
        </div>
    )
}