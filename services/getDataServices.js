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


export async function getAllListImageCurrency(){
    const res = await fetch(`https://www.binance.com/bapi/asset/v1/public/asset/asset/get-asset-logo`)

    return res
}