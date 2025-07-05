#!/bin/bash

# 🚀 DEPLOY ALL SOLARVOICE AI SITES TO VERCEL
# This script deploys all 4 domains under the solarvoice-ai project

echo "🚀 SolarVoice AI Multi-Site Deployment Script"
echo "============================================"

# Check if user is logged into Vercel
echo "Checking Vercel authentication..."
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ You're not logged into Vercel!"
    echo "Please run: vercel login"
    exit 1
fi

echo "✅ Logged into Vercel"
echo ""

# Set the team/scope (update this with your actual team name)
TEAM="scientiacapital"

# Deploy each site
deploy_site() {
    local site_name=$1
    local domain=$2
    local project_name="solarvoice-$site_name"
    
    echo "📦 Deploying $site_name to $domain..."
    cd /Users/tmk/Documents/01_Active_Projects/Learning/solarvoice_ai/vercel-deployments/$site_name
    
    # Check if already linked to Vercel
    if [ -d ".vercel" ]; then
        echo "  ✓ Already linked to Vercel, deploying..."
        vercel --prod --yes
    else
        echo "  → Setting up new deployment..."
        # Deploy with specific project name under the team
        vercel --prod --yes \
            --name "$project_name" \
            --scope "$TEAM" \
            --no-clipboard
    fi
    
    echo "  ✅ $site_name deployed!"
    echo ""
}

# Deploy all sites
echo "Starting deployments..."
echo ""

# Main platform
deploy_site "solarvoice" "solarvoice.ai"

# NetZero Bot
deploy_site "netzerobot" "netzerobot.com"

# NetZero Calculator
deploy_site "netzerocalculator" "netzerocalculator.com"

# NetZero Expert
deploy_site "netzeroexpert" "netzeroexpert.com"

echo "🎉 All deployments complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. For each project, go to Settings → Domains"
echo "3. Verify that your custom domains are connected"
echo "4. DNS propagation may take 5-30 minutes"
echo ""
echo "Your sites will be live at:"
echo "  • https://solarvoice.ai"
echo "  • https://netzerobot.com"
echo "  • https://netzerocalculator.com"
echo "  • https://netzeroexpert.com"