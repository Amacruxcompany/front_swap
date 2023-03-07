import Image from "next/image"
import { useSelector } from "react-redux"

export default function PoolImage({pool}){
    const seletor = useSelector(state => state.image.imagesArray)


    const listImage = seletor.map((element, ind) =>{
        if(element.asset == pool.assets[0] || element.asset == pool.assets[1]){
            return <Image src={element.pic} key={ind} alt={element.asset} width={20} height={20} />
        }
    })
    return(
        <div className="absolute flex w-12 justify-between top-5 right-4">
            {listImage}
        </div>
    )
}
