# MCP Architecture Consultation Server with Sampling

A Model Context Protocol (MCP) server that showcases the **MCP sampling feature** through an intelligent software architecture consultation tool. This server demonstrates advanced architecture guidance capabilities by leveraging AI models to provide expert-level software architecture advice, design patterns, and technical implementation strategies.

## Features

�️ **AI-Enhanced Architecture Consultation Tool**: Get expert software architecture guidance using MCP sampling for intelligent AI assistance
🤖 **Real MCP Sampling**: Demonstrates actual MCP sampling capabilities with fallback to structured error responses
📊 **Dual Response Modes**: 
   - **AI-Enhanced Mode**: Uses MCP sampling to request LLM completions for expert architecture guidance
   - **Error Handling Mode**: Provides detailed error responses with troubleshooting guidance when sampling unavailable
🔧 **JavaScript Implementation**: Built with JavaScript using the official MCP SDK
✅ **Input Validation**: Includes input sanitization and security considerations
🚀 **Stdio Transport**: Uses standard input/output for communication with MCP clients
🛡️ **Graceful Fallbacks**: Automatically handles sampling failures with detailed error information
📈 **Model Preferences**: Configures optimal model selection for architecture consultation tasks

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Server

```bash
npm start
```

or

```bash
node src/index.js
```

### Available Tools

#### `architecture_consultation`

Provides expert software architecture guidance and design solutions from a Senior Software Architect's perspective. This tool demonstrates **real MCP sampling** by requesting AI completions when available, or falling back to detailed error responses with troubleshooting guidance.

**Sampling Features:**
- 🏗️ **AI-Enhanced Architecture Guidance**: Uses LLM completions via MCP sampling for expert-level architecture consultation
- 🎯 **Smart Model Selection**: Optimized for architecture-focused AI models for consistent, structured advice
- 📊 **Comprehensive Prompting**: Constructs detailed prompts covering problem analysis, design patterns, and implementation strategies
- 🔄 **Graceful Fallback**: Provides structured error responses with troubleshooting guidance if sampling unavailable
- 📈 **Consultation Metadata**: Tracks generation method, model information, and analysis depth

**Parameters:**
- `question` (required): The architecture or design question you need guidance on
- `context` (optional): Additional context about your system, technology stack, or constraints
- `domain` (optional): The domain or type of system architecture ('web', 'mobile', 'microservices', 'distributed', 'cloud', 'enterprise', 'embedded', 'data')
- `complexity` (optional): The complexity level of the system or problem ('simple', 'moderate', 'complex', 'enterprise')

**Example:**
```json
{
  "question": "How should I design a microservices architecture for a high-traffic e-commerce platform?",
  "context": "Handling 100k+ users, Node.js backend, PostgreSQL database",
  "domain": "microservices",
  "complexity": "enterprise"
}
```

## MCP Sampling Implementation

This server demonstrates **real MCP sampling** as specified in the [MCP documentation](https://modelcontextprotocol.io/docs/concepts/sampling). Here's how it works:

### Sampling Flow

1. **Server Request**: When `architecture_consultation` is called, the server attempts to use MCP sampling
2. **Client Review**: The MCP client (e.g., Claude Desktop) reviews the sampling request
3. **LLM Completion**: The client samples from an available LLM (Claude, GPT-4, etc.)
4. **Human Oversight**: Users maintain control over what the LLM sees and generates  
5. **Enhanced Result**: The server receives an AI-generated architecture consultation with metadata

### Sampling Configuration

```javascript
const samplingResult = await server.createMessage({
  messages: [
    {
      role: "user",
      content: {
        type: "text",
        text: architecturePrompt
      }
    }
  ],
  maxTokens: 4000,
  temperature: 0.2, // Lower temperature for consistent architectural advice
  includeContext: "thisServer"
});
```

### Fallback Behavior

- ✅ **Sampling Available**: Uses AI-enhanced architecture consultation with expert LLM guidance
- 🔄 **Sampling Unavailable**: Falls back to detailed error responses with troubleshooting guidance
- 🛡️ **Error Handling**: Gracefully handles sampling failures with comprehensive error information
- 📊 **Metadata Tracking**: Consultations include generation method, model information, and analysis depth

### Testing Sampling

Run the included validation script to test server capabilities:

```bash
node validate.js
```

## Integration with Claude Desktop

To use this MCP server with Claude Desktop, add the following to your `claude_desktop_config.json`:

### Windows
```json
{
  "mcpServers": {
    "architecture-consultant": {
      "command": "node",
      "args": ["C:\\path\\to\\P0-MCPSampling\\src\\index.js"]
    }
  }
}
```

### macOS/Linux
```json
{
  "mcpServers": {
    "architecture-consultant": {
      "command": "node",
      "args": ["/path/to/P0-MCPSampling/src/index.js"]
    }
  }
}
```

## Development

### Scripts

- `npm start` - Run the MCP server
- `npm run dev` - Run the server (alias for start)
- `npm test` - Run validation test

### Project Structure

```
src/
  index.js          # Main server implementation (JavaScript)
.vscode/
  mcp.json         # MCP server configuration for VS Code
  tasks.json       # VS Code tasks for running/validating server
.github/
  copilot-instructions.md  # Copilot workspace instructions
package.json        # Project configuration
validate.js         # Server validation script
model-sampling.md   # MCP sampling documentation and examples
```

## MCP Sampling Features

This server demonstrates MCP sampling through:

1. **Expert Architecture Consultation**: Generates comprehensive architecture guidance based on input parameters
2. **Context-Aware Responses**: Adjusts recommendations based on domain, complexity, and provided context
3. **Dynamic Content Generation**: Creates varied architectural solutions while maintaining expert-level quality
4. **Intelligent Problem Analysis**: Organizes architectural guidance into structured sections covering analysis, patterns, implementation, and best practices

## Error Handling

The server includes comprehensive error handling:
- Input validation and sanitization for security
- Graceful error responses with detailed troubleshooting guidance
- Process-level error handling for uncaught exceptions
- Structured error messages for debugging and user guidance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Build and test the project
5. Submit a pull request

## License

ISC License

## Related Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK for TypeScript](https://github.com/modelcontextprotocol/typescript-sdk)
- [Claude Desktop](https://claude.ai/download)
