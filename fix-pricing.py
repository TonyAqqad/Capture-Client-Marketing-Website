#!/usr/bin/env python3
"""
Fix pricing inconsistencies across all data files.
Replace $999 -> $97, $1,997 -> $797, "Custom" -> "$2,997"
"""

import json
import os
from pathlib import Path

# Correct pricing
CORRECT_PRICES = {
    "$999": "$97",
    "$1,997": "$797",
}

def fix_pricing_in_text(text):
    """Replace all price occurrences in text"""
    result = text
    for old_price, new_price in CORRECT_PRICES.items():
        result = result.replace(old_price, new_price)

    # Fix "Custom" pricing for Enterprise (with context)
    result = result.replace('"price": "Custom"', '"price": "$2,997"')
    result = result.replace('"period": "pricing"', '"period": "per month"')

    return result

def process_file(file_path):
    """Process a single JSON file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if file has pricing issues
        has_issues = any(price in content for price in CORRECT_PRICES.keys())
        has_issues = has_issues or '"Custom"' in content

        if not has_issues:
            return False, None

        # Fix pricing
        fixed_content = fix_pricing_in_text(content)

        # Validate JSON
        try:
            json.loads(fixed_content)
        except json.JSONDecodeError as e:
            return False, f"JSON error after fix: {e}"

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(fixed_content)

        return True, None

    except Exception as e:
        return False, str(e)

def main():
    data_dir = Path("C:/Users/eaqqa/capture-client-website-seo/capture-client-site/src/data")

    fixed_files = []
    error_files = []
    skipped_files = []

    # Process all JSON files
    for json_file in data_dir.rglob("*.json"):
        was_fixed, error = process_file(json_file)

        if error:
            error_files.append((json_file.name, error))
        elif was_fixed:
            fixed_files.append(json_file.name)
        else:
            skipped_files.append(json_file.name)

    # Report
    print(f"\n{'='*60}")
    print("PRICING FIX REPORT")
    print(f"{'='*60}\n")

    print(f"[OK] Files Fixed: {len(fixed_files)}")
    if fixed_files:
        for filename in sorted(fixed_files):
            print(f"   - {filename}")

    print(f"\n[SKIP] Files Skipped (no pricing issues): {len(skipped_files)}")

    if error_files:
        print(f"\n[ERROR] Files with Errors: {len(error_files)}")
        for filename, error in error_files:
            print(f"   - {filename}: {error}")

    print(f"\n{'='*60}")
    print(f"SUMMARY: {len(fixed_files)} files corrected successfully")
    print(f"{'='*60}\n")

    return len(fixed_files), len(error_files)

if __name__ == "__main__":
    fixed, errors = main()
    exit(0 if errors == 0 else 1)
