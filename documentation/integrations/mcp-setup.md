# MCP Server Setup Guide

## Quick Setup Instructions

### 1. GitHub Personal Access Token Setup

To enable the GitHub MCP server, you need to create a personal access token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Claude MCP GitHub"
4. Select scopes:
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership)
   - `read:user` (Read user profile data)
5. Generate the token and copy it
6. Replace `YOUR_GITHUB_PAT_HERE` in the Claude config file:
   ```bash
   /Users/tmk/Library/Application Support/Claude/claude_desktop_config.json
   ```

### 2. Verify MCP Servers

After setting up the GitHub token, restart Claude Desktop to apply changes.

To verify all MCP servers are working:
1. Open Claude Desktop
2. Check the MCP icon in the bottom toolbar
3. All 8 servers should show as connected

### 3. Test Custom MCP Servers

Our three custom MCP servers have been tested and are working:
- ✅ solarvoice-project-intelligence
- ✅ solarvoice-safety-critical  
- ✅ solarvoice-voice-agent

### 4. Install Additional Smithery Servers

To install recommended Smithery servers:

```bash
# Install Smithery CLI first
npm install -g @smithery/cli

# Install high-priority servers
npx @smithery/cli install mcp-brave-search --client claude
npx @smithery/cli install mcp-neo4j --client claude
npx @smithery/cli install mcp-google-maps --client claude
npx @smithery/cli install mcp-aws-s3 --client claude

# List installed servers
npx @smithery/cli list servers --client claude
```

### 5. API Keys Required

For the Smithery servers, you'll need:
- **Brave Search**: Get API key from https://api.search.brave.com/
- **Google Maps**: Get API key from Google Cloud Console
- **AWS S3**: AWS credentials (if using S3)
- **Neo4j**: Connection credentials for your Neo4j instance

### 6. Docker Setup (Coming Soon)

We'll be creating Docker containers for the custom MCP servers to ensure:
- Persistent operation
- Health monitoring
- Auto-restart on failure
- Easy deployment

## Troubleshooting

### Server Not Connecting
1. Check the server path exists: `ls /path/to/server`
2. Test the server manually: `node /path/to/server/index.js`
3. Check Claude logs for errors
4. Restart Claude Desktop

### Permission Issues
If you get permission errors, ensure the server files are executable:
```bash
chmod +x /Users/tmk/Documents/01_Active_Projects/Learning/solarvoice_ai/solarvoice-platform/libs/mcp/*/dist/index.js
```

### Next Steps
1. Complete GitHub token setup
2. Install Smithery servers
3. Configure API keys
4. Test all servers are operational
5. Proceed with CrewAI integration