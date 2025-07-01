import { WebClient } from '@slack/web-api';
const dotenv = require('dotenv');
dotenv.config();

console.log('ENV:', process.env);

const token = process.env.SLACK_BOT_TOKEN;
if (!token) throw new Error('SLACK_BOT_TOKEN is not set');

const slack = new WebClient(token);

exports.readChannelHistory = async function({ channelId, limit = 5 }) {
  const result = await slack.conversations.history({
    channel: channelId,
    limit,
  });
  return {
    messages: (result.messages || []).map((msg) => msg.text)
  };
}

exports.postMessage = async function({ channelId, text }) {
  const result = await slack.chat.postMessage({
    channel: channelId,
    text,
  });
  return {
    ok: result.ok,
    ts: result.ts
  };
} 