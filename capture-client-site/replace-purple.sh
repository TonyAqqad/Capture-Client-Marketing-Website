#!/bin/bash

# Purple to Gold replacement script
# Replaces all purple gradient instances with Gold-first design

SRC_DIR="./src"

echo "Starting purple gradient replacement with Gold-first design..."

# Find all .tsx files and replace purple patterns
find "$SRC_DIR" -name "*.tsx" -type f | while read -r file; do
  # Replace purple-500 with [#D4AF37] (Gold)
  sed -i 's/purple-500\([^0-9]\)/[#D4AF37]\1/g' "$file"
  sed -i 's/purple-600\([^0-9]\)/[#D4AF37]\/80\1/g' "$file"
  sed -i 's/purple-400\([^0-9]\)/[#D4AF37]\1/g' "$file"

  # Replace text-purple with text-[#D4AF37]
  sed -i 's/text-purple-500/text-[#D4AF37]/g' "$file"
  sed -i 's/text-purple-400/text-[#D4AF37]/g' "$file"
  sed -i 's/text-purple-600/text-[#D4AF37]\/80/g' "$file"

  # Replace bg-purple with bg-[#D4AF37]
  sed -i 's/bg-purple-500/bg-[#D4AF37]/g' "$file"
  sed -i 's/bg-purple-400/bg-[#D4AF37]/g' "$file"
  sed -i 's/bg-purple-600/bg-[#D4AF37]\/80/g' "$file"

  # Replace border-purple with border-[#D4AF37]
  sed -i 's/border-purple-500/border-[#D4AF37]/g' "$file"
  sed-i 's/border-purple-400/border-[#D4AF37]/g' "$file"
  sed -i 's/border-purple-600/border-[#D4AF37]\/80/g' "$file"

  # Replace from-purple gradients
  sed -i 's/from-purple-500/from-[#D4AF37]/g' "$file"
  sed -i 's/from-purple-400/from-[#D4AF37]/g' "$file"
  sed -i 's/from-purple-600/from-[#D4AF37]\/80/g' "$file"

  # Replace to-purple gradients
  sed -i 's/to-purple-500/to-[#D4AF37]/g' "$file"
  sed -i 's/to-purple-400/to-[#D4AF37]/g' "$file"
  sed -i 's/to-purple-600/to-[#D4AF37]\/80/g' "$file"

  # Replace via-purple gradients
  sed -i 's/via-purple-500/via-[#D4AF37]/g' "$file"
  sed -i 's/via-purple-400/via-[#D4AF37]/g' "$file"
  sed -i 's/via-purple-600/via-[#D4AF37]\/80/g' "$file"

  # Replace specific purple variations
  sed -i 's/from-violet-600/from-[#4A69E2]/g' "$file"
  sed -i 's/via-fuchsia-600/via-[#D4AF37]/g' "$file"
  sed -i 's/from-indigo-600/from-[#4A69E2]/g' "$file"
  sed -i 's/via-purple-600/via-[#D4AF37]/g' "$file"
  sed -i 's/to-pink-600/to-[#00C9FF]/g' "$file"

  # Replace indigo gradients with primary blue
  sed -i 's/from-indigo-500/from-[#4A69E2]/g' "$file"
  sed -i 's/to-indigo-500/to-[#4A69E2]/g' "$file"
  sed -i 's/via-indigo-500/via-[#4A69E2]/g' "$file"

  # Replace violet with gold  sed -i 's/bg-violet-500/bg-[#D4AF37]/g' "$file"
  sed -i 's/text-violet-400/text-[#D4AF37]/g' "$file"

  echo "Processed: $file"
done

echo "Purple gradient replacement complete!"
echo "Files processed: $(find "$SRC_DIR" -name "*.tsx" -type f | wc -l)"
