const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const YOUTUBE_API_KEY = 'AIzaSyB-0LEjOV51pZUZ21KlOE0KcYvrV5wLx2w'; // Substitua pela sua chave de API do YouTube

app.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&order=viewCount&type=video&key=${YOUTUBE_API_KEY}`;

    try {
        const response = await axios.get(url);
        const videos = response.data.items.map(item => item.snippet.title);
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
