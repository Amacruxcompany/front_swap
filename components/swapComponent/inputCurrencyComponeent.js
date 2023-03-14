import Image from "next/image"
import { useState } from "react"
import { useSelector } from "react-redux"

export default  function InputCurrency({poolOption, styleData , handlreSearching, handlerCalculate, currencyValue}){

    const selector = useSelector(state => state.image.imagesArray)

    const poolImg = selector.filter((element) => element.asset == poolOption)

    const image = poolImg.map((element, ind) => <Image key={ind} priority src={element.pic} alt='currency-img' width={20} height={20} className='mr-3' />)


    //?estado de cambio de values
    const [inputValue, setInputValue] = useState('')

    const handleChange = event => {
        const result = event.target.value.replace(/[A-Za-z\s!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g, '');
        const firstOccuranceIndex = result.search(/\./) + 1;
        let resultStr = result.substr(0, firstOccuranceIndex) + result.slice(firstOccuranceIndex).replace(/\./g, '');
        if(resultStr[0] == '.'){
            resultStr = '0' + resultStr
        }
        setInputValue(resultStr);

        handlerCalculate(resultStr)
      };


    

    return(
        <div className={`${styleData ? 'opacity-100' : 'opacity-0'} h-32 w-10/12 flex justify-center  flex-col relative transition duration-500 ease-in-out`}> 
            <button className="flex flex-col justify-end items-start left-0 -top-10 text-black font-bold text-lg absolute  h-3/6 px-5 select-none" onClick={() => handlreSearching(true, poolOption)}>
            <span className="flex justify-start	items-center w-full">
                    {image}
                    {poolOption}
                </span>
                <span className={`text-xs`}>{currencyValue}</span>
            </button>
           <input type='text' value={inputValue} onChange={(e) => handleChange(e)} placeholder={`0.000 ${poolOption}`} className="w-full text-end border-4 border-violet-400  h-16 rounded-lg pr-5"/>
        </div>
    )
}