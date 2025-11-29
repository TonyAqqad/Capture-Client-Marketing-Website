#!/bin/bash

echo "=========================================="
echo "Lead Rescue Simulator - Installation Check"
echo "=========================================="
echo ""

# Check hooks directory
echo "✓ Checking hooks directory..."
if [ -d "capture-client-site/src/hooks" ]; then
    echo "  ✅ hooks/ directory exists"
    
    if [ -f "capture-client-site/src/hooks/useSimulationState.ts" ]; then
        echo "  ✅ useSimulationState.ts exists"
    else
        echo "  ❌ useSimulationState.ts missing"
    fi
    
    if [ -f "capture-client-site/src/hooks/useTypewriter.ts" ]; then
        echo "  ✅ useTypewriter.ts exists"
    else
        echo "  ❌ useTypewriter.ts missing"
    fi
    
    if [ -f "capture-client-site/src/hooks/index.ts" ]; then
        echo "  ✅ index.ts exists"
    else
        echo "  ❌ index.ts missing"
    fi
    
    if [ -f "capture-client-site/src/hooks/useSimulationState.test.utils.ts" ]; then
        echo "  ✅ test utilities exist"
    else
        echo "  ❌ test utilities missing"
    fi
else
    echo "  ❌ hooks/ directory missing"
fi

echo ""

# Check documentation
echo "✓ Checking documentation..."
if [ -f "SIMULATOR_STATE_MANAGEMENT.md" ]; then
    echo "  ✅ SIMULATOR_STATE_MANAGEMENT.md exists"
else
    echo "  ❌ SIMULATOR_STATE_MANAGEMENT.md missing"
fi

if [ -f "TIMING_REFERENCE.md" ]; then
    echo "  ✅ TIMING_REFERENCE.md exists"
else
    echo "  ❌ TIMING_REFERENCE.md missing"
fi

if [ -f "SIMULATOR_VISUAL_GUIDE.md" ]; then
    echo "  ✅ SIMULATOR_VISUAL_GUIDE.md exists"
else
    echo "  ❌ SIMULATOR_VISUAL_GUIDE.md missing"
fi

if [ -f "IMPLEMENTATION_SUMMARY.md" ]; then
    echo "  ✅ IMPLEMENTATION_SUMMARY.md exists"
else
    echo "  ❌ IMPLEMENTATION_SUMMARY.md missing"
fi

if [ -f "QUICKSTART.md" ]; then
    echo "  ✅ QUICKSTART.md exists"
else
    echo "  ❌ QUICKSTART.md missing"
fi

if [ -f "ARCHITECTURE_DIAGRAM.md" ]; then
    echo "  ✅ ARCHITECTURE_DIAGRAM.md exists"
else
    echo "  ❌ ARCHITECTURE_DIAGRAM.md missing"
fi

echo ""

# Check example component
echo "✓ Checking example component..."
if [ -f "capture-client-site/src/components/LeadRescueSimulator.example.tsx" ]; then
    echo "  ✅ LeadRescueSimulator.example.tsx exists"
else
    echo "  ❌ LeadRescueSimulator.example.tsx missing"
fi

echo ""

# Summary
echo "=========================================="
echo "Installation Summary"
echo "=========================================="
echo ""
echo "Core Hooks:"
echo "  - useSimulationState.ts (state machine)"
echo "  - useTypewriter.ts (typing effect)"
echo "  - index.ts (exports)"
echo "  - useSimulationState.test.utils.ts (testing)"
echo ""
echo "Documentation:"
echo "  - SIMULATOR_STATE_MANAGEMENT.md (main docs)"
echo "  - TIMING_REFERENCE.md (quick reference)"
echo "  - SIMULATOR_VISUAL_GUIDE.md (visual guide)"
echo "  - IMPLEMENTATION_SUMMARY.md (overview)"
echo "  - QUICKSTART.md (5-min guide)"
echo "  - ARCHITECTURE_DIAGRAM.md (diagrams)"
echo ""
echo "Example:"
echo "  - LeadRescueSimulator.example.tsx"
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo "1. Read QUICKSTART.md for 5-minute setup"
echo "2. Copy example component to your project"
echo "3. Customize timing and colors"
echo "4. Deploy!"
echo ""
