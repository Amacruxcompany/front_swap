'use client'
import ListOfPool from './listOfpool.js'
import SwapBox from './swapBox.js'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImage } from '@/store/actions.js'
import Image from 'next/image.js'
import PoolImage from './poolImage.js'
export default function SwapComponent({allList, allCurrency}){
    //! dispatch de datos de la lista de currency completas a todos los componeentes
    const dispatch = useDispatch()

    //? lista completa de los pools y su estado
    const [list, setList] = useState([])

    //? pool seleccionado
    const [pool, setPool] = useState({
        poolName: 'BNC/BTC',
        assets: ['BNC', 'BTC']
    })

    //?estado que maneja la busqueda de currencys
    const [searchCurrency, setSearchCurrency] = useState('')



    //? estado para mostrar el popup que muestra los pools
    const [selectPool, setSelectPool] = useState(false)


    //* funcion que setea los nuevos cambios de moneda
    const selectNewPool = (data) =>{
        setPool(data)
        setSelectPool(false)
    }
    //?Estados para setear los valores de la lista de pools disponibles
    useEffect(()=>{
        if(allList){
            setList(allList)
            setPool(allList[0])
        }
    }, [allList])

    //? effecto con el que agregamos las imagenes al storage
    useEffect(()=>{
        dispatch(addImage(allCurrency))
    },[dispatch, allCurrency])


    const popUpCurrency =(poolShow, searchValue) =>{
        setSelectPool(poolShow)
        setSearchCurrency(searchValue)
    }



    
    return(
        <div className="z-0 mx-auto flex justify-center items-center flex-col md:flex-row w-full w-max-full px-5 container heighSwapComponenet"> 
            <div className='w-7/12 h-full pt-0 px-5 pb-5 max-h-full hidden md:flex items-center justify-ceneter'>
                <div className='w-full h-96 bg-white '>
                </div>
            </div>
            <div className='w-full md:w-80 flex flex-col'>
            
            <span className='md:cursor-pointer py-4 px-4 bg-fondOne text-white w-10/12 mx-auto md:w-full mb-3 border-2 border-purple-400 rounded-2xl relative md:col-start-7 md:col-end-9' onClick={() => popUpCurrency(!selectPool, '')}>
                {pool.poolName}
                <PoolImage pool={pool} />
            </span>
            <SwapBox selected={pool.assets} handlreSearching={popUpCurrency} pool={list} selectPool={selectPool} searching={searchCurrency} handlreShow={selectNewPool}/>           
            </div>
        </div>
    )
}

