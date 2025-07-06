#!/bin/bash

# 🛡️ SECURITY SCANNER
# Built by: Security Team & Documentation Operations
# Mission: Continuous security monitoring across all documentation
# 
# @version 2.0.0
# @status ENTERPRISE PROTECTION ACTIVE

set -e

# Parse command line arguments
PRE_PUSH_MODE=false
if [ "$1" = "--pre-push-mode" ]; then
    PRE_PUSH_MODE=true
    echo "🔒 PRE-PUSH MODE: Enhanced protection for public repository push"
fi

echo "🛡️ SECURITY SCANNER v2.0"
echo "========================="
echo "🎯 Mission: Protect enterprise assets across documentation files"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[SCANNER]${NC} $1"; }
print_success() { echo -e "${GREEN}[SECURE]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ALERT]${NC} $1"; }
print_scan() { echo -e "${PURPLE}[SCAN]${NC} $1"; }

# Security-sensitive patterns to detect
SECURITY_PATTERNS=(
    "secret"
    "password"
    "access.*key"
    "private.*key"
    "token.*pattern"
    "stripe.*key"
    "api.*secret"
)

# Business sensitive patterns
BUSINESS_PATTERNS=(
    "revenue.*million"
    "funding.*million"
    "valuation.*million"
    "series.*funding"
    "investment.*deck"
    "burn.*rate"
)

print_status "Starting comprehensive security scan across documentation ecosystem..."

# Create scan results directory
mkdir -p "security/scan-results"
SCAN_TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SCAN_REPORT="security/scan-results/security-scan-${SCAN_TIMESTAMP}.log"

echo "# 🛡️ SECURITY SCAN REPORT" > "$SCAN_REPORT"
echo "Generated: $(date)" >> "$SCAN_REPORT"
echo "Scanner: Enterprise Security Protection System" >> "$SCAN_REPORT"
echo "Scope: Complete documentation ecosystem" >> "$SCAN_REPORT"
echo "" >> "$SCAN_REPORT"

print_status "Scanning documentation files for security-sensitive content..."

# Initialize counters
SECURITY_VIOLATIONS=0
BUSINESS_RISKS=0
FILES_SCANNED=0
PROTECTED_FILES=0

# Function to scan individual file
scan_file() {
    local file="$1"
    local violations=0
    local file_size=$(wc -c < "$file" 2>/dev/null || echo "0")
    
    # Skip if file is too large (>1MB) or binary
    if [ "$file_size" -gt 1048576 ] || file "$file" | grep -q "binary"; then
        return 0
    fi
    
    print_scan "Scanning: $file"
    
    # Check for security-sensitive patterns
    for pattern in "${SECURITY_PATTERNS[@]}"; do
        if grep -qi "$pattern" "$file" 2>/dev/null; then
            print_error "SECURITY RISK: Found security pattern in $file"
            echo "🚨 SECURITY RISK: $file contains security pattern" >> "$SCAN_REPORT"
            violations=$((violations + 1))
        fi
    done
    
    # Check for business sensitive information
    for pattern in "${BUSINESS_PATTERNS[@]}"; do
        if grep -qiE "$pattern" "$file" 2>/dev/null; then
            print_warning "BUSINESS RISK: Found business-sensitive data in $file"
            echo "💼 BUSINESS RISK: $file contains business information" >> "$SCAN_REPORT"
            violations=$((violations + 1))
        fi
    done
    
    return $violations
}

# Scan all markdown files (excluding node_modules)
while IFS= read -r -d '' file; do
    FILES_SCANNED=$((FILES_SCANNED + 1))
    
    if scan_file "$file"; then
        file_violations=$?
        if [ $file_violations -gt 0 ]; then
            SECURITY_VIOLATIONS=$((SECURITY_VIOLATIONS + file_violations))
        fi
    fi
    
    # Check if file is in protected directory
    if echo "$file" | grep -q "/secure/\\|/restricted/\\|/internal/"; then
        PROTECTED_FILES=$((PROTECTED_FILES + 1))
    fi
    
done < <(find . -name "*.md" -type f -not -path "*/node_modules/*" -print0)

# Generate comprehensive scan report
echo "" >> "$SCAN_REPORT"
echo "## 📊 SCAN RESULTS SUMMARY" >> "$SCAN_REPORT"
echo "Files Scanned: $FILES_SCANNED" >> "$SCAN_REPORT"
echo "Security Violations Found: $SECURITY_VIOLATIONS" >> "$SCAN_REPORT"
echo "Business Risks: $BUSINESS_RISKS" >> "$SCAN_REPORT"
echo "Protected Files: $PROTECTED_FILES" >> "$SCAN_REPORT"
echo "" >> "$SCAN_REPORT"

# Determine overall security status
if [ $SECURITY_VIOLATIONS -eq 0 ] && [ $BUSINESS_RISKS -lt 3 ]; then
    SECURITY_STATUS="🟢 SECURE"
    print_success "Security scan completed - SECURE status maintained!"
elif [ $SECURITY_VIOLATIONS -lt 3 ]; then
    SECURITY_STATUS="🟡 MODERATE RISK"
    print_warning "Security scan completed - MODERATE RISK level detected"
else
    SECURITY_STATUS="🔴 HIGH RISK"
    print_error "Security scan completed - HIGH RISK level detected!"
fi

echo "Security Status: $SECURITY_STATUS" >> "$SCAN_REPORT"

# Display final results
echo ""
print_status "📊 SECURITY SCAN RESULTS SUMMARY"
echo "=================================="
echo "Files Scanned: $FILES_SCANNED"
echo "Security Violations: $SECURITY_VIOLATIONS"
echo "Business Risks: $BUSINESS_RISKS"
echo "Protected Files: $PROTECTED_FILES"
echo "Security Status: $SECURITY_STATUS"
echo "Report Generated: $SCAN_REPORT"
echo ""

# Enhanced exit logic for git integration
if [ "$PRE_PUSH_MODE" = true ]; then
    if [ $SECURITY_VIOLATIONS -gt 0 ]; then
        print_error "🚨 PRE-PUSH SCAN FAILED: Security violations detected!"
        echo "• Cannot proceed with public repository push"
        echo "• $SECURITY_VIOLATIONS critical security violations found"
        echo "• Review and secure files before attempting push"
        exit 1
    elif [ $BUSINESS_RISKS -gt 5 ]; then
        print_warning "⚠️ PRE-PUSH WARNING: High risk level detected"
        echo "• $BUSINESS_RISKS potential business risks found"
        echo "• Consider reviewing sensitive content"
        exit 1
    else
        print_success "✅ PRE-PUSH SCAN PASSED: Safe for public repository"
        exit 0
    fi
fi

print_success "🛡️ SECURITY PROTECTION SCANNER DEPLOYMENT COMPLETE!"
echo "42-member ULTRA ELITE team security protection is now ENTERPRISE-LEVEL! 🚀"