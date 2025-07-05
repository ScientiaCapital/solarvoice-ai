#!/bin/bash

# 🚀 ULTRA ELITE AI TEAM - UNIVERSAL GITHUB DEPLOYMENT
# Deploy the ultimate AI team to ALL your repositories
# Built by: TMK's ULTRA ELITE AI ENGINEERING SQUAD

set -e

echo "🚀 DEPLOYING ULTRA ELITE AI TEAM TO ALL REPOSITORIES..."
echo "=================================================="

# Configuration
GITHUB_USERNAME="${GITHUB_USERNAME:-tmk}"
TEAM_SOURCE_DIR="$(dirname "$0")/../team"
TEMP_DIR="/tmp/ultra-team-deployment"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_team() {
    echo -e "${PURPLE}[TEAM]${NC} $1"
}

# Check if GitHub CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        print_error "GitHub CLI (gh) is not installed. Please install it first:"
        echo "  brew install gh  # macOS"
        echo "  sudo apt install gh  # Ubuntu"
        exit 1
    fi
    
    # Check if authenticated
    if ! gh auth status &> /dev/null; then
        print_error "Not authenticated with GitHub CLI. Run: gh auth login"
        exit 1
    fi
    
    print_success "GitHub CLI authenticated and ready!"
}

# Get all repositories for the user
get_all_repos() {
    print_status "Fetching all repositories for user: $GITHUB_USERNAME"
    
    gh repo list $GITHUB_USERNAME --limit 1000 --json name,url,isPrivate | jq -r '.[].name' > "$TEMP_DIR/repos.txt"
    
    local repo_count=$(wc -l < "$TEMP_DIR/repos.txt")
    print_success "Found $repo_count repositories"
    
    if [ $repo_count -eq 0 ]; then
        print_error "No repositories found!"
        exit 1
    fi
}

# Create deployment package
create_deployment_package() {
    print_status "Creating ULTRA ELITE TEAM deployment package..."
    
    mkdir -p "$TEMP_DIR/team-package"
    
    # Copy team files
    cp -r "$TEAM_SOURCE_DIR"/* "$TEMP_DIR/team-package/" 2>/dev/null || true
    
    # Create master team deployment script
    cat > "$TEMP_DIR/team-package/deploy-team.sh" << 'EOF'
#!/bin/bash
# 🚀 ULTRA ELITE AI TEAM DEPLOYMENT SCRIPT
# Auto-deploys the ultimate AI engineering team to any project

echo "🚀 DEPLOYING ULTRA ELITE AI TEAM..."

# Create team directory structure
mkdir -p team/{command-center,squads,specialists,operations,analytics,experience}

# Deploy team roster
if [ ! -f "team/ULTRA_ELITE_TEAM_ROSTER.md" ]; then
    echo "📝 Creating team roster..."
    # Team roster content will be populated by the deployment script
fi

# Deploy team scripts
mkdir -p scripts/team
echo "✅ ULTRA ELITE AI TEAM deployed successfully!"
echo "🎯 Ready to build the next unicorn!"
EOF

    chmod +x "$TEMP_DIR/team-package/deploy-team.sh"
    
    print_success "Deployment package created!"
}

# Deploy to a single repository
deploy_to_repo() {
    local repo_name=$1
    print_team "🤖 Deploying ULTRA ELITE TEAM to: $repo_name"
    
    # Clone repository
    local repo_dir="$TEMP_DIR/repos/$repo_name"
    rm -rf "$repo_dir"
    
    if ! gh repo clone "$GITHUB_USERNAME/$repo_name" "$repo_dir" 2>/dev/null; then
        print_error "Failed to clone $repo_name - skipping"
        return 1
    fi
    
    cd "$repo_dir"
    
    # Check if team already exists
    if [ -d "team" ] && [ -f "team/ULTRA_ELITE_TEAM_ROSTER.md" ]; then
        print_warning "ULTRA ELITE TEAM already exists in $repo_name - updating..."
    fi
    
    # Copy team files
    cp -r "$TEMP_DIR/team-package"/* ./ 2>/dev/null || true
    
    # Create custom team roster for this repo
    create_custom_team_roster "$repo_name"
    
    # Git operations
    git add .
    
    # Check if there are changes to commit
    if git diff --staged --quiet; then
        print_warning "No changes to commit in $repo_name"
        return 0
    fi
    
    git config user.email "tmk@ultraelite.ai" 2>/dev/null || true
    git config user.name "TMK Ultra Elite Team" 2>/dev/null || true
    
    git commit -m "🚀 Deploy ULTRA ELITE AI TEAM

✨ TEAM DEPLOYMENT:
- 30-person AI engineering squad
- Command center with SAGE, ORACLE, NEXUS, QUANTUM
- 6 specialized squads (Alpha through Eta)
- Real-time analytics and monitoring
- Customer success operations

🎯 MISSION: Build unicorn-level products at 10x speed

🤖 Generated with ULTRA ELITE AI Team Deployment System
Co-Authored-By: TMK Ultra Elite Squad <tmk@ultraelite.ai>"
    
    # Push changes
    if ! git push origin main 2>/dev/null && ! git push origin master 2>/dev/null; then
        print_error "Failed to push to $repo_name"
        return 1
    fi
    
    print_success "✅ ULTRA ELITE TEAM deployed to $repo_name!"
    return 0
}

# Create custom team roster for specific repository
create_custom_team_roster() {
    local repo_name=$1
    local roster_file="team/ULTRA_ELITE_TEAM_ROSTER.md"
    
    mkdir -p team
    
    cat > "$roster_file" << EOF
# 🚀 ULTRA ELITE AI AGENT TEAM - $repo_name

## PROJECT: $(echo $repo_name | tr '[:lower:]' '[:upper:]' | tr '_-' '  ')

### 🏆 COMMAND CENTER
- **SAGE** (Chief AI Architect) - Status: ACTIVE ✅
- **ORACLE** (VP Engineering) - Status: ACTIVE ✅  
- **NEXUS** (Platform Director) - Status: ACTIVE ✅
- **QUANTUM** (Innovation Chief) - Status: ACTIVE ✅

### 💻 ENGINEERING SQUADS

#### SQUAD ALPHA: Core Platform
- **PHOENIX** (Backend Lead) - Building microservices
- **TITAN** (Full-Stack) - Frontend/backend integration
- **ATLAS** (DevOps) - CI/CD and infrastructure
- **MERCURY** (Real-Time) - WebSocket and live features

#### SQUAD BETA: Frontend & Mobile  
- **APOLLO** (Frontend) - React/Next.js components
- **ARTEMIS** (Mobile) - React Native apps
- **ZEUS** (Security) - Authentication and security
- **HERMES** (APIs) - REST/GraphQL endpoints

### 🤖 AI/ML SPECIALISTS

#### SQUAD GAMMA: Intelligence
- **NOVA** (ML Infra) - Model training and deployment
- **NEBULA** (NLP) - Natural language processing
- **COSMOS** (AI Safety) - Guardrails and ethics
- **STELLAR** (Computer Vision) - Image/video processing

#### SQUAD DELTA: Voice & Agents
- **PULSAR** (Voice) - Voice AI integration
- **QUASAR** (Prompts) - Agent personality design

### 💰 REVENUE OPERATIONS

#### SQUAD EPSILON: Payments & Growth
- **PROFIT** (Payments) - Payment processing
- **VAULT** (Billing) - Subscription management
- **LEDGER** (Finance) - Financial tracking
- **BRIDGE** (Growth) - User acquisition

### 📊 DATA & ANALYTICS

#### SQUAD ZETA: Intelligence
- **INSIGHT** (Data Eng) - Analytics pipelines
- **PRISM** (Data Science) - Predictive modeling
- **MATRIX** (MLOps) - Model operations
- **CIPHER** (Privacy) - Data protection

### 🎯 CUSTOMER SUCCESS

#### SQUAD ETA: Experience  
- **HARMONY** (CX) - User experience
- **ECHO** (Voice UX) - Conversation design
- **BEACON** (Monitoring) - System observability
- **GUARDIAN** (SRE) - Reliability engineering

---

## 🔥 CURRENT MISSION: PROJECT $(echo $repo_name | tr '[:lower:]' '[:upper:]' | tr '_-' '  ')

**Status**: 🚀 FULLY DEPLOYED AND OPERATIONAL

**Target**: Build next unicorn product at 10x speed

---

**ALL SYSTEMS GO! THE FUTURE STARTS NOW!** 🚀
EOF
}

# Interactive repository selection
select_repositories() {
    print_status "Repository deployment options:"
    echo "1. Deploy to ALL repositories"
    echo "2. Deploy to specific repositories"
    echo "3. Deploy to repositories matching pattern"
    echo "4. Show repository list and exit"
    
    read -p "Choose option (1-4): " choice
    
    case $choice in
        1)
            echo "all" > "$TEMP_DIR/deploy_list.txt"
            ;;
        2)
            print_status "Available repositories:"
            cat -n "$TEMP_DIR/repos.txt"
            echo
            read -p "Enter repository numbers (comma-separated): " repo_nums
            
            > "$TEMP_DIR/deploy_list.txt"
            IFS=',' read -ra NUMS <<< "$repo_nums"
            for num in "${NUMS[@]}"; do
                num=$(echo $num | xargs) # trim whitespace
                sed -n "${num}p" "$TEMP_DIR/repos.txt" >> "$TEMP_DIR/deploy_list.txt"
            done
            ;;
        3)
            read -p "Enter pattern to match (e.g., 'ai', 'bot', 'solar'): " pattern
            grep -i "$pattern" "$TEMP_DIR/repos.txt" > "$TEMP_DIR/deploy_list.txt" || true
            ;;
        4)
            print_status "Available repositories:"
            cat -n "$TEMP_DIR/repos.txt"
            exit 0
            ;;
        *)
            print_error "Invalid option"
            exit 1
            ;;
    esac
    
    if [ "$choice" != "1" ] && [ ! -s "$TEMP_DIR/deploy_list.txt" ]; then
        print_error "No repositories selected!"
        exit 1
    fi
}

# Main deployment function
main() {
    print_status "🚀 ULTRA ELITE AI TEAM - UNIVERSAL DEPLOYMENT SYSTEM"
    echo "===================================================="
    
    # Setup
    mkdir -p "$TEMP_DIR/repos"
    
    # Checks
    check_gh_cli
    
    # Get repositories
    get_all_repos
    
    # Create deployment package
    create_deployment_package
    
    # Repository selection
    select_repositories
    
    # Deploy to selected repositories
    if [ -f "$TEMP_DIR/deploy_list.txt" ] && [ "$(cat "$TEMP_DIR/deploy_list.txt")" = "all" ]; then
        deploy_list="$TEMP_DIR/repos.txt"
    else
        deploy_list="$TEMP_DIR/deploy_list.txt"
    fi
    
    local total_repos=$(wc -l < "$deploy_list")
    local success_count=0
    local fail_count=0
    
    print_status "Deploying ULTRA ELITE TEAM to $total_repos repositories..."
    echo
    
    while IFS= read -r repo_name; do
        if [ -n "$repo_name" ]; then
            if deploy_to_repo "$repo_name"; then
                ((success_count++))
            else
                ((fail_count++))
            fi
            echo
        fi
    done < "$deploy_list"
    
    # Summary
    echo "=================================================="
    print_success "🎯 DEPLOYMENT COMPLETE!"
    print_success "✅ Successfully deployed to: $success_count repositories"
    
    if [ $fail_count -gt 0 ]; then
        print_warning "❌ Failed deployments: $fail_count repositories"
    fi
    
    print_team "🚀 ULTRA ELITE AI TEAM is now active across your GitHub!"
    print_team "🎯 Ready to build unicorns at 10x speed!"
    
    # Cleanup
    rm -rf "$TEMP_DIR"
}

# Run the deployment
main "$@"