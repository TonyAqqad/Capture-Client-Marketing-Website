# LOCAL LANDMARK IMAGERY - COMPLETE ACTION PLAN

## EXECUTIVE SUMMARY

**Problem**: All 81 location pages use the same 6-8 generic Unsplash stock photos with ZERO local visual identity.

**Solution**: Replace every hero image with location-specific landmark photography to create instant visual recognition and local authenticity.

**Expected Impact**:
- Improved local SEO signals through image context
- Higher user engagement (visitors instantly recognize "this is MY city")
- Increased trust and credibility
- Better click-through rates from visual differentiation
- Enhanced brand perception as truly local

## DELIVERABLES CREATED

### 1. LOCAL_IMAGERY_UPDATES_PLAN.md
Comprehensive strategy document with:
- State-by-state breakdown of all 81 locations
- Recommended Unsplash search queries for each city
- Landmark identification for visual targeting
- Priority tier system (Tier 1: 20 major cities, Tier 2: 25 regional hubs, Tier 3: 36 smaller markets)

### 2. update_local_images.py
Automation script that:
- Generates Unsplash search URLs for all 81 locations
- Provides batch update functionality via CSV
- Handles single location updates
- Automatically formats JSON with proper image URLs, alt text, and attribution

### 3. LOCAL_IMAGES_TO_UPDATE.csv
Working CSV template with:
- All 81 locations listed
- Landmark descriptions for each
- Space to fill in photo IDs, photographers, usernames
- Organized by priority tiers

## IMPLEMENTATION WORKFLOW

### Step 1: Generate Unsplash Search URLs
```bash
cd /c/Users/eaqqa/capture-client-website-seo
python update_local_images.py
```

This outputs clickable Unsplash search URLs for all 81 locations.

### Step 2: Manual Image Selection Process

For EACH location (recommend starting with Tier 1 - major cities):

1. **Visit the Unsplash search URL** from script output
2. **Evaluate images** looking for:
   - ✅ Recognizable local landmark (skyline, bridge, historic building)
   - ✅ High quality (sharp, good composition, professional)
   - ✅ Daytime or golden hour (avoid night unless iconic neon)
   - ✅ Clear visual identity of the city
   - ✅ FREE (not Unsplash+ premium)
   - ❌ Avoid generic business photos
   - ❌ Avoid indoor shots
   - ❌ Avoid people-focused images

3. **Click selected image** to open detail page

4. **Extract data**:
   - Photo ID: From URL `https://unsplash.com/photos/[PHOTO-ID]`
   - Photographer name: Displayed on page
   - Username: From URL `https://unsplash.com/@[USERNAME]`

5. **Update CSV**: Add to LOCAL_IMAGES_TO_UPDATE.csv

### Step 3: Batch Update JSON Files

Once you have 10-20 locations researched in the CSV:

```bash
python update_local_images.py update LOCAL_IMAGES_TO_UPDATE.csv
```

This will:
- Read your CSV
- Update each location's JSON file
- Replace hero image URL
- Update alt text with landmark name
- Update caption with city name
- Update photographer attribution

### Step 4: Verify Updates

Check a sample updated file:
```bash
cat capture-client-site/src/data/locations/voice-ai-chattanooga-tn.json
```

Verify:
- ✅ New image URL with local landmark photo ID
- ✅ Alt text mentions specific landmark and city
- ✅ Caption references city name
- ✅ Photographer attribution correct

### Step 5: Visual QA on Site

1. Start dev server:
   ```bash
   cd capture-client-site
   npm run dev
   ```

2. Visit updated location pages:
   - http://localhost:3000/locations/chattanooga-tn
   - http://localhost:3000/locations/nashville-tn
   - etc.

3. Confirm:
   - Images load properly
   - Landmarks are recognizable
   - Page looks professional
   - Alt text displays correctly

## PRIORITY EXECUTION ORDER

### Phase 1: Tier 1 Cities (20 locations) - DO FIRST
**High-impact markets with strong visual identity**

Tennessee (4):
- chattanooga-tn → Walnut Street Bridge
- knoxville-tn → Sunsphere
- memphis-tn → Beale Street
- nashville-tn → Broadway/Skyline

Georgia (2):
- atlanta-ga → Atlanta skyline
- savannah-ga → Forsyth Park

North Carolina (4):
- charlotte-nc → Uptown skyline
- raleigh-nc → State Capitol
- durham-nc → Duke Chapel
- asheville-nc → Downtown/Mountains

Virginia (3):
- alexandria-va → Old Town
- richmond-va → James River skyline
- arlington-va → Rosslyn

Kentucky (2):
- louisville-ky → Ohio River skyline
- lexington-ky → Horse farms

Ohio (3):
- columbus-oh → Scioto Mile
- cleveland-oh → Terminal Tower
- cincinnati-oh → Roebling Bridge

Florida (3):
- miami-fl → Biscayne Bay skyline
- orlando-fl → Lake Eola
- tampa-fl → Riverwalk

Texas (4):
- houston-tx → Skyline
- dallas-tx → Reunion Tower
- austin-tx → Lady Bird Lake
- san-antonio-tx → River Walk

**Estimated time**: 2-3 hours for research + updates

### Phase 2: Tier 2 Regional Hubs (25 locations)
**Strong regional markets with good landmark options**

Includes: Athens GA, Wilmington NC, Chapel Hill, Norfolk VA, Virginia Beach, Bowling Green KY, Toledo OH, Jacksonville FL, Fort Worth TX, Plano TX, etc.

**Estimated time**: 3-4 hours

### Phase 3: Tier 3 Smaller Markets (36 locations)
**Remaining locations - may need creative landmark searches**

For smaller cities without iconic landmarks, search for:
- Downtown main street
- City hall or courthouse
- University campus (if applicable)
- Natural features (rivers, mountains)
- Regional context photos

**Estimated time**: 4-6 hours

## SAMPLE UNSPLASH SEARCHES

### Tennessee Cities

**Chattanooga**
- Primary: https://unsplash.com/s/photos/Walnut+Street+Bridge+Chattanooga+Tennessee
- Alt: https://unsplash.com/s/photos/Chattanooga+Tennessee+skyline
- Alt: https://unsplash.com/s/photos/Lookout+Mountain+Chattanooga

**Knoxville**
- Primary: https://unsplash.com/s/photos/Sunsphere+Knoxville+Tennessee
- Alt: https://unsplash.com/s/photos/Knoxville+Tennessee+downtown
- Alt: https://unsplash.com/s/photos/Market+Square+Knoxville

**Memphis**
- Primary: https://unsplash.com/s/photos/Beale+Street+Memphis+Tennessee
- Alt: https://unsplash.com/s/photos/Memphis+Tennessee+skyline
- Alt: https://unsplash.com/s/photos/Memphis+Bridge

**Nashville**
- Primary: https://unsplash.com/s/photos/Broadway+Nashville+Tennessee
- Alt: https://unsplash.com/s/photos/Nashville+skyline
- Alt: https://unsplash.com/s/photos/AT&T+Building+Nashville

### Georgia Cities

**Atlanta**
- Primary: https://unsplash.com/s/photos/Atlanta+Georgia+skyline+Midtown
- Alt: https://unsplash.com/s/photos/Peachtree+Street+Atlanta

**Savannah**
- Primary: https://unsplash.com/s/photos/Forsyth+Park+Savannah+Georgia
- Alt: https://unsplash.com/s/photos/River+Street+Savannah

### North Carolina Cities

**Charlotte**
- Primary: https://unsplash.com/s/photos/Charlotte+North+Carolina+uptown+skyline
- Alt: https://unsplash.com/s/photos/Bank+of+America+tower+Charlotte

**Asheville**
- Primary: https://unsplash.com/s/photos/Asheville+North+Carolina+Blue+Ridge+Mountains
- Alt: https://unsplash.com/s/photos/Downtown+Asheville

### Virginia Cities

**Alexandria**
- Primary: https://unsplash.com/s/photos/Old+Town+Alexandria+Virginia+King+Street
- Alt: https://unsplash.com/s/photos/Alexandria+Virginia+historic

**Richmond**
- Primary: https://unsplash.com/s/photos/Richmond+Virginia+skyline+James+River

### And so on for all states...

## JSON UPDATE EXAMPLE

### BEFORE (Generic stock photo):
```json
{
  "images": [
    {
      "url": "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?ixlib=rb-4.1.0&w=1920&q=80",
      "alt": "Advanced AI technology network for Chattanooga businesses",
      "caption": "Gig City Businesses Deserve Gig City Technology - Voice AI for Chattanooga",
      "credit": {
        "photographer": "Growtika",
        "unsplash_url": "https://unsplash.com/@growtika"
      }
    }
  ]
}
```

### AFTER (Local landmark):
```json
{
  "images": [
    {
      "url": "https://images.unsplash.com/photo-1234567890abc?ixlib=rb-4.1.0&w=1920&q=80",
      "alt": "Walnut Street Bridge in Chattanooga, Tennessee - Voice AI services for local businesses",
      "caption": "Serving Chattanooga businesses with cutting-edge Voice AI technology",
      "credit": {
        "photographer": "John Smith",
        "unsplash_url": "https://unsplash.com/@johnsmith"
      }
    }
  ]
}
```

## QUALITY ASSURANCE CHECKLIST

For each updated location, verify:

- [ ] Image shows recognizable local landmark
- [ ] Image is high quality (1920px+ width)
- [ ] Image is FREE on Unsplash (not Premium/Plus)
- [ ] Alt text includes landmark name + city + state
- [ ] Caption includes city name
- [ ] Photographer attribution is correct
- [ ] JSON syntax is valid
- [ ] Image loads on dev server
- [ ] Image looks professional on page

## TRACKING PROGRESS

Create a simple tracking spreadsheet or use the CSV comments:

```
✅ Completed: 0/81
🔄 In Progress: 0/81
⏳ Not Started: 81/81

Tier 1 (Major Cities): 0/20
Tier 2 (Regional Hubs): 0/25
Tier 3 (Smaller Markets): 0/36
```

## ALTERNATIVE APPROACH: Automated API Search

If you have a valid Jina AI API key, you could automate the Unsplash search:

```python
import requests

def search_unsplash_via_jina(query, jina_api_key):
    url = f"https://s.jina.ai/?q={query}+unsplash"
    headers = {"Authorization": f"Bearer {jina_api_key}"}
    response = requests.get(url, headers=headers)
    # Parse results and extract top image
    return photo_id, photographer, username
```

However, manual curation is RECOMMENDED because:
- You can ensure landmark recognition quality
- You can avoid Unsplash+ premium images
- You can select the best composition
- You can verify the image truly represents the city

## FINAL DEPLOYMENT

Once all 81 locations are updated:

1. **Test locally** - Visit 10-15 random location pages
2. **Commit changes**:
   ```bash
   git add capture-client-site/src/data/locations/*.json
   git commit -m "Replace generic stock photos with local landmark imagery for all 81 locations

   - Chattanooga: Walnut Street Bridge
   - Nashville: Broadway/Skyline
   - Memphis: Beale Street
   - [etc for all major cities]

   Improves local SEO signals and user trust through authentic local visual identity."
   ```
3. **Push to production**
4. **Monitor** - Check Google Search Console for improved engagement metrics

## SUCCESS METRICS

After deployment, monitor:

- **User Engagement**: Time on page, bounce rate improvements
- **Click-Through Rate**: Higher CTR from search results
- **Local SEO**: Improved rankings for "[service] [city]" queries
- **Image Search**: Appearances in Google Images for city landmarks
- **User Feedback**: Comments about local authenticity

## ESTIMATED TOTAL TIME

- Tier 1 research: 2-3 hours
- Tier 1 updates: 30 minutes
- Tier 2 research: 3-4 hours
- Tier 2 updates: 45 minutes
- Tier 3 research: 4-6 hours
- Tier 3 updates: 1 hour
- QA and testing: 1-2 hours

**TOTAL: 12-17 hours** for complete local imagery overhaul

## QUICK START GUIDE

**Want to start immediately? Follow these 5 steps:**

1. **Generate URLs**:
   ```bash
   cd /c/Users/eaqqa/capture-client-website-seo
   python update_local_images.py > search_urls.txt
   ```

2. **Start with Chattanooga** (example):
   - Visit: https://unsplash.com/s/photos/Walnut+Street+Bridge+Chattanooga
   - Select best image
   - Extract photo ID from URL
   - Note photographer info

3. **Test single update**:
   ```bash
   python update_local_images.py chattanooga-tn PHOTO_ID "Photographer Name" username
   ```

4. **Verify change**:
   ```bash
   cat capture-client-site/src/data/locations/voice-ai-chattanooga-tn.json | grep -A 3 "images"
   ```

5. **View on site**:
   ```bash
   cd capture-client-site && npm run dev
   # Visit http://localhost:3000/locations/chattanooga-tn
   ```

6. **Scale to all cities** using CSV batch method

---

## NEED HELP?

**Script usage**:
```bash
# Generate all Unsplash URLs
python update_local_images.py

# Update single location
python update_local_images.py [location-slug] [photo-id] [photographer] [username]

# Batch update from CSV
python update_local_images.py update LOCAL_IMAGES_TO_UPDATE.csv
```

**Questions?**
- Check LOCAL_IMAGERY_UPDATES_PLAN.md for detailed landmark suggestions
- Review LOCAL_IMAGES_TO_UPDATE.csv for CSV format
- Test with 2-3 cities before doing full batch

---

**Remember**: The goal is INSTANT LOCAL RECOGNITION. When someone from Chattanooga visits the Chattanooga page, they should immediately see the Walnut Street Bridge and think "Yes, this is MY city!"
