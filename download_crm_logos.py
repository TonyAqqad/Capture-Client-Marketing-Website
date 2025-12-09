import requests
import os
from pathlib import Path

# Output directory
output_dir = r"C:\Users\eaqqa\capture-client-website-seo\capture-client-site\public\images\integrations"
os.makedirs(output_dir, exist_ok=True)

# CRM Logo URLs from various reliable sources
logos = {
    # HubSpot - Simple Icons CDN
    "hubspot.svg": "https://cdn.simpleicons.org/hubspot/FF7A59",

    # Salesforce - Wikimedia Commons (WORKS)
    "salesforce.svg": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",

    # Zoho CRM - jsDelivr Simple Icons CDN
    "zoho-crm.svg": "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/zoho.svg",

    # Pipedrive - Try LogoWik direct download
    "pipedrive.svg": "https://logowik.com/content/uploads/images/pipedrive3078.logowik.com.webp",

    # Follow Up Boss - Try different press kit path
    "follow-up-boss.png": "https://press.followupboss.com/images/logo.png",

    # Copper CRM - Try FreeLogo Vectors
    "copper.svg": "https://www.freelogovectors.net/wp-content/uploads/2022/01/copper-logo-freelogovectors.net_.png",

    # Monday.com - Try direct CDN simpleicons
    "monday-crm.svg": "https://cdn.simpleicons.org/mondaydotcom/FF3D57",

    # Close CRM - Try FreeBieSuppply
    "close.svg": "https://freebiesupply.com/wp-content/uploads/2023/11/close-logo.png",
}

def download_logo(url, filename):
    """Download a logo from URL and save to integrations directory"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }

        print(f"\nDownloading {filename}...")
        print(f"   URL: {url}")

        response = requests.get(url, headers=headers, timeout=30, allow_redirects=True)
        response.raise_for_status()

        content = response.content

        # Verify it's not HTML
        if content.startswith(b'<!DOCTYPE') or content.startswith(b'<html') or content.startswith(b'<HTML'):
            print(f"   ERROR: Received HTML instead of image")
            return False

        # Check if it looks like valid image data
        valid_image = False
        file_type = "UNKNOWN"

        if filename.endswith('.svg'):
            valid_image = b'<svg' in content or b'<?xml' in content
            file_type = "SVG"
        elif filename.endswith('.png'):
            valid_image = content.startswith(b'\x89PNG')
            file_type = "PNG"
        elif filename.endswith('.jpg') or filename.endswith('.jpeg'):
            valid_image = content.startswith(b'\xff\xd8\xff')
            file_type = "JPG"

        if valid_image:
            print(f"   Valid {file_type} detected")
        else:
            print(f"   WARNING: Content may not be valid {file_type}")

        filepath = os.path.join(output_dir, filename)
        with open(filepath, 'wb') as f:
            f.write(content)

        file_size = len(content) / 1024  # KB
        print(f"   SUCCESS: Saved {file_size:.1f} KB to {filename}")
        return True

    except requests.exceptions.RequestException as e:
        print(f"   ERROR: {str(e)}")
        return False
    except Exception as e:
        print(f"   ERROR: Unexpected error - {str(e)}")
        return False

# Download all CRM logos
print("=" * 70)
print("CRM INTEGRATION LOGOS DOWNLOAD")
print("=" * 70)
print(f"Output directory: {output_dir}")
print(f"Total logos to download: {len(logos)}\n")

success_count = 0
failed_logos = []

for filename, url in logos.items():
    if download_logo(url, filename):
        success_count += 1
    else:
        failed_logos.append((filename, url))

# Summary
print("\n" + "=" * 70)
print("DOWNLOAD SUMMARY")
print("=" * 70)
print(f"Successful: {success_count}/{len(logos)}")
print(f"Failed: {len(failed_logos)}/{len(logos)}")

if failed_logos:
    print("\nFailed downloads (may need manual download):")
    for filename, url in failed_logos:
        print(f"   - {filename}")

print("\n" + "=" * 70)
