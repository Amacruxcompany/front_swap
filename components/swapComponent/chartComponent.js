import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { getLiquPool } from '@/services/getDataServices';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faWallet} from '@fortawesome/free-solid-svg-icons';


//? all info
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export default  function ChartComponent({pool, chartView}){

    const [charData, setChartData] = useState({
        labels,
        datasets: [
          {
            label: 'Precios',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      })
    const [charOption, setChartOption] = useState({
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        }})


    const [waitData, setWaitData] = useState(false)
    const [beforePool, setBeforePool] = useState('')

  

    useEffect(() => {

        if(!waitData && pool.poolName != beforePool){
            setWaitData(true)
            setBeforePool(pool.poolName)
            const url =`https://data.binance.com/api/v3/aggTrades?symbol=${pool.poolName.replace('/','')}`;
            

            try {
                axios.get(url).then((response) => {
                    setChartData({
                        labels: response.data.slice(0, 9).map((price) => { 
                            const date = new Date(price.T)
                            return date.getHours()+ ':'+ date.getMinutes() + ':' + date.getSeconds()
                        })
                        ,
                        datasets: [
                        {
                            label: pool.poolName,
                            data: response.data.slice(0, 9).map((option, ind) =>  {
                                if(ind <= 20){
                                    return option.p
                                }
                            }),
                            borderColor: '#350866',
                            backgroundColor: '#350866',
                        }
                        ],
                    })
    
                    setWaitData(false)
                })
            } catch (error) {
                console.log(error)
            }
        }

    

    }, [pool, waitData, beforePool]);


    const newChart = async (data) =>{
        if(data == 'poolLiquidity'){
            getLiquPool(pool.poolId).then(response => {
                if(!response.data){
                    return
                }

                const data = response.data[0].liquidity

                const arrayPool = []
                const keyName = []

                for (const key in data) {
                    keyName.push(key)
                    arrayPool.push(data[key])
                }

                let mayor = 0;

                arrayPool.forEach((data)=>{
                    if(data > mayor){
                        mayor += data
                    }
                })
                setChartData({
                    labels: [0, parseInt(mayor)],
                    datasets: [
                    {
                        label: keyName[0],
                        data: [0, parseInt(arrayPool[0])],
                        borderColor: '#350866',
                        backgroundColor: '#350866',
                    },
                    {
                        label: keyName[1],
                        data: [0 ,parseInt(arrayPool[1])],
                        borderColor: '#8BF7D1',
                        backgroundColor: '#8BF7D1',
                    }
                    ],
                })
            }) 
        }else{
            const url =`https://data.binance.com/api/v3/aggTrades?symbol=${pool.poolName.replace('/','')}`;
            
                axios.get(url).then((response) => {
                    setChartData({
                        labels: response.data.slice(0, 9).map((price) => { 
                            const date = new Date(price.T)
                            return date.getHours()+ ':'+ date.getMinutes() + ':' + date.getSeconds()
                        })
                        ,
                        datasets: [
                        {
                            label: pool.poolName,
                            data: response.data.slice(0, 9).map((option, ind) => option.p),
                            borderColor: '#350866',
                            backgroundColor: '#350866',
                        }
                        ],
                    })
        })
        }
    }

    return(
        <div className={`chartStyles z-40 fixed lg:static ${chartView ? '' : 'hidden'}`}>
            <div className='h-max w-full sm:w-max relative'>
                <Line options={charOption} data={charData}  width={'700px'} height={'400px'} className='chartStylesData bg-white p-2 sm:p-5 rounded-xl border-solid border-2 border-sky-500 relative'/>
                <button className='absolute top-2 right-5 exitChart'>X</button>
                <button onClick={() => newChart('poolGeneral')} className='absolute top-2 left-5'>
                    <FontAwesomeIcon icon={faGlobe}/>
                </button>
                <button onClick={() => newChart('poolLiquidity')} className='absolute top-2 left-12' >
                    <FontAwesomeIcon icon={faWallet}/>
                </button>
            </div>
        </div>
    )
}