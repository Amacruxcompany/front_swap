import axios from "axios";

//* funcion que maneja la llamada inicial de toda la lista de poll de intercambio
export async function getAllListPool() {
  try {
      const config = {
        headers:{
          'api-key': process.env.AMAX_API_KEY
        }
      };
    const res = await fetch(`${process.env.AMAX_PORT}/v1/use/external/exchange_groups?api-key=${process.env.AMAX_API_KEY}`, config)

    return res
  } catch (error) {
    return undefined
  }
}

//*servicio que trae toda la lista de currencys
export async function getAllListImageCurrency(){
    try {
      const res = await fetch(`https://www.binance.com/bapi/asset/v1/public/asset/asset/get-asset-logo`)

      return res
    } catch (error) {
      return undefined
    }
}

//* servicio para el liquidez de un pool

export async function getLiquPool(poolId){
  try {
    const config = {
      headers:{
        'api-key': process.env.AMAX_API_KEY
      }
    };

    const res = await fetch(`${process.env.AMAX_PORT}/v1/use/external/liquidity_pool?idPool=${poolId}`,  config)

    const data = await res.json()

    return data
  } catch (error) {
    return undefined
  }
}




