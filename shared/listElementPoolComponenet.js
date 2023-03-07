import PoolImage from "@/components/swapComponent/poolImage";

export default function ListElementPoolComponenet({element,  handlerClick}){

    return (<li className="md:cursor-pointer snap-always snap-center text-white my-3 bg-list-pool rounded-2xl transition-all duration-500 ease-in p-3 w-10/12 mx-auto relative" onClick={() => handlerClick(element)}>
    {element.poolName}
    <PoolImage pool={element}/>
    </li>)

}