#!/usr/bin/env node

const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { ListToolsRequestSchema, CallToolRequestSchema } = require("@modelcontextprotocol/sdk/types.js");

// Server information
const server = new Server({
  name: "architecture-mcp-server",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {},
    sampling: {}
  }
});

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "architecture_consultation",
        description: "Provides expert software architecture guidance and design solutions from a Senior Software Architect's perspective. Analyzes technical challenges, recommends design patterns, system architectures, and best practices for scalable, maintainable software solutions.",
        inputSchema: {
          type: "object",
          properties: {
            question: {
              type: "string",
              description: "The architecture or design question you need guidance on"
            },
            context: {
              type: "string",
              description: "Additional context about your system, technology stack, or constraints"
            },
            domain: {
              type: "string",
              enum: ["web", "mobile", "microservices", "distributed", "cloud", "enterprise", "embedded", "data"],
              description: "The domain or type of system architecture"
            },
            complexity: {
              type: "string",
              enum: ["simple", "moderate", "complex", "enterprise"],
              description: "The complexity level of the system or problem"
            }
          },
          required: ["question"]
        }
      }
    ]
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
    if (name === "architecture_consultation") {
    const { question, context = "Not specified", domain = "web", complexity = "moderate" } = args;
    
    // Sanitize inputs for security
    const sanitizedQuestion = question.replace(/[<>]/g, '');
    const sanitizedContext = context.replace(/[<>]/g, '');
    
    // Create comprehensive prompt for the architecture expert
    const architecturePrompt = `You are a Senior Software Architect with 15+ years of experience across various domains and technologies. Please provide expert guidance on the following architecture question:

**Question:** ${sanitizedQuestion}
**Domain:** ${domain} systems
**Complexity Level:** ${complexity}
**Additional Context:** ${sanitizedContext}

Please structure your response with the following sections:
1. **Problem Analysis** - Break down the architectural challenge
2. **Recommended Architecture Pattern** - Suggest the most suitable pattern(s)
3. **Technical Implementation Strategy** - Specific technical guidance
4. **Design Principles & Best Practices** - Core principles to follow
5. **Technology Stack Recommendations** - Suggest appropriate technologies
6. **Quality Attributes** - Address performance, security, maintainability, scalability
7. **Risk Assessment** - Identify potential risks and mitigation strategies
8. **Implementation Roadmap** - Phased approach to implementation
9. **Code Examples** - Provide relevant code snippets or patterns if applicable

Focus on practical, actionable advice that considers real-world constraints. Be specific about trade-offs and explain your reasoning.`;
    
    // Send proper MCP sampling request to client
    try {
      console.error("🏗️ Requesting architecture consultation from AI expert...");
        // Create proper sampling request following MCP specification
      console.error("🔍 Sending architecture consultation request to AI...");
      // Request LLM sampling using proper MCP protocol
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
        temperature: 0.2, // Lower temperature for more consistent, structured architectural advice
        includeContext: "thisServer"
      });
      console.error("✅ Architecture consultation received");
      
      // Validate sampling response structure
      if (!samplingResult) {
        throw new Error("No response received from sampling request");
      }
      
      if (samplingResult && samplingResult.content) {
        // Handle different response formats according to MCP specification
        let responseText = '';
        if (typeof samplingResult.content === 'string') {
          responseText = samplingResult.content;
        } else if (samplingResult.content.text) {
          responseText = samplingResult.content.text;
        } else if (Array.isArray(samplingResult.content) && samplingResult.content[0]?.text) {
          responseText = samplingResult.content[0].text;
        } else {
          throw new Error("Invalid sampling response format - no text content found");
        }
        
        // Validate response content
        if (!responseText || responseText.trim().length === 0) {
          throw new Error("Empty response received from sampling");
        }
        
        // Enhance the AI-generated consultation with structured metadata
        const architecturalGuidance = `# 🏗️ Senior Software Architect Consultation

**AI-Enhanced Architecture Expert Consultation**
**Question:** ${sanitizedQuestion}
**Domain:** ${domain.toUpperCase()}
**Complexity:** ${complexity.toUpperCase()}
**Generated:** ${new Date().toLocaleDateString()}

---

${responseText}

---

## 📊 Consultation Metadata
- **Consultation Method:** MCP Sampling (AI-Enhanced)
- **Expert Model:** ${samplingResult.model || 'Advanced Architecture AI'}
- **Analysis Depth:** ${samplingResult.stopReason || 'Complete'}
- **Architectural Focus:** ${domain} systems with ${complexity} complexity
- **Input Parameters:**
  - Question: ${sanitizedQuestion}
  - Context: ${sanitizedContext}
  - Domain: ${domain}
  - Complexity: ${complexity}

*This architectural guidance was generated using MCP Sampling capabilities with expert-level AI models specialized in software architecture and system design.*
`;
        
        return {
          content: [
            {
              type: "text",
              text: architecturalGuidance
            }
          ]
        };
      } else {
        throw new Error("Invalid sampling response - no content received");
      }    } catch (samplingError) {
      console.error("❌ Architecture consultation failed:", samplingError.message);
      console.error("Stack trace:", samplingError.stack);
      
      // Provide fallback response with detailed error information
      const fallbackResponse = `# ❌ Architecture Consultation Error

**Error Details:**
- **Error Type:** ${samplingError.name || 'SamplingError'}
- **Message:** ${samplingError.message}
- **Timestamp:** ${new Date().toISOString()}

**Requested Consultation:**
- **Question:** ${sanitizedQuestion}
- **Domain:** ${domain}
- **Complexity:** ${complexity}
- **Context:** ${sanitizedContext}

**Troubleshooting:**
1. Ensure MCP Sampling is enabled in your client
2. Verify client has access to LLM models
3. Check network connectivity and API quotas
4. Validate input parameters are within acceptable limits

**Alternative Solutions:**
- Try rephrasing your architecture question
- Reduce complexity if the request is too large
- Check with your MCP client configuration

Please ensure MCP Sampling is properly configured and try again.`;
      
      return {
        content: [
          {
            type: "text",
            text: fallbackResponse
          }
        ],
        isError: true
      };
    }
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

// Initialize and start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🚀 Software Architecture MCP Server is running");
  console.error("🏗️ Available tools: architecture_consultation");
  console.error("💡 Providing expert software architecture guidance and design solutions");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
