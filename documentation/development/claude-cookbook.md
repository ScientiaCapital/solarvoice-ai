Basic Usage  
Starting Claude Code  
bashclaude-code                    \# Interactive session (default)  
claude-code \-p "your prompt"   \# Non-interactive with prompt  
Arguments & Options Reference  
Core Options  
\-d, \--debug

Enables debug mode for troubleshooting  
Shows detailed execution information  
Override verbose settings from config

\--verbose

More detailed output during execution  
Can be set in config file

\-p, \--print

Print response and exit (non-interactive mode)  
Useful for scripting and automation  
Works with pipes: echo "fix this code" | claude-code \-p

Output Control  
\--output-format \<format\>

Controls output format (only with \--print)  
Options: "text" (default), "json", "stream-json"  
Example: claude-code \-p "explain this function" \--output-format json

\--input-format \<format\>

Controls input format (only with \--print)  
Options: "text" (default), "stream-json"  
For realtime streaming input

Model Selection  
\--model \<model\>

Specify which Claude model to use  
Options: 'sonnet', 'opus', or full model names like 'claude-sonnet-4-20250514'  
Example: claude-code \--model opus \-p "complex analysis task"

\--fallback-model \<model\>

Automatic fallback when primary model is overloaded  
Only works with \--print mode

Security & Permissions  
\--dangerously-skip-permissions

Bypasses all permission checks  
⚠️ DANGEROUS: Only use in sandboxed environments with no internet access  
Example: claude-code \--dangerously-skip-permissions \-p "automated script"

\--allowedTools \<tools...\>

Comma or space-separated list of allowed tools  
Example: claude-code \--allowedTools "Bash(git:\*) Edit" \-p "git workflow"

\--disallowedTools \<tools...\>

Comma or space-separated list of tools to deny  
Example: claude-code \--disallowedTools "Bash(git:\*) Edit" \-p "analysis only"

Configuration  
\--mcp-config \<file or string\>

Load MCP (Model Context Protocol) servers from JSON file or string  
Extends Claude's capabilities with external tools  
Example: claude-code \--mcp-config ./my-servers.json

Session Management  
\-c, \--continue

Continue the most recent conversation  
Maintains context from previous session

\-r, \--resume \[sessionId\]

Resume a specific conversation by session ID  
Interactive selection if no ID provided  
Example: claude-code \-r abc123 or claude-code \-r (interactive)

Development Tools  
\--add-dir \<directories...\>

Grant tool access to additional directories  
Security: Only directories you explicitly allow  
Example: claude-code \--add-dir ./src ./tests \-p "refactor project"

\--ide

Automatically connect to IDE if exactly one valid IDE is available  
Seamless integration with development environment

Information  
\-v, \--version

Display version number

\-h, \--help

Show help information

Commands Reference  
config  
Manage Claude Code configuration  
bashclaude-code config              \# Interactive configuration  
claude-code config set \-g theme dark  \# Set global theme  
mcp  
Configure and manage MCP (Model Context Protocol) servers  
bashclaude-code mcp                 \# Interactive MCP management  
claude-code mcp list           \# List configured servers  
claude-code mcp add \<server\>   \# Add new MCP server  
migrate-installer  
Migrate from global npm installation to local installation  
bashclaude-code migrate-installer  
doctor  
Check the health of your Claude Code installation and auto-updater  
bashclaude-code doctor             \# Comprehensive health check  
update  
Check for updates and install if available  
bashclaude-code update             \# Check and install updates  
install \[options\]  
Install Claude Code native build  
bashclaude-code install            \# Install native version  
claude-code install \--force    \# Force reinstall  
Cookbook Examples  
Basic Code Tasks  
bash\# Quick code review  
claude-code \-p "review this Python file for best practices" \< script.py

\# Debug assistance  
claude-code \-p "help me debug this error" \--allowedTools "Bash Edit"

\# Code refactoring  
claude-code \--model opus \-p "refactor this class for better performance"  
Project-Level Tasks  
bash\# Full project analysis  
claude-code \--add-dir ./src ./tests \-p "analyze project structure and suggest improvements"

\# Git workflow assistance  
claude-code \--allowedTools "Bash(git:\*)" \-p "help me create a proper git workflow"

\# Documentation generation  
claude-code \-p "generate README for this project" \--output-format text \> README.md  
Automation & Scripting  
bash\# Automated code formatting  
echo "format all Python files" | claude-code \-p \--dangerously-skip-permissions

\# Batch processing  
for file in \*.py; do  
    claude-code \-p "optimize $file" \< "$file" \> "optimized\_$file"  
done  
Advanced Workflows  
bash\# Continue previous session  
claude-code \-c

\# Resume specific conversation  
claude-code \-r session\_abc123

\# Debug mode with specific model  
claude-code \--debug \--model sonnet \--verbose \-p "complex debugging task"  
Configuration Examples  
bash\# Set up development environment  
claude-code config set editor vscode  
claude-code config set theme dark  
claude-code config set auto-update true

\# Configure MCP servers  
claude-code mcp add filesystem-server  
claude-code mcp add git-server  
Best Practices

Start Simple: Begin with basic \-p commands before using interactive mode  
Use Permissions: Only grant necessary tool access with \--allowedTools  
Save Sessions: Use \-c to continue important conversations  
Choose Right Model: Use opus for complex tasks, sonnet for everyday coding  
Debug Mode: Use \--debug when things aren't working as expected  
Security First: Never use \--dangerously-skip-permissions outside sandboxes

Common Patterns  
bash\# Code review workflow  
claude-code \-p "review for security issues" \--allowedTools "Edit" \< sensitive\_file.py

\# Interactive development  
claude-code \--ide \--add-dir ./project

\# Quick fixes  
claude-code \-p "fix syntax errors" \< broken\_script.py \> fixed\_script.py

\# Project documentation  
claude-code \--add-dir ./src \-p "create API documentation" \--output-format text  
This cookbook should help you get started with Claude Code and make the most of its capabilities for your development workflow\!RetryTKcan yiu give me more details and can you give me an example how i can use json and enter it directly into Claude desktop to add MCP serverEditClaude Code Deep Dive & MCP Configuration Guide  
Detailed Claude Code Architecture  
Claude Code is built on the Model Context Protocol (MCP), which allows Claude to interact with external tools and services. Think of it as giving Claude "hands" to actually perform tasks in your development environment.  
How MCP Works

MCP Servers: External programs that provide specific capabilities (file system access, git operations, database connections, etc.)  
MCP Protocol: Standardized communication between Claude and these servers  
Tool Safety: Each tool requires explicit permission, creating a secure sandbox

Deep Dive: Command Options  
Advanced Output Formats  
JSON Output (--output-format json)  
bashclaude-code \-p "analyze this function" \--output-format json  
Returns structured response:  
json{  
  "response": "This function has several issues...",  
  "metadata": {  
    "model": "claude-sonnet-4",  
    "timestamp": "2025-06-29T10:30:00Z",  
    "tools\_used": \["Edit", "Bash"\]  
  },  
  "suggestions": \[...\],  
  "confidence": 0.95  
}  
Stream JSON (--output-format stream-json)

Real-time streaming for long responses  
Each line is a separate JSON object  
Useful for live progress monitoring

Model Selection Strategy  
Sonnet vs Opus:  
bash\# Sonnet (faster, efficient) \- everyday tasks  
claude-code \--model sonnet \-p "fix syntax error"

\# Opus (more capable) \- complex analysis  
claude-code \--model opus \-p "design system architecture"

\# Fallback for reliability  
claude-code \--model opus \--fallback-model sonnet \-p "complex task"  
Permission System Deep Dive  
Tool Syntax:  
bash\# Allow specific git commands  
\--allowedTools "Bash(git:status,git:commit,git:push)"

\# Allow file editing in specific directories  
\--allowedTools "Edit(/home/user/project/\*)"

\# Multiple tools  
\--allowedTools "Bash(git:\*) Edit(/src/\*) FileManager"  
Common Tool Patterns:

Bash(\*): All bash commands (dangerous)  
Bash(git:\*): All git commands  
Edit(\*.py): Edit Python files only  
FileManager(/safe/path/\*): File operations in specific path

MCP Server Configuration  
What are MCP Servers?  
MCP servers extend Claude's capabilities. Popular ones include:

Filesystem Server: File operations beyond basic editing  
Git Server: Advanced git operations  
Database Server: SQL database interactions  
Web Server: HTTP requests and API calls  
Docker Server: Container management  
AWS Server: Cloud resource management

MCP Configuration JSON Structure  
Here's the complete structure for MCP configuration:  
json{  
  "mcpServers": {  
    "server-name": {  
      "command": "executable-path",  
      "args": \["arg1", "arg2"\],  
      "env": {  
        "ENVIRONMENT\_VAR": "value"  
      },  
      "disabled": false  
    }  
  }  
}  
Example: Adding MCP Servers to Claude Desktop  
Method 1: Direct JSON in Claude Desktop  
When chatting with Claude in the desktop app, you can paste this configuration:  
json{  
  "mcpServers": {  
    "filesystem": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"\],  
      "env": {}  
    },  
    "git": {  
      "command": "npx",   
      "args": \["@modelcontextprotocol/server-git", "--repository", "/path/to/git/repo"\],  
      "env": {}  
    },  
    "brave-search": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-brave-search"\],  
      "env": {  
        "BRAVE\_API\_KEY": "your-api-key-here"  
      }  
    },  
    "postgresql": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-postgres"\],  
      "env": {  
        "POSTGRES\_CONNECTION\_STRING": "postgresql://user:pass@localhost:5432/dbname"  
      }  
    },  
    "sqlite": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-sqlite", "/path/to/database.db"\],  
      "env": {}  
    }  
  }  
}  
Method 2: File-based Configuration  
Create mcp-config.json:  
json{  
  "mcpServers": {  
    "development-stack": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/home/user/projects"\],  
      "env": {  
        "NODE\_ENV": "development"  
      }  
    },  
    "git-operations": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-git", "--repository", "/home/user/projects/my-app"\],  
      "env": {}  
    },  
    "docker-manager": {  
      "command": "docker-mcp-server",  
      "args": \["--socket", "/var/run/docker.sock"\],  
      "env": {  
        "DOCKER\_HOST": "unix:///var/run/docker.sock"  
      }  
    }  
  }  
}  
Use with Claude Code:  
bashclaude-code \--mcp-config ./mcp-config.json \-p "help me deploy this app"  
Real-World Usage Examples  
1\. Full-Stack Development Setup  
MCP Config:  
json{  
  "mcpServers": {  
    "project-files": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/home/dev/my-app"\],  
      "env": {}  
    },  
    "git-repo": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-git", "--repository", "/home/dev/my-app"\],  
      "env": {}  
    },  
    "database": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-postgres"\],  
      "env": {  
        "POSTGRES\_CONNECTION\_STRING": "postgresql://localhost:5432/myapp\_dev"  
      }  
    },  
    "web-requests": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-fetch"\],  
      "env": {}  
    }  
  }  
}  
Usage:  
bash\# Start development session  
claude-code \--mcp-config ./dev-config.json \--add-dir ./src ./tests

\# Then interact:  
\# "Help me add a new API endpoint for user authentication"  
\# "Review my database schema and suggest optimizations"  
\# "Set up CI/CD pipeline using git hooks"  
2\. Data Science Workflow  
json{  
  "mcpServers": {  
    "data-files": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/data/projects"\],  
      "env": {}  
    },  
    "sqlite-analysis": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-sqlite", "/data/analysis.db"\],  
      "env": {}  
    },  
    "python-env": {  
      "command": "python-mcp-server",  
      "args": \["--jupyter", "--pandas"\],  
      "env": {  
        "PYTHONPATH": "/data/projects/lib"  
      }  
    }  
  }  
}  
3\. DevOps & Infrastructure  
json{  
  "mcpServers": {  
    "infrastructure": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/infrastructure"\],  
      "env": {}  
    },  
    "aws-resources": {  
      "command": "aws-mcp-server",  
      "args": \["--region", "us-west-2"\],  
      "env": {  
        "AWS\_PROFILE": "production",  
        "AWS\_REGION": "us-west-2"  
      }  
    },  
    "kubernetes": {  
      "command": "kubectl-mcp-server",  
      "args": \["--context", "production"\],  
      "env": {  
        "KUBECONFIG": "/home/user/.kube/config"  
      }  
    },  
    "docker-local": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-docker"\],  
      "env": {}  
    }  
  }  
}  
Advanced Claude Code Patterns  
1\. Automated Code Review Pipeline  
bash\#\!/bin/bash  
\# review-pipeline.sh

\# Pre-commit review  
claude-code \--mcp-config ./review-config.json \\  
  \--allowedTools "Edit FileManager Bash(git:\*)" \\  
  \-p "Review staged changes for security issues, performance problems, and coding standards"

\# Post-review actions  
if \[ $? \-eq 0 \]; then  
    claude-code \--continue \-p "Generate commit message based on changes"  
fi  
2\. Interactive Development Session  
bash\# Start comprehensive development environment  
claude-code \\  
  \--mcp-config ./full-stack-config.json \\  
  \--add-dir ./src ./tests ./docs \\  
  \--allowedTools "Edit FileManager Bash(npm:\*,git:\*) DatabaseQuery" \\  
  \--model opus \\  
  \--ide  
3\. Batch Processing with JSON Output  
bash\# Process multiple files with structured output  
for file in src/\*.py; do  
    result=$(claude-code \-p "analyze $file for complexity" \--output-format json \< "$file")  
    echo "$result" | jq '.complexity\_score' \>\> complexity\_report.txt  
done  
Troubleshooting & Best Practices  
Common MCP Issues

Server Not Starting:

bash\# Debug MCP server startup  
claude-code \--debug \--mcp-config ./config.json mcp list

Permission Denied:

bash\# Check file permissions  
claude-code doctor

Tool Access Issues:

bash\# Verify tool allowlist  
claude-code \--allowedTools "Bash(\*)" \--debug \-p "test command"  
Security Best Practices

Principle of Least Privilege:

bash\# Good: Specific permissions  
\--allowedTools "Bash(git:status,git:commit) Edit(src/\*.py)"

\# Bad: Too broad  
\--allowedTools "Bash(\*) Edit(\*)"

Environment Isolation:

json{  
  "mcpServers": {  
    "safe-server": {  
      "command": "server-binary",  
      "args": \["--sandbox", "--no-network"\],  
      "env": {  
        "RESTRICTED\_MODE": "true"  
      }  
    }  
  }  
}

Audit Trail:

bash\# Enable detailed logging  
claude-code \--debug \--verbose \-p "task" 2\>&1 | tee audit.log  
This comprehensive guide should give you everything you need to effectively use Claude Code with MCP servers in both command-line and desktop environments\!RetryTKhow do i set up the mcp server from terminal using claude code please like context7EditSetting Up MCP Servers with Claude Code from Terminal  
Understanding MCP Server Installation  
MCP servers are separate programs that need to be installed and configured before Claude Code can use them. Here's how to set them up step by step.  
1\. Install MCP Servers  
Official MCP Servers (Recommended)  
First, install the servers you want to use:  
bash\# Install common MCP servers globally  
npm install \-g @modelcontextprotocol/server-filesystem  
npm install \-g @modelcontextprotocol/server-git  
npm install \-g @modelcontextprotocol/server-sqlite  
npm install \-g @modelcontextprotocol/server-postgres  
npm install \-g @modelcontextprotocol/server-brave-search  
npm install \-g @modelcontextprotocol/server-fetch  
Alternative: Use npx (No Installation Required)  
You can also use npx to run servers without installing them globally (this is what most examples use):  
bash\# Test if a server works  
npx @modelcontextprotocol/server-filesystem \--help  
2\. Configure MCP Servers with Claude Code  
Method 1: Using the mcp Command  
bash\# Access MCP configuration  
claude-code mcp

\# This opens an interactive menu where you can:  
\# \- Add new servers  
\# \- Configure existing servers  
\# \- Enable/disable servers  
\# \- Test server connections  
Method 2: Create Configuration File  
Create a configuration file first:  
bash\# Create MCP config directory  
mkdir \-p \~/.config/claude-code

\# Create MCP configuration file  
cat \> \~/.config/claude-code/mcp-servers.json \<\< 'EOF'  
{  
  "mcpServers": {  
    "filesystem": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/Users/$(whoami)/projects"\],  
      "env": {}  
    },  
    "git": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-git", "--repository", "/Users/$(whoami)/projects/my-repo"\],  
      "env": {}  
    },  
    "sqlite": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-sqlite", "/Users/$(whoami)/data/app.db"\],  
      "env": {}  
    }  
  }  
}  
EOF  
Method 3: Using Command Line Configuration  
bash\# Set global MCP config  
claude-code config set mcp-servers \~/.config/claude-code/mcp-servers.json

\# Or specify per session  
claude-code \--mcp-config \~/.config/claude-code/mcp-servers.json \-p "help me with my project"  
3\. Context7-Style Development Server Setup  
If you want a Context7-like experience with comprehensive project access:  
Create a Development MCP Configuration  
bash\# Create a comprehensive dev config  
cat \> ./dev-mcp-config.json \<\< 'EOF'  
{  
  "mcpServers": {  
    "project-filesystem": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "./"\],  
      "env": {  
        "NODE\_ENV": "development"  
      }  
    },  
    "git-operations": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-git", "--repository", "./"\],  
      "env": {}  
    },  
    "web-requests": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-fetch"\],  
      "env": {}  
    },  
    "database": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-sqlite", "./data/app.db"\],  
      "env": {}  
    }  
  }  
}  
EOF  
Start Development Session  
bash\# Start comprehensive development session  
claude-code \\  
  \--mcp-config ./dev-mcp-config.json \\  
  \--add-dir ./ \\  
  \--allowedTools "Edit FileManager Bash(npm:\*,git:\*,node:\*) DatabaseQuery WebRequest" \\  
  \--model sonnet \\  
  \--ide  
4\. Step-by-Step Setup Example  
Let's set up a complete development environment:  
Step 1: Install Prerequisites  
bash\# Ensure Node.js is installed  
node \--version  
npm \--version

\# Install Claude Code if not already installed  
npm install \-g claude-code  
Step 2: Create Project Structure  
bash\# Create a test project  
mkdir \~/claude-test-project  
cd \~/claude-test-project

\# Initialize git repo  
git init  
echo "\# Test Project" \> README.md  
git add README.md  
git commit \-m "Initial commit"

\# Create some sample files  
mkdir src data  
echo "console.log('Hello World');" \> src/app.js  
echo "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);" \> data/schema.sql  
Step 3: Create MCP Configuration  
bash\# Create MCP config for this project  
cat \> mcp-config.json \<\< EOF  
{  
  "mcpServers": {  
    "project-files": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "$(pwd)"\],  
      "env": {}  
    },  
    "git-repo": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-git", "--repository", "$(pwd)"\],  
      "env": {}  
    },  
    "sqlite-db": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-sqlite", "$(pwd)/data/app.db"\],  
      "env": {}  
    }  
  }  
}  
EOF  
Step 4: Test MCP Configuration  
bash\# Test if servers can start  
claude-code \--mcp-config ./mcp-config.json mcp list

\# Should show your configured servers  
Step 5: Start Development Session  
bash\# Start interactive development  
claude-code \\  
  \--mcp-config ./mcp-config.json \\  
  \--add-dir ./src ./data \\  
  \--allowedTools "Edit FileManager Bash(git:\*,npm:\*,node:\*) DatabaseQuery"  
5\. Advanced MCP Server Configurations  
Custom Environment Variables  
bash\# Create config with environment variables  
cat \> advanced-mcp-config.json \<\< 'EOF'  
{  
  "mcpServers": {  
    "database": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-postgres"\],  
      "env": {  
        "POSTGRES\_CONNECTION\_STRING": "postgresql://user:pass@localhost:5432/mydb",  
        "PGPASSWORD": "your-password"  
      }  
    },  
    "web-api": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-fetch"\],  
      "env": {  
        "API\_KEY": "your-api-key",  
        "BASE\_URL": "https://api.example.com"  
      }  
    }  
  }  
}  
EOF  
Multiple Project Configurations  
bash\# Create different configs for different projects  
mkdir \-p \~/.config/claude-code/projects

\# Frontend project config  
cat \> \~/.config/claude-code/projects/frontend.json \<\< 'EOF'  
{  
  "mcpServers": {  
    "frontend-files": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/path/to/frontend"\],  
      "env": {}  
    },  
    "git": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-git", "--repository", "/path/to/frontend"\],  
      "env": {}  
    }  
  }  
}  
EOF

\# Backend project config  
cat \> \~/.config/claude-code/projects/backend.json \<\< 'EOF'  
{  
  "mcpServers": {  
    "backend-files": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/path/to/backend"\],  
      "env": {}  
    },  
    "database": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-postgres"\],  
      "env": {  
        "POSTGRES\_CONNECTION\_STRING": "postgresql://localhost:5432/backend\_db"  
      }  
    }  
  }  
}  
EOF  
Use Project-Specific Configs  
bash\# Switch between projects  
claude-code \--mcp-config \~/.config/claude-code/projects/frontend.json \-p "help with React components"  
claude-code \--mcp-config \~/.config/claude-code/projects/backend.json \-p "optimize database queries"  
6\. Troubleshooting MCP Setup  
Check Server Status  
bash\# Verify MCP servers are working  
claude-code doctor

\# Debug MCP configuration  
claude-code \--debug \--mcp-config ./mcp-config.json mcp list  
Test Individual Servers  
bash\# Test filesystem server  
npx @modelcontextprotocol/server-filesystem \--help

\# Test git server  
npx @modelcontextprotocol/server-git \--help

\# Test with minimal config  
echo '{"mcpServers": {"test": {"command": "npx", "args": \["@modelcontextprotocol/server-filesystem", "./"\]}}}' \> test-config.json  
claude-code \--mcp-config test-config.json \-p "list files in current directory"  
Common Issues and Solutions

Server Not Found:

bash\# Install missing server  
npm install \-g @modelcontextprotocol/server-filesystem

Permission Denied:

bash\# Check file permissions  
ls \-la \~/.config/claude-code/  
chmod 644 \~/.config/claude-code/mcp-servers.json

Path Issues:

bash\# Use absolute paths  
pwd  \# Get current directory  
\# Update config with full paths  
7\. Creating Aliases for Common Setups  
Add these to your \~/.bashrc or \~/.zshrc:  
bash\# Quick development setup  
alias claude-dev='claude-code \--mcp-config \~/.config/claude-code/dev-config.json \--add-dir ./ \--allowedTools "Edit FileManager Bash(git:\*,npm:\*,node:\*)"'

\# Quick analysis (read-only)  
alias claude-analyze='claude-code \--mcp-config \~/.config/claude-code/readonly-config.json \--allowedTools "FileManager" \-p'

\# Full-stack development  
alias claude-fullstack='claude-code \--mcp-config \~/.config/claude-code/fullstack-config.json \--add-dir ./ \--allowedTools "Edit FileManager Bash(git:\*,npm:\*,node:\*,docker:\*) DatabaseQuery WebRequest" \--model opus'  
This setup gives you Context7-like capabilities where Claude can access your project files, git repository, databases, and make web requests \- all while maintaining security through explicit permission controls.RetryTKwhat are the the best full stack ai software engineer mcp servers that are a must and readily available and publicEditEssential MCP Servers for Full-Stack AI Software Engineering  
Tier 1: Absolutely Essential (Must-Have)  
1\. Filesystem Server  
bashnpm install \-g @modelcontextprotocol/server-filesystem  
Why Essential: Core file operations, project navigation, code reading/writing  
Capabilities: Read/write files, directory operations, file search, project structure analysis  
2\. Git Server  
bashnpm install \-g @modelcontextprotocol/server-git  
Why Essential: Version control, code history, branch management, collaboration  
Capabilities: Git status, commits, branching, merging, log analysis, diff viewing  
3\. SQLite Server  
bashnpm install \-g @modelcontextprotocol/server-sqlite  
Why Essential: Local database operations, data analysis, schema management  
Capabilities: SQL queries, database schema inspection, data manipulation  
4\. Fetch/Web Server  
bashnpm install \-g @modelcontextprotocol/server-fetch  
Why Essential: API testing, web requests, external service integration  
Capabilities: HTTP requests, API debugging, webhook testing, external data fetching  
Tier 2: Highly Recommended (Core Development)  
5\. Brave Search Server  
bashnpm install \-g @modelcontextprotocol/server-brave-search  
Why Important: Real-time documentation lookup, debugging help, staying current  
Capabilities: Search Stack Overflow, documentation, GitHub issues, recent solutions  
6\. Puppeteer Server  
bashnpm install \-g @modelcontextprotocol/server-puppeteer  
Why Important: Web automation, testing, scraping, UI debugging  
Capabilities: Browser automation, screenshot capture, form testing, web scraping  
7\. PostgreSQL Server  
bashnpm install \-g @modelcontextprotocol/server-postgres  
Why Important: Production database operations, complex queries, data analysis  
Capabilities: PostgreSQL operations, advanced SQL, performance analysis  
8\. Kubernetes Server  
bashnpm install \-g @modelcontextprotocol/server-kubernetes  
Why Important: Container orchestration, deployment management, cluster operations  
Capabilities: Pod management, service deployment, cluster monitoring  
Tier 3: Specialized but Valuable  
9\. Sentry Server  
bashnpm install \-g @modelcontextprotocol/server-sentry  
Why Useful: Error tracking, performance monitoring, debugging production issues  
Capabilities: Error analysis, performance insights, issue triage  
10\. Slack Server  
bashnpm install \-g @modelcontextprotocol/server-slack  
Why Useful: Team communication, deployment notifications, incident management  
Capabilities: Message channels, file sharing, team coordination  
11\. GitHub Server  
bashnpm install \-g @modelcontextprotocol/server-github  
Why Useful: Repository management, issue tracking, PR reviews, CI/CD integration  
Capabilities: Repository operations, issue management, pull request handling  
12\. Notion Server  
bashnpm install \-g @modelcontextprotocol/server-notion  
Why Useful: Documentation management, project planning, knowledge base  
Capabilities: Page creation, database operations, content management  
Complete Full-Stack MCP Configuration  
Here's a comprehensive configuration that includes all essential servers:  
json{  
  "mcpServers": {  
    "filesystem": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-filesystem", "/home/user/projects"\],  
      "env": {}  
    },  
    "git": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-git", "--repository", "/home/user/projects"\],  
      "env": {}  
    },  
    "sqlite": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-sqlite", "/home/user/data/app.db"\],  
      "env": {}  
    },  
    "postgres": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-postgres"\],  
      "env": {  
        "POSTGRES\_CONNECTION\_STRING": "postgresql://user:pass@localhost:5432/myapp"  
      }  
    },  
    "web-requests": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-fetch"\],  
      "env": {}  
    },  
    "brave-search": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-brave-search"\],  
      "env": {  
        "BRAVE\_API\_KEY": "your-brave-api-key"  
      }  
    },  
    "puppeteer": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-puppeteer"\],  
      "env": {}  
    },  
    "github": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-github"\],  
      "env": {  
        "GITHUB\_TOKEN": "your-github-token"  
      }  
    },  
    "kubernetes": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-kubernetes"\],  
      "env": {  
        "KUBECONFIG": "/home/user/.kube/config"  
      }  
    },  
    "sentry": {  
      "command": "npx",  
      "args": \["@modelcontextprotocol/server-sentry"\],  
      "env": {  
        "SENTRY\_DSN": "your-sentry-dsn",  
        "SENTRY\_AUTH\_TOKEN": "your-sentry-token"  
      }  
    }  
  }  
}  
Quick Setup Script  
Create this script to install all essential MCP servers:  
bash\#\!/bin/bash  
\# setup-mcp-servers.sh

echo "Installing essential MCP servers for full-stack development..."

\# Tier 1 \- Essential  
npm install \-g @modelcontextprotocol/server-filesystem  
npm install \-g @modelcontextprotocol/server-git  
npm install \-g @modelcontextprotocol/server-sqlite  
npm install \-g @modelcontextprotocol/server-fetch

\# Tier 2 \- Highly Recommended  
npm install \-g @modelcontextprotocol/server-brave-search  
npm install \-g @modelcontextprotocol/server-puppeteer  
npm install \-g @modelcontextprotocol/server-postgres  
npm install \-g @modelcontextprotocol/server-kubernetes

\# Tier 3 \- Specialized  
npm install \-g @modelcontextprotocol/server-github  
npm install \-g @modelcontextprotocol/server-sentry  
npm install \-g @modelcontextprotocol/server-slack  
npm install \-g @modelcontextprotocol/server-notion

echo "All MCP servers installed successfully\!"  
Development Workflow Examples  
Frontend Development Setup  
bashclaude-code \--mcp-config frontend-config.json \\  
  \--allowedTools "Edit FileManager Bash(npm:\*,git:\*,node:\*) WebRequest Puppeteer" \\  
  \--add-dir ./src ./public ./tests  
Backend Development Setup  
bashclaude-code \--mcp-config backend-config.json \\  
  \--allowedTools "Edit FileManager Bash(npm:\*,git:\*,node:\*) DatabaseQuery WebRequest" \\  
  \--add-dir ./src ./migrations ./tests  
DevOps/Infrastructure Setup  
bashclaude-code \--mcp-config devops-config.json \\  
  \--allowedTools "Edit FileManager Bash(git:\*,docker:\*,kubectl:\*) KubernetesOps" \\  
  \--add-dir ./infrastructure ./k8s ./terraform  
Full-Stack Development Session  
bashclaude-code \--mcp-config fullstack-config.json \\  
  \--allowedTools "Edit FileManager Bash(npm:\*,git:\*,node:\*,docker:\*) DatabaseQuery WebRequest Puppeteer KubernetesOps" \\  
  \--add-dir ./frontend ./backend ./infrastructure \\  
  \--model opus  
Community and Third-Party MCP Servers  
Docker Server  
bash\# Third-party Docker MCP server  
npm install \-g docker-mcp-server  
AWS Server  
bash\# Third-party AWS MCP server  
npm install \-g aws-mcp-server  
MongoDB Server  
bash\# Third-party MongoDB MCP server  
npm install \-g mongodb-mcp-server  
Redis Server  
bash\# Third-party Redis MCP server  
npm install \-g redis-mcp-server  
Best Practices for MCP Server Management  
1\. Environment-Specific Configurations  
bash\# Development environment  
cp mcp-config.json mcp-config.dev.json

\# Production environment (restricted)  
cp mcp-config.json mcp-config.prod.json  
2\. Security Considerations  
bash\# Use environment variables for sensitive data  
export POSTGRES\_CONNECTION\_STRING="postgresql://..."  
export GITHUB\_TOKEN="ghp\_..."  
export BRAVE\_API\_KEY="..."  
3\. Performance Optimization  
bash\# Only load servers you need for current task  
claude-code \--mcp-config minimal-config.json  \# For simple tasks  
claude-code \--mcp-config fullstack-config.json  \# For complex projects  
4\. Testing MCP Servers  
bash\# Test individual servers  
claude-code \--mcp-config test-config.json mcp list  
claude-code \--mcp-config test-config.json \-p "test database connection"  
This setup gives you a comprehensive full-stack development environment with AI assistance across all layers of modern software development \- from frontend UI to backend APIs, databases, infrastructure, and deployment.