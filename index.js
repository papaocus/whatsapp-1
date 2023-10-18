const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

const API_URL = 'https://conv.chatclay.com/api/648701bbbf3af915b60daa2d/send';
const API_KEY = 'X7EPhTxGee3tnfYCysxQXW';

app.post('/callback', async (req, res) => {
    console.log('Received callback:', req.body);

    // Example data you might send, customize as needed
    // const dataToSend = {
    //     user: "[Channel User Id]",
    //     flow: "[Flow Name]",
    //     entities: {}  // Optional
    // };

    try {
        const response = await axios.post(API_URL, {
            headers: {
                'x-api-key': API_KEY,
                'content-type': 'application/json'
            }
        });
        console.log('API Response:', response.data);
        res.json({ status: 'success', apiResponse: response.data });
    } catch (error) {
        console.error('Error calling the API:', error.response.data);
        res.status(500).json({ status: 'error', message: 'Failed to call the API' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
