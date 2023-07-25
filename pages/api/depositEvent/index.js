export default async function handler(req, res) {
  try {
    const { userId, coinId, amount } = req.query;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: process.env.AMAX_API_TOKEN,
      },
      method: "POST",
      body: JSON.stringify({ userId, coinId, amount }),
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/user/deposit`,
      config
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (_error) {
    res.status(400).json(_error);
  }
}
