export default async function handler(req, res) {
  try {
    const config = {
      headers: {
        "api-key": process.env.AMAX_API_KEY,
      },
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/use/external/exchange_groups?api-key=${process.env.AMAX_API_KEY}`,
      config
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (_error) {
    res.status(400).json(_error);
  }
}
