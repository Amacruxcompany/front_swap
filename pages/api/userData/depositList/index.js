export default async function handler(req, res) {
  try {
    const { userId } = req.query;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: process.env.AMAX_API_TOKEN,
      },
      method: "GET",
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/user/deposit?` +
        new URLSearchParams({
          userId,
        }),
      config
    );

    const data = await response.json();

    res.status(200).json(data.data);
  } catch (_error) {
    res.status(400).json(_error);
  }
}
