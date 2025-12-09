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

# Logo mappings with official URLs found via web scraping
logos_to_download = {
    # Home Services (successfully scraped)
    "housecall-pro.svg": ("https://www.housecallpro.com/wp-content/themes/housecallpro/dist/images/icon-logo-header-resting.svg", None),
    "fieldedge.png": ("https://fieldedge.com/wp-content/themes/fieldedge/assets/dist/images/logo-xplor.png", None),
    "gorilladesk.png": ("https://gorilladesk.com/wp-content/uploads/2019/11/GorillaDesk-type-logo-1.png", None),
    "service-fusion.svg": ("https://www.servicefusion.com/wp-content/uploads/2024/11/byEP_SF-white.svg", None),

    # Legal (successfully scraped)
    "clio.svg": ("https://www.clio.com/wp-content/uploads/2025/09/clio-logo.svg", None),
    "mycase.png": ("https://www.mycase.com/logo.webp", None),
    "practice-panther.svg": ("https://www.practicepanther.com/wp-content/themes/flynt/dist/Components/SiteHeader/Assets/logo.png", None),
    "lawmatics.svg": ("https://cdn.prod.website-files.com/68b5feb59eb6ea720e660aa8/07294132945ae7c2f56a2d6747cbef44_Lawmatics-Logo_FC_Dark.svg", None),
    "lawpay.svg": ("https://www.lawpay.com/logo.webp", None),
    "smokeball.svg": ("https://cdn.prod.website-files.com/63760b27ab00cb2926424b12/65bc11111c79b60fcdf9f07c_Smokeball%20Logo%20-%20Normal.svg", None),

    # Healthcare (successfully scraped)
    "drchrono.svg": ("https://drchrono.com/site_media/images/drc_logo_charcoal_eh_r.682a4836cae8.svg", None),
    "mindbody.svg": ("https://www.mindbodyonline.com/themes/mindbody/dist/patterns/images/global/mindbody-logos/mb-logo.svg", None),
    "kareo.svg": ("/tebranew/_next/static/media/logo_kareo+tebra.96c191e8.svg", "https://www.tebra.com"),

    # Real Estate (successfully scraped)
    "follow-up-boss.png": ("https://cdn.prod.website-files.com/644fec6f9633da07ea1323cb/68ee8498b04b0de2bc03695e_FUB_Granite.svg", None),
    "kvcore.png": ("https://s3.amazonaws.com/kunversion-platform/kv-logo-white.png", None),
    "boomtown.svg": ("https://boomtownroi.com/wp-content/themes/boomtown-6-1/images/logos/White.svg", None),
}

# Logos that need manual download (blocked by 403 or other restrictions)
manual_downloads_needed = {
    "servicetitan.svg": "https://www.servicetitan.com/ - Could not scrape automatically",
    "jobber.svg": "https://getjobber.com/ - 403 Forbidden",
    "athenahealth.svg": "https://www.athenahealth.com/ - Could not find logo in CSS content",
    "zillow-premier-agent.svg": "https://www.zillow.com/ - 403 Forbidden",
    "realtor-com.png": "https://www.realtor.com/ - Cannot fetch from this domain",
}

print("=" * 80)
print("INTEGRATION LOGO DOWNLOADER")
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
print(f"[SUCCESS] Automatic downloads successful: {len(successful)}/{len(logos_to_download)}")
print(f"[FAILED] Automatic downloads failed: {len(failed)}/{len(logos_to_download)}")
print(f"[MANUAL] Manual downloads needed: {len(manual_downloads_needed)}")

if successful:
    print(f"\n[SUCCESS] Successfully downloaded:")
    for logo in successful:
        print(f"  - {logo}")

if failed:
    print(f"\n[FAILED] Failed automatic downloads:")
    for logo in failed:
        print(f"  - {logo}")

if manual_downloads_needed:
    print(f"\n[MANUAL] Logos requiring manual download:")
    for filename, note in manual_downloads_needed.items():
        print(f"  - {filename}")
        print(f"    {note}")

print("\n" + "=" * 80)
print("\nNEXT STEPS:")
print("For logos that couldn't be downloaded automatically:")
print("1. Visit the official website in a browser")
print("2. Right-click on the logo and select 'Save image as...'")
print("3. Save to:", output_dir)
print("=" * 80)
