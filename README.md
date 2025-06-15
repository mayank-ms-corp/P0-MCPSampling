# MCP Planner Server with Sampling

A Model Context Protocol (MCP) server that showcases the **MCP sampling feature** through an intelligent planner tool. This server demonstrates advanced planning capabilities by leveraging AI models to create comprehensive, actionable plans that break down complex objectives into structured steps with timelines, dependencies, and resource allocation.

## Features

🎯 **AI-Enhanced Planning Tool**: Create comprehensive, structured plans using MCP sampling for intelligent AI assistance
🤖 **Real MCP Sampling**: Demonstrates actual MCP sampling capabilities with fallback to template-based planning
📊 **Dual Planning Modes**: 
   - **AI-Enhanced Mode**: Uses MCP sampling to request LLM completions for intelligent planning
   - **Template Mode**: Falls back to structured template-based planning when sampling unavailable
🔧 **TypeScript Implementation**: Built with TypeScript using the official MCP SDK
✅ **Schema Validation**: Uses Zod for runtime type checking and validation
🚀 **Stdio Transport**: Uses standard input/output for communication with MCP clients
🛡️ **Graceful Fallbacks**: Automatically switches between AI and template modes based on availability
📈 **Model Preferences**: Configures optimal model selection for planning tasks

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

#### `create_plan`

Creates a detailed, structured plan for achieving a specific goal. This tool demonstrates **real MCP sampling** by requesting AI completions when available, or falling back to template-based planning.

**Sampling Features:**
- 🤖 **AI-Enhanced Planning**: Uses LLM completions via MCP sampling for intelligent plan generation
- 🎯 **Smart Model Selection**: Prefers models like Claude-3-Sonnet and GPT-4 for optimal planning
- 📊 **Structured Prompting**: Constructs comprehensive prompts for consistent, actionable plans  
- 🔄 **Graceful Fallback**: Automatically uses template-based planning if sampling unavailable
- 📈 **Plan Metadata**: Tracks generation method and model information

**Parameters:**
- `goal` (required): The main objective or goal to create a plan for
- `constraints` (optional): Array of constraints or limitations to consider
- `timeframe` (optional): Time frame for the plan (e.g., '1 week', '3 months')
- `resources` (optional): Array of available resources
- `priority` (optional): Priority level ('low', 'medium', 'high')

**Example:**
```json
{
  "goal": "Launch a new mobile app",
  "constraints": ["Limited budget", "3-person team"],
  "timeframe": "6 months",
  "resources": ["React Native expertise", "AWS cloud"],
  "priority": "high"
}
```

## MCP Sampling Implementation

This server demonstrates **real MCP sampling** as specified in the [MCP documentation](https://modelcontextprotocol.io/docs/concepts/sampling). Here's how it works:

### Sampling Flow

1. **Server Request**: When `create_plan` is called, the server attempts to use MCP sampling
2. **Client Review**: The MCP client (e.g., Claude Desktop) reviews the sampling request
3. **LLM Completion**: The client samples from an available LLM (Claude, GPT-4, etc.)
4. **Human Oversight**: Users maintain control over what the LLM sees and generates  
5. **Enhanced Result**: The server receives an AI-generated plan with metadata

### Sampling Configuration

```javascript
const samplingRequest = {
  method: "sampling/createMessage",
  params: {
    messages: [/* Structured planning prompt */],
    systemPrompt: "You are an expert project manager...",
    includeContext: "thisServer",
    maxTokens: 3000,
    temperature: 0.3,
    modelPreferences: {
      hints: [
        { name: "claude-3-sonnet" },
        { name: "gpt-4" },
        { name: "claude-3" }
      ],
      intelligencePriority: 0.8,
      costPriority: 0.3,
      speedPriority: 0.5
    }
  }
};
```

### Fallback Behavior

- ✅ **Sampling Available**: Uses AI-enhanced planning with LLM completions
- 🔄 **Sampling Unavailable**: Falls back to template-based structured planning
- 🛡️ **Error Handling**: Gracefully handles sampling failures with detailed logging
- 📊 **Metadata Tracking**: Plans include generation method and model information

### Testing Sampling

Run the included test script to see sampling capabilities:

```bash
node test-sampling.js
```

## Integration with Claude Desktop

To use this MCP server with Claude Desktop, add the following to your `claude_desktop_config.json`:

### Windows
```json
{
  "mcpServers": {
    "planner": {
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
    "planner": {
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
```

## MCP Sampling Features

This server demonstrates MCP sampling through:

1. **Adaptive Planning**: Generates different plan structures based on input parameters
2. **Context-Aware Responses**: Adjusts recommendations based on constraints and resources
3. **Dynamic Content Generation**: Creates varied outputs while maintaining consistent quality
4. **Intelligent Categorization**: Organizes plan elements into logical phases and sections

## Error Handling

The server includes comprehensive error handling:
- Input validation using Zod schemas
- Graceful error responses
- Process-level error handling for uncaught exceptions
- Detailed error messages for debugging

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
