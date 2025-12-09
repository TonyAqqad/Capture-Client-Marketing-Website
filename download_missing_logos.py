import requests
import os
from urllib.parse import urljoin
import time

output_dir = r"C:\Users\eaqqa\capture-client-website-seo\capture-client-site\public\images\integrations"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

def download_logo(url, filename, base_url=None):
    """Download logo from URL and save to integrations directory"""
    # Handle relative URLs
    if base_url and not url.startswith('http'):
        url = urljoin(base_url, url)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    try:
        response = requests.get(url, headers=headers, timeout=30, allow_redirects=True)
        response.raise_for_status()
        content = response.content

        # Validate it's an actual image
        if content.startswith(b'<!DOCTYPE') or content.startswith(b'<html') or content.startswith(b'<HTML'):
            print(f"[ERROR] {filename} - Got HTML instead of image from {url}")
            return False

        # Check for common image signatures
        image_signatures = [
            b'\x89PNG',  # PNG
            b'\xff\xd8\xff',  # JPEG
            b'GIF89a', b'GIF87a',  # GIF
            b'<svg',  # SVG
            b'<?xml',  # SVG (XML variant)
            b'RIFF',  # WEBP
        ]

        is_image = any(content.startswith(sig) for sig in image_signatures) or b'<svg' in content[:500]
        if not is_image:
            print(f"[ERROR] {filename} - Content doesn't appear to be an image (first 20 bytes: {content[:20]})")
            print(f"   Content type: {response.headers.get('content-type', 'unknown')}")
            return False

        filepath = os.path.join(output_dir, filename)
        with open(filepath, 'wb') as f:
            f.write(content)

        file_size = len(content) / 1024  # KB
        print(f"[SUCCESS] {filename} - {file_size:.1f} KB downloaded")
        return True
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] {filename} - {e}")
        return False
    except Exception as e:
        print(f"[ERROR] {filename} - Unexpected error: {e}")
        return False

# Missing logos with alternative URLs
logos_to_download = {
    # DrChrono - using dark logo (medium size)
    "drchrono.svg": ("/site_media/images/logos/drchrono_logo_charcoal_byEverHealth_md.6e93d68b0ddd.png", "https://www.drchrono.com"),

    # Lawmatics - try alternative approach with different CDN path
    # Note: This may still fail, requiring manual download
}

print("=" * 80)
print("MISSING INTEGRATION LOGOS DOWNLOADER")
print("=" * 80)
print(f"Output directory: {output_dir}\n")

successful = []
failed = []

for filename, (url, base_url) in logos_to_download.items():
    print(f"\nDownloading: {filename}")
    print(f"From: {url}")

    if download_logo(url, filename, base_url):
        successful.append(filename)
    else:
        failed.append(filename)

    # Be respectful with rate limiting
    time.sleep(1)

print("\n" + "=" * 80)
print("DOWNLOAD SUMMARY")
print("=" * 80)
print(f"[SUCCESS] Downloads successful: {len(successful)}/{len(logos_to_download)}")
print(f"[FAILED] Downloads failed: {len(failed)}/{len(logos_to_download)}")

if successful:
    print(f"\n[SUCCESS] Successfully downloaded:")
    for logo in successful:
        print(f"  - {logo}")

if failed:
    print(f"\n[FAILED] Failed downloads:")
    for logo in failed:
        print(f"  - {logo}")

print("\n" + "=" * 80)
