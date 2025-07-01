const { readChannelHistory, postMessage } = require('./dist/tool');
const dotenv = require('dotenv');
dotenv.config();
console.log('SLACK_BOT_TOKEN:', process.env.SLACK_BOT_TOKEN);

// Replace with your actual channel ID
const testChannelId = 'C093X1ZTG5A';

async function test() {
  try {
    // Test reading channel history
    const history = await readChannelHistory({ channelId: testChannelId, limit: 3 });
    console.log('Channel History:', history);

    // Test posting a message
    const postResult = await postMessage({ channelId: testChannelId, text: 'Hello from SlackConnectorTool test!' });
    console.log('Post Message Result:', postResult);
  } catch (error) {
    console.error('Error during test:', error);
  }
}

test(); 