import { WebClient } from '@slack/web-api';
const dotenv = require('dotenv');
dotenv.config();

console.log('ENV:', process.env);

const token = process.env.SLACK_BOT_TOKEN;
if (!token) throw new Error('SLACK_BOT_TOKEN is not set');

const slack = new WebClient(token);

// Main handler function for Mosaia
export async function handler(event: any): Promise<any> {
  console.log('Handler received event:', JSON.stringify(event, null, 2));

  try {
    // Parse the event body to extract args
    const body = JSON.parse(event.body);
    const { action, channel_id, limit = 5, text } = body.args;
    
    if (action === 'read') {
      return await readChannelHistory({ channelId: channel_id, limit });
    } else if (action === 'post') {
      if (!text) {
        throw new Error('Text is required for post action');
      }
      return await postMessage({ channelId: channel_id, text });
    } else {
      throw new Error('Invalid action. Must be "read" or "post"');
    }
  } catch (error: unknown) {
    console.error('Error in handler:', error);
    
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
}

export async function readChannelHistory({ channelId, limit = 5 }: { channelId: string; limit?: number }) {
  try {
    const result = await slack.conversations.history({
      channel: channelId,
      limit,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        messages: (result.messages || []).map((msg) => msg.text)
      })
    };
  } catch (error) {
    console.error('Error reading channel history:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read channel history' })
    };
  }
}

export async function postMessage({ channelId, text }: { channelId: string; text: string }) {
  try {
    const result = await slack.chat.postMessage({
      channel: channelId,
      text,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: result.ok,
        ts: result.ts
      })
    };
  } catch (error) {
    console.error('Error posting message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to post message' })
    };
  }
} 