# Slack Connector Tool

A Mosaia tool for reading Slack channel history and posting messages to Slack channels.

## Features

- **Read Channel History**: Fetch recent messages from a Slack channel
- **Post Messages**: Send messages to Slack channels
- **RESTful API**: Simple HTTP endpoints for integration

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Slack Bot Token - Get this from your Slack App settings
# Format: xoxb-your-bot-token-here
SLACK_BOT_TOKEN=xoxb-your-bot-token-here

# Optional: Custom port for the development server (default: 3000)
PORT=3000
```

### 3. Build the Project

```bash
npm run build
```

## Usage

### Development Server

Start the development server:

```bash
npm run start:dev
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

### API Endpoints

#### POST `/` - Main endpoint for Mosaia integration

**Request Body:**
```json
{
  "action": "read|post",
  "channel_id": "C1234567890",
  "limit": 5,        // Optional, only for read action
  "text": "Hello!"   // Required for post action
}
```

**Examples:**

Read channel history:
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{
    "action": "read",
    "channel_id": "C1234567890",
    "limit": 10
  }'
```

Post a message:
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{
    "action": "post",
    "channel_id": "C1234567890",
    "text": "Hello from the Slack Connector!"
  }'
```

#### GET `/` - Testing endpoint (for development)

You can also test using query parameters:

```bash
curl "http://localhost:3000/?action=read&channel_id=C1234567890&limit=5"
```

### Testing

Run the test suite:

```bash
npm test
```

**Note:** Make sure to set your `SLACK_BOT_TOKEN` and update the `testChannelId` in `test.js` before running tests.

## Slack App Setup

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app or select an existing one
3. Go to "OAuth & Permissions"
4. Add the following bot token scopes:
   - `channels:history` - to read channel messages
   - `chat:write` - to post messages
5. Install the app to your workspace
6. Copy the "Bot User OAuth Token" (starts with `xoxb-`)
7. Add this token to your `.env` file as `SLACK_BOT_TOKEN`

## Mosaia Integration

This tool is configured for Mosaia integration with the following schema:

- **Function Name**: Slack Connector
- **Actions**: `read` (read channel history) or `post` (post message)
- **Required Parameters**: `action`, `channel_id`
- **Optional Parameters**: `limit` (for read), `text` (for post)

The `.mosaia` file contains the complete configuration for Mosaia integration.

## Error Handling

The tool includes comprehensive error handling for:
- Missing or invalid Slack bot token
- Invalid channel IDs
- Network errors
- Slack API errors
- Invalid request parameters

All errors are returned with appropriate HTTP status codes and error messages. 