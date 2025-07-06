#!/bin/bash

# 🚀 VENTURE-SCALE DEPLOYMENT SCRIPT
# Deploy all 4 domains to live production

echo "🚀 DEPLOYING SOLARVOICE AI PLATFORM TO PRODUCTION"
echo "================================================="
echo "🎯 Target: 4 live domains with AI marketplace"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[DEPLOY]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

print_status "Starting deployment of all domains..."

# Domain configuration
DOMAINS=(
    "solarvoice:solarvoice.ai"
    "netzerobot:netzerobot.com" 
    "netzerocalculator:netzerocalculator.com"
    "netzeroexpert:netzeroexpert.com"
)

DEPLOYED_COUNT=0
TOTAL_DOMAINS=${#DOMAINS[@]}

for domain_config in "${DOMAINS[@]}"; do
    IFS=':' read -r app_name domain_name <<< "$domain_config"
    
    print_status "Deploying $app_name to $domain_name..."
    
    # Check if app directory exists
    if [ ! -d "$app_name" ]; then
        print_warning "Directory $app_name not found. Creating Next.js app..."
        
        # Create Next.js app if it doesn't exist
        npx create-next-app@latest "$app_name" \
            --typescript \
            --tailwind \
            --eslint \
            --app \
            --src-dir \
            --import-alias "@/*" \
            --yes
    fi
    
    cd "$app_name" || exit 1
    
    # Install dependencies
    print_status "Installing dependencies for $app_name..."
    npm install
    
    # Build the application
    print_status "Building $app_name for production..."
    if npm run build; then
        print_success "Build successful for $app_name"
    else
        print_error "Build failed for $app_name"
        cd ..
        continue
    fi
    
    # Deploy to Vercel
    print_status "Deploying $app_name to Vercel..."
    if vercel --prod --yes; then
        print_success "✅ $app_name deployed successfully!"
        DEPLOYED_COUNT=$((DEPLOYED_COUNT + 1))
    else
        print_error "❌ Deployment failed for $app_name"
    fi
    
    cd ..
    echo ""
done

# Final status report
echo ""
print_status "📊 DEPLOYMENT SUMMARY"
echo "======================"
echo "Domains Deployed: $DEPLOYED_COUNT/$TOTAL_DOMAINS"
echo ""

if [ $DEPLOYED_COUNT -eq $TOTAL_DOMAINS ]; then
    print_success "🎉 ALL DOMAINS DEPLOYED SUCCESSFULLY!"
    echo ""
    echo "🌐 Live Domains:"
    echo "• https://solarvoice.ai - AI Agent Marketplace"
    echo "• https://netzerobot.com - AI Chatbot Platform" 
    echo "• https://netzerocalculator.com - Solar Calculator"
    echo "• https://netzeroexpert.com - Expert Network"
    echo ""
    print_success "🚀 SOLARVOICE AI PLATFORM IS NOW LIVE!"
else
    print_warning "⚠️ Some deployments failed. Please check logs above."
fi