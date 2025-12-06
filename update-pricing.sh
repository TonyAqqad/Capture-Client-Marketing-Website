#!/bin/bash

# Update all pricing references in the codebase
cd "C:/Users/eaqqa/capture-client-website-seo/capture-client-site/src"

# Find and update all JSON files
find . -name "*.json" -type f -print0 | while IFS= read -r -d '' file; do
    # Skip node_modules and other build directories
    if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".next"* ]]; then
        continue
    fi

    # Update pricing values
    sed -i 's/\$999/\$97/g' "$file"
    sed -i 's/\$1,997/\$797/g' "$file"
    sed -i 's/\$3,997/\$2,997/g' "$file"
    sed -i 's/200 calls/unlimited calls/g' "$file"
    sed -i 's/200+ calls/unlimited calls/g' "$file"

    echo "Updated: $file"
done

echo "All pricing updated successfully!"
