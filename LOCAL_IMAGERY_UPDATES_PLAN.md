# LOCAL LANDMARK IMAGERY REPLACEMENT PLAN

## OBJECTIVE
Replace 81 generic Unsplash stock photos with location-specific landmark images to give each location page visual local identity.

## CURRENT PROBLEM
- All locations share the same 6-8 generic business/tech stock photos
- Chattanooga and Memphis use identical Growtika tech network images
- No visual differentiation between cities
- Zero local landmark recognition

## SOLUTION STRATEGY

### Phase 1: Unsplash Search Queries by State

**TENNESSEE (16 locations)**
- Chattanooga: "Walnut Street Bridge Chattanooga" or "Chattanooga Tennessee skyline"
- Knoxville: "Sunsphere Knoxville" or "Knoxville Tennessee downtown"
- Memphis: "Beale Street Memphis" or "Memphis Tennessee skyline"
- Nashville: "Broadway Nashville" or "Nashville Tennessee skyline"
- Murfreesboro: "Murfreesboro Tennessee historic square"
- Franklin: "Franklin Tennessee historic downtown"
- Clarksville: "Clarksville Tennessee Cumberland River"
- Johnson City: "Johnson City Tennessee downtown"
- Kingsport: "Kingsport Tennessee"
- Maryville: "Maryville Tennessee Smoky Mountains"
- Farragut: "Knoxville suburbs Tennessee"
- Gatlinburg: "Gatlinburg Tennessee mountains"
- Sevierville: "Sevierville Tennessee"
- Oak Ridge: "Oak Ridge Tennessee"

**GEORGIA (9 locations)**
- Atlanta: "Atlanta Georgia skyline Midtown"
- Athens: "University of Georgia Athens arch"
- Augusta: "Riverwalk Augusta Georgia"
- Alpharetta: "Alpharetta Georgia Avalon"
- Marietta: "Marietta Square Georgia"
- Roswell: "Roswell Georgia historic Canton Street"
- Sandy Springs: "Sandy Springs Georgia City Springs"
- Columbus: "Columbus Georgia Chattahoochee Riverwalk"
- Savannah: "Forsyth Park Savannah" or "River Street Savannah"

**NORTH CAROLINA (12 locations)**
- Charlotte: "Charlotte North Carolina uptown skyline"
- Raleigh: "Raleigh North Carolina state capitol"
- Durham: "Duke Chapel Durham" or "Durham North Carolina"
- Chapel Hill: "Old Well UNC Chapel Hill"
- Greensboro: "Greensboro North Carolina downtown"
- Winston-Salem: "Winston-Salem North Carolina"
- Cary: "Cary North Carolina downtown"
- Asheville: "Asheville North Carolina Blue Ridge Mountains"
- Wilmington: "Wilmington North Carolina riverwalk"
- Fayetteville: "Fayetteville North Carolina Market House"
- Concord: "Concord North Carolina"
- High Point: "High Point North Carolina"
- Greenville: "Greenville North Carolina ECU"

**VIRGINIA (10 locations)**
- Alexandria: "Old Town Alexandria King Street" or "Alexandria Virginia historic"
- Richmond: "Richmond Virginia skyline James River"
- Arlington: "Arlington Virginia Rosslyn" or "Crystal City Arlington"
- Virginia Beach: "Virginia Beach oceanfront boardwalk"
- Norfolk: "Norfolk Virginia waterfront harbor"
- Chesapeake: "Chesapeake Virginia Great Bridge"
- Newport News: "Newport News Virginia waterfront"
- Hampton: "Hampton Virginia waterfront"
- Suffolk: "Suffolk Virginia historic downtown"
- Roanoke: "Roanoke Star Virginia" or "Roanoke Virginia Blue Ridge"
- Lynchburg: "Lynchburg Virginia James River"
- Fredericksburg: "Fredericksburg Virginia historic downtown"

**KENTUCKY (5 locations)**
- Louisville: "Louisville Kentucky skyline Ohio River"
- Lexington: "Lexington Kentucky horse farm" or "Lexington downtown"
- Bowling Green: "Bowling Green Kentucky WKU"
- Covington: "Roebling Bridge Covington" or "Cincinnati skyline from Covington"
- Owensboro: "Owensboro Kentucky Ohio River"

**OHIO (7 locations)**
- Columbus: "Columbus Ohio skyline Scioto Mile"
- Cleveland: "Cleveland Ohio skyline Terminal Tower"
- Cincinnati: "Cincinnati Ohio skyline Roebling Bridge"
- Toledo: "Toledo Ohio downtown Maumee River"
- Akron: "Akron Ohio downtown canal"
- Dayton: "Dayton Ohio downtown"
- Canton: "Pro Football Hall of Fame Canton"
- Parma: "Cleveland Ohio suburbs"

**FLORIDA (10 locations)**
- Miami: "Miami Florida skyline Biscayne Bay"
- Orlando: "Lake Eola Orlando" or "Orlando Florida skyline"
- Tampa: "Tampa Riverwalk Florida" or "Tampa Bay skyline"
- Jacksonville: "Jacksonville Florida skyline St Johns River"
- St. Petersburg: "St Petersburg Florida waterfront pier"
- Fort Lauderdale: "Fort Lauderdale beach Florida"
- Cape Coral: "Cape Coral Florida canals"
- Hialeah: "Miami metro Florida"
- Coral Springs: "South Florida suburbs"
- Tallahassee: "Florida State Capitol Tallahassee"

**TEXAS (8 locations)**
- Houston: "Houston Texas skyline Buffalo Bayou"
- Dallas: "Dallas Texas skyline Reunion Tower"
- San Antonio: "River Walk San Antonio" or "Alamo San Antonio"
- Austin: "Austin Texas skyline Lady Bird Lake"
- Fort Worth: "Fort Worth Texas skyline Stockyards"
- El Paso: "El Paso Texas Franklin Mountains"
- Plano: "Plano Texas Legacy West"
- Irving: "Las Colinas Mustangs Irving Texas"
- Frisco: "Frisco Texas The Star"

### Phase 2: Manual Unsplash Search Process

For each location:
1. Go to https://unsplash.com/s/photos/[search-query]
2. Find a high-quality image showing:
   - Recognizable local landmark
   - Professional quality (good lighting, composition)
   - Ideally daytime/golden hour (not night)
   - Clear visual identity of the city
3. Select image and extract photo ID from URL
4. Format as: `https://images.unsplash.com/photo-[ID]?ixlib=rb-4.1.0&w=1920&q=80`

### Phase 3: JSON Update Pattern

Current structure in each location file:
```json
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
```

Update to:
```json
"images": [
  {
    "url": "https://images.unsplash.com/photo-[NEW-LOCAL-ID]?ixlib=rb-4.1.0&w=1920&q=80",
    "alt": "[Landmark name] in [City], [State] - Voice AI services for local businesses",
    "caption": "Serving [City] businesses with cutting-edge Voice AI technology",
    "credit": {
      "photographer": "[Photographer Name]",
      "unsplash_url": "https://unsplash.com/@[photographer-username]"
    }
  }
]
```

## PRIORITY TIERS

**Tier 1 - Major Metropolitan Areas (20 cities)**
Focus on cities with highest search volume and strongest landmark recognition:
- Atlanta, Charlotte, Houston, Dallas, Miami, Orlando, Tampa, Austin
- Nashville, Memphis, Louisville, Richmond, Raleigh
- Cincinnati, Cleveland, Columbus OH
- San Antonio, Fort Worth, Jacksonville, Savannah

**Tier 2 - Regional Hubs (25 cities)**
Strong regional identity and good landmark options:
- Knoxville, Chattanooga, Lexington, Durham, Chapel Hill
- Greensboro, Winston-Salem, Norfolk, Virginia Beach
- Alexandria, Arlington VA, Asheville, Wilmington NC
- El Paso, Plano, Irving, Frisco
- St. Petersburg, Fort Lauderdale
- Toledo, Akron, Dayton

**Tier 3 - Smaller Markets (36 cities)**
May have limited landmark imagery - consider:
- Downtown/main street views
- State/regional context (mountains, rivers, etc.)
- Business district imagery
- University landmarks where applicable

## EXPECTED OUTCOMES

- 81 location pages with unique, local landmark hero images
- Zero shared images between locations
- Instant visual recognition: "This is Chattanooga" not "generic business photo"
- Improved local SEO signals through image alt text
- Enhanced user trust through local authenticity
- Better click-through rates from visual differentiation

## NEXT STEPS

1. Start with Tier 1 cities (20)
2. Manually search each on Unsplash
3. Document photo IDs in tracking spreadsheet
4. Batch update JSON files
5. Move to Tier 2, then Tier 3
6. Final quality check on all 81 pages
