#!/bin/bash

# Replace all AI-slop purple variations with Gold-first brand colors
# Primary: #D4AF37 (Gold), Secondary: #00C9FF (Cyan), Tertiary: #4A69E2 (Indigo/Blue)

SRC_DIR="./src"

echo "Replacing AI-slop colors with premium brand palette..."

# Function to replace in all TSX files
replace_in_tsx() {
  local search="$1"
  local replace="$2"

  find "$SRC_DIR" -name "*.tsx" -type f -exec sed -i "s/${search}/${replace}/g" {} \;
}

# Replace indigo variations (keep for primary blue where appropriate, but fix gradients)
replace_in_tsx "from-indigo-600" "from-[#4A69E2]"
replace_in_tsx "to-indigo-600" "to-[#4A69E2]"
replace_in_tsx "via-indigo-600" "via-[#4A69E2]"
replace_in_tsx "from-indigo-500" "from-[#4A69E2]"
replace_in_tsx "to-indigo-500" "to-[#4A69E2]"
replace_in_tsx "via-indigo-500" "via-[#4A69E2]"
replace_in_tsx "to-indigo-400" "to-[#D4AF37]"  # Use gold instead
replace_in_tsx "text-indigo-500" "text-[#4A69E2]"
replace_in_tsx "text-indigo-400" "text-[#D4AF37]"  # Use gold for accents
replace_in_tsx "bg-indigo-500" "bg-[#4A69E2]"
replace_in_tsx "bg-indigo-400" "bg-[#D4AF37]"

# Replace violet (purple variant) with gold
replace_in_tsx "from-violet-600" "from-[#4A69E2]"
replace_in_tsx "via-violet-600" "via-[#D4AF37]"
replace_in_tsx "to-violet-600" "to-[#D4AF37]"
replace_in_tsx "from-violet-500" "from-[#4A69E2]"
replace_in_tsx "to-violet-500" "to-[#D4AF37]"
replace_in_tsx "via-violet-500" "via-[#D4AF37]"
replace_in_tsx "text-violet-500" "text-[#D4AF37]"
replace_in_tsx "text-violet-400" "text-[#D4AF37]"
replace_in_tsx "bg-violet-500" "bg-[#D4AF37]"
replace_in_tsx "border-violet-500" "border-[#D4AF37]"

# Replace fuchsia (pink-purple) with cyan/gold blend
replace_in_tsx "from-fuchsia-600" "from-[#D4AF37]"
replace_in_tsx "via-fuchsia-600" "via-[#D4AF37]"
replace_in_tsx "to-fuchsia-600" "to-[#00C9FF]"
replace_in_tsx "from-fuchsia-500" "from-[#D4AF37]"
replace_in_tsx "to-fuchsia-500" "to-[#00C9FF]"
replace_in_tsx "via-fuchsia-500" "via-[#D4AF37]"

# Replace pink gradients with cyan (to keep vibrancy)
replace_in_tsx "to-pink-600" "to-[#00C9FF]"
replace_in_tsx "to-pink-500" "to-[#00C9FF]"

echo "AI-slop color replacement complete!"
echo "Colors replaced: indigo, violet, fuchsia, pink variants → Gold/Cyan/Blue brand palette"
