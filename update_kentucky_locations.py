#!/usr/bin/env python3
"""
Update Kentucky location files with deeply localized content
"""

import json
import os
import sys

# Set UTF-8 encoding for stdout
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Define base directory
BASE_DIR = r"C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\data\locations"

# Local research data for each city
CITY_DATA = {
    "louisville": {
        "intro": "From the healthcare innovators on Medical Center Row to the bourbon distilleries along Whiskey Row, Louisville businesses are embracing AI-powered growth. Whether you're serving clients in the Highlands, managing a practice in St. Matthews, or running operations from the Watterson Business District, every missed call means missed Derby City revenue. Our AI voice agents solve this 24/7 - answering professionally, qualifying leads instantly, and booking appointments directly into your calendar, even at 3 AM. Trusted by Greater Louisville Inc. members, our technology helps Louisville businesses capture 40% more leads while saving thousands on staffing costs. From the East End professional corridors to the Oxmoor Corporate Center, smart Louisville businesses never miss an opportunity.",
        "meta_description": "Louisville businesses from Medical Center Row to the Highlands: Never miss a call with AI voice agents. Trusted by Greater Louisville Inc. members. Call 865-346-3339!",
        "medical_mention": "Louisville healthcare practices on Medical Center Row and beyond reduce no-shows, handle patient questions, and fill last-minute cancellations with AI appointment scheduling.",
        "real_estate_mention": "Louisville realtors in the Highlands, St. Matthews, and East End never miss a buyer or seller inquiry. AI qualifies leads, schedules showings, and sends property information instantly.",
        "faq_area_mention": "We work with service businesses across Louisville and surrounding areas like Jeffersontown, St. Matthews, and the Highlands. Our clients include contractors, medical practices, dental offices, law firms, real estate agents, home service providers, and any business that gets phone leads. Greater Louisville Inc. members trust our technology. If you get calls, we can help you capture more leads.",
        "faq_specific_mention": "Absolutely! We train your AI on your specific services, service areas (whether you serve all of Jefferson County, the Watterson corridor, or specific Louisville neighborhoods), pricing, and availability. It can answer questions about your Louisville business as well as any trained employee. Plus, it never has a bad day or forgets important details."
    },
    "lexington": {
        "intro": "In the heart of the Bluegrass, where horse farms meet high-tech innovation, Lexington businesses are discovering smarter ways to capture leads. From the professional offices along Nicholasville Road to the emerging CentrePointe district downtown, from the Hamburg Pavilion corridor to the Beaumont Centre medical offices - every missed call costs Horse Capital revenue. Our AI voice technology ensures you never lose another lead to voicemail. Whether you're an equine veterinary practice, a contractor serving Fayette County, or a professional service firm near the Lexington Financial Center, our AI agents answer every call professionally, qualify leads instantly, and book appointments automatically. Trusted by Commerce Lexington Inc. members, Central Kentucky businesses report 50% more captured leads and dramatic staffing cost reductions. From Chevy Chase to Lansdowne, smart Lexington businesses never miss an opportunity.",
        "meta_description": "In the heart of the Bluegrass, from Nicholasville Road to CentrePointe, Lexington businesses never miss a lead. Trusted by Commerce Lexington members. Call 865-346-3339!",
        "medical_mention": "Lexington healthcare providers in the Richmond Road medical corridor reduce administrative burden, handle patient inquiries, and fill appointment slots more efficiently.",
        "real_estate_mention": "Lexington realtors respond instantly to buyer inquiries, schedule showings, and never miss a hot lead in this competitive market.",
        "faq_area_mention": "We serve service-based businesses across Lexington including home services (HVAC, plumbing, electrical), medical and dental practices, legal services, real estate, equine services, contractors, and any business that relies on phone leads. If you're in Lexington or serve Fayette County and get phone inquiries, Voice AI can help you capture more leads. Commerce Lexington members trust our technology.",
        "faq_specific_mention": "Yes! We train your AI on your specific service offerings, the Lexington areas you serve (downtown, Hamburg, Beaumont, Chevy Chase, or all of Fayette County), local nuances, and your business processes. It can even discuss Lexington-specific topics like Derby prep, horse farm services, or UK game day scheduling adjustments."
    },
    "bowling-green": {
        "intro": "From the Scottsville Road corridor to the businesses near the Corvette Assembly Plant, Bowling Green companies are discovering AI-powered lead capture. Whether you're serving WKU students downtown, Warren County residents, or the growing Three Springs business district, every missed call means lost revenue in Kentucky's third-largest city. Our AI voice agents are specifically designed for busy Bowling Green service businesses - answering 24/7, qualifying leads instantly, and booking appointments automatically. From automotive services supporting the Corvette plant to medical practices on Campbell Lane, local businesses report capturing 45% more leads while reducing phone management time by 20+ hours per week. Trusted by the Bowling Green Area Chamber of Commerce members, our technology helps businesses from Fountain Square to the Kentucky Transpark never miss an opportunity.",
        "meta_description": "Bowling Green businesses from Scottsville Road to the Corvette plant: Capture every lead with 24/7 AI. Trusted by Chamber members. Call 865-346-3339!",
        "automotive_mention": "Auto repair shops and dealerships in Bowling Green capture service requests, answer parts inquiries, and schedule appointments automatically - crucial in a city home to the Corvette Assembly Plant.",
        "faq_area_mention": "We serve service-based businesses throughout Bowling Green and Warren County. Our clients include automotive services, contractors, medical practices, dental offices, law firms, real estate agents, property managers, home service providers, and professional service firms. Bowling Green Area Chamber members trust our technology. Any Bowling Green business that receives phone leads can benefit from AI voice agents.",
        "faq_specific_mention": "Absolutely. We train your AI on your specific service areas (whether you serve all of Bowling Green, Warren County, or specific neighborhoods), your pricing, availability, and any local nuances. The AI can discuss Bowling Green-specific details like WKU schedules, Corvette plant shifts, or automotive industry schedules."
    },
    "owensboro": {
        "intro": "Whether you're serving the Frederica Street commercial district or the downtown riverfront, Owensboro businesses can't afford to miss calls in Kentucky's fourth-largest city. From the Daviess County business parks to the growing Ohio River commerce sector, every missed opportunity costs revenue. Our AI voice agents are designed for Owensboro's service-driven economy - manufacturing support, healthcare, home services, and professional firms. Local businesses using our AI technology report answering 100% of incoming calls, qualifying leads more effectively, and booking 3x more appointments than before. Trusted by the Greater Owensboro Chamber of Commerce members, our system works automatically 24/7 without adding staff or increasing overhead. From the Highway 60 West corridor to Parrish Avenue medical district, smart Owensboro businesses capture every lead.",
        "meta_description": "Owensboro businesses from Frederica Street to the riverfront: Never miss a call with 24/7 AI voice agents. Trusted by Chamber members. Call 865-346-3339!",
        "manufacturing_mention": "B2B service providers supporting Owensboro's manufacturing sector capture inquiries 24/7, even when production runs late or starts early.",
        "faq_area_mention": "We work with service businesses across Owensboro and Daviess County including home services (HVAC, plumbing, electrical), healthcare practices, professional services (legal, accounting), contractors, manufacturing support services, real estate, and any business that relies on phone leads. Greater Owensboro Chamber members trust our technology. If you're an Owensboro business that gets phone inquiries, Voice AI can help.",
        "faq_specific_mention": "Yes! We train your AI on your specific Owensboro service areas (downtown, west Owensboro, specific Daviess County regions), your services, pricing, and local nuances. The AI can discuss details specific to your business and the Owensboro market, making every conversation feel personal and informed."
    },
    "covington": {
        "intro": "From Mainstrasse Village to the RiverCenter towers overlooking Cincinnati, Northern Kentucky businesses are discovering smarter lead capture. Whether you're a contractor working in historic Covington, a medical practice in Latonia, or a professional service firm serving all of Kenton County, every missed call costs opportunity in this competitive Greater Cincinnati market. Our AI voice technology ensures you capture every lead 24/7. Serving the Pike Street business district, the Madison Avenue office corridor, and businesses across the Northern Kentucky region, our AI agents answer professionally, qualify leads instantly, and book appointments automatically. Trusted by the Northern Kentucky Chamber of Commerce members, Covington businesses report 45% more leads captured with appointments booked around the clock. From Fort Thomas to Newport, smart Northern Kentucky businesses never miss an opportunity.",
        "meta_description": "Covington & Northern Kentucky businesses from Mainstrasse to RiverCenter: Capture every lead 24/7 with AI. Trusted by NKY Chamber. Call 865-346-3339!",
        "geographic_mention": "HVAC, plumbing, and electrical contractors in Covington and Kenton County capture emergency calls 24/7, book service appointments instantly, and never lose another lead to competitors.",
        "faq_area_mention": "We work with service-based businesses throughout Covington and Northern Kentucky including home services (HVAC, plumbing, electrical, roofing), medical and dental practices, law firms, real estate professionals, contractors, property managers, and any business that relies on phone inquiries to generate revenue. Northern Kentucky Chamber members trust our technology.",
        "faq_specific_mention": "Absolutely! We train your AI on all the areas you serve, whether that's just Covington, all of Kenton County, broader Northern Kentucky, or Greater Cincinnati. Your AI can discuss service areas, give location-specific pricing, and understand local geography perfectly."
    }
}

def update_location_file(city_slug, city_data):
    """Update a single location file with localized content"""
    filepath = os.path.join(BASE_DIR, f"voice-ai-{city_slug}-ky.json")

    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return False

    try:
        # Read existing file
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Update intro paragraph
        data["intro"]["paragraph"] = city_data["intro"]

        # Update meta description
        data["seo"]["meta_description"] = city_data["meta_description"]

        # Update use_cases if they exist
        if "medical_mention" in city_data:
            for use_case in data.get("use_cases", []):
                if "Medical" in use_case.get("industry", "") or "Healthcare" in use_case.get("industry", ""):
                    use_case["description"] = city_data["medical_mention"]
                elif "Real Estate" in use_case.get("industry", ""):
                    if "real_estate_mention" in city_data:
                        use_case["description"] = city_data.get("real_estate_mention")
                elif "Automotive" in use_case.get("industry", ""):
                    if "automotive_mention" in city_data:
                        use_case["description"] = city_data.get("automotive_mention")
                elif "Manufacturing" in use_case.get("industry", "") and "manufacturing_mention" in city_data:
                    use_case["description"] = city_data.get("manufacturing_mention")
                elif "Home Services" in use_case.get("industry", "") and "geographic_mention" in city_data:
                    use_case["description"] = city_data.get("geographic_mention")

        # Update FAQ answers
        for faq in data.get("faq", []):
            if "types of" in faq.get("question", "").lower() and "businesses" in faq.get("question", "").lower():
                faq["answer"] = city_data["faq_area_mention"]
            elif "specific" in faq.get("question", "").lower() or "understand" in faq.get("question", "").lower():
                faq["answer"] = city_data["faq_specific_mention"]

        # Write updated file
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[OK] Updated {city_slug}")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to update {city_slug}: {e}")
        return False

def main():
    """Update all Kentucky location files"""
    print("Updating Kentucky location files with localized content...")
    print("=" * 60)

    success_count = 0
    for city_slug, city_data in CITY_DATA.items():
        if update_location_file(city_slug, city_data):
            success_count += 1

    print("=" * 60)
    print(f"Updated {success_count}/{len(CITY_DATA)} files successfully")

    return success_count == len(CITY_DATA)

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
