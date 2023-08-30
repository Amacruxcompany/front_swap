export const getPoolService = async () => {
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
      `${process.env.AMAX_PORT}/v1/use/external/exchange_groups`,
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (_error) {
    return { data: null };
  }
};
export const getUserWalletBalance = async (address, chain) => {
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
      `${process.env.AMAX_PORT}/v1/user/wallet/balance?address=${address}&chain=${chain}`,
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (_error) {
    return null;
  }
};

export const getBalanceDbList = async (address) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.AMAX_CCRPT_APIKEY,
      },
      method: "GET",
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/user_coins?` +
        new URLSearchParams({
          address: address,
        }),
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (_error) {
    return _error;
  }
};

export const getUserList = async (address) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.AMAX_CCRPT_APIKEY,
      },
      method: "GET",
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/user/list?` +
        new URLSearchParams({
          address: address,
        }),
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (_error) {
    return null;
  }
};

export const getUserData = async (address) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.AMAX_CCRPT_APIKEY,
      },
      method: "GET",
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/user_data?` +
        new URLSearchParams({
          address: address,
        }),
      config
    );

    const data = await response.json();

    return data.data ? data.data : data.message;
  } catch (_error) {
    return null;
  }
};
