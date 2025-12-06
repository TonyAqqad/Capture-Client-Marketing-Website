# LOCAL LANDMARK IMAGERY PROJECT - MASTER INDEX

## PROJECT OVERVIEW

Transform 81 generic location pages with unique local landmark photography.

**Current state**: All pages share 6-8 generic stock photos
**Target state**: Every page has unique recognizable local landmark
**Time required**: 12-17 hours total
**Impact**: High (SEO, trust, engagement, conversions)

---

## FILES CREATED: 8 Total

### Documentation (7 files, 2,302 lines, 67KB)

| File | Size | Purpose | Read When |
|------|------|---------|-----------|
| **LOCAL_IMAGERY_EXECUTIVE_SUMMARY.md** | 16K | Project overview & navigation | Starting the project |
| **LOCAL_IMAGERY_ACTION_PLAN.md** | 13K | Step-by-step implementation | Ready to execute |
| **UNSPLASH_SEARCH_TIPS.md** | 14K | Expert search strategies | Searching for images |
| **LOCAL_IMAGERY_UPDATES_PLAN.md** | 7.6K | Search query reference | Looking up specific cities |
| **QUICK_START_CHEATSHEET.md** | 4K | 1-page quick reference | Keep open while working |
| **LOCAL_IMAGERY_COMPLETE_DELIVERY.md** | 5.8K | Delivery summary | Understanding deliverables |
| **LOCAL_IMAGES_TO_UPDATE.csv** | 6.6K | Working tracking template | Recording research |

### Automation (1 file)

| File | Size | Purpose |
|------|------|---------|
| **update_local_images.py** | 19K | Generate URLs & batch update JSONs |

---

## READING ORDER

1. **START HERE**: LOCAL_IMAGERY_EXECUTIVE_SUMMARY.md (10 min read)
   - Understand the problem, solution, and scope
   - See the 5-step quick start process
   - Learn about the 3 priority tiers

2. **SEARCH HELP**: UNSPLASH_SEARCH_TIPS.md (15 min read)
   - Master search strategies
   - Learn what makes a good landmark image
   - Get state-specific tips

3. **EXECUTE**: LOCAL_IMAGERY_ACTION_PLAN.md (reference during work)
   - Follow the detailed workflow
   - Use QA checklist
   - Deploy properly

4. **QUICK REF**: QUICK_START_CHEATSHEET.md (keep open)
   - Commands at your fingertips
   - Top 20 cities table
   - Troubleshooting guide

---

## QUICK START: 4 STEPS

### 1. Generate Unsplash URLs
```bash
cd /c/Users/eaqqa/capture-client-website-seo
python update_local_images.py
```

### 2. Research & Fill CSV
- Visit Unsplash URLs
- Find best landmark images
- Extract photo IDs, photographer info
- Add to LOCAL_IMAGES_TO_UPDATE.csv

### 3. Batch Update
```bash
python update_local_images.py update LOCAL_IMAGES_TO_UPDATE.csv
```

### 4. Test & Deploy
```bash
cd capture-client-site && npm run dev
# Visit location pages, verify images
# Git commit and push
```

---

## PRIORITY TIERS

### Tier 1 - Major Cities (20 locations) - START HERE
**Impact**: Highest traffic pages
**Landmarks**: Strong recognition (Walnut Street Bridge, Sunsphere, Broadway, etc.)
**Time**: 2-3 hours research + 30 min update

Cities: Chattanooga, Nashville, Memphis, Knoxville, Atlanta, Savannah, Charlotte, Raleigh, Durham, Asheville, Alexandria, Richmond, Arlington VA, Louisville, Lexington, Columbus OH, Cleveland, Cincinnati, Miami, Orlando, Tampa, Houston, Dallas, Austin, San Antonio

### Tier 2 - Regional Hubs (25 locations)
**Impact**: Strong regional identity
**Landmarks**: Good availability
**Time**: 3-4 hours research + 45 min update

### Tier 3 - Smaller Markets (36 locations)
**Impact**: Complete coverage
**Landmarks**: May need creative searches
**Time**: 4-6 hours research + 1 hour update

---

## 81 LOCATIONS BY STATE

| State | Count | Major Cities |
|-------|-------|--------------|
| Tennessee | 16 | Chattanooga, Nashville, Memphis, Knoxville |
| North Carolina | 12 | Charlotte, Raleigh, Durham, Chapel Hill, Asheville |
| Florida | 10 | Miami, Orlando, Tampa, Jacksonville |
| Virginia | 10 | Alexandria, Richmond, Arlington, Virginia Beach, Norfolk |
| Georgia | 9 | Atlanta, Savannah, Athens, Augusta |
| Texas | 8 | Houston, Dallas, Austin, San Antonio, Fort Worth, El Paso |
| Ohio | 7 | Columbus, Cleveland, Cincinnati, Toledo |
| Kentucky | 5 | Louisville, Lexington, Bowling Green, Covington |
| Other | 4 | Arlington TX, Akron OH, etc. |
| **TOTAL** | **81** | |

---

## COMMANDS REFERENCE

```bash
# Generate all Unsplash search URLs
python update_local_images.py

# Test single location update
python update_local_images.py chattanooga-tn ABC123 "John Smith" johnsmith

# Batch update from CSV
python update_local_images.py update LOCAL_IMAGES_TO_UPDATE.csv

# View updated JSON
cat capture-client-site/src/data/locations/voice-ai-chattanooga-tn.json

# Test on dev server
cd capture-client-site && npm run dev
```

---

## KEY LANDMARKS BY STATE

### Tennessee
- Chattanooga: Walnut Street Bridge, Lookout Mountain
- Nashville: Broadway neon, Batman Building
- Memphis: Beale Street, Memphis Bridge
- Knoxville: Sunsphere, Market Square

### Georgia
- Atlanta: Downtown skyline, Midtown
- Savannah: Forsyth Park fountain, River Street
- Athens: UGA Arch, Sanford Stadium

### North Carolina
- Charlotte: Uptown skyline, Bank of America tower
- Chapel Hill: Old Well UNC
- Durham: Duke Chapel
- Asheville: Blue Ridge Mountains, downtown

### Virginia
- Alexandria: Old Town King Street, historic waterfront
- Richmond: James River skyline, State Capitol
- Virginia Beach: Oceanfront boardwalk

### Kentucky
- Louisville: Ohio River skyline, Churchill Downs
- Lexington: Horse farms, bluegrass
- Covington: Roebling Bridge

### Ohio
- Cincinnati: Roebling Bridge skyline
- Cleveland: Terminal Tower, Lake Erie
- Columbus: Scioto Mile

### Florida
- Miami: Biscayne Bay skyline
- Orlando: Lake Eola fountain
- Tampa: Tampa Riverwalk

### Texas
- Austin: Lady Bird Lake skyline
- San Antonio: River Walk, Alamo
- Dallas: Reunion Tower skyline

---

## PROJECT WORKFLOW DIAGRAM

```
1. Generate URLs          → Run Python script
   ↓
2. Search Unsplash        → Find landmark images for each city
   ↓
3. Extract Data           → Photo ID, photographer, username
   ↓
4. Fill CSV               → Record in LOCAL_IMAGES_TO_UPDATE.csv
   ↓
5. Batch Update           → Run Python script with CSV
   ↓
6. Test Locally           → npm run dev, check pages
   ↓
7. Git Commit             → Commit all 81 updated JSONs
   ↓
8. Deploy                 → Push to production
   ↓
9. Monitor Metrics        → Track engagement, SEO, conversions
```

---

## SUCCESS CRITERIA

Project is complete when:

- [ ] All 81 location JSON files updated
- [ ] Every image shows unique local landmark
- [ ] All images are high quality (1920px+)
- [ ] All images are FREE Unsplash
- [ ] All alt text includes landmark + city + state
- [ ] All photographer attributions correct
- [ ] All JSON files syntactically valid
- [ ] All images load on dev server
- [ ] 10-15 random pages visually QA'd
- [ ] Deployed to production
- [ ] Monitoring metrics

---

## EXPECTED RESULTS

### User Experience
- Instant local recognition
- Higher trust and credibility
- Better emotional connection
- Professional local brand

### SEO
- Improved local search relevance
- Better engagement metrics
- Google Images appearances
- Stronger local signals

### Conversions
- Higher form submissions (+10-20%)
- Better click-to-call rates
- Lower bounce rates (-10-20%)
- More time on page (+15-25%)

---

## TIME ESTIMATES

| Phase | Time |
|-------|------|
| Tier 1 research | 2-3 hours |
| Tier 1 update | 30 min |
| Tier 2 research | 3-4 hours |
| Tier 2 update | 45 min |
| Tier 3 research | 4-6 hours |
| Tier 3 update | 1 hour |
| QA & testing | 1-2 hours |
| **TOTAL** | **12-17 hours** |

---

## TROUBLESHOOTING

**No good images for small city?**
→ Try regional search, nearby major city, or state landmarks

**All results are Premium?**
→ Scroll deeper, try alternate landmarks, broaden search

**Script error?**
→ Check CSV format, verify location slug, test single first

**Images don't load?**
→ Verify URLs, check JSON syntax, clear browser cache

---

## FILE LOCATIONS

```
/c/Users/eaqqa/capture-client-website-seo/
├── README_LOCAL_IMAGERY_PROJECT.md          ← YOU ARE HERE
├── LOCAL_IMAGERY_EXECUTIVE_SUMMARY.md       ← Read first
├── LOCAL_IMAGERY_ACTION_PLAN.md             ← Implementation guide
├── UNSPLASH_SEARCH_TIPS.md                  ← Search strategies
├── QUICK_START_CHEATSHEET.md                ← Keep open
├── LOCAL_IMAGERY_UPDATES_PLAN.md            ← Query reference
├── LOCAL_IMAGERY_COMPLETE_DELIVERY.md       ← Delivery summary
├── LOCAL_IMAGES_TO_UPDATE.csv               ← Working CSV
└── update_local_images.py                   ← Automation script

Target files (81):
capture-client-site/src/data/locations/voice-ai-*.json
```

---

## NEXT STEPS

1. Read LOCAL_IMAGERY_EXECUTIVE_SUMMARY.md (10 minutes)
2. Review UNSPLASH_SEARCH_TIPS.md (15 minutes)
3. Run `python update_local_images.py` to generate URLs
4. Start with Tier 1 cities (2-3 hours)
5. Batch update and deploy

---

## PROJECT STATS

- **Documentation**: 2,302 lines, 67KB total
- **Locations**: 81 cities across 8 states
- **Priority Tier 1**: 20 major cities
- **Priority Tier 2**: 25 regional hubs
- **Priority Tier 3**: 36 smaller markets
- **Total time**: 12-17 hours
- **Expected impact**: High (SEO, trust, conversions)

---

## SUPPORT

Questions? Reference these files:

- **Overview**: LOCAL_IMAGERY_EXECUTIVE_SUMMARY.md
- **How-to**: LOCAL_IMAGERY_ACTION_PLAN.md
- **Search help**: UNSPLASH_SEARCH_TIPS.md
- **Quick ref**: QUICK_START_CHEATSHEET.md
- **City queries**: LOCAL_IMAGERY_UPDATES_PLAN.md

---

**Ready to transform 81 location pages with authentic local landmark imagery?**

**Start here**: LOCAL_IMAGERY_EXECUTIVE_SUMMARY.md

Every city deserves its own visual identity. Let's make it happen!
