'use client'

import { useState } from "react"
import ListElementPoolComponenet from '../../shared/listElementPoolComponenet.js'
import { useSelector } from "react-redux"

export default function ListOfPool({poolData, handlreShow, selectPool}){

    //?selector del store
    const selected = useSelector(state => state.image.imagesArray)

    //? estado que maneja el filtro escrito
    const [search, setSearch] = useState('')

    //* funcion que setea el valor seleccionado para el pool
    const newPoolSelected = (data) =>{
        handlreShow(data)
    }

    return(
        <div className={`${selectPool ? 'heithPopupShow' : 'heithPopup'}  flex justify-start items-center flex-col fixed bg-fondOne mt-4 py-4 border-2 rounded-2xl border-white`}> 
            <input type='text' className="w-8/12 border-none rounded-2xl h-2/6 text-center" onChange={(e) => setSearch(e.target.value)}/>
            <ul className="list-none h-4/6 	overflow-y-scroll scroll-smooth w-11/12 mt-5 snap-y snap-mandatory">
                {poolData.map((element, ind) => {
                    if(search != ''){
                        if(element.poolName.toLowerCase().includes(search.toLowerCase())){
                            return <ListElementPoolComponenet key={ind} element={element} handlerClick={newPoolSelected} />
                        }
                    }else{
                        return <ListElementPoolComponenet key={ind} element={element}  handlerClick={newPoolSelected}/>
                    }
                })}
            </ul>
        </div>
    )
}