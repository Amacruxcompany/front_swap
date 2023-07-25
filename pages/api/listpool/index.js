export default async function handler(req, res) {
  try {
    const config = {
      headers: {
        authorization: process.env.AMAX_API_TOKEN,
      },
    };
    const response = await fetch(
      `${process.env.AMAX_PORT}/v1/use/external/exchange_groups`,
      config
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (_error) {
    res.status(400).json(_error);
  }
}
