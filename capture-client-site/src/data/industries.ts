/**
 * Industry-Specific Landing Page Data
 * Each industry has unique pain points, solutions, and ROI calculations
 * Based on competitor research (Smith.ai, CallRuby, Ruby Receptionists)
 */

export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface TrustBadge {
  type: "compliance" | "rating" | "certification" | "clients" | "award";
  label: string;
  icon: string;
  value?: string;
  description?: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  category:
    | "Professional Services"
    | "Home Services"
    | "Real Estate & Property"
    | "Healthcare"
    | "Hospitality";
  tagline: string;
  description: string;
  heroImage: string;
  painPoints: string[];
  solutions: {
    title: string;
    description: string;
    icon: string;
  }[];
  keyFeatures: string[];
  stats: {
    value: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    avatar?: string;
  };
  relatedIntegrations: string[];
  relatedCaseStudies?: string[]; // Array of case study IDs
  ctaText: string;
  roiCalculation?: {
    traditionalCost: string;
    aiSolution: string;
    annualSavings: string;
    breakdownItems: {
      item: string;
      traditional: string;
      ai: string;
    }[];
  };
  faqs?: IndustryFAQ[];
  trustBadges?: TrustBadge[];
  clientCount?: number;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "legal",
    name: "Legal & Law Firms",
    slug: "legal-law-firms",
    category: "Professional Services",
    tagline: "Never Miss a Client Call. Always Professional.",
    description:
      "AI-powered intake, appointment scheduling, and 24/7 answering for law firms. Handle overflow calls, after-hours emergencies, and conflict checking with enterprise-grade security.",
    heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    painPoints: [
      "Missed calls = missed clients. Each unanswered call costs $3,000-$15,000 in potential revenue.",
      "After-hours emergencies require immediate response, but hiring 24/7 staff costs $77,000/year.",
      "Manual intake wastes paralegal time on basic questions instead of billable work.",
      "Client confidentiality requires HIPAA-level security and compliance.",
      "Conflict checking delays intake process and frustrates potential clients.",
    ],
    solutions: [
      {
        title: "24/7 Client Intake",
        description:
          "AI handles initial consultations, gathers case details, and schedules appointments while you sleep. Never miss an emergency call again.",
        icon: "gavel",
      },
      {
        title: "Automated Conflict Checking",
        description:
          "Instantly verify conflicts against your case database before booking consultations. Protect your practice and save paralegal hours.",
        icon: "verified_user",
      },
      {
        title: "Secure & Compliant",
        description:
          "SOC-II certified with attorney-client privilege protection. All calls encrypted and stored securely for compliance.",
        icon: "lock",
      },
      {
        title: "Intelligent Call Routing",
        description:
          "Route urgent matters to on-call attorneys immediately. Qualified leads go to intake. General questions handled by AI.",
        icon: "alt_route",
      },
    ],
    keyFeatures: [
      "Client intake questionnaires customized to practice areas",
      "Automatic conflict of interest checking",
      "Bilingual support (English/Spanish)",
      "Integration with Clio, MyCase, PracticePanther",
      "Emergency escalation to on-call attorney",
      "Secure call recording and transcription",
      "Lead qualification and scoring",
      "Appointment scheduling with calendar sync",
    ],
    stats: [
      { value: "$77,000", label: "Annual cost of 24/7 receptionist" },
      { value: "$97/mo", label: "Cost with AI Voice Agent" },
      { value: "99.2%", label: "Call answer rate" },
      { value: "45 sec", label: "Average intake time" },
    ],
    testimonial: {
      quote:
        "We went from missing 30% of calls after 5pm to answering 100% 24/7. The AI handles intake better than our paralegals and costs 1/10th the price.",
      author: "Sarah Mitchell",
      company: "Mitchell & Associates Law",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    },
    relatedIntegrations: ["clio", "mycase", "practice-panther", "lawmatics"],
    relatedCaseStudies: ["law-firm"],
    ctaText: "Try Our AI Now",
    roiCalculation: {
      traditionalCost: "$77,000/year",
      aiSolution: "$1,140/year",
      annualSavings: "$75,860",
      breakdownItems: [
        { item: "24/7 Receptionist Salary", traditional: "$55,000", ai: "$0" },
        { item: "Benefits & Taxes (40%)", traditional: "$22,000", ai: "$0" },
        { item: "AI Voice Agent (Starter)", traditional: "$0", ai: "$1,140" },
        { item: "Setup & Training", traditional: "$0", ai: "$0" },
      ],
    },
    faqs: [
      {
        question: "How much does an AI receptionist cost for law firms?",
        answer:
          "Our AI voice agents for law firms start at $97/month for the Starter plan (up to 100 calls), which is 98% less expensive than hiring a full-time receptionist. The Growth plan ($997/mo for 500 calls) and Enterprise plan (custom pricing for unlimited calls) scale with your firm's needs. All plans include 24/7 coverage, client intake, and integration with legal practice management software like Clio and MyCase.",
      },
      {
        question:
          "Is the AI receptionist HIPAA compliant and secure for attorney-client privilege?",
        answer:
          "Yes, absolutely. Our system is SOC-II certified with enterprise-grade encryption for all calls and data storage. We maintain attorney-client privilege protection with secure call recording, encrypted transcripts, and audit trails for regulatory compliance. All data is stored on US-based servers with strict access controls, and we never share client information with third parties.",
      },
      {
        question: "How quickly can the AI be set up for my law firm?",
        answer:
          "Most law firms are up and running in 24-48 hours. The setup process includes: (1) Customizing intake questions for your practice areas, (2) Integrating with your practice management software (Clio, MyCase, etc.), (3) Setting up call routing rules and conflict checking, (4) Testing the AI with sample scenarios. Our team handles the technical setup, and we provide training for your staff to review captured leads and manage the system.",
      },
      {
        question: "Can the AI handle complex legal intake and conflict checking?",
        answer:
          "Yes. The AI conducts comprehensive client intake by asking customized questions specific to your practice areas (personal injury, family law, estate planning, etc.). It gathers case details, opposing party information, and dates to check for conflicts of interest against your case database before booking consultations. For complex matters, the AI escalates to your staff or attorneys based on rules you define.",
      },
      {
        question: "What happens if a potential client calls with an emergency?",
        answer:
          'The AI is programmed to identify urgent matters (criminal arrests, active restraining orders, approaching deadlines) and immediately escalate to your on-call attorney via phone call or SMS. You define what qualifies as an "emergency" for your practice, and the AI follows your escalation protocols. Non-urgent calls are handled with intake and appointment scheduling, while routine questions are answered instantly.',
      },
      {
        question: "How does the AI integrate with Clio, MyCase, and other legal software?",
        answer:
          "We offer native integrations with Clio, MyCase, PracticePanther, Lawmatics, and other major legal practice management platforms. The AI automatically creates new client records, logs intake calls, schedules appointments on your calendar, and performs conflict checks against your matter database. All call recordings and transcripts are attached to client files for compliance and case management.",
      },
    ],
    trustBadges: [
      {
        type: "compliance",
        label: "ABA Compliant",
        icon: "verified_user",
        description: "Meets American Bar Association standards",
      },
      {
        type: "compliance",
        label: "SOC-II Certified",
        icon: "security",
        description: "Enterprise-grade security controls",
      },
      {
        type: "certification",
        label: "Attorney-Client Privilege",
        icon: "gavel",
        description: "Protected communications",
      },
      {
        type: "certification",
        label: "Encrypted Storage",
        icon: "lock",
        description: "Bank-level encryption at rest",
      },
      {
        type: "clients",
        label: "500+ Law Firms",
        icon: "account_balance",
        value: "Trusted Partner",
      },
      { type: "award", label: "99.9% Uptime", icon: "check_circle", value: "SLA Guaranteed" },
      {
        type: "certification",
        label: "GDPR Ready",
        icon: "public",
        description: "EU data protection compliant",
      },
      {
        type: "award",
        label: "Clio Integration",
        icon: "integration_instructions",
        value: "Certified Partner",
      },
    ],
    clientCount: 500,
  },
  {
    id: "home-services",
    name: "Home Services",
    slug: "home-services",
    category: "Home Services",
    tagline: "Answer Every Emergency. Book More Jobs.",
    description:
      "AI receptionist for plumbers, HVAC, electricians, and contractors. Handle emergency calls 24/7, book appointments, and dispatch technicians automatically.",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070",
    painPoints: [
      "Emergency calls at 2am for burst pipes or HVAC failures require immediate response.",
      "Booking appointments during job sites means missed calls and lost revenue.",
      "Seasonal demand spikes overwhelm small office staff.",
      "Customers want instant quotes and availability without waiting for callbacks.",
      "Dispatching technicians manually wastes time and creates scheduling conflicts.",
    ],
    solutions: [
      {
        title: "Emergency Call Handling",
        description:
          "AI answers 24/7, assesses urgency, and immediately dispatches on-call technicians for emergencies. No more missed midnight calls.",
        icon: "emergency",
      },
      {
        title: "Instant Booking & Quotes",
        description:
          "Customers get real-time availability, pricing estimates, and book appointments instantly without waiting for callbacks.",
        icon: "event_available",
      },
      {
        title: "Smart Dispatching",
        description:
          "AI routes jobs to nearest available technician based on location, skills, and schedule. Optimize routes and reduce drive time.",
        icon: "location_on",
      },
      {
        title: "Seasonal Overflow Support",
        description:
          "Scale instantly during peak seasons (summer HVAC, winter heating) without hiring temporary staff.",
        icon: "trending_up",
      },
    ],
    keyFeatures: [
      "Emergency vs. routine call triage",
      "Automated technician dispatch",
      "Real-time calendar availability",
      "Service area verification (zip code)",
      "Quote generation for common services",
      "Integration with ServiceTitan, Jobber, Housecall Pro",
      "SMS confirmations and reminders",
      "Payment collection over phone",
    ],
    stats: [
      { value: "3.2x", label: "More jobs booked after-hours" },
      { value: "18 min", label: "Saved per booking" },
      { value: "24/7", label: "Emergency availability" },
      { value: "92%", label: "Customer satisfaction" },
    ],
    testimonial: {
      quote:
        "During the winter freeze, we got 200+ emergency calls in 48 hours. The AI handled every single one, dispatched our techs perfectly, and we didn't miss a single job. Incredible.",
      author: "Mike Rodriguez",
      company: "Rodriguez Plumbing & Heating",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    },
    relatedIntegrations: ["servicetitan", "jobber", "housecall-pro", "fieldpulse"],
    relatedCaseStudies: ["hvac", "plumbing", "roofing"],
    ctaText: "Start Free Trial",
    roiCalculation: {
      traditionalCost: "$48,000/year",
      aiSolution: "$1,140/year",
      annualSavings: "$46,860",
      breakdownItems: [
        { item: "Call Center Service", traditional: "$2,500/mo", ai: "$0" },
        { item: "Missed Jobs (30/mo @ $500)", traditional: "$15,000/year", ai: "$0" },
        { item: "AI Voice Agent", traditional: "$0", ai: "$97/mo" },
        { item: "Additional Revenue Captured", traditional: "$0", ai: "+$180,000" },
      ],
    },
    trustBadges: [
      {
        type: "certification",
        label: "BBB Accredited",
        icon: "workspace_premium",
        value: "A+ Rating",
      },
      {
        type: "certification",
        label: "Licensed & Insured",
        icon: "verified",
        description: "Fully bonded contractor",
      },
      {
        type: "clients",
        label: "1,200+ Contractors",
        icon: "construction",
        value: "Industry Leader",
      },
      {
        type: "award",
        label: "ServiceTitan Partner",
        icon: "integration_instructions",
        value: "Certified Integration",
      },
      { type: "award", label: "24/7 Support", icon: "support_agent", value: "Always Available" },
      {
        type: "certification",
        label: "SOC-II Type 2",
        icon: "security",
        description: "Annual security audits",
      },
      { type: "award", label: "99.9% Uptime", icon: "check_circle", value: "SLA Backed" },
      { type: "clients", label: "50K+ Jobs Booked", icon: "event_available", value: "Monthly" },
    ],
    clientCount: 1200,
  },
  {
    id: "real-estate",
    name: "Real Estate",
    slug: "real-estate",
    category: "Real Estate & Property",
    tagline: "Capture Every Lead. Book More Showings.",
    description:
      "AI answering service for real estate agents and brokerages. Qualify leads, schedule property showings, and never miss a buyer call again.",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070",
    painPoints: [
      "Showing a property means missing buyer calls. Each missed call is a lost $12,000 commission.",
      "After-hours inquiries (evenings/weekends) are prime buying time but agents need personal time.",
      "Unqualified leads waste time on showings for buyers who can't afford the property.",
      "Scheduling conflicts create double-bookings and frustrated clients.",
      "Open house attendees want immediate answers about other listings.",
    ],
    solutions: [
      {
        title: "Lead Qualification AI",
        description:
          "AI pre-qualifies buyers by budget, timeline, location preferences, and financing status before wasting your time.",
        icon: "how_to_reg",
      },
      {
        title: "Automated Showing Scheduler",
        description:
          "Buyers book showings directly into your calendar based on real-time availability. Sync with MLS lockbox codes automatically.",
        icon: "calendar_month",
      },
      {
        title: "After-Hours Lead Capture",
        description:
          "Capture evening and weekend leads when buyers are most active. AI responds instantly while you enjoy personal time.",
        icon: "nightlight",
      },
      {
        title: "Multi-Property Inquiries",
        description:
          "AI answers questions about all your active listings, sends property details, and schedules back-to-back showings efficiently.",
        icon: "home_work",
      },
    ],
    keyFeatures: [
      "MLS integration for property details",
      "Buyer pre-qualification questions",
      "Automated showing coordination",
      "SMS property details and photos",
      "Lead scoring and prioritization",
      "Integration with Follow Up Boss, kvCORE, BoomTown",
      "Open house attendee capture",
      "Seller lead qualification",
    ],
    stats: [
      { value: "67%", label: "Leads captured after-hours" },
      { value: "$12K", label: "Avg. commission per lead" },
      { value: "4.5x", label: "More showings booked" },
      { value: "2 min", label: "Lead response time" },
    ],
    testimonial: {
      quote:
        "I used to miss 40% of calls during showings. Now the AI books my next showing while I'm closing the current one. My commission doubled in 6 months.",
      author: "Jennifer Park",
      company: "Coldwell Banker Top Producer",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    },
    relatedIntegrations: ["follow-up-boss", "kvcore", "boomtown", "zillow"],
    ctaText: "Try Our AI Now",
    trustBadges: [
      {
        type: "certification",
        label: "MLS Integrated",
        icon: "home_work",
        description: "Real-time property sync",
      },
      {
        type: "certification",
        label: "NAR Member",
        icon: "card_membership",
        description: "National Association of Realtors",
      },
      { type: "clients", label: "800+ Agents", icon: "real_estate_agent", value: "Top Performers" },
      {
        type: "award",
        label: "Zillow Partner",
        icon: "integration_instructions",
        value: "Premier Integration",
      },
      {
        type: "certification",
        label: "Data Encryption",
        icon: "lock",
        description: "256-bit SSL encryption",
      },
      { type: "award", label: "99.9% Uptime", icon: "check_circle", value: "Never Miss a Lead" },
      { type: "clients", label: "10K+ Showings/Month", icon: "calendar_month", value: "Scheduled" },
      {
        type: "award",
        label: "kvCORE Certified",
        icon: "workspace_premium",
        value: "Gold Partner",
      },
    ],
    clientCount: 800,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    slug: "healthcare",
    category: "Healthcare",
    tagline: "Always Available. Always Compliant.",
    description:
      "HIPAA-compliant AI receptionist for medical practices, dental offices, and healthcare providers. Handle appointment scheduling, patient inquiries, and emergency triage 24/7.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070",
    painPoints: [
      "Hold times frustrate patients and lead to appointment no-shows.",
      "Front desk staff overwhelmed with scheduling, insurance verification, and basic questions.",
      "After-hours urgent care questions require nurse hotline ($50-$100 per call).",
      "HIPAA compliance requires expensive security measures and staff training.",
      "Missed appointment reminder calls lead to $150-$300 in lost revenue per no-show.",
    ],
    solutions: [
      {
        title: "HIPAA-Compliant Scheduling",
        description:
          "Patients book, reschedule, and cancel appointments 24/7. AI verifies insurance and sends secure confirmations.",
        icon: "shield",
      },
      {
        title: "Symptom Triage",
        description:
          "AI assesses urgency of patient concerns and routes to appropriate care level (urgent, same-day, routine, or ER).",
        icon: "medical_services",
      },
      {
        title: "Automated Reminders",
        description:
          "Reduce no-shows by 60% with automated appointment reminders via phone, SMS, and email.",
        icon: "notifications_active",
      },
      {
        title: "Patient Portal Support",
        description:
          "AI guides patients through portal registration, prescription refills, and test result inquiries.",
        icon: "support_agent",
      },
    ],
    keyFeatures: [
      "HIPAA-compliant call recording and storage",
      "Insurance verification integration",
      "Appointment scheduling with EHR sync",
      "Prescription refill requests",
      "New patient intake forms",
      "Integration with Epic, Athenahealth, Kareo",
      "Bilingual support (English/Spanish)",
      "Emergency escalation protocols",
    ],
    stats: [
      { value: "60%", label: "Reduction in no-shows" },
      { value: "94%", label: "Patient satisfaction" },
      { value: "$38K", label: "Saved on front desk staff" },
      { value: "24/7", label: "Patient access" },
    ],
    testimonial: {
      quote:
        "Our front desk was drowning in calls. Now the AI handles 80% of scheduling and routine questions, our staff focuses on patient care, and satisfaction scores jumped 23 points.",
      author: "Dr. James Chen",
      company: "Westside Family Medicine",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200",
    },
    relatedIntegrations: ["athenahealth", "kareo", "nextgen", "drchrono"],
    relatedCaseStudies: ["dental", "medical-spa"],
    ctaText: "Try Our AI Now",
    faqs: [
      {
        question: "Is your AI voice agent HIPAA compliant for healthcare practices?",
        answer:
          "Yes, our system is fully HIPAA compliant with SOC-II Type 2 certification. All patient communications are encrypted end-to-end (AES-256), call recordings are stored on secure HIPAA-compliant servers, and we provide a Business Associate Agreement (BAA) with every healthcare client. Our platform undergoes annual security audits and maintains strict access controls to protect Protected Health Information (PHI).",
      },
      {
        question:
          "Can the AI handle patient appointment scheduling and integrate with our EHR system?",
        answer:
          "Absolutely. Our AI integrates seamlessly with major EHR systems including Epic, Athenahealth, Kareo, NextGen, and DrChrono. Patients can book, reschedule, or cancel appointments 24/7 based on real-time provider availability. The AI syncs directly with your calendar, sends automated reminders via phone/SMS/email, and reduces no-shows by up to 60%.",
      },
      {
        question: "How does the AI triage emergency vs. routine patient calls?",
        answer:
          "The AI uses intelligent symptom assessment to categorize calls by urgency: Emergency (chest pain, severe bleeding - immediate escalation to on-call provider), Urgent (high fever, injury - same-day appointment), Routine (annual physical, medication refill - scheduled appointment), or Administrative (billing, insurance - routed to staff). You define the triage protocols, and the AI follows them precisely every time.",
      },
      {
        question: "What happens if a patient calls after hours with a medical concern?",
        answer:
          "Our AI provides 24/7 after-hours support. For emergencies, it immediately alerts your on-call physician via phone and SMS. For urgent matters, it schedules next-day appointments and provides symptom management guidance. For routine questions (prescription refills, appointment scheduling), it handles them completely without disturbing your staff. This eliminates expensive nurse hotline fees ($50-$100 per call) while providing better patient care.",
      },
      {
        question: "Can the AI help with prescription refill requests and patient portal support?",
        answer:
          "Yes. The AI handles routine prescription refill requests by gathering medication name, pharmacy details, and patient information, then creates a task in your EHR for provider approval. It also guides patients through portal registration, password resets, viewing test results, and accessing medical records. This frees your front desk staff to focus on in-person patient care instead of answering repetitive administrative questions.",
      },
      {
        question: "How quickly can we set up the AI for our medical practice?",
        answer:
          "Most healthcare practices are live within 48-72 hours. Setup includes: (1) EHR integration and calendar sync, (2) Customizing triage protocols and appointment types, (3) HIPAA compliance configuration and BAA execution, (4) Training the AI on your practice-specific workflows, (5) Testing with your team. Our healthcare specialists handle the technical setup, and we provide staff training to ensure a smooth transition.",
      },
    ],
    trustBadges: [
      {
        type: "compliance",
        label: "HIPAA Compliant",
        icon: "health_and_safety",
        description: "Full PHI protection",
      },
      {
        type: "compliance",
        label: "SOC-II Type 2",
        icon: "security",
        description: "Annual audits & validation",
      },
      {
        type: "certification",
        label: "BAA Available",
        icon: "description",
        description: "Business Associate Agreement",
      },
      {
        type: "certification",
        label: "HL7 FHIR Ready",
        icon: "sync",
        description: "Interoperability standards",
      },
      {
        type: "clients",
        label: "600+ Practices",
        icon: "local_hospital",
        value: "Healthcare Providers",
      },
      {
        type: "award",
        label: "Epic Integrated",
        icon: "integration_instructions",
        value: "EHR Certified",
      },
      {
        type: "certification",
        label: "AES-256 Encryption",
        icon: "lock",
        description: "Data at rest & transit",
      },
      { type: "award", label: "99.99% Uptime", icon: "favorite", value: "Patient-Critical" },
    ],
    clientCount: 600,
  },
  {
    id: "it-services",
    name: "IT Services & MSPs",
    slug: "it-services",
    category: "Professional Services",
    tagline: "Instant Support. Always On.",
    description:
      "AI help desk for IT service providers and MSPs. Handle support tickets, triage emergencies, and route issues to the right technician automatically.",
    heroImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2070",
    painPoints: [
      "After-hours server outages require immediate response but 24/7 NOC costs $150K+/year.",
      "Level 1 support tickets waste engineer time on password resets and basic troubleshooting.",
      "Client calls interrupt billable project work and reduce productivity.",
      "Manual ticket creation delays issue resolution and frustrates clients.",
      "SLA response times (15-min, 1-hour, 4-hour) require constant monitoring.",
    ],
    solutions: [
      {
        title: "Automated Ticket Creation",
        description:
          "AI captures issue details, creates tickets in your PSA, and assigns to appropriate technician based on skills and availability.",
        icon: "confirmation_number",
      },
      {
        title: "Priority Triage",
        description:
          "AI assesses urgency (P1: Server Down to P4: Training Request) and escalates critical issues immediately to on-call engineer.",
        icon: "priority_high",
      },
      {
        title: "Self-Service Support",
        description:
          "AI walks clients through common fixes (password reset, printer setup, VPN connection) without creating tickets.",
        icon: "psychology",
      },
      {
        title: "SLA Monitoring",
        description:
          "Never miss SLA commitments. AI tracks response times and escalates if deadlines approach.",
        icon: "timer",
      },
    ],
    keyFeatures: [
      "Integration with ConnectWise, Autotask, Kaseya",
      "Multi-tenant client management",
      "Escalation workflows by priority",
      "Knowledge base integration",
      "After-hours emergency routing",
      "Client-specific greeting and branding",
      "Technician dispatch optimization",
      "SLA compliance tracking",
    ],
    stats: [
      { value: "76%", label: "Tickets auto-categorized" },
      { value: "12 min", label: "Faster first response" },
      { value: "$120K", label: "Saved on Level 1 staff" },
      { value: "99.8%", label: "SLA compliance" },
    ],
    testimonial: {
      quote:
        "We support 150 clients across 3 time zones. The AI handles after-hours calls, creates tickets with perfect detail, and escalates emergencies instantly. Our engineers can finally sleep.",
      author: "David Kumar",
      company: "TechShield MSP",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200",
    },
    relatedIntegrations: ["connectwise", "autotask", "kaseya", "syncro"],
    ctaText: "Try IT Support AI",
    faqs: [
      {
        question: "How does the AI handle technical support ticket triage and prioritization?",
        answer:
          "The AI automatically categorizes incoming support requests by severity (P1: Server Down, P2: Service Degraded, P3: Minor Issue, P4: Request) based on keywords, client SLA tier, and business impact. Critical P1 issues are immediately escalated to on-call engineers via SMS and phone, while P3/P4 tickets are routed to the next available technician. The AI creates detailed tickets in your PSA with all relevant information (client, affected systems, error messages) to speed resolution.",
      },
      {
        question: "Can the AI integrate with our PSA system like ConnectWise or Autotask?",
        answer:
          "Yes, we offer native integrations with ConnectWise Manage, Autotask PSA, Kaseya BMS, and Syncro. The AI automatically creates tickets with proper categorization, assigns to technicians based on skills and availability, logs all call details, and updates ticket status in real-time. Client-specific configurations (SLA terms, escalation contacts, billing codes) sync directly from your PSA to ensure accurate routing and time tracking.",
      },
      {
        question:
          "What happens when a client calls with a complex technical question the AI can't answer?",
        answer:
          "The AI is trained to recognize when issues exceed its knowledge base (custom configurations, complex networking, security incidents) and smoothly escalates to a human technician. It captures all troubleshooting details attempted, creates a comprehensive ticket with screenshots or error codes if provided, and immediately transfers the call or schedules an urgent callback based on your escalation rules. For known complex issues, you can configure automatic routing to specialized engineers.",
      },
      {
        question: "How does after-hours emergency support work for MSPs with multiple clients?",
        answer:
          'The AI provides 24/7 coverage for all your clients with client-specific greetings and escalation protocols. When emergencies occur (server outages, ransomware, network failures), the AI identifies the severity, notifies the on-call engineer immediately, and provides clients with expected response times based on their SLA. Non-urgent after-hours calls are ticketed for next business day, while critical issues trigger your defined emergency response workflow. You define what constitutes an "emergency" for each client tier.',
      },
      {
        question: "Can the AI provide self-service support for common Level 1 issues?",
        answer:
          "Absolutely. The AI walks users through common fixes like password resets, MFA setup, printer configuration, VPN connection troubleshooting, and software installation. It references your internal knowledge base and provides step-by-step instructions with confirmation at each stage. If self-service fails, the AI creates a ticket with all troubleshooting steps already documented, saving your technicians time. This reduces Level 1 ticket volume by 40-60%, freeing engineers for billable work.",
      },
      {
        question: "How does the AI ensure SLA compliance and response time tracking?",
        answer:
          "The AI tracks SLA response commitments (15-minute, 1-hour, 4-hour, next business day) for each client based on their service agreement in your PSA. It monitors elapsed time from initial call and automatically escalates tickets approaching SLA breach to management. Real-time dashboards show SLA compliance by client, and the AI sends proactive alerts if response times are at risk. All call timestamps and ticket creation times are logged for audit trails and performance reporting.",
      },
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    slug: "automotive",
    category: "Home Services",
    tagline: "Service Appointments. Sales Inquiries. Handled.",
    description:
      "AI receptionist for auto dealerships, repair shops, and detailing services. Book service appointments, answer sales questions, and capture leads 24/7.",
    heroImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070",
    painPoints: [
      "Sales floor is busy, service desk is overwhelmed, and calls go unanswered during peak hours.",
      "Customers want instant appointment availability without waiting on hold.",
      "After-hours online shoppers need immediate answers about vehicle inventory and pricing.",
      "Service reminders require manual calling and leave voicemails that get ignored.",
      "Trade-in inquiries need quick KBB estimates and appraisal scheduling.",
    ],
    solutions: [
      {
        title: "Service Scheduling AI",
        description:
          "Customers book oil changes, inspections, and repairs directly into service bay calendar. AI checks advisor availability and sends confirmations.",
        icon: "build",
      },
      {
        title: "Sales Lead Capture",
        description:
          "After-hours shoppers get answers about inventory, pricing, financing, and trade-ins. AI schedules test drives and alerts sales team.",
        icon: "directions_car",
      },
      {
        title: "Automated Service Reminders",
        description:
          "AI calls customers for scheduled maintenance (oil change, tire rotation, inspection) and books appointments instantly.",
        icon: "schedule",
      },
      {
        title: "Parts Department Support",
        description:
          "Check parts availability, get pricing, and reserve parts for pickup or installation.",
        icon: "inventory",
      },
    ],
    keyFeatures: [
      "DMS integration (CDK, Reynolds & Reynolds, Dealertrack)",
      "Service advisor availability sync",
      "VIN lookup and service history",
      "Loaner car availability",
      "Warranty claim questions",
      "Parts pricing and availability",
      "Test drive scheduling",
      "Finance pre-qualification",
    ],
    stats: [
      { value: "3.8x", label: "More service bookings" },
      { value: "42%", label: "After-hours sales leads" },
      { value: "$285K", label: "Annual service revenue gained" },
      { value: "88%", label: "Reminder conversion rate" },
    ],
    testimonial: {
      quote:
        "Our service department was turning away appointments because phones were ringing off the hook. Now AI handles 70% of bookings, we filled every bay, and revenue is up 40%.",
      author: "Marcus Thompson",
      company: "Thompson Toyota Service Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    },
    relatedIntegrations: ["cdk-global", "reynolds-reynolds", "dealertrack", "eleads"],
    ctaText: "Try Our AI Now",
    faqs: [
      {
        question:
          "How does the AI handle service appointment booking for dealerships and repair shops?",
        answer:
          "The AI checks your service advisor calendar in real-time and books oil changes, tire rotations, inspections, and repairs directly into available time slots. It asks about vehicle make/model, current mileage, reason for service, and preferred date/time. Customers receive instant confirmation via SMS with appointment details, service advisor name, and what to bring. The AI syncs with your DMS (CDK, Reynolds & Reynolds, Dealertrack) to pull service history and recommend overdue maintenance.",
      },
      {
        question: "Can the AI answer parts availability inquiries and process parts orders?",
        answer:
          "Yes. The AI checks parts inventory in real-time, provides pricing, and reserves parts for customer pickup or installation. For out-of-stock items, it provides estimated arrival dates and offers to call the customer when parts arrive. The AI can also handle warranty parts lookups, cross-reference part numbers, and suggest alternative compatible parts if originals are unavailable. All parts reservations sync with your parts department system.",
      },
      {
        question: "How does the AI qualify sales leads from after-hours callers?",
        answer:
          "The AI captures detailed lead information including vehicle interest (new/used, make/model), trade-in details (year, make, model, mileage, condition), financing needs, timeline to purchase, and contact preferences. It sends vehicle inventory photos, pricing, and available incentives via text, then schedules test drives or sales appointments. Hot leads (ready to buy within 7 days) are immediately flagged and sent to your sales manager for priority follow-up.",
      },
      {
        question: "Does the AI integrate with DMS systems like CDK Global and Reynolds & Reynolds?",
        answer:
          "Yes, we offer native integrations with CDK Global, Reynolds & Reynolds, Dealertrack, and Eleads. The AI automatically creates service appointments in your DMS, pulls customer and vehicle service history via VIN lookup, updates parts inventory levels, logs sales inquiries, and creates lead records with complete interaction history. All customer communication (calls, texts, confirmations) is recorded in the DMS for compliance and CRM purposes.",
      },
      {
        question: "How does the AI handle weekend and after-hours service booking?",
        answer:
          "The AI operates 24/7, allowing customers to book service appointments at any time, including evenings and weekends when your service desk is closed. It checks service bay availability for the upcoming week, offers early morning drop-off slots, and coordinates loaner car reservations if available. For urgent issues (check engine light, overheating, brake problems), the AI can identify emergency situations and route to your on-call service manager or recommend nearby 24-hour repair facilities.",
      },
      {
        question: "Can the AI send automated service reminders and maintenance notifications?",
        answer:
          "Absolutely. The AI proactively calls customers when they're due for oil changes (every 3,000-5,000 miles), tire rotations, state inspections, or manufacturer-recommended maintenance based on service history and mileage. It offers convenient appointment times, sends booking confirmations, and provides reminders 24 hours before the appointment. This automated outreach increases service retention rates by 40-60% and fills service bays during slower periods.",
      },
    ],
  },
  {
    id: "financial-services",
    name: "Financial Services",
    slug: "financial-services",
    category: "Professional Services",
    tagline: "Professional. Secure. Always Compliant.",
    description:
      "AI receptionist for financial advisors, CPAs, and wealth management firms. Handle client inquiries, schedule consultations, and maintain regulatory compliance.",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
    painPoints: [
      "Client calls during market hours interrupt portfolio management and cost billable time.",
      "Tax season overwhelms front desk with appointment requests and basic questions.",
      "High-net-worth clients expect immediate white-glove service, not voicemail.",
      "Compliance requires call recording, retention, and audit trails (FINRA, SEC).",
      "New client intake requires extensive information gathering before first meeting.",
    ],
    solutions: [
      {
        title: "Client Intake & Qualification",
        description:
          "AI gathers financial goals, assets under management, and investment timeline before scheduling advisor consultation.",
        icon: "account_balance",
      },
      {
        title: "Appointment Management",
        description:
          "Clients book reviews, tax planning, and strategy sessions based on advisor calendar availability. Automatic reminders reduce no-shows.",
        icon: "event",
      },
      {
        title: "Compliance Recording",
        description:
          "All calls automatically recorded, encrypted, and stored for regulatory compliance. Searchable transcripts for audits.",
        icon: "gavel",
      },
      {
        title: "After-Hours Service",
        description:
          "VIP clients get 24/7 access to schedule urgent calls during market volatility. AI alerts advisor for immediate callback.",
        icon: "stars",
      },
    ],
    keyFeatures: [
      "SEC/FINRA compliant call recording",
      "Integration with Redtail, Wealthbox, Salesforce Financial Services",
      "Client risk assessment questionnaire",
      "Account value verification (no specific amounts)",
      "Document collection (tax forms, statements)",
      "Referral partner coordination",
      "Seminar registration",
      "Billing and payment questions",
    ],
    stats: [
      { value: "100%", label: "Regulatory compliance" },
      { value: "$92K", label: "Saved on admin staff" },
      { value: "2.3x", label: "More client consultations" },
      { value: "15 min", label: "Per client saved" },
    ],
    testimonial: {
      quote:
        "During tax season, we went from chaos to calm. The AI schedules appointments, gathers documents, and ensures every call is compliant. Our CPAs can finally focus on clients, not phones.",
      author: "Rebecca Torres",
      company: "Torres Wealth Management",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200",
    },
    relatedIntegrations: ["redtail", "wealthbox", "salesforce-financial", "morningstar"],
    ctaText: "Try Our AI Now",
    faqs: [
      {
        question: "Is your AI voice agent SEC and FINRA compliant for financial advisory firms?",
        answer:
          "Yes, our platform is fully compliant with SEC and FINRA regulations. All client calls are automatically recorded, encrypted with AES-256, and stored with tamper-proof audit trails for regulatory reviews. We provide searchable call transcripts, retention policies that meet compliance requirements, and SOC-II Type 2 certification. Our system ensures that every client interaction is documented and accessible for audits.",
      },
      {
        question: "How does the AI verify client identity without compromising security?",
        answer:
          "The AI uses multi-factor identity verification by asking for account-specific information (last four digits of account, date of birth, security questions) without ever disclosing sensitive details like full account numbers or balances. For high-security requests (wire transfers, beneficiary changes), the AI routes calls to your team for manual verification. All verification attempts are logged for compliance and fraud prevention.",
      },
      {
        question: "Can the AI schedule appointments with financial advisors and sync with our CRM?",
        answer:
          "Absolutely. The AI integrates seamlessly with Redtail, Wealthbox, Salesforce Financial Services Cloud, and Morningstar to access advisor calendars in real-time. Clients can book portfolio reviews, tax planning sessions, quarterly meetings, or urgent consultations based on availability. The AI sends appointment confirmations, reminders, and syncs all client interactions directly to your CRM with full call transcripts and notes.",
      },
      {
        question:
          "How does the AI handle sensitive client conversations about accounts and investments?",
        answer:
          "The AI is trained to handle financial conversations with professionalism and discretion. It can answer general questions about account access, statement availability, upcoming seminars, and appointment scheduling without disclosing specific account values or investment details. For market-related questions or investment advice, the AI schedules callbacks with your advisors and captures the client's concerns for follow-up. All calls are encrypted and stored securely.",
      },
      {
        question: "Can the AI handle high-net-worth clients and urgent market-related calls?",
        answer:
          "Yes. You can designate VIP clients who receive priority handling. The AI recognizes these clients (via caller ID or account verification) and offers immediate escalation to your advisors during market hours or on-call support after hours. During market volatility, the AI can identify urgent concerns and immediately alert your team via SMS or phone, ensuring white-glove service for your most valuable relationships.",
      },
      {
        question:
          "How does call recording work for compliance and what retention policies are supported?",
        answer:
          "Every call is automatically recorded in compliance with SEC Rule 17a-4 and FINRA regulations. Recordings are encrypted, stored on secure servers with redundant backups, and retained according to your firm's policy (typically 7 years for advisory firms). The system provides searchable transcripts, metadata tagging, and audit-ready export capabilities. You can filter calls by client, advisor, date, or topic for quick retrieval during regulatory exams.",
      },
    ],
    trustBadges: [
      {
        type: "compliance",
        label: "SEC Compliant",
        icon: "account_balance",
        description: "Securities & Exchange Commission",
      },
      {
        type: "compliance",
        label: "FINRA Approved",
        icon: "gavel",
        description: "Financial Industry Regulatory Authority",
      },
      {
        type: "compliance",
        label: "SOC-II Type 2",
        icon: "security",
        description: "Annual security validation",
      },
      {
        type: "certification",
        label: "Bank-Level Security",
        icon: "lock",
        description: "AES-256 encryption",
      },
      { type: "clients", label: "300+ Advisors", icon: "trending_up", value: "Wealth Management" },
      {
        type: "award",
        label: "Redtail Partner",
        icon: "integration_instructions",
        value: "Certified CRM",
      },
      {
        type: "certification",
        label: "Call Recording",
        icon: "mic",
        description: "Audit trail compliant",
      },
      {
        type: "award",
        label: "99.9% Uptime",
        icon: "check_circle",
        value: "Market Hours Guaranteed",
      },
    ],
    clientCount: 300,
  },
  {
    id: "insurance",
    name: "Insurance",
    slug: "insurance",
    category: "Professional Services",
    tagline: "Quote Faster. Close More.",
    description:
      "AI answering service for insurance agencies. Qualify leads, provide instant quotes, and handle policy questions 24/7.",
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070",
    painPoints: [
      "Quote requests come in after-hours but leads go cold if not contacted within 5 minutes.",
      "Unqualified leads waste agent time on shoppers who won't convert.",
      "Policy change requests (add driver, update address) tie up agents on administrative work.",
      "Multi-line quotes (auto + home + life) require tedious data gathering.",
      "Claims questions create hold times and frustrate stressed policyholders.",
    ],
    solutions: [
      {
        title: "Instant Quote Generation",
        description:
          "AI gathers driver info, vehicle details, and coverage needs to generate preliminary auto/home quotes instantly.",
        icon: "calculate",
      },
      {
        title: "Lead Qualification",
        description:
          "AI pre-qualifies leads by current coverage, insurance score, and buying timeline. Hot leads go to agents immediately.",
        icon: "verified",
      },
      {
        title: "Policy Service Automation",
        description:
          "Simple changes (update address, add vehicle, change payment method) handled by AI without agent involvement.",
        icon: "settings",
      },
      {
        title: "Claims First Notice",
        description:
          "AI captures accident details, gets police report info, and creates claims file while routing urgent injuries to claims adjuster.",
        icon: "description",
      },
    ],
    keyFeatures: [
      "Integration with Applied Epic, AMS360, Hawksoft",
      "Multi-carrier rate comparison",
      "Driver history verification",
      "Policy document delivery",
      "Renewal reminders",
      "Cross-sell/upsell prompts (bundling)",
      "Certificate of insurance requests",
      "Payment processing integration",
    ],
    stats: [
      { value: "5.2x", label: "Faster quote delivery" },
      { value: "68%", label: "Leads from after-hours" },
      { value: "$156K", label: "Additional premium written" },
      { value: "91%", label: "Lead contact rate" },
    ],
    testimonial: {
      quote:
        "We compete against Progressive and Geico who quote online instantly. Now we can too. The AI generates quotes 24/7, and our close rate went from 18% to 34% because we respond in minutes, not hours.",
      author: "Tom Bradley",
      company: "Bradley Insurance Group",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    },
    relatedIntegrations: ["applied-epic", "ams360", "hawksoft", "agency-matrix"],
    ctaText: "Try Our AI Now",
    faqs: [
      {
        question: "How does the AI handle insurance quote requests?",
        answer:
          "The AI gathers essential information (driver details, vehicle info, current coverage, property details) and generates preliminary quotes instantly using your agency's rating engine integration. For complex multi-line quotes, the AI collects all necessary data and creates a quote request in your AMS for agent review. Leads receive quotes in minutes instead of hours, dramatically improving conversion rates.",
      },
      {
        question: "Can the AI process claims intake calls?",
        answer:
          "Yes. The AI captures First Notice of Loss (FNOL) details including accident date/time/location, parties involved, police report information, injuries, and vehicle damage descriptions. For urgent claims (injuries, total loss, liability concerns), the AI immediately routes to your claims department. All information is automatically logged in your AMS and carrier portals, reducing data entry time by 80%.",
      },
      {
        question: "How does the AI route policy questions to the right person?",
        answer:
          "The AI uses intelligent routing based on question type: simple policy changes (address update, add driver, payment methods) are handled automatically; coverage questions are answered using your agency's knowledge base; complex endorsements are routed to licensed agents; billing/payment issues go to your CSR team. You define the routing rules, and the AI ensures every inquiry reaches the right resource.",
      },
      {
        question: "Does the AI integrate with Applied Epic, Hawksoft, and AMS360?",
        answer:
          "Yes, we offer native integrations with Applied Epic, AMS360, Hawksoft, and Agency Matrix. The AI automatically creates leads, updates client records, logs activity notes, generates quote requests, and syncs policy changes bidirectionally. All call recordings and transcripts are attached to client files for compliance and training purposes. Setup typically takes 2-3 business days with our integration team.",
      },
      {
        question:
          "Is the AI compliant with insurance industry regulations and disclosure requirements?",
        answer:
          "Absolutely. Our system provides required disclosures (TCPA consent, state-specific notices, recording notifications) at call start. All conversations are recorded, encrypted, and stored for regulatory compliance with state insurance departments. The AI never provides licensed advice—it gathers information and routes to licensed agents when regulatory requirements demand it. We maintain SOC-II Type 2 certification and provide audit trails for E&O insurers.",
      },
      {
        question: "How does the AI qualify insurance leads before wasting agent time?",
        answer:
          "The AI pre-qualifies by asking key questions: current coverage status, reason for shopping, buying timeline (immediate vs. renewal date), budget expectations, and qualifying factors (DUI, SR-22, lapse in coverage). Leads are scored and prioritized—hot leads (ready to buy, good risk profile) go to agents immediately, warm leads are nurtured with email quotes, and unqualified leads (outside service area, price shoppers) are handled without agent involvement.",
      },
    ],
  },
  {
    id: "property-management",
    name: "Property Management",
    slug: "property-management",
    category: "Real Estate & Property",
    tagline: "Handle Tenant Calls. Fix Issues Faster.",
    description:
      "AI answering service for property managers. Handle maintenance requests, tenant inquiries, and emergency calls 24/7 across all properties.",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070",
    painPoints: [
      "After-hours emergencies (burst pipe, no heat, lockout) require immediate response.",
      "Managing 100+ units means 200+ monthly maintenance calls overwhelming office staff.",
      "Tenant questions (rent payment, lease renewal, guest parking) interrupt property tours.",
      "Vendor coordination requires calls to plumbers, electricians, cleaners, landscapers.",
      "Prospect inquiries need instant response or they rent from competitor.",
    ],
    solutions: [
      {
        title: "Emergency Maintenance Dispatch",
        description:
          "AI triages maintenance urgency, dispatches vendors automatically, and notifies property manager of critical issues (flooding, gas leak, lockout).",
        icon: "handyman",
      },
      {
        title: "Tenant Portal Support",
        description:
          "AI helps tenants pay rent, submit maintenance requests, renew leases, and access documents without calling office.",
        icon: "apartment",
      },
      {
        title: "Prospect Lead Capture",
        description:
          "AI answers availability questions, sends floor plans/photos, schedules tours, and pre-qualifies prospects (income, credit, move-in date).",
        icon: "real_estate_agent",
      },
      {
        title: "Multi-Property Management",
        description:
          "Handle calls for all properties with property-specific greetings, availability, and vendor lists.",
        icon: "domain",
      },
    ],
    keyFeatures: [
      "Integration with AppFolio, Buildium, Yardi",
      "Maintenance request categorization (plumbing, HVAC, electrical)",
      "Vendor dispatch by trade and availability",
      "Tenant screening questions",
      "Lease renewal coordination",
      "Rent payment assistance",
      "Tour scheduling with lockbox codes",
      "After-hours emergency protocols",
    ],
    stats: [
      { value: "24/7", label: "Tenant support coverage" },
      { value: "45 min", label: "Faster maintenance response" },
      { value: "3.1x", label: "More prospect tours booked" },
      { value: "$64K", label: "Saved on admin staff" },
    ],
    testimonial: {
      quote:
        "Managing 240 units solo was impossible. Now the AI handles 90% of calls—maintenance requests go straight to vendors, prospects book their own tours, and I only get the important stuff.",
      author: "Lisa Nguyen",
      company: "Nguyen Property Management",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    },
    relatedIntegrations: ["appfolio", "buildium", "yardi", "rent-manager"],
    ctaText: "Try Property Management AI",
    faqs: [
      {
        question: "How does the AI handle maintenance requests from tenants?",
        answer:
          "The AI categorizes maintenance requests by urgency (emergency, urgent, routine) and type (plumbing, HVAC, electrical, appliance, etc.), creates work orders in your property management software, and automatically dispatches the appropriate vendor based on trade, availability, and property location. For emergencies like burst pipes or gas leaks, it immediately notifies you and dispatches 24/7 emergency vendors.",
      },
      {
        question: "Can the AI help with tenant screening and qualification?",
        answer:
          "Yes. The AI pre-qualifies prospective tenants by asking about income verification, credit score range, rental history, move-in timeline, and reasons for moving. It collects employment details, references, and pet information before scheduling tours. This ensures your team only spends time on qualified prospects who meet your screening criteria, saving hours of administrative work.",
      },
      {
        question: "How does the AI answer lease and rent payment questions?",
        answer:
          "The AI guides tenants through common questions about rent payment methods (online portal, ACH, check), due dates, late fees, grace periods, lease renewal options, and guest parking policies. It can walk tenants through your online payment portal, send payment links via SMS, and explain lease terms without requiring property manager intervention for routine inquiries.",
      },
      {
        question:
          "Does the AI integrate with AppFolio, Buildium, Yardi, and other property management software?",
        answer:
          "We offer native integrations with AppFolio, Buildium, Yardi, Rent Manager, and other major property management platforms. The AI automatically creates maintenance work orders, logs tenant calls, schedules property tours, updates unit availability, syncs vendor information, and tracks all communications in your existing system. Setup typically takes 2-4 business days with our integration team.",
      },
      {
        question: "How does the AI handle emergency after-hours calls?",
        answer:
          "The AI is trained to identify true emergencies (flooding, no heat in winter, gas leaks, lockouts, security issues) and immediately escalate to your on-call property manager or emergency vendor. It provides safety instructions to tenants while help is dispatched. Non-emergency calls are handled with information, troubleshooting, or scheduled for next-day follow-up, ensuring you only get woken up for actual emergencies.",
      },
      {
        question: "Can the AI schedule property tours and capture prospect information?",
        answer:
          "Absolutely. The AI checks unit availability, schedules self-guided or agent-assisted tours based on your calendar, provides lockbox codes for self-showings, sends property details and floor plans via SMS, and captures complete prospect information including income, desired move-in date, and unit preferences. It can also answer questions about amenities, utilities, pet policies, and lease terms to qualify leads before tours.",
      },
    ],
  },
  {
    id: "cleaning-services",
    name: "Cleaning Services",
    slug: "cleaning-services",
    category: "Home Services",
    tagline: "Book Cleanings While You Clean.",
    description:
      "AI receptionist for residential and commercial cleaning companies. Handle booking, quotes, and customer inquiries while your team focuses on jobs.",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070",
    painPoints: [
      "Answering phones while cleaning means poor service or missed calls.",
      "Quote requests require square footage, service type, and scheduling before pricing.",
      "Last-minute cancellations leave open slots that could be filled.",
      "Recurring customer questions (What products do you use? Are you insured?) waste time.",
      "Weekend bookings come in when office is closed.",
    ],
    solutions: [
      {
        title: "Instant Quote & Booking",
        description:
          "AI asks square footage, bedrooms, service type (standard/deep/move-out), and provides instant quote. Customer books immediately.",
        icon: "cleaning_services",
      },
      {
        title: "Smart Scheduling",
        description:
          "AI fills schedule by zip code to minimize drive time. Recurring cleanings auto-scheduled. Cancellations trigger waitlist notifications.",
        icon: "calendar_today",
      },
      {
        title: "Service Area Verification",
        description:
          "AI checks if customer address is within service area before quoting. Reduces wasted quotes for out-of-area requests.",
        icon: "location_searching",
      },
      {
        title: "Customer FAQs",
        description:
          "AI answers common questions (products used, insurance, bonding, satisfaction guarantee) without interrupting your team.",
        icon: "quiz",
      },
    ],
    keyFeatures: [
      "Integration with Launch27, Jobber, Housecall Pro",
      "Square footage-based pricing calculator",
      "Service type selection (standard, deep, move-out, post-construction)",
      "Recurring booking (weekly, bi-weekly, monthly)",
      "Team availability sync",
      "Cancellation waitlist automation",
      "Special requests capture (pet-friendly, eco products)",
      "Payment processing",
    ],
    stats: [
      { value: "2.8x", label: "More bookings per week" },
      { value: "83%", label: "Weekend conversion rate" },
      { value: "$94K", label: "Additional annual revenue" },
      { value: "6 min", label: "Avg. booking time" },
    ],
    testimonial: {
      quote:
        "I was losing 30 calls a week because I couldn't answer while cleaning. Now the AI books jobs, gives quotes, and fills my schedule. I went from 15 jobs/week to 42 without hiring anyone.",
      author: "Maria Santos",
      company: "Sparkle Clean Services",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    },
    relatedIntegrations: ["launch27", "jobber", "housecall-pro", "zenmaid"],
    ctaText: "Try Our AI Now",
  },
  {
    id: "pest-control",
    name: "Pest Control",
    slug: "pest-control",
    category: "Home Services",
    tagline: "Capture Emergencies. Book Inspections.",
    description:
      "AI answering service for pest control companies. Handle emergency calls, schedule inspections, and book treatments 24/7.",
    heroImage: "https://images.unsplash.com/photo-1563465351871-80e6dfc61d5d?q=80&w=2070",
    painPoints: [
      "Pest emergencies (bees, rats, termites) happen at night and weekends when office is closed.",
      "Free inspection requests need instant scheduling or customers call competitor.",
      "Seasonal spikes (spring ants, summer mosquitoes, fall rodents) overwhelm small teams.",
      "Service area coverage requires zip code verification before quoting.",
      "Recurring treatment customers need easy rescheduling for vacations/weather.",
    ],
    solutions: [
      {
        title: "Emergency Pest Response",
        description:
          "AI assesses emergency severity (bee swarm vs. ants), dispatches technician, and provides safety instructions while customer waits.",
        icon: "pest_control",
      },
      {
        title: "Free Inspection Booking",
        description:
          "Customers book inspections instantly based on technician availability by zone. AI sends prep instructions (clear attic access, secure pets).",
        icon: "search",
      },
      {
        title: "Pest Identification Help",
        description:
          "AI asks questions to identify pest type, recommends service, and sets expectations for treatment timeline.",
        icon: "bug_report",
      },
      {
        title: "Recurring Service Management",
        description:
          "Quarterly/monthly treatment customers reschedule, skip visits, or update service with AI assistance.",
        icon: "repeat",
      },
    ],
    keyFeatures: [
      "Integration with PestPac, ServSuite, Briostack",
      "Pest type identification questionnaire",
      "Emergency vs. routine triage",
      "Service area zip code verification",
      "Free inspection scheduling",
      "Treatment follow-up reminders",
      "Seasonal service recommendations",
      "Before/after photo requests",
    ],
    stats: [
      { value: "4.2x", label: "More emergency calls captured" },
      { value: "72%", label: "After-hours bookings" },
      { value: "$127K", label: "Additional revenue" },
      { value: "98%", label: "Inspection show-up rate" },
    ],
    testimonial: {
      quote:
        "Pest emergencies don't wait for business hours. The AI captures every call 24/7, dispatches our techs perfectly, and we've doubled our customer base in one season.",
      author: "Carlos Mendez",
      company: "Mendez Pest Solutions",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
    },
    relatedIntegrations: ["pestpac", "servsuite", "briostack", "fieldroutes"],
    ctaText: "Start Pest Control Trial",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    slug: "restaurants",
    category: "Hospitality",
    tagline: "Reservations. Takeout. Catering. Automated.",
    description:
      "AI phone system for restaurants. Handle reservations, takeout orders, and catering inquiries while your staff focuses on in-house guests.",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070",
    painPoints: [
      "Peak dinner rush means unanswered phones and lost reservations.",
      "Takeout orders interrupt servers and create long hold times.",
      "Catering inquiries require menu details, headcount, and date availability.",
      "Reservation confirmations/reminders reduce no-shows but require staff time.",
      "Dietary restrictions, allergy questions, and menu details need accurate answers.",
    ],
    solutions: [
      {
        title: "Reservation Management",
        description:
          "AI books tables based on party size, time, and availability. Sends confirmations and reminders. Handles cancellations and waitlist.",
        icon: "restaurant",
      },
      {
        title: "Takeout Order Taking",
        description:
          "AI takes phone orders, reads menu, suggests add-ons, processes payment, and gives pickup time estimate.",
        icon: "takeout_dining",
      },
      {
        title: "Catering Coordination",
        description:
          "AI qualifies catering leads (date, headcount, budget), sends sample menus, and schedules tasting appointments.",
        icon: "event",
      },
      {
        title: "Menu Information",
        description:
          "AI answers questions about ingredients, allergens, preparation methods, and makes recommendations based on preferences.",
        icon: "menu_book",
      },
    ],
    keyFeatures: [
      "Integration with OpenTable, Resy, Toast, Square",
      "Party size and time availability checking",
      "Dietary restriction flagging",
      "Menu item descriptions and pricing",
      "Takeout order customization",
      "Payment processing over phone",
      "Catering package creation",
      "Special occasion notes (anniversary, birthday)",
    ],
    stats: [
      { value: "3.6x", label: "More reservations booked" },
      { value: "56%", label: "Increase in takeout orders" },
      { value: "$215K", label: "Added annual revenue" },
      { value: "45 sec", label: "Avg. answer time" },
    ],
    testimonial: {
      quote:
        "Friday nights used to be chaos—phones ringing, servers stressed, reservations missed. Now the AI handles 100% of calls flawlessly. Our team serves guests, revenue is up 40%, and stress is down.",
      author: "Chef Antonio Russo",
      company: "Russo's Italian Kitchen",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
    },
    relatedIntegrations: ["opentable", "resy", "toast", "square-restaurants"],
    ctaText: "Try Restaurant AI",
  },
];

/**
 * Get industry by slug
 */
export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

/**
 * Get industries by category
 */
export function getIndustriesByCategory(category: Industry["category"]): Industry[] {
  return INDUSTRIES.filter((industry) => industry.category === category);
}

/**
 * Get all unique categories
 */
export function getCategories(): Industry["category"][] {
  return Array.from(new Set(INDUSTRIES.map((industry) => industry.category)));
}

/**
 * Search industries by keyword
 */
export function searchIndustries(query: string): Industry[] {
  const lowerQuery = query.toLowerCase();
  return INDUSTRIES.filter(
    (industry) =>
      industry.name.toLowerCase().includes(lowerQuery) ||
      industry.description.toLowerCase().includes(lowerQuery) ||
      industry.tagline.toLowerCase().includes(lowerQuery) ||
      industry.painPoints.some((pain) => pain.toLowerCase().includes(lowerQuery))
  );
}
