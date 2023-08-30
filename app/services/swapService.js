export const calculateSwap = async (
  idCurrencySend,
  idCurrencyReceive,
  amountSend
) => {
  try {
    const config = {
      method: "GET",
      headers: {
        "api-key": process.env.AMAX_CCRPT_APIKEY,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      timeout: 10000,
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/use/external/quote?idCurrencySend=${idCurrencySend}&idCurrencyReceive=${idCurrencyReceive}&amountSend=${amountSend}`,
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (error) {
    return error;
  }
};

export const generateSwap = async (
  address,
  coinSend,
  coinRecibe,
  amountSend,
  amountRecibe
) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.AMAX_CCRPT_APIKEY,
      },
      method: "POST",
      body: JSON.stringify({
        address,
        idCurrencySend: coinSend,
        idCurrencyReceive: coinRecibe,
        amount: parseFloat(amountSend),
        amountRecibe,
      }),
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/use/external/swap_operation`,
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (error) {
    return error;
  }
};
