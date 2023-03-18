'use client'
import SwapBox from './swapBox.js'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addImage } from '@/store/actions.js'
import PoolImage from './poolImage.js'
import ChartComponent from './chartComponent.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

export default function SwapComponent({allList, allCurrency}){
    //! dispatch de datos de la lista de currency completas a todos los componeentes
    const dispatch = useDispatch()

    //? lista completa de los pools y su estado
    const [list, setList] = useState([])

    //? pool seleccionado
    const [pool, setPool] = useState({
        poolName: 'BNB/BTC',
        assets: ['BNB', 'BTC'],
        poolId: 18
    })

    //?estado que maneja la busqueda de currencys
    const [searchCurrency, setSearchCurrency] = useState('')



    //? estado para mostrar el popup que muestra los pools
    const [selectPool, setSelectPool] = useState(false)

    //? estado que muestra las graficas
    const [chartView, setChartView] = useState(false)


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
        <div className="z-0 mx-auto flex justify-center md:justify-around items-center flex-col md:flex-row w-full w-max-full container heighSwapComponenet"> 
            <ChartComponent pool={pool} chartView={chartView}/>
            <div className='w-full md:w-80 flex flex-col swapResponsive'>
            
            <div className=' w-10/12 md:w-full mx-auto p-2  mb-3 flex justify-around bg-fondOne border-2 border-purple-400 rounded-2xl'>
                <span className='md:cursor-pointer w-20 py-4 px-2 border-x-2  text-white   relative' onClick={() => popUpCurrency(!selectPool, '')}>
                    {/* {pool.poolName} */}
                    <PoolImage pool={pool} />
                </span>
                <button className='w-2/12  py-2 my-2 px-4 text-white border-x-2 flex justify-center' onClick={() => setChartView(!chartView)}>
                    <FontAwesomeIcon icon={faChartLine}/>
                </button>
            </div>

            <SwapBox selected={pool.assets} handlreSearching={popUpCurrency} pool={list} selectPool={selectPool} searching={searchCurrency} handlreShow={selectNewPool}/>           
            </div>
        </div>
    )
}

