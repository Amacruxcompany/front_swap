export default async function handler(req, res) {
    try {
        const { userId } = req.query;

        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.AMAX_API_KEY,
            },
            method: "GET",
        };
        const response = await fetch(
            `${process.env.AMAX_PORT}/v1/user/swap?` +
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