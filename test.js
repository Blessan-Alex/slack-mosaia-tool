const { readChannelHistory, postMessage } = require('./dist/tool');
const dotenv = require('dotenv');
dotenv.config();

console.log('SLACK_BOT_TOKEN:', process.env.SLACK_BOT_TOKEN ? 'Set' : 'Not set');

// Replace with your actual channel ID
const testChannelId = 'C093X1ZTG5A';

async function test() {
  try {
    console.log('Testing Slack Connector Tool...');
    
    // Test reading channel history
    console.log('\n1. Testing read channel history...');
    const history = await readChannelHistory({ channelId: testChannelId, limit: 3 });
    console.log('Channel History Result:', JSON.parse(history.body));

    // Test posting a message
    console.log('\n2. Testing post message...');
    const postResult = await postMessage({ 
      channelId: testChannelId, 
      text: 'Hello from SlackConnectorTool test! ' + new Date().toISOString() 
    });
    console.log('Post Message Result:', JSON.parse(postResult.body));
    
    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('❌ Error during test:', error);
  }
}

// Only run test if SLACK_BOT_TOKEN is set
if (process.env.SLACK_BOT_TOKEN) {
  test();
} else {
  console.log('❌ SLACK_BOT_TOKEN not set. Please set the environment variable to run tests.');
} 