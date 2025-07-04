# SolarVoice Platform API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [REST API Endpoints](#rest-api-endpoints)
4. [WebSocket API](#websocket-api)
5. [Webhooks](#webhooks)
6. [Response Formats](#response-formats)
7. [Error Handling](#error-handling)
8. [Rate Limiting](#rate-limiting)

## Overview

The SolarVoice Platform provides a comprehensive API for managing solar construction projects through voice-enabled AI agents. The API supports REST endpoints, WebSocket connections for real-time communication, and webhook integrations.

### Base URL
```
Production: https://api.solarvoice.ai
Staging: https://staging-api.solarvoice.ai
Development: http://localhost:3000
```

### API Versioning
All API endpoints are versioned. Current version: `v1`

## Authentication

### JWT Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Obtaining Tokens

#### Login Endpoint
```bash
POST /auth/ultra/login
```

**Request:**
```bash
curl -X POST https://api.solarvoice.ai/auth/ultra/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "mfaToken": "123456",
    "biometricData": "optional-biometric-signature",
    "rememberDevice": true
  }'
```

**Response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 900,
  "securityContext": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "roles": ["PROJECT_MANAGER", "SAFETY_OFFICER"],
      "securityLevel": "ELEVATED",
      "mfaEnabled": true
    },
    "device": {
      "type": "DESKTOP",
      "trusted": true,
      "riskScore": 15
    },
    "risk": {
      "overallRisk": "LOW",
      "riskScore": 25,
      "recommendations": []
    },
    "sessionId": "session_456"
  }
}
```

#### Token Refresh
```bash
POST /auth/ultra/refresh
```

**Request:**
```bash
curl -X POST https://api.solarvoice.ai/auth/ultra/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your_refresh_token_here"
  }'
```

## REST API Endpoints

### Voice Command Processing

#### Process Voice Command
```bash
POST /voice/command
```

Process a voice command from construction crew members using specialized AI agents.

**Request:**
```bash
curl -X POST https://api.solarvoice.ai/voice/command \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Safety incident at sector 7 - electrical hazard detected",
    "agentType": "safetyOfficer",
    "urgency": "critical",
    "context": {
      "location": "Sector 7 - Inverter Installation Area",
      "projectId": "solar-farm-500mw-001"
    }
  }'
```

**Response:**
```json
{
  "text": "[urgent] Safety incident reported. Initiating emergency protocol. All work in affected area must stop immediately.",
  "audioUrl": "https://api.solarvoice.ai/audio/safety-alert-001.mp3",
  "emotion": "urgent",
  "urgency": "critical",
  "agentResponse": {
    "agentId": "solar-safety-officer-001",
    "agentName": "Safety Supervisor",
    "actionsTriggered": ["emergency_protocol", "crew_notification", "management_alert"]
  }
}
```

### AI Agent Management

#### Create AI Agent
```bash
POST /voice/agents
```

Create a specialized AI agent for solar construction projects.

**Request:**
```bash
curl -X POST https://api.solarvoice.ai/voice/agents \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "agentType": "safetyOfficer",
    "projectId": "utility-scale-500mw-001",
    "customization": {
      "language": "es",
      "personality": "[urgente] [serio] Experto en cumplimiento OSHA. Tolerancia cero para violaciones de seguridad."
    }
  }'
```

**Response:**
```json
{
  "agentId": "solar-safety-officer-002",
  "agentName": "Safety Supervisor",
  "agentType": "safetyOfficer",
  "status": "active",
  "capabilities": [
    "Real-time hazard identification",
    "Incident reporting and emergency response",
    "Safety training compliance verification"
  ],
  "voiceSettings": {
    "voiceId": "EXAVITQu4vr4xnSDxMaL",
    "language": "es",
    "emotionSupport": true
  },
  "projectId": "utility-scale-500mw-001",
  "createdAt": "2024-07-03T10:30:00Z"
}
```

#### Get Agent Types
```bash
GET /voice/agents/types
```

**Response:**
```json
{
  "agentTypes": [
    {
      "type": "crewChief",
      "name": "Crew Chief Coordinator",
      "personality": "[confident] [directive] Experienced crew leader focused on task completion",
      "expertise": [
        "Crew coordination and task assignment",
        "Daily planning and scheduling",
        "Progress tracking and reporting"
      ],
      "voiceId": "VR6AewLTigWG4xSOukaG",
      "useCases": [
        "Daily crew assignments across multiple sites",
        "Task prioritization and resource allocation",
        "Progress reporting to project management",
        "Cross-shift communication and handoffs"
      ]
    },
    {
      "type": "safetyOfficer",
      "name": "Safety Officer",
      "personality": "[serious] [authoritative] Zero-tolerance for safety violations",
      "expertise": [
        "Safety compliance monitoring",
        "Incident reporting and response",
        "Emergency protocol activation"
      ],
      "voiceId": "EXAVITQu4vr4xnSDxMaL",
      "useCases": [
        "Real-time safety incident reporting",
        "Emergency protocol activation",
        "OSHA compliance monitoring",
        "Safety training verification"
      ]
    }
  ],
  "totalTypes": 6,
  "supportedLanguages": ["en", "es", "zh", "pt", "fr", "de"],
  "voiceCapabilities": [
    "Real-time voice recognition",
    "Emotion-aware responses",
    "Construction noise optimization",
    "Multi-language support",
    "Emergency protocol activation"
  ]
}
```

#### Get Agent Status
```bash
GET /voice/agents/{agentId}/status
```

**Response:**
```json
{
  "agentId": "solar-safety-officer-001",
  "status": "active",
  "uptime": "99.9%",
  "totalCommands": 1247,
  "successRate": "98.2%",
  "averageResponseTime": "1.2s",
  "lastActivity": "2024-07-03T10:45:30Z",
  "performanceMetrics": {
    "voiceAccuracy": "96.8%",
    "commandsProcessedToday": 127,
    "emergencyResponseTime": "0.8s",
    "languagesSupported": 3
  },
  "recentActivity": [
    {
      "timestamp": "2024-07-03T10:40:00Z",
      "command": "Safety incident reported",
      "response": "Emergency protocol activated",
      "urgency": "critical"
    }
  ]
}
```

### Project Management

#### Get All Projects
```bash
GET /projects
```

**Response:**
```json
{
  "projects": [
    {
      "id": "solar-farm-500mw-001",
      "name": "Desert Solar Farm 500MW",
      "type": "utility-scale",
      "status": "active",
      "location": "Nevada, USA",
      "capacity": "500MW",
      "panels": 1250000,
      "crews": 45,
      "completionPercentage": 67
    }
  ],
  "total": 12
}
```

#### Create Project
```bash
POST /projects
```

**Request:**
```bash
curl -X POST https://api.solarvoice.ai/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Commercial Rooftop Installation",
    "type": "commercial",
    "location": "Los Angeles, CA",
    "capacity": "250KW",
    "estimatedPanels": 650,
    "startDate": "2024-08-01",
    "estimatedCompletion": "2024-10-15"
  }'
```

### Safety Management

#### Get Safety Incidents
```bash
GET /safety/incidents
```

**Query Parameters:**
- `projectId` (optional): Filter by project
- `severity` (optional): Filter by severity (minor, major, critical)
- `startDate` (optional): Start date for filtering
- `endDate` (optional): End date for filtering

**Response:**
```json
{
  "incidents": [
    {
      "id": "INC-1719999600000",
      "type": "electrical_hazard",
      "severity": "major",
      "location": "Sector 7 - Inverter Area",
      "description": "Exposed wiring detected during installation",
      "reportedBy": "John Smith",
      "timestamp": "2024-07-03T09:00:00Z",
      "status": "resolved",
      "actions": [
        "Area cordoned off",
        "Electrician team dispatched",
        "Issue resolved and verified"
      ]
    }
  ],
  "total": 3,
  "criticalCount": 0,
  "majorCount": 1,
  "minorCount": 2
}
```

#### Report Safety Incident
```bash
POST /safety/incidents
```

**Request:**
```bash
curl -X POST https://api.solarvoice.ai/safety/incidents \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "fall_hazard",
    "severity": "major",
    "location": "North Field - Panel Installation",
    "description": "Unsecured ladder on sloped roof",
    "immediateAction": "Area secured, work stopped",
    "projectId": "commercial-solar-250kw-003"
  }'
```

### Equipment Management

#### Get All Equipment
```bash
GET /equipment
```

**Response:**
```json
{
  "equipment": [
    {
      "id": "EQP-001",
      "type": "crane",
      "model": "Liebherr LTM 1200",
      "status": "operational",
      "location": "Site A - North Field",
      "lastMaintenance": "2024-06-15",
      "nextMaintenance": "2024-07-15",
      "hoursOperated": 245
    }
  ],
  "total": 34
}
```

#### Track Equipment
```bash
POST /equipment/track
```

**Request:**
```bash
curl -X POST https://api.solarvoice.ai/equipment/track \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "equipmentId": "EQP-001",
    "action": "check-in",
    "location": "Site B - South Field",
    "condition": "good",
    "notes": "Moved for panel lifting operation"
  }'
```

### Analytics

#### Get Performance Analytics
```bash
GET /analytics/performance?projectId=solar-farm-500mw-001
```

**Response:**
```json
{
  "projectId": "solar-farm-500mw-001",
  "period": "last_30_days",
  "metrics": {
    "panelsInstalled": 125000,
    "dailyAverage": 4167,
    "efficiency": "92%",
    "safetyIncidents": 2,
    "weatherDelays": 3,
    "crewProductivity": {
      "average": "105%",
      "top": "Team Alpha - 118%",
      "needsImprovement": "Team Delta - 87%"
    }
  },
  "trends": {
    "productivityTrend": "increasing",
    "safetyTrend": "stable",
    "completionProjection": "on-track"
  }
}
```

#### Get Dashboard Metrics
```bash
GET /analytics/dashboard
```

**Response:**
```json
{
  "overview": {
    "activeProjects": 12,
    "totalCapacity": "2.5GW",
    "crewsDeployed": 156,
    "panelsInstalledToday": 8500
  },
  "safety": {
    "daysWithoutIncident": 45,
    "monthlyIncidents": 2,
    "safetyScore": 98.5
  },
  "productivity": {
    "dailyTarget": 10000,
    "actualToday": 8500,
    "efficiency": "85%"
  },
  "alerts": [
    {
      "type": "weather",
      "severity": "medium",
      "message": "High winds expected at Site C tomorrow",
      "affectedProjects": ["commercial-solar-150kw-002"]
    }
  ]
}
```

## WebSocket API

### Connection

Connect to the WebSocket server for real-time communication:

```javascript
const ws = new WebSocket('wss://api.solarvoice.ai/ws');
```

### Authentication

Send authentication immediately after connection:

```javascript
ws.send(JSON.stringify({
  type: 'auth',
  token: 'your-jwt-token'
}));
```

### Message Types

#### Welcome Message
Received upon successful connection:
```json
{
  "type": "welcome",
  "clientId": "elite-1",
  "message": "WELCOME TO ULTRA REAL-TIME SYSTEM!",
  "timestamp": "2024-07-03T10:00:00Z"
}
```

#### Agent Registration
Register as a specific agent type:
```json
{
  "type": "agent-register",
  "agentType": "crew-chief"
}
```

Response:
```json
{
  "type": "registration-success",
  "agentType": "crew-chief",
  "message": "ELITE CREW-CHIEF AGENT REGISTERED!"
}
```

#### Voice Command
Send voice commands through WebSocket:
```json
{
  "type": "voice-command",
  "command": "Status report for north field installation",
  "emotion": "confident",
  "agentType": "crew-chief"
}
```

Response:
```json
{
  "type": "voice-response",
  "command": "Status report for north field installation",
  "emotion": "confident",
  "response": "North field installation is 78% complete. 450 panels installed today. No safety incidents. Team Alpha leading productivity at 112%.",
  "audio": "base64-encoded-audio-data",
  "processedBy": "ULTRA-VOICE-PROCESSOR",
  "timestamp": "2024-07-03T10:05:00Z"
}
```

#### Agent Messages
Broadcast messages to other agents:
```json
{
  "type": "agent-message",
  "message": "Emergency at sector 7 - all crews evacuate",
  "urgency": "critical"
}
```

#### Status Request
Request current system status:
```json
{
  "type": "status-request"
}
```

Response:
```json
{
  "type": "status-response",
  "connectedAgents": [
    {
      "id": "elite-1",
      "agentType": "crew-chief",
      "connectedAt": "2024-07-03T09:00:00Z"
    },
    {
      "id": "elite-2",
      "agentType": "safety-officer",
      "connectedAt": "2024-07-03T09:15:00Z"
    }
  ]
}
```

#### Agent Status Updates
Automatic broadcasts when agents connect/disconnect:
```json
{
  "type": "agent-status-update",
  "totalConnected": 5,
  "agents": [
    {
      "id": "elite-1",
      "agentType": "crew-chief",
      "connectedAt": "2024-07-03T09:00:00Z"
    }
  ],
  "timestamp": "2024-07-03T10:00:00Z"
}
```

### WebSocket Code Example

```javascript
// Complete WebSocket client example
class SolarVoiceWebSocket {
  constructor(token) {
    this.token = token;
    this.ws = null;
    this.reconnectInterval = 5000;
    this.shouldReconnect = true;
  }

  connect() {
    this.ws = new WebSocket('wss://api.solarvoice.ai/ws');
    
    this.ws.onopen = () => {
      console.log('Connected to SolarVoice WebSocket');
      // Authenticate
      this.send({
        type: 'auth',
        token: this.token
      });
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      if (this.shouldReconnect) {
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    };
  }
  
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
  
  handleMessage(data) {
    switch(data.type) {
      case 'welcome':
        console.log('Connected as:', data.clientId);
        // Register as crew chief
        this.send({
          type: 'agent-register',
          agentType: 'crew-chief'
        });
        break;
        
      case 'voice-response':
        console.log('Voice response:', data.response);
        // Play audio if needed
        if (data.audio) {
          this.playAudio(data.audio);
        }
        break;
        
      case 'agent-message':
        console.log('Message from', data.fromAgent, ':', data.message);
        break;
        
      default:
        console.log('Received:', data);
    }
  }
  
  playAudio(base64Audio) {
    const audio = new Audio('data:audio/mp3;base64,' + base64Audio);
    audio.play();
  }
  
  sendVoiceCommand(command, emotion = 'confident') {
    this.send({
      type: 'voice-command',
      command: command,
      emotion: emotion
    });
  }
  
  disconnect() {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Usage
const client = new SolarVoiceWebSocket('your-jwt-token');
client.connect();

// Send a voice command
client.sendVoiceCommand('Check safety status for all sites', 'urgent');
```

## Webhooks

### Retell AI Webhook

The platform receives webhooks from Retell AI for voice conversation events.

**Endpoint:** `POST /webhooks/retell`

**Headers:**
```
x-retell-signature: <webhook-signature>
Content-Type: application/json
```

### Webhook Events

#### Call Started
```json
{
  "event_type": "call_started",
  "call_id": "call_123",
  "agent_id": "agent_456",
  "timestamp": "2024-07-03T10:00:00Z",
  "data": {
    "from_number": "+1234567890",
    "to_number": "+0987654321"
  }
}
```

#### Call Ended
```json
{
  "event_type": "call_ended",
  "call_id": "call_123",
  "agent_id": "agent_456",
  "timestamp": "2024-07-03T10:30:00Z",
  "data": {
    "call_length_seconds": 180,
    "transcript": "Full conversation transcript...",
    "commands_processed": 5,
    "safety_incidents": 0
  }
}
```

#### Function Called
```json
{
  "event_type": "function_called",
  "call_id": "call_123",
  "agent_id": "agent_456",
  "timestamp": "2024-07-03T10:15:00Z",
  "function_name": "report_safety_incident",
  "parameters": {
    "incident_type": "electrical_hazard",
    "severity": "major",
    "location": "Sector 7",
    "description": "Exposed wiring detected",
    "immediate_action_required": true
  }
}
```

#### Call Analysis
```json
{
  "event_type": "call_analysis",
  "call_id": "call_123",
  "agent_id": "agent_456",
  "timestamp": "2024-07-03T10:31:00Z",
  "data": {
    "sentiment": "urgent",
    "key_topics": ["safety", "electrical", "emergency"],
    "action_items": [
      "Dispatch electrician to Sector 7",
      "File safety report",
      "Schedule follow-up inspection"
    ],
    "urgency_level": "high",
    "confidence_score": 0.95
  }
}
```

### Webhook Security

All webhooks are secured using HMAC-SHA256 signatures. Verify the signature:

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

### Webhook Response Format

Always respond with appropriate status:

**Success:**
```json
{
  "status": "success",
  "message": "Webhook processed successfully"
}
```

**Error:**
```json
{
  "status": "error",
  "message": "Invalid webhook signature"
}
```

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "timestamp": "2024-07-03T10:00:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "timestamp": "2024-07-03T10:00:00Z"
}
```

## Error Handling

### HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### Error Codes

| Code | Description |
|------|-------------|
| `AUTH_FAILED` | Authentication failed |
| `TOKEN_EXPIRED` | JWT token has expired |
| `INVALID_TOKEN` | Invalid JWT token |
| `PERMISSION_DENIED` | Insufficient permissions |
| `VALIDATION_ERROR` | Request validation failed |
| `RESOURCE_NOT_FOUND` | Requested resource not found |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `INTERNAL_ERROR` | Internal server error |

## Rate Limiting

The API implements rate limiting to ensure fair usage:

### Limits

| Endpoint | Limit | Window |
|----------|-------|---------|
| `/auth/ultra/login` | 10 requests | 15 minutes |
| `/auth/ultra/refresh` | 20 requests | 15 minutes |
| `/voice/command` | 100 requests | 1 minute |
| `/voice/agents` | 50 requests | 1 hour |
| All other endpoints | 1000 requests | 1 hour |

### Rate Limit Headers

The API returns rate limit information in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1719999600
```

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 300
  }
}
```

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

class SolarVoiceAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.solarvoice.ai';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }
  
  async processVoiceCommand(text, agentType = 'crew-chief', urgency = 'medium') {
    try {
      const response = await this.client.post('/voice/command', {
        text,
        agentType,
        urgency
      });
      return response.data;
    } catch (error) {
      throw new Error(`Voice command failed: ${error.message}`);
    }
  }
  
  async createAgent(agentType, projectId, customization = {}) {
    try {
      const response = await this.client.post('/voice/agents', {
        agentType,
        projectId,
        customization
      });
      return response.data;
    } catch (error) {
      throw new Error(`Agent creation failed: ${error.message}`);
    }
  }
  
  async getProjects() {
    try {
      const response = await this.client.get('/projects');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }
  }
  
  async reportSafetyIncident(incident) {
    try {
      const response = await this.client.post('/safety/incidents', incident);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to report incident: ${error.message}`);
    }
  }
}

// Usage
const api = new SolarVoiceAPI('your-api-key');

// Process a voice command
api.processVoiceCommand(
  'Check crew status at north field',
  'crew-chief',
  'medium'
).then(response => {
  console.log('Response:', response.text);
  // Play audio response if available
  if (response.audioUrl) {
    // Play audio...
  }
});
```

### Python

```python
import requests
import json

class SolarVoiceAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.solarvoice.ai'
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def process_voice_command(self, text, agent_type='crew-chief', urgency='medium'):
        url = f'{self.base_url}/voice/command'
        data = {
            'text': text,
            'agentType': agent_type,
            'urgency': urgency
        }
        response = requests.post(url, json=data, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def create_agent(self, agent_type, project_id, customization=None):
        url = f'{self.base_url}/voice/agents'
        data = {
            'agentType': agent_type,
            'projectId': project_id,
            'customization': customization or {}
        }
        response = requests.post(url, json=data, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def get_projects(self):
        url = f'{self.base_url}/projects'
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def report_safety_incident(self, incident_data):
        url = f'{self.base_url}/safety/incidents'
        response = requests.post(url, json=incident_data, headers=self.headers)
        response.raise_for_status()
        return response.json()

# Usage
api = SolarVoiceAPI('your-api-key')

# Process a voice command
response = api.process_voice_command(
    'Safety check complete at inverter station',
    'safety-officer',
    'low'
)
print(f"Response: {response['text']}")

# Create a new agent
agent = api.create_agent(
    'crew-chief',
    'solar-farm-500mw-001',
    {'language': 'es', 'personality': '[confident] [experienced]'}
)
print(f"Created agent: {agent['agentId']}")
```

## Testing

### API Health Check

```bash
curl https://api.solarvoice.ai/health
```

Response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-07-03T10:00:00Z"
}
```

### Authentication Health Check

```bash
curl https://api.solarvoice.ai/auth/ultra/health
```

Response:
```json
{
  "status": "ULTRA_OPERATIONAL",
  "timestamp": "2024-07-03T10:00:00Z",
  "services": {
    "authentication": "HEALTHY",
    "authorization": "HEALTHY",
    "riskAssessment": "HEALTHY",
    "auditLogging": "HEALTHY",
    "tokenManagement": "HEALTHY",
    "mfaServices": "HEALTHY",
    "deviceManagement": "HEALTHY"
  },
  "securityLevel": "MAXIMUM",
  "threatLevel": "LOW"
}
```

## Support

For API support, please contact:
- Email: api-support@solarvoice.ai
- Documentation: https://docs.solarvoice.ai
- Status Page: https://status.solarvoice.ai