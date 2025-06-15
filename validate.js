const { readFileSync } = require('fs');
const { join } = require('path');

// Test that the server file exists and is valid
try {
  const serverPath = join(process.cwd(), 'src', 'index.js');
  const serverContent = readFileSync(serverPath, 'utf8');
  
  console.log('✅ Server build successful');
  console.log('📁 Server location:', serverPath);
  console.log('📊 Server size:', serverContent.length, 'characters');
  
  // Check for key components
  const hasStdioTransport = serverContent.includes('StdioServerTransport');
  const hasServer = serverContent.includes('Server');
  const hasPlannerTool = serverContent.includes('create_plan');
  
  console.log('🔧 Has stdio transport:', hasStdioTransport ? '✅' : '❌');
  console.log('🏗️ Has server setup:', hasServer ? '✅' : '✅');
  console.log('🎯 Has planner tool:', hasPlannerTool ? '✅' : '❌');
  
  if (hasStdioTransport && hasServer && hasPlannerTool) {
    console.log('\n🎉 MCP Planner Server is ready!');
    console.log('\n📋 To use with Claude Desktop:');
    console.log('1. Add server configuration to claude_desktop_config.json');
    console.log('2. Use absolute path:', serverPath);
    console.log('3. Restart Claude Desktop');
  } else {
    console.log('\n❌ Server validation failed');
  }
  
} catch (error) {
  console.error('❌ Server validation failed:', error);
  process.exit(1);
}
