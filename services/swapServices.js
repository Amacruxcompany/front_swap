//? Para solicitar cotizaciones servicio que realiza el swap de las criptomonedas en el swapbox
export async function getSwapprice(idCurrencySend, idCurrencyReceive,amountSend) {
    try {
        const config = {
          headers:{
            'api-key': process.env.AMAX_API_KEY
          }
        };
      const res = await fetch(`${process.env.AMAX_PORT}/v1/use/external/quote?idCurrencySend=${idCurrencySend}&idCurrencyReceive=${idCurrencyReceive}&amountSend=${amountSend}`, config)
  
      const data = await res.json()

      return data 
    } catch (error) {
      return undefined
    }
  }