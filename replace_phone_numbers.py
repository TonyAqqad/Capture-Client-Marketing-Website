#!/usr/bin/env python3
"""
Batch replace phone numbers in location JSON files
Replace 865-346-3339 with 865-346-6111 across all formats
"""

import os
import re
from pathlib import Path

# Define the directory containing location JSON files
locations_dir = Path("capture-client-site/src/data/locations")

# Phone number mappings (old -> new)
phone_replacements = [
    ("865-346-3339", "865-346-6111"),
    ("(865) 346-3339", "(865) 346-6111"),
    ("8653463339", "8653466111"),
]

# Track changes
files_modified = []
total_replacements = 0

# Process each JSON file
for json_file in sorted(locations_dir.glob("voice-ai-*.json")):
    try:
        # Read the file
        content = json_file.read_text(encoding='utf-8')
        original_content = content
        file_replacements = 0

        # Apply each replacement
        for old_phone, new_phone in phone_replacements:
            count = content.count(old_phone)
            if count > 0:
                content = content.replace(old_phone, new_phone)
                file_replacements += count

        # Write back only if changes were made
        if content != original_content:
            json_file.write_text(content, encoding='utf-8')
            files_modified.append((json_file.name, file_replacements))
            total_replacements += file_replacements
            print(f"[OK] {json_file.name} - {file_replacements} replacements")

    except Exception as e:
        print(f"[ERROR] Error processing {json_file.name}: {e}")

# Summary
print("\n" + "="*60)
print(f"BATCH REPLACEMENT COMPLETE")
print("="*60)
print(f"Files modified: {len(files_modified)}")
print(f"Total replacements: {total_replacements}")
print("\nModified files:")
for filename, count in files_modified:
    print(f"  - {filename} ({count} replacements)")
