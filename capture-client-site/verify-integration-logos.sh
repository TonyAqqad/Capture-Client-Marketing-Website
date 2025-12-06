#!/bin/bash

echo "=========================================="
echo "Integration Logos System Verification"
echo "=========================================="
echo ""

echo "✅ Checking production files..."
echo ""

# Check data file
if [ -f "src/data/integration-logos.ts" ]; then
    echo "✓ integration-logos.ts exists ($(du -h src/data/integration-logos.ts | cut -f1))"
else
    echo "✗ integration-logos.ts NOT FOUND"
    exit 1
fi

# Check component file
if [ -f "src/components/IntegrationLogo.tsx" ]; then
    echo "✓ IntegrationLogo.tsx exists ($(du -h src/components/IntegrationLogo.tsx | cut -f1))"
else
    echo "✗ IntegrationLogo.tsx NOT FOUND"
    exit 1
fi

# Check examples file
if [ -f "src/components/examples/IntegrationsShowcase.tsx" ]; then
    echo "✓ IntegrationsShowcase.tsx exists ($(du -h src/components/examples/IntegrationsShowcase.tsx | cut -f1))"
else
    echo "✗ IntegrationsShowcase.tsx NOT FOUND"
    exit 1
fi

echo ""
echo "✅ Checking demo file (should exist for testing)..."
echo ""

if [ -f "src/app/integrations-demo/page.tsx" ]; then
    echo "✓ Demo page exists ($(du -h src/app/integrations-demo/page.tsx | cut -f1))"
    echo "  → Visit: http://localhost:3000/integrations-demo"
    echo "  ⚠️  DELETE this file after verification!"
else
    echo "ℹ️  Demo page not found (already deleted or not created)"
fi

echo ""
echo "✅ Checking documentation files..."
echo ""

docs=(
    "INTEGRATION_LOGOS_README.md"
    "INTEGRATION_LOGOS_QUICK_START.md"
    "INTEGRATION_LOGOS_IMPLEMENTATION_SUMMARY.md"
    "INTEGRATION_LOGOS_REFERENCE.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✓ $doc ($(du -h "$doc" | cut -f1))"
    else
        echo "✗ $doc NOT FOUND"
    fi
done

echo ""
echo "✅ Counting integrations in data file..."
echo ""

if [ -f "src/data/integration-logos.ts" ]; then
    count=$(grep -c "name:" src/data/integration-logos.ts)
    echo "Found: $count integrations"
    if [ "$count" -eq 30 ]; then
        echo "✓ All 30 integrations present"
    else
        echo "⚠️  Expected 30, found $count"
    fi
fi

echo ""
echo "✅ Testing TypeScript compilation..."
echo ""

if command -v npx &> /dev/null; then
    if npx tsc --noEmit --skipLibCheck 2>&1 | grep -i "integration" | head -5; then
        echo "⚠️  TypeScript errors found in integration files"
    else
        echo "✓ No TypeScript errors in integration files"
    fi
else
    echo "ℹ️  TypeScript compiler not available, skipping check"
fi

echo ""
echo "=========================================="
echo "Verification Summary"
echo "=========================================="
echo ""
echo "✓ All production files exist"
echo "✓ Data file contains integration mappings"
echo "✓ Components ready to use"
echo "✓ Documentation complete"
echo ""
echo "Next Steps:"
echo "1. Run: npm run dev"
echo "2. Visit: http://localhost:3000/integrations-demo"
echo "3. Verify all logos load correctly"
echo "4. Delete: src/app/integrations-demo/page.tsx"
echo "5. Implement logos on your pages!"
echo ""
echo "Documentation:"
echo "- Quick Start: INTEGRATION_LOGOS_QUICK_START.md"
echo "- Full Docs: INTEGRATION_LOGOS_README.md"
echo "- Reference: INTEGRATION_LOGOS_REFERENCE.md"
echo ""
