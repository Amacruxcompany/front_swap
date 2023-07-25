export default async function handler(req, res) {
  try {
    const { userId, coinSend, coinRecibe, amountSend, amountRecibe } =
      req.query;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: process.env.AMAX_API_TOKEN,
      },
      method: "POST",
      body: JSON.stringify({
        idCurrencySend: coinSend,
        idCurrencyReceive: coinRecibe,
        amount: parseFloat(amountSend),
      }),
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/use/external/swap_operation`,
      config
    );

    const data = await response.json();

    console.log(data);

    let final = {};

    if (data.data) {
      const configTwo = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: process.env.AMAX_API_TOKEN,
        },
        method: "POST",
        body: JSON.stringify({
          userId,
          coinSend,
          coinRecibe,
          amountSend: parseFloat(amountSend),
          amountRecibe: parseFloat(amountRecibe),
        }),
      };
      const saveData = await fetch(
        `${process.env.AMAX_PORT}/v1/user/swap`,
        configTwo
      ).then((res) => res.json());

      final = saveData;
    } else {
      final = data;
    }

    res.status(200).json(final);
  } catch (_error) {
    res.status(400).json(_error);
  }
}
