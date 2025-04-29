export default async function handler(req, res) {
    const API_KEY = process.env.NEWS_API_KEY;

    if(!API_KEY) {
        return res.status(500).json({ error: 'API key is missing' });
    }

    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                apiKey: API_KEY,
            }
        });

        res.status(200).json(response.data);
    } catch(error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news articles' });
    }
}