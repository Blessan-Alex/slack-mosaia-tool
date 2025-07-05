const dotenv = require('dotenv');
const express = require('express');
const { handler } = require('../dist/tool');

dotenv.config();

const app = express();

// Add JSON body parsing middleware
app.use(express.json());

const { SLACK_BOT_TOKEN, PORT } = process.env;

if(SLACK_BOT_TOKEN === undefined) {
    console.log('`SLACK_BOT_TOKEN` not set. Please set the SLACK_BOT_TOKEN environment variable.');
    process.exit(1);
}

app.post('/', async (req, res) => {
    try {
        const event = {
            body: JSON.stringify({
                args: req.body,
                secrets: {
                    SLACK_BOT_TOKEN
                }
            })
        };

        const result = await handler(event);
        res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Keep GET endpoint for backward compatibility and testing
app.get('/', async (req, res) => {
    const { action, channel_id, limit, text } = req.query;

    const event = {
        body: JSON.stringify({
            args: {
                action,
                channel_id,
                limit: limit ? parseInt(limit) : 5,
                text
            },
            secrets: {
                SLACK_BOT_TOKEN
            }
        })
    }

    try {
        const result = await handler(event);
        res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`Local development server running on port ${port}`);
    console.log(`POST endpoint: http://localhost:${port}/`);
    console.log(`GET endpoint: http://localhost:${port}/ (for testing)`);
}); 