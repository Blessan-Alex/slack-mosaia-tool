const fs = require('fs');
const path = require('path');

console.log('🔍 Validating SlackConnectorTool integrations...\n');

// Check if .mosaia file exists
const mosaiaPath = path.join(__dirname, '..', '.mosaia');
if (!fs.existsSync(mosaiaPath)) {
    console.error('❌ .mosaia file not found');
    process.exit(1);
}

// Read and validate .mosaia file
try {
    const mosaiaContent = fs.readFileSync(mosaiaPath, 'utf8');
    const mosaia = JSON.parse(mosaiaContent);
    
    console.log('✅ .mosaia file found and is valid JSON');
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'schema', 'envVars', 'server'];
    for (const field of requiredFields) {
        if (!mosaia[field]) {
            console.error(`❌ Missing required field: ${field}`);
            process.exit(1);
        }
    }
    console.log('✅ All required fields present in .mosaia');
    
    // Validate server configuration
    const server = mosaia.server;
    if (!server.startCommand || !server.port || !server.endpoint || !server.method) {
        console.error('❌ Incomplete server configuration in .mosaia');
        process.exit(1);
    }
    console.log('✅ Server configuration is complete');
    
    // Validate schema
    const schema = mosaia.schema;
    if (!schema.function || !schema.function.parameters) {
        console.error('❌ Invalid function schema in .mosaia');
        process.exit(1);
    }
    console.log('✅ Function schema is valid');
    
} catch (error) {
    console.error('❌ Error parsing .mosaia file:', error.message);
    process.exit(1);
}

// Check if package.json exists and has correct scripts
const packagePath = path.join(__dirname, '..', 'package.json');
if (!fs.existsSync(packagePath)) {
    console.error('❌ package.json not found');
    process.exit(1);
}

try {
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);
    
    console.log('✅ package.json found and is valid JSON');
    
    // Check if start:dev script exists
    if (!packageJson.scripts || !packageJson.scripts['start:dev']) {
        console.error('❌ Missing start:dev script in package.json');
        process.exit(1);
    }
    console.log('✅ start:dev script found in package.json');
    
    // Check if main entry point is correct
    if (packageJson.main !== 'dist/tool.js') {
        console.error('❌ Main entry point should be dist/tool.js');
        process.exit(1);
    }
    console.log('✅ Main entry point is correct');
    
} catch (error) {
    console.error('❌ Error parsing package.json:', error.message);
    process.exit(1);
}

// Check if dist/tool.js exists
const distPath = path.join(__dirname, '..', 'dist', 'tool.js');
if (!fs.existsSync(distPath)) {
    console.error('❌ dist/tool.js not found. Run "npm run build" first');
    process.exit(1);
}
console.log('✅ Compiled tool.js found');

// Check if dev.js server exists
const devPath = path.join(__dirname, 'dev.js');
if (!fs.existsSync(devPath)) {
    console.error('❌ bin/dev.js not found');
    process.exit(1);
}
console.log('✅ Development server found');

// Check if src/tool.ts exists
const srcPath = path.join(__dirname, '..', 'src', 'tool.ts');
if (!fs.existsSync(srcPath)) {
    console.error('❌ src/tool.ts not found');
    process.exit(1);
}
console.log('✅ Source tool.ts found');

// Check if test.js exists
const testPath = path.join(__dirname, '..', 'test.js');
if (!fs.existsSync(testPath)) {
    console.error('❌ test.js not found');
    process.exit(1);
}
console.log('✅ Test file found');

console.log('\n🎉 All integrations are correct!');
console.log('\n📋 Summary:');
console.log('   • .mosaia file is valid and complete');
console.log('   • package.json has correct scripts and main entry');
console.log('   • TypeScript source and compiled JavaScript exist');
console.log('   • Development server is properly configured');
console.log('   • Test file is available');
console.log('\n🚀 Ready to use with Mosaia!'); 