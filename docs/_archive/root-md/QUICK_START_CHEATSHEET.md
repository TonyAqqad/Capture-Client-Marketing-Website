# LOCAL IMAGERY REPLACEMENT - QUICK START CHEATSHEET

## THE PROBLEM IN 10 SECONDS
81 location pages all use the SAME generic stock photos. Need unique local landmark images for each city.

## THE SOLUTION IN 10 SECONDS
Search Unsplash for each city's iconic landmarks, extract photo IDs, batch update all JSON files.

---

## 3 COMMANDS YOU NEED

```bash
# 1. Generate Unsplash search URLs
python update_local_images.py

# 2. Test single location update
python update_local_images.py chattanooga-tn PHOTO_ID "Photographer" username

# 3. Batch update all researched locations
python update_local_images.py update LOCAL_IMAGES_TO_UPDATE.csv
```

---

## WORKFLOW: 5 STEPS

### 1. GENERATE URLS
```bash
cd /c/Users/eaqqa/capture-client-website-seo
python update_local_images.py > urls.txt
```

### 2. SEARCH UNSPLASH
Visit URLs → Find landmark image → Click it → Extract:
- Photo ID: from `/photos/[THIS-PART]`
- Photographer: name shown on page
- Username: from `/@username`

### 3. FILL CSV
Add to `LOCAL_IMAGES_TO_UPDATE.csv`:
```
chattanooga-tn,ABC123DEF,John Smith,johnsmith,Walnut Street Bridge
```

### 4. BATCH UPDATE
```bash
python update_local_images.py update LOCAL_IMAGES_TO_UPDATE.csv
```

### 5. TEST
```bash
cd capture-client-site && npm run dev
# Visit http://localhost:3000/locations/chattanooga-tn
```

---

## PRIORITY: DO THESE 20 CITIES FIRST

| State | City | Search For |
|-------|------|------------|
| **TN** | Chattanooga | Walnut Street Bridge |
| **TN** | Nashville | Broadway neon lights |
| **TN** | Memphis | Beale Street |
| **TN** | Knoxville | Sunsphere |
| **GA** | Atlanta | Skyline |
| **GA** | Savannah | Forsyth Park |
| **NC** | Charlotte | Uptown skyline |
| **NC** | Asheville | Blue Ridge Mountains |
| **NC** | Chapel Hill | Old Well UNC |
| **NC** | Durham | Duke Chapel |
| **VA** | Alexandria | Old Town King Street |
| **VA** | Richmond | James River skyline |
| **VA** | Arlington | Rosslyn skyline |
| **KY** | Louisville | Ohio River skyline |
| **KY** | Lexington | Horse farms |
| **OH** | Cincinnati | Roebling Bridge |
| **OH** | Cleveland | Terminal Tower |
| **OH** | Columbus | Scioto Mile |
| **FL** | Miami | Biscayne Bay skyline |
| **FL** | Orlando | Lake Eola |
| **FL** | Tampa | Riverwalk |
| **TX** | Austin | Lady Bird Lake |
| **TX** | Dallas | Reunion Tower |
| **TX** | Houston | Skyline |
| **TX** | San Antonio | River Walk |

---

## SEARCH TIPS

**✅ GOOD SEARCHES:**
- "[Specific Landmark] [City]" → "Sunsphere Knoxville"
- "[City] [State] skyline" → "Charlotte North Carolina skyline"
- "[Historic Area] [City]" → "Old Town Alexandria"
- "[Natural Feature] [City]" → "Blue Ridge Mountains Asheville"

**❌ AVOID:**
- Generic: "business people", "office", "technology"
- Abstract: "network", "circuit board", "bokeh"
- Poor quality: blurry, dark, low-res
- Premium: Images with "Plus" or "Premium" badge

---

## IMAGE QUALITY CHECKLIST

Before adding to CSV, verify:
- [ ] Shows recognizable local landmark
- [ ] High quality (1920px+ width)
- [ ] FREE (not Unsplash+ Premium)
- [ ] Professional composition
- [ ] Would a local immediately recognize it?

---

## CSV FORMAT

```
location_slug,photo_id,photographer,photographer_username,notes
chattanooga-tn,ABC123DEF456,John Smith,johnsmith,Walnut Street Bridge
nashville-tn,XYZ789GHI,Jane Doe,janedoe,Broadway neon
```

**Required columns**: location_slug, photo_id, photographer, photographer_username
**Notes column**: optional, for your reference

---

## UNSPLASH PHOTO ID EXTRACTION

**URL format**: `https://unsplash.com/photos/[PHOTO-ID]`

**Examples**:
- `https://unsplash.com/photos/ABC123DEF456` → Photo ID is `ABC123DEF456`
- `https://unsplash.com/photos/Xy9z-PqR_sTu` → Photo ID is `Xy9z-PqR_sTu`

**Photographer username**:
- URL: `https://unsplash.com/@johnsmith` → Username is `johnsmith`

---

## TROUBLESHOOTING

**"No good results for [city]"**
→ Try: "[City] downtown", regional search, or nearby major city

**"All images are Premium"**
→ Scroll deeper, try different landmark, or broaden search

**"Script says file not found"**
→ Check location slug format: `city-state` (e.g., `chattanooga-tn`)

**"JSON breaks after update"**
→ Check CSV format (no extra commas, proper quoting)

---

## TIME ESTIMATES

- **Tier 1 (20 cities)**: 2-3 hours research + 30 min update
- **Tier 2 (25 cities)**: 3-4 hours research + 45 min update
- **Tier 3 (36 cities)**: 4-6 hours research + 1 hour update
- **Total**: 12-17 hours for all 81 locations

---

## FILE LOCATIONS

```
/c/Users/eaqqa/capture-client-website-seo/
├── update_local_images.py              ← The script
├── LOCAL_IMAGES_TO_UPDATE.csv          ← Your working CSV
├── LOCAL_IMAGERY_EXECUTIVE_SUMMARY.md  ← Full overview
├── LOCAL_IMAGERY_ACTION_PLAN.md        ← Detailed steps
├── UNSPLASH_SEARCH_TIPS.md             ← Search strategies
└── capture-client-site/src/data/locations/
    └── voice-ai-*.json                 ← 81 files to update
```

---

## SUCCESS CRITERIA

You're done when:
- ✅ All 81 JSON files updated
- ✅ Every image is a unique local landmark
- ✅ All images load on dev server
- ✅ Random sample check looks professional
- ✅ Alt text includes landmark + city + state

---

## SAMPLE BEFORE/AFTER

**BEFORE** (Generic):
```json
{
  "url": "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?...",
  "alt": "Advanced AI technology network for Chattanooga businesses",
  "caption": "Gig City Businesses Deserve Technology"
}
```

**AFTER** (Local Landmark):
```json
{
  "url": "https://images.unsplash.com/photo-ABC123DEF456?...",
  "alt": "Walnut Street Bridge in Chattanooga, Tennessee - Voice AI services",
  "caption": "Serving Chattanooga businesses with cutting-edge Voice AI"
}
```

---

## ONE-LINER SUMMARY

**Search Unsplash for local landmarks → Extract photo IDs → Fill CSV → Batch update 81 JSON files → Deploy**

---

## NEXT STEPS

1. **Read**: LOCAL_IMAGERY_EXECUTIVE_SUMMARY.md (5 min overview)
2. **Learn**: UNSPLASH_SEARCH_TIPS.md (search strategies)
3. **Do**: Follow LOCAL_IMAGERY_ACTION_PLAN.md (step-by-step)
4. **Start**: Run `python update_local_images.py` and get Tier 1 URLs

---

**READY? START WITH TIER 1 (20 cities) - 2-3 HOURS TOTAL**

Open this file for quick reference while working!
