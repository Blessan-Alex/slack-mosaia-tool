# Slack Connector Tool

This tool allows you to read messages from and post messages to a Slack channel. It is designed for use with the Mosaia platform.

## Functions
- `readChannelHistory`: Reads the most recent messages from a Slack channel.
- `postMessage`: Posts a message to a Slack channel.

## Setup
1. Set the `SLACK_BOT_TOKEN` environment variable with your Slack Bot User OAuth Token (starts with `xoxb-`).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Use the tool via the Mosaia platform or directly in your code. 