export const depositService = async () => {
  try {
    const config = {
      method: "GET",
      headers: {
        "api-key": process.env.AMAX_CCRPT_APIKEY,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    };

    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/user/wallet/contract`,
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (_error) {
    return { data: null };
  }
};

export const saveCoinService = async (symbol) => {
  try {
    const coin = await fetch(
      `${process.env.AMAX_PORT}/v1/insertCoin?` +
        new URLSearchParams({
          coinName: symbol,
        }),
      {
        method: "GET",
        headers: {
          "api-key": process.env.AMAX_CCRPT_APIKEY,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    ).then((res) => res.json());

    return coin.data ? coin.data : coin.message;
  } catch (error) {
    return error;
  }
};

export const depositSaveService = async (userAddress, coinId, amount) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.AMAX_CCRPT_APIKEY,
      },
      method: "POST",
      body: JSON.stringify({ userAddress, coinId, amount }),
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/user/deposit`,
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (error) {
    return error;
  }
};

export const withdrawSaveService = async (
  idCurrency,
  address,
  amount,
  network,
  coinId
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
        idCurrency,
        address,
        amount,
        network,
        walletType: "0",
        transactionFeeFlag: "true",
        coinId,
      }),
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/use/external/withdraw`,
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (error) {
    return error;
  }
};
