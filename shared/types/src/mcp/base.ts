/**
 * MCP (Model Context Protocol) Base Types
 * Standard interfaces for all MCP servers in the platform
 */

export interface MCPRequest<TParams = any> {
  jsonrpc: '2.0';
  method: string;
  params?: TParams;
  id: string | number | null;
}

export interface MCPResponse<TResult = any> {
  jsonrpc: '2.0';
  result?: TResult;
  error?: MCPError;
  id: string | number | null;
}

export interface MCPError {
  code: number;
  message: string;
  data?: any;
}

export interface MCPNotification<TParams = any> {
  jsonrpc: '2.0';
  method: string;
  params?: TParams;
}

export interface MCPServerCapabilities {
  name: string;
  version: string;
  description: string;
  methods: string[];
  notifications: string[];
  resources?: MCPResource[];
  tools?: MCPTool[];
}

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: any; // JSON Schema
  outputSchema?: any; // JSON Schema
}

export interface MCPServerConfig {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
  cwd?: string;
  timeout?: number;
}

export interface MCPServerInfo {
  name: string;
  version: string;
  protocolVersion: string;
  capabilities: MCPServerCapabilities;
  status: MCPServerStatus;
  lastSeen?: Date;
  stats?: MCPServerStats;
}

export type MCPServerStatus = 'error' | 'ready' | 'starting' | 'stopped';

export interface MCPServerStats {
  requestCount: number;
  errorCount: number;
  averageResponseTime: number;
  uptime: number;
  memoryUsage?: number;
  cpuUsage?: number;
}

export abstract class BaseMCPServer {
  abstract name: string;
  abstract version: string;
  abstract capabilities: MCPServerCapabilities;
  
  abstract initialize(): Promise<void>;
  abstract handleRequest(request: MCPRequest): Promise<MCPResponse>;
  abstract handleNotification(notification: MCPNotification): Promise<void>;
  abstract shutdown(): Promise<void>;
  
  protected createResponse<T>(id: string | number | null, result: T): MCPResponse<T> {
    return {
      jsonrpc: '2.0',
      result,
      id
    };
  }
  
  protected createErrorResponse(id: string | number | null, error: MCPError): MCPResponse {
    return {
      jsonrpc: '2.0',
      error,
      id
    };
  }
}

export interface MCPServerManager {
  registerServer(config: MCPServerConfig): Promise<void>;
  startServer(name: string): Promise<void>;
  stopServer(name: string): Promise<void>;
  getServerInfo(name: string): Promise<MCPServerInfo | null>;
  listServers(): Promise<MCPServerInfo[]>;
  sendRequest(serverName: string, request: MCPRequest): Promise<MCPResponse>;
  sendNotification(serverName: string, notification: MCPNotification): Promise<void>;
}