export default async function handler(req, res) {
  try {
    const { idCurrencySend, idCurrencyReceive, amountSend } = req.query;

    const config = {
      headers: {
        "api-key": process.env.AMAX_CCRPT_APIKEY,
      },
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/use/external/quote?idCurrencySend=${idCurrencySend}&idCurrencyReceive=${idCurrencyReceive}&amountSend=${amountSend}`,
      config
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (_error) {
    res.status(400).json(_error);
  }
}
