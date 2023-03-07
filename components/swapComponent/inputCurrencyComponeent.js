import Image from "next/image"
import { useSelector } from "react-redux"

export default function InputCurrency({poolOption, styleData}){

    const selector = useSelector(state => state.image.imagesArray)

    const poolImg = selector.filter((element) => element.asset == poolOption)

    return(
        <div className={`${styleData ? 'opacity-100' : 'opacity-0'} h-full w-10/12 flex justify-center  flex-col relative transition duration-500 ease-in-out`}> 
            <button className="flex justify-end	items-center left-0 -top-5 text-black font-bold text-lg absolute  h-3/6 px-5 select-none">
                {poolImg ? <Image src={poolImg[0]?.pic} alt={poolImg[0]?.asset} width={20} height={20} className='mr-3' /> : null}
                {poolOption}
            </button>
           <input type='text'  placeholder={`0.000 ${poolOption}`} className="w-full text-end border-4 border-violet-400  h-16 rounded-lg pr-5"/>
        </div>
    )
}