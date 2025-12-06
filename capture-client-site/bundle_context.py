import os

# --- CONFIGURATION ---
output_file = 'project_context.txt'

# File types to include (Code & Config)
extensions_to_include = {
    '.ts', '.tsx', '.js', '.jsx',      # Javascript/Typescript
    '.css', '.scss',                   # Styles
    '.md', '.json',                    # Documentation & Config
    '.py',                             # Python Scripts
    '.env.local', '.env'               # Environment variables
}

# Directories to STRICTLY ignore (Noise)
dirs_to_ignore = {
    'node_modules', 
    '.next', 
    '.git', 
    '.vscode', 
    'dist', 
    'build', 
    'coverage', 
    '.playwright-mcp',  # Ignore playwright artifacts
    '__pycache__',
    '.claude'           # Optional: Ignore existing agents if you want purely code
}

# Specific files to ignore
files_to_ignore = {
    'package-lock.json', 
    'yarn.lock', 
    'pnpm-lock.yaml',
    'bundle_context.py', # Don't bundle the bundler itself
    '.DS_Store'
}

def is_text_file(filename):
    return any(filename.endswith(ext) for ext in extensions_to_include)

def main():
    try:
        with open(output_file, 'w', encoding='utf-8') as outfile:
            # 1. Write a Header for the AI
            outfile.write(f"# PROJECT CONTEXT DUMP\n")
            outfile.write(f"# This file contains the concatenated codebase for 'Capture Client'.\n")
            outfile.write(f"# Use this to understand the architecture, components, and styling.\n")
            outfile.write(f"==================================================================\n\n")

            file_count = 0

            # 2. Walk through the directory tree
            for root, dirs, files in os.walk('.'):
                # Filter out ignored directories in-place
                dirs[:] = [d for d in dirs if d not in dirs_to_ignore]
                
                for file in files:
                    if file in files_to_ignore:
                        continue
                    
                    if is_text_file(file):
                        file_path = os.path.join(root, file)
                        
                        try:
                            with open(file_path, 'r', encoding='utf-8') as infile:
                                content = infile.read()
                                
                                # 3. Write the File Content with XML Tags
                                # This helps Claude distinguish between different files easily
                                outfile.write(f"<file path=\"{file_path}\">\n")
                                outfile.write(content)
                                outfile.write(f"\n</file>\n\n")
                                
                                print(f"Bundled: {file_path}")
                                file_count += 1
                        except Exception as e:
                            print(f"⚠️ Could not read {file_path}: {e}")

        print(f"\n✅ SUCCESS! Bundled {file_count} files into '{output_file}'")
        print(f"👉 Upload '{output_file}' to Claude now.")

    except Exception as e:
        print(f"❌ Error creating bundle: {e}")

if __name__ == "__main__":
    main()