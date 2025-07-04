# SolarVoice AI Platform - Monitoring & Alerting Guide

## Table of Contents
1. [Overview](#overview)
2. [Monitoring Stack Architecture](#monitoring-stack-architecture)
3. [Metrics Collection](#metrics-collection)
4. [Log Aggregation](#log-aggregation)
5. [Distributed Tracing](#distributed-tracing)
6. [Alerting Configuration](#alerting-configuration)
7. [Dashboard Setup](#dashboard-setup)
8. [Performance Monitoring](#performance-monitoring)
9. [Security Monitoring](#security-monitoring)
10. [Best Practices](#best-practices)

## Overview

The SolarVoice AI Platform implements a comprehensive monitoring strategy using industry-standard tools to ensure system reliability, performance, and security.

### Key Components

- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **ELK Stack**: Log aggregation and analysis
- **Jaeger**: Distributed tracing
- **AlertManager**: Alert routing and management
- **Custom Metrics**: Application-specific monitoring

## Monitoring Stack Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
├─────────────┬──────────────┬──────────────┬────────────────┤
│   Metrics   │     Logs     │    Traces    │    Events      │
└──────┬──────┴───────┬──────┴───────┬──────┴────────┬───────┘
       │              │              │               │
┌──────▼─────┐ ┌──────▼─────┐ ┌─────▼──────┐ ┌─────▼──────┐
│ Prometheus │ │  Fluentd   │ │   Jaeger   │ │   Kafka    │
└──────┬─────┘ └──────┬─────┘ └─────┬──────┘ └─────┬──────┘
       │              │              │               │
┌──────▼──────────────▼──────────────▼───────────────▼──────┐
│                    Storage & Processing                     │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │ Prometheus │  │Elasticsearch│  │  Jaeger Storage  │   │
│  │   TSDB     │  │             │  │                  │   │
│  └────────────┘  └─────────────┘  └──────────────────┘   │
└────────────────────────┬───────────────────────────────────┘
                         │
┌────────────────────────▼───────────────────────────────────┐
│                  Visualization Layer                        │
│  ┌─────────┐  ┌─────────┐  ┌────────┐  ┌─────────────┐   │
│  │ Grafana │  │ Kibana  │  │ Jaeger │  │ Alert       │   │
│  │         │  │         │  │  UI    │  │ Manager     │   │
│  └─────────┘  └─────────┘  └────────┘  └─────────────┘   │
└────────────────────────────────────────────────────────────┘
```

## Metrics Collection

### 1. Prometheus Configuration

Create `/monitoring/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    cluster: 'production'
    environment: 'prod'

# Alerting configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

# Load rules
rule_files:
  - "alerts/*.yml"

# Scrape configurations
scrape_configs:
  # Node Exporter
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
        regex: '([^:]+)(:[0-9]+)?'
        replacement: '${1}'

  # Application metrics
  - job_name: 'solarvoice-api'
    static_configs:
      - targets: ['ultra-app-1:3000', 'ultra-app-2:3000', 'ultra-app-3:3000']
    metrics_path: '/metrics'
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
        regex: '([^:]+):([0-9]+)'
        replacement: '${1}'

  # PostgreSQL metrics
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # Redis metrics
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

  # Container metrics
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
```

### 2. Application Metrics

Implement custom metrics in your application:

```typescript
// libs/monitoring/metrics.ts
import { Registry, Counter, Histogram, Gauge } from 'prom-client';

export const register = new Registry();

// HTTP metrics
export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});

export const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// Business metrics
export const voiceCommandsTotal = new Counter({
  name: 'voice_commands_total',
  help: 'Total number of voice commands processed',
  labelNames: ['command_type', 'status'],
  registers: [register],
});

export const activeProjects = new Gauge({
  name: 'active_projects_total',
  help: 'Current number of active projects',
  registers: [register],
});

// Database metrics
export const dbConnectionPool = new Gauge({
  name: 'db_connection_pool_size',
  help: 'Database connection pool metrics',
  labelNames: ['state'],
  registers: [register],
});

// WebSocket metrics
export const wsConnections = new Gauge({
  name: 'websocket_connections_active',
  help: 'Number of active WebSocket connections',
  registers: [register],
});
```

### 3. Metrics Endpoint

```typescript
// apps/api/src/monitoring/monitoring.controller.ts
import { Controller, Get } from '@nestjs/common';
import { register } from '@app/monitoring/metrics';

@Controller()
export class MonitoringController {
  @Get('/metrics')
  async getMetrics(): Promise<string> {
    return await register.metrics();
  }

  @Get('/health')
  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }

  @Get('/health/db')
  async getDatabaseHealth() {
    // Implement database health check
    return { status: 'healthy', connections: 10 };
  }

  @Get('/health/redis')
  async getRedisHealth() {
    // Implement Redis health check
    return { status: 'healthy', memory: '100MB' };
  }
}
```

## Log Aggregation

### 1. Fluentd Configuration

Create `/monitoring/fluent.conf`:

```conf
# Input from application containers
<source>
  @type forward
  port 24224
  bind 0.0.0.0
</source>

# Parse application logs
<filter app.**>
  @type parser
  key_name log
  <parse>
    @type json
    time_format %Y-%m-%dT%H:%M:%S.%NZ
  </parse>
</filter>

# Add metadata
<filter app.**>
  @type record_transformer
  <record>
    hostname ${hostname}
    environment production
    application solarvoice
  </record>
</filter>

# Output to Elasticsearch
<match app.**>
  @type elasticsearch
  host elasticsearch
  port 9200
  logstash_format true
  logstash_prefix solarvoice
  <buffer>
    @type file
    path /var/log/fluentd-buffers/app.buffer
    flush_mode interval
    flush_interval 10s
  </buffer>
</match>

# System logs
<source>
  @type tail
  path /var/log/syslog
  pos_file /var/log/fluentd-pos/syslog.pos
  tag system.syslog
  <parse>
    @type syslog
  </parse>
</source>

# Nginx access logs
<source>
  @type tail
  path /var/log/nginx/access.log
  pos_file /var/log/fluentd-pos/nginx-access.pos
  tag nginx.access
  <parse>
    @type nginx
  </parse>
</source>

# Security logs
<match security.**>
  @type elasticsearch
  host elasticsearch
  port 9200
  logstash_format true
  logstash_prefix security
  <buffer>
    @type file
    path /var/log/fluentd-buffers/security.buffer
    flush_mode interval
    flush_interval 5s
  </buffer>
</match>
```

### 2. Structured Logging

Implement structured logging in your application:

```typescript
// libs/monitoring/logger.ts
import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  },
  index: 'solarvoice-logs',
};

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: {
    service: 'solarvoice-api',
    environment: process.env.NODE_ENV,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new ElasticsearchTransport(esTransportOpts),
  ],
});

// Log levels
export const logInfo = (message: string, meta?: any) => {
  logger.info(message, meta);
};

export const logError = (message: string, error?: Error, meta?: any) => {
  logger.error(message, { error: error?.stack, ...meta });
};

export const logWarning = (message: string, meta?: any) => {
  logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: any) => {
  logger.debug(message, meta);
};
```

## Distributed Tracing

### 1. Jaeger Configuration

```typescript
// libs/monitoring/tracing.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const jaegerExporter = new JaegerExporter({
  endpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
});

export const initTracing = () => {
  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'solarvoice-api',
      [SemanticResourceAttributes.SERVICE_VERSION]: process.env.APP_VERSION || '1.0.0',
    }),
    traceExporter: jaegerExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();

  process.on('SIGTERM', () => {
    sdk.shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch((error) => console.log('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });
};
```

### 2. Custom Spans

```typescript
// Example of custom tracing
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('solarvoice-api');

export async function processVoiceCommand(command: string) {
  const span = tracer.startSpan('process_voice_command');
  
  try {
    span.setAttributes({
      'command.type': 'voice',
      'command.text': command,
      'user.id': context.active().getValue('userId'),
    });

    // Process command
    const result = await voiceService.process(command);
    
    span.setAttributes({
      'command.status': 'success',
      'command.result': result.action,
    });
    
    return result;
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message,
    });
    throw error;
  } finally {
    span.end();
  }
}
```

## Alerting Configuration

### 1. Alert Rules

Create `/monitoring/alerts/application.yml`:

```yaml
groups:
  - name: application
    interval: 30s
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: |
          (
            sum(rate(http_requests_total{status_code=~"5.."}[5m]))
            /
            sum(rate(http_requests_total[5m]))
          ) > 0.05
        for: 5m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }} for the last 5 minutes"

      # API latency
      - alert: HighAPILatency
        expr: |
          histogram_quantile(0.95, 
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
          ) > 2
        for: 10m
        labels:
          severity: warning
          team: backend
        annotations:
          summary: "High API latency detected"
          description: "95th percentile latency is {{ $value }}s"

      # Database connection pool
      - alert: DatabaseConnectionPoolExhausted
        expr: |
          (
            db_connection_pool_size{state="used"} 
            / 
            db_connection_pool_size{state="total"}
          ) > 0.9
        for: 5m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "Database connection pool near exhaustion"
          description: "{{ $value | humanizePercentage }} of connections are in use"

      # Memory usage
      - alert: HighMemoryUsage
        expr: |
          (
            container_memory_usage_bytes{name=~"ultra-app-.*"}
            /
            container_spec_memory_limit_bytes{name=~"ultra-app-.*"}
          ) > 0.9
        for: 5m
        labels:
          severity: warning
          team: devops
        annotations:
          summary: "Container memory usage is high"
          description: "Container {{ $labels.name }} memory usage is {{ $value | humanizePercentage }}"

      # Voice processing failures
      - alert: VoiceProcessingFailures
        expr: |
          rate(voice_commands_total{status="failed"}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
          team: ai
        annotations:
          summary: "High voice processing failure rate"
          description: "Voice processing failure rate is {{ $value }} per second"
```

### 2. AlertManager Configuration

Create `/monitoring/alertmanager.yml`:

```yaml
global:
  resolve_timeout: 5m
  slack_api_url: 'YOUR_SLACK_WEBHOOK_URL'

route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'critical'
      continue: true
    - match:
        team: ai
      receiver: 'ai-team'
    - match:
        team: devops
      receiver: 'devops-team'

receivers:
  - name: 'default'
    slack_configs:
      - channel: '#alerts'
        title: 'SolarVoice Alert'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}\n{{ .Annotations.description }}{{ end }}'

  - name: 'critical'
    slack_configs:
      - channel: '#critical-alerts'
        title: '🚨 CRITICAL: {{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_KEY'

  - name: 'ai-team'
    slack_configs:
      - channel: '#ai-team-alerts'
        title: 'AI System Alert: {{ .GroupLabels.alertname }}'

  - name: 'devops-team'
    slack_configs:
      - channel: '#devops-alerts'
        title: 'Infrastructure Alert: {{ .GroupLabels.alertname }}'

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'cluster', 'service']
```

## Dashboard Setup

### 1. Grafana Dashboard Configuration

Create a comprehensive dashboard JSON:

```json
{
  "dashboard": {
    "title": "SolarVoice AI Platform",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total[5m])) by (method)",
            "legendFormat": "{{method}}"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status_code=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))",
            "legendFormat": "Error Rate %"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Response Time (p95)",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))",
            "legendFormat": "95th percentile"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Active Voice Sessions",
        "targets": [
          {
            "expr": "websocket_connections_active",
            "legendFormat": "Active Sessions"
          }
        ],
        "type": "stat"
      },
      {
        "title": "Database Connections",
        "targets": [
          {
            "expr": "db_connection_pool_size{state=\"used\"}",
            "legendFormat": "Used"
          },
          {
            "expr": "db_connection_pool_size{state=\"idle\"}",
            "legendFormat": "Idle"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Voice Command Success Rate",
        "targets": [
          {
            "expr": "sum(rate(voice_commands_total{status=\"success\"}[5m])) / sum(rate(voice_commands_total[5m]))",
            "legendFormat": "Success Rate"
          }
        ],
        "type": "gauge"
      }
    ]
  }
}
```

### 2. Custom Business Dashboards

```typescript
// Dashboard queries for business metrics
const businessDashboards = {
  projectMetrics: {
    activeProjects: 'active_projects_total',
    projectsByPhase: 'sum(projects_by_phase) by (phase)',
    averageCompletionTime: 'avg(project_completion_time_days)',
  },
  
  userEngagement: {
    dailyActiveUsers: 'count(distinct(user_activity{period="day"}))',
    voiceCommandsPerUser: 'avg(voice_commands_total) by (user_id)',
    featureAdoption: 'feature_usage_total / total_users',
  },
  
  performanceMetrics: {
    aiResponseTime: 'histogram_quantile(0.95, voice_response_time_bucket)',
    accuracyScore: 'voice_command_accuracy_score',
    systemUptime: '1 - (sum(rate(service_down_total[5m])))',
  },
};
```

## Performance Monitoring

### 1. Application Performance Monitoring (APM)

```typescript
// libs/monitoring/apm.ts
import * as apm from 'elastic-apm-node';

export const initAPM = () => {
  apm.start({
    serviceName: 'solarvoice-api',
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    environment: process.env.NODE_ENV,
    captureBody: 'all',
    captureHeaders: true,
    logLevel: 'info',
    metricsInterval: '30s',
    transactionSampleRate: 1.0,
    spanFramesMinDuration: '5ms',
  });
};

// Custom transaction tracking
export const trackTransaction = async (name: string, type: string, fn: Function) => {
  const transaction = apm.startTransaction(name, type);
  
  try {
    const result = await fn();
    transaction.result = 'success';
    return result;
  } catch (error) {
    apm.captureError(error);
    transaction.result = 'error';
    throw error;
  } finally {
    transaction.end();
  }
};
```

### 2. Database Performance

```sql
-- Create monitoring views
CREATE VIEW database_performance AS
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  max_time,
  stddev_time
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat%'
ORDER BY mean_time DESC
LIMIT 20;

-- Connection monitoring
CREATE VIEW connection_stats AS
SELECT 
  datname,
  numbackends as active_connections,
  xact_commit as committed_transactions,
  xact_rollback as rolled_back_transactions,
  blks_read as blocks_read,
  blks_hit as blocks_hit,
  tup_returned as rows_returned,
  tup_fetched as rows_fetched,
  tup_inserted as rows_inserted,
  tup_updated as rows_updated,
  tup_deleted as rows_deleted
FROM pg_stat_database
WHERE datname = 'solarvoice_production';
```

## Security Monitoring

### 1. Security Event Monitoring

```typescript
// libs/monitoring/security-monitor.ts
export class SecurityMonitor {
  logSecurityEvent(event: SecurityEvent) {
    logger.warn('Security Event', {
      type: event.type,
      severity: event.severity,
      userId: event.userId,
      ip: event.ip,
      userAgent: event.userAgent,
      timestamp: new Date().toISOString(),
      details: event.details,
    });

    // Track in metrics
    securityEventsTotal.labels(event.type, event.severity).inc();

    // Alert on critical events
    if (event.severity === 'critical') {
      this.sendSecurityAlert(event);
    }
  }

  private async sendSecurityAlert(event: SecurityEvent) {
    // Send to security team
    await alertingService.send({
      channel: 'security',
      priority: 'high',
      title: `Critical Security Event: ${event.type}`,
      message: event.details,
    });
  }
}

// Usage
securityMonitor.logSecurityEvent({
  type: 'failed_login_attempts',
  severity: 'warning',
  userId: user.id,
  ip: request.ip,
  userAgent: request.headers['user-agent'],
  details: 'Multiple failed login attempts detected',
});
```

### 2. Audit Logging

```typescript
// libs/monitoring/audit-logger.ts
export class AuditLogger {
  async logAction(action: AuditAction) {
    const auditEntry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      userId: action.userId,
      action: action.type,
      resource: action.resource,
      resourceId: action.resourceId,
      changes: action.changes,
      ip: action.ip,
      userAgent: action.userAgent,
      result: action.result,
    };

    // Store in database
    await auditRepository.save(auditEntry);

    // Send to SIEM
    await siemConnector.send(auditEntry);

    // Log for analysis
    logger.info('Audit Event', auditEntry);
  }
}
```

## Best Practices

### 1. Monitoring Guidelines

1. **Metric Naming Convention**:
   ```
   <namespace>_<metric>_<unit>
   Examples:
   - http_requests_total
   - db_query_duration_seconds
   - cache_hit_ratio
   ```

2. **Label Usage**:
   - Keep cardinality low
   - Use consistent label names
   - Avoid high-cardinality labels (user_id, request_id)

3. **Dashboard Organization**:
   - Overview dashboard for high-level metrics
   - Service-specific dashboards
   - Business metrics dashboards
   - Infrastructure dashboards

### 2. Alert Fatigue Prevention

1. **Alert Quality**:
   - Every alert should be actionable
   - Include remediation steps
   - Set appropriate thresholds
   - Use alert dependencies

2. **Alert Routing**:
   - Route to appropriate teams
   - Escalation policies
   - On-call rotations
   - Silence periods for maintenance

### 3. Log Management

1. **Log Retention**:
   ```yaml
   retention_policy:
     application_logs: 30d
     security_logs: 90d
     audit_logs: 365d
     debug_logs: 7d
   ```

2. **Log Sampling**:
   ```typescript
   // Sample verbose logs in production
   if (process.env.NODE_ENV === 'production' && Math.random() > 0.1) {
     return; // Skip 90% of debug logs
   }
   ```

### 4. Cost Optimization

1. **Metric Optimization**:
   - Use recording rules for frequently queried metrics
   - Downsample old data
   - Archive cold data

2. **Log Optimization**:
   - Compress logs before storage
   - Use structured logging
   - Filter unnecessary logs at source

## Troubleshooting

### Common Issues

1. **Missing Metrics**:
   ```bash
   # Check if metrics endpoint is accessible
   curl http://localhost:3000/metrics
   
   # Verify Prometheus scrape
   curl http://prometheus:9090/api/v1/targets
   ```

2. **High Memory Usage**:
   ```bash
   # Check Prometheus memory
   curl http://prometheus:9090/api/v1/query?query=prometheus_tsdb_symbol_table_size_bytes
   
   # Check cardinality
   curl http://prometheus:9090/api/v1/label/__name__/values
   ```

3. **Slow Queries**:
   ```bash
   # Check query performance
   curl http://prometheus:9090/api/v1/query_log
   
   # Optimize with recording rules
   ```

## Support

For monitoring assistance:
- DevOps Team: devops@solarvoice.ai
- Security Team: security@solarvoice.ai
- Documentation: https://docs.solarvoice.ai/monitoring

---

Last Updated: January 4, 2025