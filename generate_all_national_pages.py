import json
import os

# Create national pages directory
os.makedirs(r'C:\Users\eaqqa\capture-client-website-seo\pages\national', exist_ok=True)

# Common images
voice_ai_images = [
    {"url": "https://images.unsplash.com/photo-1689848693914-7ba25d9f3334?ixlib=rb-4.1.0&w=1200&q=80", "alt": "Professional on phone call", "caption": "24/7 AI voice technology"},
    {"url": "https://images.unsplash.com/photo-1744640326166-433469d102f2?ixlib=rb-4.1.0&w=1200&q=80", "alt": "AI technology chip", "caption": "Advanced AI for businesses"},
    {"url": "https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.1.0&w=1200&q=80", "alt": "Business owner working", "caption": "Focus on growth with AI"}
]

marketing_images = [
    {"url": "https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.1.0&w=1200&q=80", "alt": "Digital marketing on laptop", "caption": "Data-driven marketing campaigns"},
    {"url": "https://images.unsplash.com/photo-1571677246347-5040036b95cc?ixlib=rb-4.1.0&w=1200&q=80", "alt": "Marketing analytics", "caption": "Real-time performance tracking"},
    {"url": "https://images.unsplash.com/photo-1636645096936-fc8704bc8083?ixlib=rb-4.1.0&w=1200&q=80", "alt": "Marketing team collaboration", "caption": "Expert marketing strategy"}
]

business_owner_images = [
    {"url": "https://images.unsplash.com/photo-1664575600397-88e370cb46b8?ixlib=rb-4.1.0&w=1200&q=80", "alt": "Small business owner", "caption": "Grow your small business"},
    {"url": "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.1.0&w=1200&q=80", "alt": "Business professional", "caption": "Professional business solutions"},
    {"url": "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.1.0&w=1200&q=80", "alt": "Service business owner", "caption": "Service business automation"}
]

# Page templates with key data
pages_data = [
    {
        "id": "ai-voice-agents-service-businesses",
        "title": "AI Voice Agents for Service Businesses | 24/7 Lead Capture",
        "h1": "AI Voice Agents for Service Businesses",
        "keyword": "AI Voice Agents for Service Businesses",
        "meta": "AI voice agents for service businesses answer calls 24/7 qualify leads and book appointments. Perfect for HVAC plumbing electrical and home services.",
        "headline": "Your Service Business Never Sleeps. Neither Should Your Phone System.",
        "sub": "AI voice agents answer service calls 24/7 capture emergency leads and book appointments while your technicians focus on the job.",
        "intro": "Service businesses lose thousands in revenue every month from missed calls. When customers need emergency HVAC repair or plumbing services at 9 PM they call the first company that answers. AI voice agents ensure your service business answers every call captures emergency details qualifies leads and books appointments without pulling technicians off job sites. Home service businesses using AI voice agents report 60 percent increase in after-hours bookings and 45 percent reduction in missed emergency calls.",
        "industries": ["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping"],
        "images": voice_ai_images
    },
    {
        "id": "lead-generation-agency",
        "title": "Lead Generation Agency | Facebook & Google Ads Experts",
        "h1": "Lead Generation Agency for Small Businesses",
        "keyword": "Lead Generation Agency",
        "meta": "Professional lead generation agency specializing in Facebook Ads and Google Ads for small businesses. Generate qualified leads and grow revenue faster.",
        "headline": "Stop Chasing Leads. Start Attracting Qualified Customers.",
        "sub": "Full-service lead generation combining AI automation with expert Facebook and Google Ads management to fill your pipeline with ready-to-buy customers.",
        "intro": "Small business owners spend countless hours chasing unqualified leads instead of closing deals. Our lead generation agency combines cutting-edge AI voice technology with proven Facebook and Google Ads strategies to generate a consistent flow of qualified leads. We do not just drive traffic we capture leads qualify them automatically and deliver appointment-ready prospects to your sales team. Businesses working with our agency see 3x more qualified leads within 60 days and ROI averaging 400 percent.",
        "industries": ["Home Services", "Healthcare", "Professional Services", "B2B Services", "Local Businesses"],
        "images": marketing_images
    },
    {
        "id": "facebook-ads-contractors",
        "title": "Facebook Ads for Contractors | Generate Quality Leads Fast",
        "h1": "Facebook Ads for Contractors That Actually Work",
        "keyword": "Facebook Ads for Contractors",
        "meta": "Facebook Ads for contractors that generate quality leads. Target homeowners in your service area and grow your contracting business with expert ad management.",
        "headline": "Fill Your Schedule With High-Value Projects",
        "sub": "Facebook Ads campaigns designed specifically for contractors to reach homeowners actively looking for your services in your local market.",
        "intro": "Contractors struggle with inconsistent lead flow seasonal slowdowns and competing on price. Facebook Ads for contractors solves this by targeting homeowners based on home value income and recent life events like moving or home purchases. Our campaigns generate 20-50 qualified leads per month for contractors with average project values of 5000-25000 dollars. We handle everything from ad creative to lead qualification so you focus on estimates and project delivery.",
        "industries": ["General Contractors", "Remodeling", "Roofing", "Concrete", "Painting"],
        "images": marketing_images
    },
    {
        "id": "google-ads-service-businesses",
        "title": "Google Ads for Service Businesses | Capture High-Intent Leads",
        "h1": "Google Ads for Service Businesses",
        "keyword": "Google Ads for Service Businesses",
        "meta": "Google Ads management for service businesses. Capture customers actively searching for your services and dominate local search results.",
        "headline": "Be There When Customers Are Searching For Your Services",
        "sub": "Google Ads campaigns that put your service business at the top of search results when customers need you most.",
        "intro": "When someone searches for emergency plumber near me or AC repair they are ready to buy right now. Google Ads for service businesses captures this high-intent traffic and converts searchers into paying customers. Our campaigns focus on local service ads search ads and remarketing to maximize ROI. Service businesses typically see 5-10x return on ad spend with cost per lead ranging from 30-100 dollars depending on industry and market.",
        "industries": ["HVAC", "Plumbing", "Electrical", "Locksmith", "Appliance Repair"],
        "images": marketing_images
    },
    {
        "id": "ai-lead-qualification",
        "title": "AI Lead Qualification | Automate Your Sales Process",
        "h1": "AI Lead Qualification System",
        "keyword": "AI Lead Qualification",
        "meta": "AI lead qualification automates your sales process. Pre-qualify leads instantly score prospects and route hot leads to your sales team automatically.",
        "headline": "Stop Wasting Time On Unqualified Leads",
        "sub": "AI that asks the right questions qualifies leads instantly and delivers only sales-ready prospects to your team.",
        "intro": "Sales teams waste 50 percent of their time talking to unqualified leads. AI lead qualification solves this by automatically asking qualifying questions scoring prospects based on your criteria and routing only qualified leads to sales. The system works 24/7 qualifies leads in under 2 minutes and integrates with your CRM. Companies using AI lead qualification see 40 percent increase in conversion rates and sales teams spend 70 percent more time with qualified prospects.",
        "industries": ["B2B Services", "SaaS", "Professional Services", "Consulting", "Real Estate"],
        "images": voice_ai_images
    },
    {
        "id": "automated-lead-generation",
        "title": "Automated Lead Generation | AI + Paid Ads System",
        "h1": "Automated Lead Generation for Small Business",
        "keyword": "Automated Lead Generation",
        "meta": "Automated lead generation combines AI voice technology with Facebook and Google Ads. Generate and qualify leads automatically 24/7.",
        "headline": "Lead Generation That Runs On Autopilot",
        "sub": "Automated system that generates leads with paid ads qualifies them with AI and books appointments without human intervention.",
        "intro": "Manual lead generation is slow expensive and inconsistent. Our automated lead generation system combines Facebook and Google Ads with AI voice agents to create a 24/7 lead machine. Ads drive traffic AI answers calls and qualifies leads appointments book automatically. Small businesses using automated lead generation see 10x more leads with 60 percent less manual work and 3-5x ROI within 90 days.",
        "industries": ["Home Services", "Healthcare", "Legal", "Financial Services", "Education"],
        "images": marketing_images
    },
    {
        "id": "voice-ai-home-services",
        "title": "Voice AI for Home Services | Never Miss Emergency Calls",
        "h1": "Voice AI for Home Services Businesses",
        "keyword": "Voice AI for Home Services",
        "meta": "Voice AI for home services answers emergency calls 24/7. Perfect for HVAC plumbing electrical and contractors who need after-hours coverage.",
        "headline": "Capture Every Emergency Call Even At 2 AM",
        "sub": "Voice AI built specifically for home services businesses to handle emergency calls capture details and book appointments 24/7.",
        "intro": "Home services businesses make serious money on emergency calls but most miss 40-60 percent of after-hours calls. Voice AI for home services answers every call captures emergency details like no heat or burst pipe routes true emergencies to on-call technicians and books appointments for non-urgent work. One HVAC company added 15000 dollars per month in emergency service revenue just by answering after-hours calls with AI.",
        "industries": ["HVAC", "Plumbing", "Electrical", "Appliance Repair", "Locksmith"],
        "images": voice_ai_images
    },
    {
        "id": "ai-receptionist-small-business",
        "title": "AI Receptionist for Small Business | 24/7 Phone Answering",
        "h1": "AI Receptionist for Small Business",
        "keyword": "AI Receptionist for Small Business",
        "meta": "AI receptionist for small business that answers calls 24/7 books appointments and qualifies leads. Affordable alternative to hiring staff.",
        "headline": "Professional Reception Without The Payroll",
        "sub": "AI receptionist that answers every call schedules appointments and handles customer inquiries for less than 1000 dollars per month.",
        "intro": "Hiring a full-time receptionist costs 35000-45000 dollars per year plus benefits. An AI receptionist for small business costs under 12000 dollars per year and works 24/7 without sick days vacation or breaks. It answers calls professionally takes messages books appointments and routes calls based on your rules. Small businesses save 25000-30000 dollars per year while actually improving customer service with instant response times.",
        "industries": ["Medical Practices", "Law Firms", "Accounting Firms", "Consulting", "Salons"],
        "images": voice_ai_images
    },
    {
        "id": "ai-phone-answering-service",
        "title": "AI Phone Answering Service | Better Than Call Centers",
        "h1": "AI Phone Answering Service",
        "keyword": "AI Phone Answering Service",
        "meta": "AI phone answering service that sounds human costs less than traditional services and integrates with your CRM and calendar.",
        "headline": "Ditch The Call Center. Upgrade To AI.",
        "sub": "AI phone answering service that delivers better customer experience than offshore call centers at 70 percent lower cost.",
        "intro": "Traditional answering services cost 300-800 dollars per month provide generic responses and cannot book appointments or integrate with your systems. AI phone answering service costs less handles complex conversations books appointments directly into your calendar and integrates with your CRM. The AI is trained specifically on your business so it provides accurate information every time. Businesses switching from traditional services report 50 percent more booked appointments and 60 percent reduction in costs.",
        "industries": ["Service Businesses", "Healthcare", "Legal", "Real Estate", "E-commerce"],
        "images": voice_ai_images
    },
    {
        "id": "facebook-ads-lead-generation",
        "title": "Facebook Ads Lead Generation | Qualified Leads Daily",
        "h1": "Facebook Ads Lead Generation System",
        "keyword": "Facebook Ads Lead Generation",
        "meta": "Facebook Ads lead generation that generates qualified leads daily. Expert campaign management with AI follow-up for maximum conversions.",
        "headline": "Wake Up To New Leads Every Morning",
        "sub": "Facebook Ads campaigns optimized for lead generation plus AI voice follow-up to qualify and convert leads automatically.",
        "intro": "Facebook Ads are the fastest way to generate leads for local businesses but most campaigns fail because leads never get followed up. Our Facebook Ads lead generation system captures leads through optimized ads then immediately follows up with AI voice technology to qualify interest and book appointments. Service businesses generate 30-100 qualified leads per month with conversion rates of 15-25 percent from ad click to booked appointment.",
        "industries": ["Home Services", "Legal", "Healthcare", "Real Estate", "Automotive"],
        "images": marketing_images
    },
    {
        "id": "google-ads-lead-generation",
        "title": "Google Ads Lead Generation | High-Intent Traffic",
        "h1": "Google Ads Lead Generation",
        "keyword": "Google Ads Lead Generation",
        "meta": "Google Ads lead generation for businesses that need high-intent leads. Capture customers actively searching for your services right now.",
        "headline": "Capture Customers Ready To Buy Right Now",
        "sub": "Google Ads targeting high-intent search terms that convert at 3-5x higher rates than other channels.",
        "intro": "Google Ads lead generation captures customers at the exact moment they are searching for your services. Unlike Facebook where you interrupt people Google Ads reaches people actively looking to buy. Our campaigns focus on high-intent keywords local service ads and call-only campaigns to maximize lead quality. Average cost per lead is 50-150 dollars with conversion rates of 10-20 percent from lead to customer which is 3-5x higher than cold outreach.",
        "industries": ["Legal Services", "Home Services", "Healthcare", "Financial Services", "B2B"],
        "images": marketing_images
    },
    {
        "id": "ai-call-answering-service",
        "title": "AI Call Answering Service | Never Miss Important Calls",
        "h1": "AI Call Answering Service for Businesses",
        "keyword": "AI Call Answering Service",
        "meta": "AI call answering service that works 24/7. Professional call handling appointment booking and lead qualification without hiring staff.",
        "headline": "Every Call Answered. Every Lead Captured.",
        "sub": "AI call answering service that handles your phones professionally so you can focus on running your business.",
        "intro": "Missing calls means missing revenue. AI call answering service ensures every call is answered within 2 rings with professional friendly service. The AI handles common questions takes detailed messages books appointments and routes urgent calls. It works 24/7 including weekends and holidays. Businesses report 100 percent call answer rate compared to 50-70 percent with traditional methods and capture 40-60 percent more leads as a result.",
        "industries": ["Medical Offices", "Law Firms", "Home Services", "Salons", "Retail"],
        "images": voice_ai_images
    },
    {
        "id": "voice-ai-appointment-scheduling",
        "title": "Voice AI Appointment Scheduling | Book While You Sleep",
        "h1": "Voice AI Appointment Scheduling System",
        "keyword": "Voice AI Appointment Scheduling",
        "meta": "Voice AI appointment scheduling that books customers 24/7. No more phone tag or missed booking opportunities. Integrates with your calendar.",
        "headline": "Your Calendar Fills Automatically",
        "sub": "Voice AI that checks availability and books appointments in real-time without phone tag or manual coordination.",
        "intro": "The average business spends 3-5 hours per week playing phone tag to schedule appointments. Voice AI appointment scheduling eliminates this by allowing customers to book 24/7 while the system checks your calendar confirms availability and sends confirmations automatically. Medical practices dental offices and service businesses using AI scheduling book 30-40 percent more appointments with zero additional administrative time. The system also handles reschedules and reminders automatically.",
        "industries": ["Healthcare", "Salons", "Consulting", "Legal", "Home Services"],
        "images": voice_ai_images
    },
    {
        "id": "ai-sales-agent-small-business",
        "title": "AI Sales Agent for Small Business | Close More Deals",
        "h1": "AI Sales Agent for Small Business",
        "keyword": "AI Sales Agent for Small Business",
        "meta": "AI sales agent that qualifies leads follows up persistently and books sales calls. Never lose a lead to slow follow-up again.",
        "headline": "A Sales Agent That Never Sleeps",
        "sub": "AI sales agent that follows up with every lead within 60 seconds qualifies interest and books sales calls automatically.",
        "intro": "Speed to lead matters. Companies that follow up within 5 minutes are 100x more likely to convert than those who wait 30 minutes. AI sales agent for small business follows up instantly with every new lead asks qualifying questions and books meetings with hot prospects. It works 24/7 handles unlimited leads and integrates with your CRM. Businesses using AI sales agents see 50-70 percent increase in booked demos and 3x improvement in lead-to-customer conversion rates.",
        "industries": ["B2B Services", "SaaS", "Consulting", "Insurance", "Financial Services"],
        "images": voice_ai_images
    }
]

def create_page(data):
    images = data.get("images", voice_ai_images)
    return {
        "page_id": data["id"],
        "page_type": "national-seo",
        "keyword": {
            "primary_keyword": data["keyword"],
            "secondary_keywords": [f"{data['keyword']} services", f"best {data['keyword']}", f"affordable {data['keyword']}"],
            "keyword_slug": data["id"]
        },
        "industry_focus": {
            "industries": data["industries"],
            "business_types": [f"{ind} companies" for ind in data["industries"][:3]]
        },
        "seo": {
            "page_title": data["title"],
            "meta_description": data["meta"],
            "h1_heading": data["h1"],
            "keywords": [data["keyword"].lower(), "capture client", "automation"]
        },
        "hero": {
            "headline": data["headline"],
            "subheadline": data["sub"],
            "cta_primary": {"text": "Get Your Free Consultation", "action": "tel:865-346-3339", "type": "phone"},
            "hero_image": {
                "url": images[0]["url"].replace("w=1200", "w=1920"),
                "alt": images[0]["alt"],
                "credit": {"photographer": "Unsplash Photographer", "unsplash_url": "https://unsplash.com"}
            }
        },
        "intro": {"paragraph": data["intro"]},
        "benefits": [
            {"title": "24/7 Availability", "description": "Never miss a lead or opportunity with round-the-clock service.", "icon": "clock"},
            {"title": "Instant Response", "description": "Respond to inquiries within seconds not hours or days.", "icon": "zap"},
            {"title": "Cost Effective", "description": "Save 60-80 percent compared to traditional methods.", "icon": "dollar-sign"},
            {"title": "Scalable System", "description": "Handle 10 or 1000 leads without adding staff.", "icon": "trending-up"},
            {"title": "Full Integration", "description": "Works with your existing CRM calendar and tools.", "icon": "link"}
        ],
        "how_it_works": [
            {"step": 1, "title": "Free Consultation", "description": "We analyze your business and create a custom strategy."},
            {"step": 2, "title": "Setup & Training", "description": "We build and train your system with your business knowledge."},
            {"step": 3, "title": "Testing & Launch", "description": "We test thoroughly then launch your automated system."},
            {"step": 4, "title": "Optimize & Scale", "description": "We continuously improve performance and scale with your growth."}
        ],
        "industry_use_cases": [
            {
                "industry": data["industries"][0],
                "challenge": f"{data['industries'][0]} businesses struggle with inconsistent lead flow and high customer acquisition costs.",
                "solution": f"Our system generates qualified leads 24/7 and converts them automatically.",
                "result": f"Average {data['industries'][0]} business sees 3-5x ROI within 60-90 days."
            }
        ],
        "nationwide_coverage": {
            "heading": "Serving Businesses Nationwide",
            "description": "We work with businesses across all 50 states from small local operations to multi-location enterprises.",
            "regions_highlighted": ["East Coast", "West Coast", "Midwest", "South", "Southwest"]
        },
        "testimonials": [
            {"quote": "This system transformed our business. We went from struggling to find leads to having more than we can handle.", "author": "John Smith", "business": "ABC Services", "location": "Denver CO"},
            {"quote": "Best investment we have made. The ROI was positive in the first month.", "author": "Sarah Johnson", "business": "XYZ Company", "location": "Miami FL"},
            {"quote": "Finally a marketing system that actually works. Highly recommend.", "author": "Mike Davis", "business": "123 Solutions", "location": "Portland OR"}
        ],
        "faq": [
            {"question": f"How does {data['keyword']} work?", "answer": f"{data['keyword']} uses advanced technology to automate and optimize your sales and marketing processes for maximum efficiency and results."},
            {"question": "How much does it cost?", "answer": "Packages start at $999 per month. Most businesses see 3-5x ROI within 60 days making it a highly profitable investment."},
            {"question": "How quickly can I get started?", "answer": "Most businesses are fully operational within 1-2 weeks from initial consultation to launch."},
            {"question": "Do you work with businesses in my industry?", "answer": f"Yes we specialize in {data['industries'][0]} {data['industries'][1]} and {data['industries'][2]} as well as many other service-based industries."},
            {"question": "What kind of results can I expect?", "answer": "Most businesses see 2-3x more leads 40-60 percent higher conversion rates and 3-5x ROI within the first 90 days."},
            {"question": "Is there a contract?", "answer": "No long-term contracts required. Month-to-month service with 30-day cancellation notice."}
        ],
        "images": {"gallery": images},
        "cta_section": {
            "headline": "Ready to Transform Your Business?",
            "subheadline": "Get your free consultation and discover how our system can generate more leads and revenue for your business.",
            "cta_primary": {"text": "Call Now: 865-346-3339", "action": "tel:865-346-3339", "type": "phone"},
            "urgency_text": "Limited slots available for new clients"
        },
        "related_pages": {
            "related_national_keywords": ["voice-ai-small-business", "lead-generation-agency"],
            "packages": ["starter-package", "growth-package"]
        }
    }

# Generate all pages
count = 1
for page_data in pages_data:
    page = create_page(page_data)
    filepath = rf'C:\Users\eaqqa\capture-client-website-seo\pages\national\{page_data["id"]}.json'
    with open(filepath, 'w') as f:
        json.dump(page, f, indent=2)
    print(f"Created {count+1}/15: {page_data['id']}.json")
    count += 1

print("\nAll 15 national SEO pages created successfully!")
print("\nGenerated files:")
print("1. voice-ai-small-business.json (already created)")
for i, page_data in enumerate(pages_data, 2):
    print(f"{i}. {page_data['id']}.json")
