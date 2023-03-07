'use client'

import { useState } from "react"

export default function ConnectWalletButton({style}){
    const [data, setData] = useState(true)


    const changeData = () =>{
        setData(!data)
    }

    return(
        <button className={`${style} `}
        onClick={changeData}> 
            {data ? 'connect' : 'disconect'}
        </button>
    )
}