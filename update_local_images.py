#!/usr/bin/env python3
"""
Local Landmark Image Updater
Generates Unsplash search URLs and updates location JSON files with local imagery
"""

import json
import os
from pathlib import Path
from typing import Dict, List

# Location-to-landmark mapping
LOCATION_LANDMARKS = {
    # TENNESSEE
    "chattanooga-tn": {
        "search": "Walnut Street Bridge Chattanooga Tennessee",
        "landmark": "Walnut Street Bridge",
        "alt_searches": ["Chattanooga Tennessee skyline", "Lookout Mountain Chattanooga"]
    },
    "knoxville-tn": {
        "search": "Sunsphere Knoxville Tennessee",
        "landmark": "Sunsphere",
        "alt_searches": ["Knoxville Tennessee downtown", "Market Square Knoxville"]
    },
    "memphis-tn": {
        "search": "Beale Street Memphis Tennessee",
        "landmark": "Beale Street",
        "alt_searches": ["Memphis Tennessee skyline", "Memphis Bridge"]
    },
    "nashville-tn": {
        "search": "Broadway Nashville Tennessee",
        "landmark": "Broadway Nashville",
        "alt_searches": ["Nashville skyline", "AT&T Building Nashville"]
    },
    "murfreesboro-tn": {
        "search": "Murfreesboro Tennessee historic square",
        "landmark": "Historic Square",
        "alt_searches": ["Murfreesboro downtown Tennessee"]
    },
    "franklin-tn": {
        "search": "Franklin Tennessee historic downtown",
        "landmark": "Historic Main Street",
        "alt_searches": ["Franklin Tennessee Main Street"]
    },
    "clarksville-tn": {
        "search": "Clarksville Tennessee Cumberland River",
        "landmark": "Cumberland River",
        "alt_searches": ["Clarksville Tennessee downtown"]
    },
    "johnson-city-tn": {
        "search": "Johnson City Tennessee downtown",
        "landmark": "Downtown Johnson City",
        "alt_searches": ["Johnson City Tennessee Founders Park"]
    },
    "kingsport-tn": {
        "search": "Kingsport Tennessee downtown",
        "landmark": "Downtown Kingsport",
        "alt_searches": ["Kingsport Tennessee Bays Mountain"]
    },
    "maryville-tn": {
        "search": "Maryville Tennessee Smoky Mountains",
        "landmark": "Great Smoky Mountains",
        "alt_searches": ["Maryville Tennessee downtown"]
    },
    "farragut-tn": {
        "search": "Farragut Tennessee",
        "landmark": "West Knoxville",
        "alt_searches": ["Turkey Creek Knoxville Tennessee"]
    },
    "gatlinburg-tn": {
        "search": "Gatlinburg Tennessee mountains",
        "landmark": "Great Smoky Mountains",
        "alt_searches": ["Gatlinburg Tennessee strip"]
    },
    "sevierville-tn": {
        "search": "Sevierville Tennessee",
        "landmark": "Smoky Mountains",
        "alt_searches": ["Sevierville Tennessee downtown"]
    },
    "oak-ridge-tn": {
        "search": "Oak Ridge Tennessee",
        "landmark": "Oak Ridge",
        "alt_searches": ["Oak Ridge Tennessee downtown"]
    },

    # GEORGIA
    "atlanta-ga": {
        "search": "Atlanta Georgia skyline Midtown",
        "landmark": "Atlanta Skyline",
        "alt_searches": ["Peachtree Street Atlanta", "Atlanta downtown"]
    },
    "athens-ga": {
        "search": "University of Georgia Athens arch",
        "landmark": "UGA Arch",
        "alt_searches": ["Athens Georgia downtown", "Sanford Stadium Athens"]
    },
    "augusta-ga": {
        "search": "Riverwalk Augusta Georgia",
        "landmark": "Augusta Riverwalk",
        "alt_searches": ["Augusta Georgia Savannah River"]
    },
    "alpharetta-ga": {
        "search": "Alpharetta Georgia Avalon",
        "landmark": "Avalon",
        "alt_searches": ["Alpharetta Georgia downtown"]
    },
    "marietta-ga": {
        "search": "Marietta Square Georgia",
        "landmark": "Marietta Square",
        "alt_searches": ["Marietta Georgia historic downtown"]
    },
    "roswell-ga": {
        "search": "Roswell Georgia historic Canton Street",
        "landmark": "Historic Roswell",
        "alt_searches": ["Canton Street Roswell Georgia"]
    },
    "sandy-springs-ga": {
        "search": "Sandy Springs Georgia City Springs",
        "landmark": "City Springs",
        "alt_searches": ["Sandy Springs Georgia"]
    },
    "columbus-ga": {
        "search": "Columbus Georgia Riverwalk Chattahoochee",
        "landmark": "Riverwalk",
        "alt_searches": ["Columbus Georgia downtown"]
    },
    "savannah-ga": {
        "search": "Forsyth Park Savannah Georgia",
        "landmark": "Forsyth Park",
        "alt_searches": ["River Street Savannah", "Savannah historic squares"]
    },

    # NORTH CAROLINA
    "charlotte-nc": {
        "search": "Charlotte North Carolina uptown skyline",
        "landmark": "Charlotte Skyline",
        "alt_searches": ["Bank of America tower Charlotte"]
    },
    "raleigh-nc": {
        "search": "Raleigh North Carolina state capitol",
        "landmark": "North Carolina State Capitol",
        "alt_searches": ["Raleigh downtown North Carolina"]
    },
    "durham-nc": {
        "search": "Duke Chapel Durham North Carolina",
        "landmark": "Duke Chapel",
        "alt_searches": ["Durham North Carolina downtown"]
    },
    "chapel-hill-nc": {
        "search": "Old Well UNC Chapel Hill",
        "landmark": "Old Well",
        "alt_searches": ["Franklin Street Chapel Hill", "UNC Chapel Hill campus"]
    },
    "greensboro-nc": {
        "search": "Greensboro North Carolina downtown",
        "landmark": "Downtown Greensboro",
        "alt_searches": ["Greensboro NC Gate City"]
    },
    "winston-salem-nc": {
        "search": "Winston-Salem North Carolina downtown",
        "landmark": "Downtown Winston-Salem",
        "alt_searches": ["Old Salem North Carolina"]
    },
    "cary-nc": {
        "search": "Cary North Carolina downtown",
        "landmark": "Downtown Cary",
        "alt_searches": ["Cary NC parks"]
    },
    "asheville-nc": {
        "search": "Asheville North Carolina Blue Ridge Mountains",
        "landmark": "Blue Ridge Mountains",
        "alt_searches": ["Downtown Asheville", "Biltmore Asheville"]
    },
    "wilmington-nc": {
        "search": "Wilmington North Carolina riverwalk",
        "landmark": "Wilmington Riverwalk",
        "alt_searches": ["Cape Fear River Wilmington"]
    },
    "fayetteville-nc": {
        "search": "Fayetteville North Carolina Market House",
        "landmark": "Market House",
        "alt_searches": ["Fayetteville NC downtown"]
    },
    "concord-nc": {
        "search": "Concord North Carolina downtown",
        "landmark": "Downtown Concord",
        "alt_searches": ["Concord NC Charlotte Motor Speedway"]
    },
    "high-point-nc": {
        "search": "High Point North Carolina downtown",
        "landmark": "Downtown High Point",
        "alt_searches": ["High Point furniture market"]
    },
    "greenville-nc": {
        "search": "Greenville North Carolina downtown",
        "landmark": "Downtown Greenville",
        "alt_searches": ["ECU East Carolina University Greenville"]
    },

    # VIRGINIA
    "alexandria-va": {
        "search": "Old Town Alexandria Virginia King Street",
        "landmark": "Old Town Alexandria",
        "alt_searches": ["King Street Alexandria", "Alexandria waterfront"]
    },
    "richmond-va": {
        "search": "Richmond Virginia skyline James River",
        "landmark": "Richmond Skyline",
        "alt_searches": ["Virginia State Capitol Richmond"]
    },
    "arlington-va": {
        "search": "Arlington Virginia Rosslyn skyline",
        "landmark": "Rosslyn",
        "alt_searches": ["Crystal City Arlington"]
    },
    "virginia-beach-va": {
        "search": "Virginia Beach oceanfront boardwalk",
        "landmark": "Virginia Beach Oceanfront",
        "alt_searches": ["Virginia Beach boardwalk"]
    },
    "norfolk-va": {
        "search": "Norfolk Virginia waterfront harbor",
        "landmark": "Norfolk Waterfront",
        "alt_searches": ["Norfolk harbor Virginia"]
    },
    "chesapeake-va": {
        "search": "Chesapeake Virginia Great Bridge",
        "landmark": "Great Bridge",
        "alt_searches": ["Chesapeake Virginia"]
    },
    "newport-news-va": {
        "search": "Newport News Virginia waterfront",
        "landmark": "Newport News Waterfront",
        "alt_searches": ["Newport News Virginia harbor"]
    },
    "hampton-va": {
        "search": "Hampton Virginia waterfront",
        "landmark": "Hampton Waterfront",
        "alt_searches": ["Hampton Virginia downtown"]
    },
    "suffolk-va": {
        "search": "Suffolk Virginia historic downtown",
        "landmark": "Historic Suffolk",
        "alt_searches": ["Suffolk Virginia downtown"]
    },
    "roanoke-va": {
        "search": "Roanoke Star Virginia Blue Ridge",
        "landmark": "Roanoke Star",
        "alt_searches": ["Roanoke Virginia downtown"]
    },
    "lynchburg-va": {
        "search": "Lynchburg Virginia James River",
        "landmark": "James River",
        "alt_searches": ["Lynchburg Virginia downtown"]
    },
    "fredericksburg-va": {
        "search": "Fredericksburg Virginia historic downtown",
        "landmark": "Historic Fredericksburg",
        "alt_searches": ["Rappahannock River Fredericksburg"]
    },

    # KENTUCKY
    "louisville-ky": {
        "search": "Louisville Kentucky skyline Ohio River",
        "landmark": "Louisville Skyline",
        "alt_searches": ["Churchill Downs Louisville"]
    },
    "lexington-ky": {
        "search": "Lexington Kentucky horse farm",
        "landmark": "Lexington Horse Farm",
        "alt_searches": ["Lexington Kentucky downtown", "Rupp Arena Lexington"]
    },
    "bowling-green-ky": {
        "search": "Bowling Green Kentucky downtown",
        "landmark": "Downtown Bowling Green",
        "alt_searches": ["WKU Western Kentucky University Bowling Green"]
    },
    "covington-ky": {
        "search": "Roebling Bridge Covington Kentucky",
        "landmark": "Roebling Suspension Bridge",
        "alt_searches": ["Cincinnati skyline from Covington", "Mainstrasse Village Covington"]
    },
    "owensboro-ky": {
        "search": "Owensboro Kentucky Ohio River",
        "landmark": "Ohio River",
        "alt_searches": ["Owensboro Kentucky downtown"]
    },

    # OHIO
    "columbus-oh": {
        "search": "Columbus Ohio skyline Scioto Mile",
        "landmark": "Columbus Skyline",
        "alt_searches": ["Scioto Mile Columbus"]
    },
    "cleveland-oh": {
        "search": "Cleveland Ohio skyline Terminal Tower",
        "landmark": "Terminal Tower",
        "alt_searches": ["Lake Erie Cleveland"]
    },
    "cincinnati-oh": {
        "search": "Cincinnati Ohio skyline Roebling Bridge",
        "landmark": "Cincinnati Skyline",
        "alt_searches": ["Ohio River Cincinnati"]
    },
    "toledo-oh": {
        "search": "Toledo Ohio downtown Maumee River",
        "landmark": "Downtown Toledo",
        "alt_searches": ["Maumee River Toledo"]
    },
    "akron-oh": {
        "search": "Akron Ohio downtown",
        "landmark": "Downtown Akron",
        "alt_searches": ["Akron Ohio canal district"]
    },
    "dayton-oh": {
        "search": "Dayton Ohio downtown",
        "landmark": "Downtown Dayton",
        "alt_searches": ["Great Miami River Dayton"]
    },
    "canton-oh": {
        "search": "Pro Football Hall of Fame Canton Ohio",
        "landmark": "Pro Football Hall of Fame",
        "alt_searches": ["Canton Ohio downtown"]
    },
    "parma-oh": {
        "search": "Cleveland Ohio suburbs",
        "landmark": "Greater Cleveland",
        "alt_searches": ["Parma Ohio"]
    },

    # FLORIDA
    "miami-fl": {
        "search": "Miami Florida skyline Biscayne Bay",
        "landmark": "Miami Skyline",
        "alt_searches": ["Miami Beach Florida", "Downtown Miami"]
    },
    "orlando-fl": {
        "search": "Lake Eola Orlando Florida",
        "landmark": "Lake Eola",
        "alt_searches": ["Orlando Florida skyline"]
    },
    "tampa-fl": {
        "search": "Tampa Riverwalk Florida",
        "landmark": "Tampa Riverwalk",
        "alt_searches": ["Tampa Bay Florida skyline"]
    },
    "jacksonville-fl": {
        "search": "Jacksonville Florida skyline St Johns River",
        "landmark": "Jacksonville Skyline",
        "alt_searches": ["St Johns River Jacksonville"]
    },
    "st-petersburg-fl": {
        "search": "St Petersburg Florida waterfront pier",
        "landmark": "St. Petersburg Pier",
        "alt_searches": ["St Petersburg Florida downtown"]
    },
    "fort-lauderdale-fl": {
        "search": "Fort Lauderdale beach Florida",
        "landmark": "Fort Lauderdale Beach",
        "alt_searches": ["Fort Lauderdale waterfront"]
    },
    "cape-coral-fl": {
        "search": "Cape Coral Florida canals",
        "landmark": "Cape Coral Canals",
        "alt_searches": ["Cape Coral Florida waterfront"]
    },
    "hialeah-fl": {
        "search": "Miami metro Florida",
        "landmark": "Miami Metropolitan Area",
        "alt_searches": ["South Florida suburbs"]
    },
    "coral-springs-fl": {
        "search": "South Florida suburbs",
        "landmark": "South Florida",
        "alt_searches": ["Coral Springs Florida"]
    },
    "tallahassee-fl": {
        "search": "Florida State Capitol Tallahassee",
        "landmark": "Florida State Capitol",
        "alt_searches": ["Tallahassee Florida downtown", "FSU Tallahassee"]
    },

    # TEXAS
    "houston-tx": {
        "search": "Houston Texas skyline Buffalo Bayou",
        "landmark": "Houston Skyline",
        "alt_searches": ["Downtown Houston Texas"]
    },
    "dallas-tx": {
        "search": "Dallas Texas skyline Reunion Tower",
        "landmark": "Dallas Skyline",
        "alt_searches": ["Reunion Tower Dallas"]
    },
    "san-antonio-tx": {
        "search": "River Walk San Antonio Texas",
        "landmark": "San Antonio River Walk",
        "alt_searches": ["Alamo San Antonio", "Tower of the Americas"]
    },
    "austin-tx": {
        "search": "Austin Texas skyline Lady Bird Lake",
        "landmark": "Austin Skyline",
        "alt_searches": ["Congress Avenue Bridge Austin", "Texas State Capitol Austin"]
    },
    "fort-worth-tx": {
        "search": "Fort Worth Texas skyline",
        "landmark": "Fort Worth Skyline",
        "alt_searches": ["Fort Worth Stockyards"]
    },
    "el-paso-tx": {
        "search": "El Paso Texas Franklin Mountains",
        "landmark": "Franklin Mountains",
        "alt_searches": ["El Paso Texas downtown"]
    },
    "plano-tx": {
        "search": "Plano Texas Legacy West",
        "landmark": "Legacy West",
        "alt_searches": ["Plano Texas downtown"]
    },
    "irving-tx": {
        "search": "Las Colinas Mustangs Irving Texas",
        "landmark": "Mustangs of Las Colinas",
        "alt_searches": ["Las Colinas Irving"]
    },
    "frisco-tx": {
        "search": "Frisco Texas The Star",
        "landmark": "The Star",
        "alt_searches": ["Frisco Texas downtown"]
    },
}


def generate_unsplash_urls():
    """Generate Unsplash search URLs for all locations"""
    print("=" * 80)
    print("UNSPLASH SEARCH URLs FOR LOCAL LANDMARKS")
    print("=" * 80)
    print()

    for location_slug, info in LOCATION_LANDMARKS.items():
        city_state = location_slug.replace("-", " ").title()
        primary_search = info["search"].replace(" ", "+")

        print(f"\n{city_state}")
        print(f"  Landmark: {info['landmark']}")
        print(f"  Primary: https://unsplash.com/s/photos/{primary_search}")

        for alt in info.get("alt_searches", []):
            alt_search = alt.replace(" ", "+")
            print(f"  Alt:     https://unsplash.com/s/photos/{alt_search}")


def update_location_json(location_slug: str, photo_id: str, photographer: str, photographer_username: str):
    """Update a specific location JSON file with new image"""
    json_path = Path(f"capture-client-site/src/data/locations/voice-ai-{location_slug}.json")

    if not json_path.exists():
        print(f"❌ File not found: {json_path}")
        return False

    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Get location info
        city = data['location']['city']
        state = data['location']['state']
        landmark = LOCATION_LANDMARKS.get(location_slug, {}).get('landmark', city)

        # Update image
        new_image_url = f"https://images.unsplash.com/photo-{photo_id}?ixlib=rb-4.1.0&w=1920&q=80"
        new_alt = f"{landmark} in {city}, {state} - Voice AI services for local businesses"
        new_caption = f"Serving {city} businesses with cutting-edge Voice AI technology"

        data['images'][0]['url'] = new_image_url
        data['images'][0]['alt'] = new_alt
        data['images'][0]['caption'] = new_caption
        data['images'][0]['credit']['photographer'] = photographer
        data['images'][0]['credit']['unsplash_url'] = f"https://unsplash.com/@{photographer_username}"

        # Write back
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"✅ Updated {location_slug}")
        return True

    except Exception as e:
        print(f"❌ Error updating {location_slug}: {e}")
        return False


def batch_update_from_csv(csv_file: str):
    """Update multiple locations from a CSV file"""
    # CSV format: location_slug,photo_id,photographer,photographer_username
    import csv

    success_count = 0
    fail_count = 0

    with open(csv_file, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            result = update_location_json(
                row['location_slug'],
                row['photo_id'],
                row['photographer'],
                row['photographer_username']
            )
            if result:
                success_count += 1
            else:
                fail_count += 1

    print(f"\n✅ Successfully updated: {success_count}")
    print(f"❌ Failed: {fail_count}")


if __name__ == "__main__":
    import sys

    if len(sys.argv) == 1:
        # No arguments - generate URLs
        generate_unsplash_urls()
        print("\n" + "=" * 80)
        print("NEXT STEPS:")
        print("1. Visit each Unsplash URL above")
        print("2. Select best local landmark image")
        print("3. Extract photo ID from URL (after /photo-)")
        print("4. Note photographer name and username")
        print("5. Create CSV: location_slug,photo_id,photographer,photographer_username")
        print("6. Run: python update_local_images.py update images.csv")
        print("=" * 80)

    elif len(sys.argv) == 3 and sys.argv[1] == "update":
        # Update from CSV
        csv_file = sys.argv[2]
        batch_update_from_csv(csv_file)

    elif len(sys.argv) == 5:
        # Single update
        location_slug = sys.argv[1]
        photo_id = sys.argv[2]
        photographer = sys.argv[3]
        photographer_username = sys.argv[4]
        update_location_json(location_slug, photo_id, photographer, photographer_username)

    else:
        print("Usage:")
        print("  python update_local_images.py                    # Generate Unsplash URLs")
        print("  python update_local_images.py update CSV_FILE    # Batch update from CSV")
        print("  python update_local_images.py SLUG ID PHOTO USER # Single update")
