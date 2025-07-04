# SolarVoice AI Platform - Production Deployment Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Deployment Architecture](#deployment-architecture)
4. [Step-by-Step Deployment](#step-by-step-deployment)
5. [Configuration Management](#configuration-management)
6. [Health Checks & Monitoring](#health-checks--monitoring)
7. [Rollback Procedures](#rollback-procedures)
8. [Troubleshooting](#troubleshooting)

## Overview

This guide provides comprehensive instructions for deploying the SolarVoice AI Platform to production environments. The platform supports multiple deployment methods:

- **Docker Compose**: For single-server deployments
- **Kubernetes**: For scalable, multi-node deployments
- **Cloud-Native**: AWS EKS, Azure AKS, Google GKE

### Key Components

1. **Main API Service**: REST API and business logic (Port 3000)
2. **WebSocket Service**: Real-time communications (Port 3333)
3. **PostgreSQL Database**: Primary data store
4. **Redis Cache**: Session management and caching
5. **Monitoring Stack**: Prometheus, Grafana, ELK

## Prerequisites

### System Requirements

- **Minimum Hardware**:
  - 8 CPU cores
  - 16GB RAM
  - 100GB SSD storage
  - 100Mbps network connection

- **Recommended Hardware**:
  - 16 CPU cores
  - 32GB RAM
  - 500GB SSD storage
  - 1Gbps network connection

### Software Requirements

- Docker 20.10+ and Docker Compose 2.0+
- Kubernetes 1.24+ (for K8s deployment)
- Node.js 20+ (for local builds)
- PostgreSQL 15+
- Redis 7+
- nginx 1.21+

### Required Credentials

```bash
# Required environment variables
ELEVENLABS_API_KEY=your_elevenlabs_key
GOOGLE_API_KEY=your_google_key
JWT_SECRET=your_jwt_secret
POSTGRES_PASSWORD=your_db_password
GRAFANA_PASSWORD=your_grafana_password
DD_API_KEY=your_datadog_key  # Optional
```

## Deployment Architecture

### High-Level Architecture

```
                        ┌─────────────────┐
                        │   Load Balancer │
                        │   (nginx/ALB)   │
                        └────────┬────────┘
                                 │
                ┌────────────────┴────────────────┐
                │                                 │
        ┌───────▼────────┐               ┌───────▼────────┐
        │  API Service   │               │   WebSocket    │
        │  (Port 3000)   │               │  (Port 3333)   │
        └───────┬────────┘               └───────┬────────┘
                │                                 │
                └────────────┬────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼────────┐       ┌───────▼────────┐
        │   PostgreSQL   │       │     Redis      │
        │   Database     │       │     Cache      │
        └────────────────┘       └────────────────┘
```

### Network Architecture

- **Frontend Network**: External-facing services (172.20.0.0/16)
- **Backend Network**: Internal services only (172.21.0.0/16)
- **Monitoring Network**: Observability stack (172.22.0.0/16)

## Step-by-Step Deployment

### 1. Docker Compose Deployment

#### a. Clone and Prepare

```bash
# Clone repository
git clone https://github.com/solarvoice/solarvoice-platform.git
cd solarvoice-platform

# Create environment file
cp .env.example .env.production

# Edit environment variables
nano .env.production
```

#### b. Build and Deploy

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Verify deployment
docker-compose -f docker-compose.prod.yml ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

#### c. Verify Health

```bash
# Check application health
curl http://localhost/health

# Check individual services
curl http://localhost:3000/health
curl http://localhost:3333/health

# Check database connection
docker exec ultra-postgres pg_isready -U solarvoice
```

### 2. Kubernetes Deployment

#### a. Prepare Cluster

```bash
# Create namespaces
kubectl apply -f infrastructure/k8s/00-namespace.yaml

# Create config maps
kubectl apply -f infrastructure/k8s/01-configmap.yaml

# Create secrets
kubectl create secret generic solarvoice-secrets \
  --from-literal=jwt-secret=$JWT_SECRET \
  --from-literal=postgres-password=$POSTGRES_PASSWORD \
  --from-literal=elevenlabs-api-key=$ELEVENLABS_API_KEY \
  --from-literal=google-api-key=$GOOGLE_API_KEY \
  -n solarvoice
```

#### b. Deploy Database Services

```bash
# Deploy PostgreSQL
kubectl apply -f infrastructure/k8s/03-postgres.yaml -n solarvoice

# Deploy Redis
kubectl apply -f infrastructure/k8s/04-redis.yaml -n solarvoice

# Wait for database readiness
kubectl wait --for=condition=ready pod -l app=postgres -n solarvoice --timeout=300s
kubectl wait --for=condition=ready pod -l app=redis -n solarvoice --timeout=300s
```

#### c. Deploy Application

```bash
# Deploy API service
kubectl apply -f infrastructure/k8s/05-api-deployment.yaml -n solarvoice

# Deploy services and ingress
kubectl apply -f infrastructure/k8s/06-services-ingress.yaml -n solarvoice

# Deploy background workers
kubectl apply -f infrastructure/k8s/07-worker-deployment.yaml -n solarvoice

# Check deployment status
kubectl rollout status deployment/solarvoice-api -n solarvoice
```

#### d. Configure Ingress

```bash
# Install nginx ingress controller (if not present)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

# Apply TLS certificates
kubectl create secret tls solarvoice-tls \
  --cert=path/to/tls.crt \
  --key=path/to/tls.key \
  -n solarvoice
```

### 3. Cloud-Specific Deployments

#### AWS EKS

```bash
# Create EKS cluster
eksctl create cluster --name solarvoice-prod --region us-east-1

# Install AWS Load Balancer Controller
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds"
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=solarvoice-prod

# Deploy application
./deploy/deploy-production.sh
```

#### Azure AKS

```bash
# Create AKS cluster
az aks create \
  --resource-group solarvoice-rg \
  --name solarvoice-aks \
  --node-count 3 \
  --enable-addons monitoring

# Get credentials
az aks get-credentials --resource-group solarvoice-rg --name solarvoice-aks

# Deploy application
./deploy/deploy-production.sh
```

## Configuration Management

### Environment Variables

```bash
# Application Configuration
NODE_ENV=production
PORT=3000
WEBSOCKET_PORT=3333

# Database Configuration
DATABASE_URL=postgresql://solarvoice:password@postgres:5432/solarvoice_production
DB_POOL_MIN=10
DB_POOL_MAX=50

# Redis Configuration
REDIS_URL=redis://redis:6379
REDIS_TTL=3600

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d

# External Services
ELEVENLABS_API_KEY=your-elevenlabs-api-key
GOOGLE_API_KEY=your-google-api-key
RETELL_API_KEY=your-retell-api-key

# Monitoring
DD_API_KEY=your-datadog-api-key
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info

# Feature Flags
ENABLE_VOICE_AI=true
ENABLE_ANALYTICS=true
ENABLE_MULTI_TENANT=true
```

### SSL/TLS Configuration

```nginx
# nginx SSL configuration
server {
    listen 443 ssl http2;
    server_name api.solarvoice.ai;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## Health Checks & Monitoring

### Application Health Endpoints

- **Main API Health**: `GET /health`
- **WebSocket Health**: `GET :3333/health`
- **Database Health**: `GET /health/db`
- **Redis Health**: `GET /health/redis`

### Monitoring Stack Setup

```bash
# Access monitoring services
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/password)
- Kibana: http://localhost:5601
- Jaeger: http://localhost:16686
```

### Key Metrics to Monitor

1. **Application Metrics**:
   - Request rate and latency
   - Error rate (4xx, 5xx)
   - Active connections
   - Memory and CPU usage

2. **Database Metrics**:
   - Connection pool usage
   - Query performance
   - Replication lag
   - Disk usage

3. **Infrastructure Metrics**:
   - Node CPU and memory
   - Disk I/O
   - Network throughput
   - Container restarts

## Rollback Procedures

### Docker Compose Rollback

```bash
# Stop current deployment
docker-compose -f docker-compose.prod.yml down

# Restore previous version
git checkout tags/v1.0.0
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Rollback

```bash
# Check rollout history
kubectl rollout history deployment/solarvoice-api -n solarvoice

# Rollback to previous version
kubectl rollout undo deployment/solarvoice-api -n solarvoice

# Rollback to specific revision
kubectl rollout undo deployment/solarvoice-api --to-revision=2 -n solarvoice

# Monitor rollback
kubectl rollout status deployment/solarvoice-api -n solarvoice
```

### Database Rollback

```bash
# Restore from backup
pg_restore -h postgres -U solarvoice -d solarvoice_production backup_20250104.dump

# Run rollback migrations
npm run migration:revert
```

## Troubleshooting

### Common Issues

#### 1. Container Won't Start

```bash
# Check logs
docker logs ultra-app-1
kubectl logs -f deployment/solarvoice-api -n solarvoice

# Common causes:
- Missing environment variables
- Database connection issues
- Port conflicts
```

#### 2. Database Connection Errors

```bash
# Test database connection
docker exec -it ultra-postgres psql -U solarvoice -d solarvoice_production

# Check connection string
echo $DATABASE_URL

# Verify network connectivity
docker network ls
kubectl get svc -n solarvoice
```

#### 3. High Memory Usage

```bash
# Check memory usage
docker stats
kubectl top pods -n solarvoice

# Adjust Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

#### 4. SSL Certificate Issues

```bash
# Verify certificate
openssl x509 -in cert.pem -text -noout

# Check certificate expiry
echo | openssl s_client -servername api.solarvoice.ai -connect api.solarvoice.ai:443 2>/dev/null | openssl x509 -noout -dates
```

### Debug Commands

```bash
# Docker debugging
docker-compose -f docker-compose.prod.yml logs --tail=100 -f
docker exec -it ultra-app-1 sh

# Kubernetes debugging
kubectl describe pod <pod-name> -n solarvoice
kubectl exec -it <pod-name> -n solarvoice -- sh
kubectl logs <pod-name> -n solarvoice --previous

# Network debugging
curl -v http://localhost:3000/health
nslookup api.solarvoice.ai
traceroute api.solarvoice.ai
```

## Security Checklist

Before deploying to production:

- [ ] All secrets stored in secure vaults
- [ ] SSL/TLS certificates configured
- [ ] Firewall rules configured
- [ ] Database encryption enabled
- [ ] Audit logging enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation active
- [ ] Dependency scanning completed

## Support

For deployment assistance:
- Technical Support: support@solarvoice.ai
- Security Issues: security@solarvoice.ai
- Documentation: https://docs.solarvoice.ai

---

Last Updated: January 4, 2025