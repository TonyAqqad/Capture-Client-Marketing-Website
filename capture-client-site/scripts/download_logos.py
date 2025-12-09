#!/usr/bin/env python3
"""
Integration Logo Downloader Script
Downloads logos from URLs in integration_logos.json and saves them locally.
Updates the JSON file with local paths.
"""

import json
import os
import requests
import time
from pathlib import Path
from urllib.parse import urlparse
import mimetypes

# Configuration
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
INPUT_FILE = PROJECT_ROOT / "src" / "data" / "integration_logos.json"
OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "integrations"
OUTPUT_JSON = PROJECT_ROOT / "src" / "data" / "integration_logos_local.json"

# Headers to mimic browser request
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.google.com/',
}


def get_extension_from_url(url: str, content_type: str = None) -> str:
    """Determine file extension from URL or content-type."""
    # Try to get extension from URL first
    parsed = urlparse(url)
    path = parsed.path.lower()

    # Check common extensions
    for ext in ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico']:
        if path.endswith(ext):
            return ext

    # Try content-type header
    if content_type:
        content_type = content_type.lower()
        if 'svg' in content_type:
            return '.svg'
        elif 'png' in content_type:
            return '.png'
        elif 'jpeg' in content_type or 'jpg' in content_type:
            return '.jpg'
        elif 'gif' in content_type:
            return '.gif'
        elif 'webp' in content_type:
            return '.webp'
        elif 'icon' in content_type:
            return '.ico'

    # Default to PNG
    return '.png'


def sanitize_filename(name: str) -> str:
    """Create a safe filename from company name."""
    # Convert to lowercase and replace spaces/special chars with hyphens
    safe = name.lower()
    safe = safe.replace(' ', '-')
    safe = safe.replace('(', '').replace(')', '')
    safe = safe.replace('.', '-')
    safe = ''.join(c for c in safe if c.isalnum() or c == '-')
    # Remove multiple consecutive hyphens
    while '--' in safe:
        safe = safe.replace('--', '-')
    return safe.strip('-')


def download_logo(integration: dict, output_dir: Path) -> dict:
    """Download a single logo and return updated integration data."""
    name = integration.get('name', 'unknown')
    logo_url = integration.get('logoUrl', '')
    integration_id = integration.get('id', sanitize_filename(name))

    if not logo_url:
        print(f"  [SKIP] {name}: No logo URL provided")
        return integration

    try:
        print(f"  [DOWNLOADING] {name} from {logo_url[:60]}...")

        response = requests.get(logo_url, headers=HEADERS, timeout=30, allow_redirects=True)
        response.raise_for_status()

        # Determine file extension
        content_type = response.headers.get('Content-Type', '')
        ext = get_extension_from_url(logo_url, content_type)

        # Create filename
        filename = f"{integration_id}{ext}"
        filepath = output_dir / filename

        # Write file
        with open(filepath, 'wb') as f:
            f.write(response.content)

        # Calculate file size
        file_size = len(response.content)

        # Update integration with local path
        local_path = f"/images/integrations/{filename}"

        print(f"  [SUCCESS] {name} -> {filename} ({file_size:,} bytes)")

        return {
            **integration,
            'localPath': local_path,
            'originalUrl': logo_url,
            'downloadedAt': time.strftime('%Y-%m-%d %H:%M:%S'),
            'fileSize': file_size,
            'status': 'success'
        }

    except requests.exceptions.RequestException as e:
        print(f"  [ERROR] {name}: {str(e)[:80]}")
        return {
            **integration,
            'localPath': None,
            'originalUrl': logo_url,
            'downloadedAt': time.strftime('%Y-%m-%d %H:%M:%S'),
            'error': str(e),
            'status': 'failed'
        }
    except Exception as e:
        print(f"  [ERROR] {name}: Unexpected error - {str(e)[:80]}")
        return {
            **integration,
            'localPath': None,
            'originalUrl': logo_url,
            'error': str(e),
            'status': 'failed'
        }


def main():
    """Main execution function."""
    print("=" * 60)
    print("INTEGRATION LOGO DOWNLOADER")
    print("=" * 60)

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"\nOutput directory: {OUTPUT_DIR}")

    # Check if input file exists
    if not INPUT_FILE.exists():
        print(f"\nERROR: Input file not found: {INPUT_FILE}")
        print("Please create integration_logos.json first.")
        return

    # Load integration data
    print(f"Loading logos from: {INPUT_FILE}")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        integrations = json.load(f)

    print(f"Found {len(integrations)} integrations to process\n")

    # Download each logo
    results = []
    success_count = 0
    fail_count = 0
    skip_count = 0

    for i, integration in enumerate(integrations, 1):
        print(f"[{i}/{len(integrations)}] Processing {integration.get('name', 'Unknown')}...")
        result = download_logo(integration, OUTPUT_DIR)
        results.append(result)

        if result.get('status') == 'success':
            success_count += 1
        elif result.get('status') == 'failed':
            fail_count += 1
        else:
            skip_count += 1

        # Small delay to be nice to servers
        time.sleep(0.5)

    # Save results
    print(f"\nSaving results to: {OUTPUT_JSON}")
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    # Print summary
    print("\n" + "=" * 60)
    print("DOWNLOAD COMPLETE")
    print("=" * 60)
    print(f"  Total:     {len(integrations)}")
    print(f"  Success:   {success_count}")
    print(f"  Failed:    {fail_count}")
    print(f"  Skipped:   {skip_count}")
    print(f"\nResults saved to: {OUTPUT_JSON}")
    print(f"Logos saved to: {OUTPUT_DIR}")

    # Generate update snippet for integrations.ts
    print("\n" + "=" * 60)
    print("NEXT STEPS:")
    print("=" * 60)
    print("1. Review downloaded logos in public/images/integrations/")
    print("2. Update src/data/integrations.ts logoUrl fields to use local paths")
    print("3. Run: npm run build to verify everything works")


if __name__ == '__main__':
    main()
