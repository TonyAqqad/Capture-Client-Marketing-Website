/**
 * Industry-Specific Landing Page Data
 * Each industry has unique pain points, solutions, and ROI calculations
 * Based on competitor research (Smith.ai, CallRuby, Ruby Receptionists)
 */

export interface Industry {
  id: string;
  name: string;
  slug: string;
  category: 'Professional Services' | 'Home Services' | 'Real Estate & Property' | 'Healthcare' | 'Hospitality';
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
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'legal',
    name: 'Legal & Law Firms',
    slug: 'legal-law-firms',
    category: 'Professional Services',
    tagline: 'Never Miss a Client Call. Always Professional.',
    description: 'AI-powered intake, appointment scheduling, and 24/7 answering for law firms. Handle overflow calls, after-hours emergencies, and conflict checking with enterprise-grade security.',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070',
    painPoints: [
      'Missed calls = missed clients. Each unanswered call costs $3,000-$15,000 in potential revenue.',
      'After-hours emergencies require immediate response, but hiring 24/7 staff costs $77,000/year.',
      'Manual intake wastes paralegal time on basic questions instead of billable work.',
      'Client confidentiality requires HIPAA-level security and compliance.',
      'Conflict checking delays intake process and frustrates potential clients.',
    ],
    solutions: [
      {
        title: '24/7 Client Intake',
        description: 'AI handles initial consultations, gathers case details, and schedules appointments while you sleep. Never miss an emergency call again.',
        icon: 'gavel',
      },
      {
        title: 'Automated Conflict Checking',
        description: 'Instantly verify conflicts against your case database before booking consultations. Protect your practice and save paralegal hours.',
        icon: 'verified_user',
      },
      {
        title: 'Secure & Compliant',
        description: 'SOC-II certified with attorney-client privilege protection. All calls encrypted and stored securely for compliance.',
        icon: 'lock',
      },
      {
        title: 'Intelligent Call Routing',
        description: 'Route urgent matters to on-call attorneys immediately. Qualified leads go to intake. General questions handled by AI.',
        icon: 'alt_route',
      },
    ],
    keyFeatures: [
      'Client intake questionnaires customized to practice areas',
      'Automatic conflict of interest checking',
      'Bilingual support (English/Spanish)',
      'Integration with Clio, MyCase, PracticePanther',
      'Emergency escalation to on-call attorney',
      'Secure call recording and transcription',
      'Lead qualification and scoring',
      'Appointment scheduling with calendar sync',
    ],
    stats: [
      { value: '$77,000', label: 'Annual cost of 24/7 receptionist' },
      { value: '$95/mo', label: 'Cost with AI Voice Agent' },
      { value: '99.2%', label: 'Call answer rate' },
      { value: '45 sec', label: 'Average intake time' },
    ],
    testimonial: {
      quote: 'We went from missing 30% of calls after 5pm to answering 100% 24/7. The AI handles intake better than our paralegals and costs 1/10th the price.',
      author: 'Sarah Mitchell',
      company: 'Mitchell & Associates Law',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200',
    },
    relatedIntegrations: ['clio', 'mycase', 'practice-panther', 'lawmatics'],
    ctaText: 'Book Legal AI Demo',
    roiCalculation: {
      traditionalCost: '$77,000/year',
      aiSolution: '$1,140/year',
      annualSavings: '$75,860',
      breakdownItems: [
        { item: '24/7 Receptionist Salary', traditional: '$55,000', ai: '$0' },
        { item: 'Benefits & Taxes (40%)', traditional: '$22,000', ai: '$0' },
        { item: 'AI Voice Agent (Starter)', traditional: '$0', ai: '$1,140' },
        { item: 'Setup & Training', traditional: '$0', ai: '$0' },
      ],
    },
  },
  {
    id: 'home-services',
    name: 'Home Services',
    slug: 'home-services',
    category: 'Home Services',
    tagline: 'Answer Every Emergency. Book More Jobs.',
    description: 'AI receptionist for plumbers, HVAC, electricians, and contractors. Handle emergency calls 24/7, book appointments, and dispatch technicians automatically.',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070',
    painPoints: [
      'Emergency calls at 2am for burst pipes or HVAC failures require immediate response.',
      'Booking appointments during job sites means missed calls and lost revenue.',
      'Seasonal demand spikes overwhelm small office staff.',
      'Customers want instant quotes and availability without waiting for callbacks.',
      'Dispatching technicians manually wastes time and creates scheduling conflicts.',
    ],
    solutions: [
      {
        title: 'Emergency Call Handling',
        description: 'AI answers 24/7, assesses urgency, and immediately dispatches on-call technicians for emergencies. No more missed midnight calls.',
        icon: 'emergency',
      },
      {
        title: 'Instant Booking & Quotes',
        description: 'Customers get real-time availability, pricing estimates, and book appointments instantly without waiting for callbacks.',
        icon: 'event_available',
      },
      {
        title: 'Smart Dispatching',
        description: 'AI routes jobs to nearest available technician based on location, skills, and schedule. Optimize routes and reduce drive time.',
        icon: 'location_on',
      },
      {
        title: 'Seasonal Overflow Support',
        description: 'Scale instantly during peak seasons (summer HVAC, winter heating) without hiring temporary staff.',
        icon: 'trending_up',
      },
    ],
    keyFeatures: [
      'Emergency vs. routine call triage',
      'Automated technician dispatch',
      'Real-time calendar availability',
      'Service area verification (zip code)',
      'Quote generation for common services',
      'Integration with ServiceTitan, Jobber, Housecall Pro',
      'SMS confirmations and reminders',
      'Payment collection over phone',
    ],
    stats: [
      { value: '3.2x', label: 'More jobs booked after-hours' },
      { value: '18 min', label: 'Saved per booking' },
      { value: '24/7', label: 'Emergency availability' },
      { value: '92%', label: 'Customer satisfaction' },
    ],
    testimonial: {
      quote: 'During the winter freeze, we got 200+ emergency calls in 48 hours. The AI handled every single one, dispatched our techs perfectly, and we didn\'t miss a single job. Incredible.',
      author: 'Mike Rodriguez',
      company: 'Rodriguez Plumbing & Heating',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    },
    relatedIntegrations: ['servicetitan', 'jobber', 'housecall-pro', 'fieldpulse'],
    ctaText: 'Start Free Trial',
    roiCalculation: {
      traditionalCost: '$48,000/year',
      aiSolution: '$1,140/year',
      annualSavings: '$46,860',
      breakdownItems: [
        { item: 'Call Center Service', traditional: '$2,500/mo', ai: '$0' },
        { item: 'Missed Jobs (30/mo @ $500)', traditional: '$15,000/year', ai: '$0' },
        { item: 'AI Voice Agent', traditional: '$0', ai: '$95/mo' },
        { item: 'Additional Revenue Captured', traditional: '$0', ai: '+$180,000' },
      ],
    },
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    category: 'Real Estate & Property',
    tagline: 'Capture Every Lead. Book More Showings.',
    description: 'AI answering service for real estate agents and brokerages. Qualify leads, schedule property showings, and never miss a buyer call again.',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070',
    painPoints: [
      'Showing a property means missing buyer calls. Each missed call is a lost $12,000 commission.',
      'After-hours inquiries (evenings/weekends) are prime buying time but agents need personal time.',
      'Unqualified leads waste time on showings for buyers who can\'t afford the property.',
      'Scheduling conflicts create double-bookings and frustrated clients.',
      'Open house attendees want immediate answers about other listings.',
    ],
    solutions: [
      {
        title: 'Lead Qualification AI',
        description: 'AI pre-qualifies buyers by budget, timeline, location preferences, and financing status before wasting your time.',
        icon: 'how_to_reg',
      },
      {
        title: 'Automated Showing Scheduler',
        description: 'Buyers book showings directly into your calendar based on real-time availability. Sync with MLS lockbox codes automatically.',
        icon: 'calendar_month',
      },
      {
        title: 'After-Hours Lead Capture',
        description: 'Capture evening and weekend leads when buyers are most active. AI responds instantly while you enjoy personal time.',
        icon: 'nightlight',
      },
      {
        title: 'Multi-Property Inquiries',
        description: 'AI answers questions about all your active listings, sends property details, and schedules back-to-back showings efficiently.',
        icon: 'home_work',
      },
    ],
    keyFeatures: [
      'MLS integration for property details',
      'Buyer pre-qualification questions',
      'Automated showing coordination',
      'SMS property details and photos',
      'Lead scoring and prioritization',
      'Integration with Follow Up Boss, kvCORE, BoomTown',
      'Open house attendee capture',
      'Seller lead qualification',
    ],
    stats: [
      { value: '67%', label: 'Leads captured after-hours' },
      { value: '$12K', label: 'Avg. commission per lead' },
      { value: '4.5x', label: 'More showings booked' },
      { value: '2 min', label: 'Lead response time' },
    ],
    testimonial: {
      quote: 'I used to miss 40% of calls during showings. Now the AI books my next showing while I\'m closing the current one. My commission doubled in 6 months.',
      author: 'Jennifer Park',
      company: 'Coldwell Banker Top Producer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    },
    relatedIntegrations: ['follow-up-boss', 'kvcore', 'boomtown', 'zillow'],
    ctaText: 'Get Real Estate Demo',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    slug: 'healthcare',
    category: 'Healthcare',
    tagline: 'Always Available. Always Compliant.',
    description: 'HIPAA-compliant AI receptionist for medical practices, dental offices, and healthcare providers. Handle appointment scheduling, patient inquiries, and emergency triage 24/7.',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070',
    painPoints: [
      'Hold times frustrate patients and lead to appointment no-shows.',
      'Front desk staff overwhelmed with scheduling, insurance verification, and basic questions.',
      'After-hours urgent care questions require nurse hotline ($50-$100 per call).',
      'HIPAA compliance requires expensive security measures and staff training.',
      'Missed appointment reminder calls lead to $150-$300 in lost revenue per no-show.',
    ],
    solutions: [
      {
        title: 'HIPAA-Compliant Scheduling',
        description: 'Patients book, reschedule, and cancel appointments 24/7. AI verifies insurance and sends secure confirmations.',
        icon: 'shield',
      },
      {
        title: 'Symptom Triage',
        description: 'AI assesses urgency of patient concerns and routes to appropriate care level (urgent, same-day, routine, or ER).',
        icon: 'medical_services',
      },
      {
        title: 'Automated Reminders',
        description: 'Reduce no-shows by 60% with automated appointment reminders via phone, SMS, and email.',
        icon: 'notifications_active',
      },
      {
        title: 'Patient Portal Support',
        description: 'AI guides patients through portal registration, prescription refills, and test result inquiries.',
        icon: 'support_agent',
      },
    ],
    keyFeatures: [
      'HIPAA-compliant call recording and storage',
      'Insurance verification integration',
      'Appointment scheduling with EHR sync',
      'Prescription refill requests',
      'New patient intake forms',
      'Integration with Epic, Athenahealth, Kareo',
      'Bilingual support (English/Spanish)',
      'Emergency escalation protocols',
    ],
    stats: [
      { value: '60%', label: 'Reduction in no-shows' },
      { value: '94%', label: 'Patient satisfaction' },
      { value: '$38K', label: 'Saved on front desk staff' },
      { value: '24/7', label: 'Patient access' },
    ],
    testimonial: {
      quote: 'Our front desk was drowning in calls. Now the AI handles 80% of scheduling and routine questions, our staff focuses on patient care, and satisfaction scores jumped 23 points.',
      author: 'Dr. James Chen',
      company: 'Westside Family Medicine',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200',
    },
    relatedIntegrations: ['athenahealth', 'kareo', 'nextgen', 'drchrono'],
    ctaText: 'Schedule Healthcare Demo',
  },
  {
    id: 'it-services',
    name: 'IT Services & MSPs',
    slug: 'it-services',
    category: 'Professional Services',
    tagline: 'Instant Support. Always On.',
    description: 'AI help desk for IT service providers and MSPs. Handle support tickets, triage emergencies, and route issues to the right technician automatically.',
    heroImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2070',
    painPoints: [
      'After-hours server outages require immediate response but 24/7 NOC costs $150K+/year.',
      'Level 1 support tickets waste engineer time on password resets and basic troubleshooting.',
      'Client calls interrupt billable project work and reduce productivity.',
      'Manual ticket creation delays issue resolution and frustrates clients.',
      'SLA response times (15-min, 1-hour, 4-hour) require constant monitoring.',
    ],
    solutions: [
      {
        title: 'Automated Ticket Creation',
        description: 'AI captures issue details, creates tickets in your PSA, and assigns to appropriate technician based on skills and availability.',
        icon: 'confirmation_number',
      },
      {
        title: 'Priority Triage',
        description: 'AI assesses urgency (P1: Server Down to P4: Training Request) and escalates critical issues immediately to on-call engineer.',
        icon: 'priority_high',
      },
      {
        title: 'Self-Service Support',
        description: 'AI walks clients through common fixes (password reset, printer setup, VPN connection) without creating tickets.',
        icon: 'psychology',
      },
      {
        title: 'SLA Monitoring',
        description: 'Never miss SLA commitments. AI tracks response times and escalates if deadlines approach.',
        icon: 'timer',
      },
    ],
    keyFeatures: [
      'Integration with ConnectWise, Autotask, Kaseya',
      'Multi-tenant client management',
      'Escalation workflows by priority',
      'Knowledge base integration',
      'After-hours emergency routing',
      'Client-specific greeting and branding',
      'Technician dispatch optimization',
      'SLA compliance tracking',
    ],
    stats: [
      { value: '76%', label: 'Tickets auto-categorized' },
      { value: '12 min', label: 'Faster first response' },
      { value: '$120K', label: 'Saved on Level 1 staff' },
      { value: '99.8%', label: 'SLA compliance' },
    ],
    testimonial: {
      quote: 'We support 150 clients across 3 time zones. The AI handles after-hours calls, creates tickets with perfect detail, and escalates emergencies instantly. Our engineers can finally sleep.',
      author: 'David Kumar',
      company: 'TechShield MSP',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200',
    },
    relatedIntegrations: ['connectwise', 'autotask', 'kaseya', 'syncro'],
    ctaText: 'Try IT Support AI',
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    category: 'Home Services',
    tagline: 'Service Appointments. Sales Inquiries. Handled.',
    description: 'AI receptionist for auto dealerships, repair shops, and detailing services. Book service appointments, answer sales questions, and capture leads 24/7.',
    heroImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070',
    painPoints: [
      'Sales floor is busy, service desk is overwhelmed, and calls go unanswered during peak hours.',
      'Customers want instant appointment availability without waiting on hold.',
      'After-hours online shoppers need immediate answers about vehicle inventory and pricing.',
      'Service reminders require manual calling and leave voicemails that get ignored.',
      'Trade-in inquiries need quick KBB estimates and appraisal scheduling.',
    ],
    solutions: [
      {
        title: 'Service Scheduling AI',
        description: 'Customers book oil changes, inspections, and repairs directly into service bay calendar. AI checks advisor availability and sends confirmations.',
        icon: 'build',
      },
      {
        title: 'Sales Lead Capture',
        description: 'After-hours shoppers get answers about inventory, pricing, financing, and trade-ins. AI schedules test drives and alerts sales team.',
        icon: 'directions_car',
      },
      {
        title: 'Automated Service Reminders',
        description: 'AI calls customers for scheduled maintenance (oil change, tire rotation, inspection) and books appointments instantly.',
        icon: 'schedule',
      },
      {
        title: 'Parts Department Support',
        description: 'Check parts availability, get pricing, and reserve parts for pickup or installation.',
        icon: 'inventory',
      },
    ],
    keyFeatures: [
      'DMS integration (CDK, Reynolds & Reynolds, Dealertrack)',
      'Service advisor availability sync',
      'VIN lookup and service history',
      'Loaner car availability',
      'Warranty claim questions',
      'Parts pricing and availability',
      'Test drive scheduling',
      'Finance pre-qualification',
    ],
    stats: [
      { value: '3.8x', label: 'More service bookings' },
      { value: '42%', label: 'After-hours sales leads' },
      { value: '$285K', label: 'Annual service revenue gained' },
      { value: '88%', label: 'Reminder conversion rate' },
    ],
    testimonial: {
      quote: 'Our service department was turning away appointments because phones were ringing off the hook. Now AI handles 70% of bookings, we filled every bay, and revenue is up 40%.',
      author: 'Marcus Thompson',
      company: 'Thompson Toyota Service Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    },
    relatedIntegrations: ['cdk-global', 'reynolds-reynolds', 'dealertrack', 'eleads'],
    ctaText: 'Book Auto Demo',
  },
  {
    id: 'financial-services',
    name: 'Financial Services',
    slug: 'financial-services',
    category: 'Professional Services',
    tagline: 'Professional. Secure. Always Compliant.',
    description: 'AI receptionist for financial advisors, CPAs, and wealth management firms. Handle client inquiries, schedule consultations, and maintain regulatory compliance.',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070',
    painPoints: [
      'Client calls during market hours interrupt portfolio management and cost billable time.',
      'Tax season overwhelms front desk with appointment requests and basic questions.',
      'High-net-worth clients expect immediate white-glove service, not voicemail.',
      'Compliance requires call recording, retention, and audit trails (FINRA, SEC).',
      'New client intake requires extensive information gathering before first meeting.',
    ],
    solutions: [
      {
        title: 'Client Intake & Qualification',
        description: 'AI gathers financial goals, assets under management, and investment timeline before scheduling advisor consultation.',
        icon: 'account_balance',
      },
      {
        title: 'Appointment Management',
        description: 'Clients book reviews, tax planning, and strategy sessions based on advisor calendar availability. Automatic reminders reduce no-shows.',
        icon: 'event',
      },
      {
        title: 'Compliance Recording',
        description: 'All calls automatically recorded, encrypted, and stored for regulatory compliance. Searchable transcripts for audits.',
        icon: 'gavel',
      },
      {
        title: 'After-Hours Service',
        description: 'VIP clients get 24/7 access to schedule urgent calls during market volatility. AI alerts advisor for immediate callback.',
        icon: 'stars',
      },
    ],
    keyFeatures: [
      'SEC/FINRA compliant call recording',
      'Integration with Redtail, Wealthbox, Salesforce Financial Services',
      'Client risk assessment questionnaire',
      'Account value verification (no specific amounts)',
      'Document collection (tax forms, statements)',
      'Referral partner coordination',
      'Seminar registration',
      'Billing and payment questions',
    ],
    stats: [
      { value: '100%', label: 'Regulatory compliance' },
      { value: '$92K', label: 'Saved on admin staff' },
      { value: '2.3x', label: 'More client consultations' },
      { value: '15 min', label: 'Per client saved' },
    ],
    testimonial: {
      quote: 'During tax season, we went from chaos to calm. The AI schedules appointments, gathers documents, and ensures every call is compliant. Our CPAs can finally focus on clients, not phones.',
      author: 'Rebecca Torres',
      company: 'Torres Wealth Management',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200',
    },
    relatedIntegrations: ['redtail', 'wealthbox', 'salesforce-financial', 'morningstar'],
    ctaText: 'Get Financial Services Demo',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    slug: 'insurance',
    category: 'Professional Services',
    tagline: 'Quote Faster. Close More.',
    description: 'AI answering service for insurance agencies. Qualify leads, provide instant quotes, and handle policy questions 24/7.',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070',
    painPoints: [
      'Quote requests come in after-hours but leads go cold if not contacted within 5 minutes.',
      'Unqualified leads waste agent time on shoppers who won\'t convert.',
      'Policy change requests (add driver, update address) tie up agents on administrative work.',
      'Multi-line quotes (auto + home + life) require tedious data gathering.',
      'Claims questions create hold times and frustrate stressed policyholders.',
    ],
    solutions: [
      {
        title: 'Instant Quote Generation',
        description: 'AI gathers driver info, vehicle details, and coverage needs to generate preliminary auto/home quotes instantly.',
        icon: 'calculate',
      },
      {
        title: 'Lead Qualification',
        description: 'AI pre-qualifies leads by current coverage, insurance score, and buying timeline. Hot leads go to agents immediately.',
        icon: 'verified',
      },
      {
        title: 'Policy Service Automation',
        description: 'Simple changes (update address, add vehicle, change payment method) handled by AI without agent involvement.',
        icon: 'settings',
      },
      {
        title: 'Claims First Notice',
        description: 'AI captures accident details, gets police report info, and creates claims file while routing urgent injuries to claims adjuster.',
        icon: 'description',
      },
    ],
    keyFeatures: [
      'Integration with Applied Epic, AMS360, Hawksoft',
      'Multi-carrier rate comparison',
      'Driver history verification',
      'Policy document delivery',
      'Renewal reminders',
      'Cross-sell/upsell prompts (bundling)',
      'Certificate of insurance requests',
      'Payment processing integration',
    ],
    stats: [
      { value: '5.2x', label: 'Faster quote delivery' },
      { value: '68%', label: 'Leads from after-hours' },
      { value: '$156K', label: 'Additional premium written' },
      { value: '91%', label: 'Lead contact rate' },
    ],
    testimonial: {
      quote: 'We compete against Progressive and Geico who quote online instantly. Now we can too. The AI generates quotes 24/7, and our close rate went from 18% to 34% because we respond in minutes, not hours.',
      author: 'Tom Bradley',
      company: 'Bradley Insurance Group',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
    },
    relatedIntegrations: ['applied-epic', 'ams360', 'hawksoft', 'agency-matrix'],
    ctaText: 'Get Insurance Demo',
  },
  {
    id: 'property-management',
    name: 'Property Management',
    slug: 'property-management',
    category: 'Real Estate & Property',
    tagline: 'Handle Tenant Calls. Fix Issues Faster.',
    description: 'AI answering service for property managers. Handle maintenance requests, tenant inquiries, and emergency calls 24/7 across all properties.',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070',
    painPoints: [
      'After-hours emergencies (burst pipe, no heat, lockout) require immediate response.',
      'Managing 100+ units means 200+ monthly maintenance calls overwhelming office staff.',
      'Tenant questions (rent payment, lease renewal, guest parking) interrupt property tours.',
      'Vendor coordination requires calls to plumbers, electricians, cleaners, landscapers.',
      'Prospect inquiries need instant response or they rent from competitor.',
    ],
    solutions: [
      {
        title: 'Emergency Maintenance Dispatch',
        description: 'AI triages maintenance urgency, dispatches vendors automatically, and notifies property manager of critical issues (flooding, gas leak, lockout).',
        icon: 'handyman',
      },
      {
        title: 'Tenant Portal Support',
        description: 'AI helps tenants pay rent, submit maintenance requests, renew leases, and access documents without calling office.',
        icon: 'apartment',
      },
      {
        title: 'Prospect Lead Capture',
        description: 'AI answers availability questions, sends floor plans/photos, schedules tours, and pre-qualifies prospects (income, credit, move-in date).',
        icon: 'real_estate_agent',
      },
      {
        title: 'Multi-Property Management',
        description: 'Handle calls for all properties with property-specific greetings, availability, and vendor lists.',
        icon: 'domain',
      },
    ],
    keyFeatures: [
      'Integration with AppFolio, Buildium, Yardi',
      'Maintenance request categorization (plumbing, HVAC, electrical)',
      'Vendor dispatch by trade and availability',
      'Tenant screening questions',
      'Lease renewal coordination',
      'Rent payment assistance',
      'Tour scheduling with lockbox codes',
      'After-hours emergency protocols',
    ],
    stats: [
      { value: '24/7', label: 'Tenant support coverage' },
      { value: '45 min', label: 'Faster maintenance response' },
      { value: '3.1x', label: 'More prospect tours booked' },
      { value: '$64K', label: 'Saved on admin staff' },
    ],
    testimonial: {
      quote: 'Managing 240 units solo was impossible. Now the AI handles 90% of calls—maintenance requests go straight to vendors, prospects book their own tours, and I only get the important stuff.',
      author: 'Lisa Nguyen',
      company: 'Nguyen Property Management',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    },
    relatedIntegrations: ['appfolio', 'buildium', 'yardi', 'rent-manager'],
    ctaText: 'Try Property Management AI',
  },
  {
    id: 'cleaning-services',
    name: 'Cleaning Services',
    slug: 'cleaning-services',
    category: 'Home Services',
    tagline: 'Book Cleanings While You Clean.',
    description: 'AI receptionist for residential and commercial cleaning companies. Handle booking, quotes, and customer inquiries while your team focuses on jobs.',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070',
    painPoints: [
      'Answering phones while cleaning means poor service or missed calls.',
      'Quote requests require square footage, service type, and scheduling before pricing.',
      'Last-minute cancellations leave open slots that could be filled.',
      'Recurring customer questions (What products do you use? Are you insured?) waste time.',
      'Weekend bookings come in when office is closed.',
    ],
    solutions: [
      {
        title: 'Instant Quote & Booking',
        description: 'AI asks square footage, bedrooms, service type (standard/deep/move-out), and provides instant quote. Customer books immediately.',
        icon: 'cleaning_services',
      },
      {
        title: 'Smart Scheduling',
        description: 'AI fills schedule by zip code to minimize drive time. Recurring cleanings auto-scheduled. Cancellations trigger waitlist notifications.',
        icon: 'calendar_today',
      },
      {
        title: 'Service Area Verification',
        description: 'AI checks if customer address is within service area before quoting. Reduces wasted quotes for out-of-area requests.',
        icon: 'location_searching',
      },
      {
        title: 'Customer FAQs',
        description: 'AI answers common questions (products used, insurance, bonding, satisfaction guarantee) without interrupting your team.',
        icon: 'quiz',
      },
    ],
    keyFeatures: [
      'Integration with Launch27, Jobber, Housecall Pro',
      'Square footage-based pricing calculator',
      'Service type selection (standard, deep, move-out, post-construction)',
      'Recurring booking (weekly, bi-weekly, monthly)',
      'Team availability sync',
      'Cancellation waitlist automation',
      'Special requests capture (pet-friendly, eco products)',
      'Payment processing',
    ],
    stats: [
      { value: '2.8x', label: 'More bookings per week' },
      { value: '83%', label: 'Weekend conversion rate' },
      { value: '$94K', label: 'Additional annual revenue' },
      { value: '6 min', label: 'Avg. booking time' },
    ],
    testimonial: {
      quote: 'I was losing 30 calls a week because I couldn\'t answer while cleaning. Now the AI books jobs, gives quotes, and fills my schedule. I went from 15 jobs/week to 42 without hiring anyone.',
      author: 'Maria Santos',
      company: 'Sparkle Clean Services',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
    },
    relatedIntegrations: ['launch27', 'jobber', 'housecall-pro', 'zenmaid'],
    ctaText: 'Book Cleaning Demo',
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    slug: 'pest-control',
    category: 'Home Services',
    tagline: 'Capture Emergencies. Book Inspections.',
    description: 'AI answering service for pest control companies. Handle emergency calls, schedule inspections, and book treatments 24/7.',
    heroImage: 'https://images.unsplash.com/photo-1563465351871-80e6dfc61d5d?q=80&w=2070',
    painPoints: [
      'Pest emergencies (bees, rats, termites) happen at night and weekends when office is closed.',
      'Free inspection requests need instant scheduling or customers call competitor.',
      'Seasonal spikes (spring ants, summer mosquitoes, fall rodents) overwhelm small teams.',
      'Service area coverage requires zip code verification before quoting.',
      'Recurring treatment customers need easy rescheduling for vacations/weather.',
    ],
    solutions: [
      {
        title: 'Emergency Pest Response',
        description: 'AI assesses emergency severity (bee swarm vs. ants), dispatches technician, and provides safety instructions while customer waits.',
        icon: 'pest_control',
      },
      {
        title: 'Free Inspection Booking',
        description: 'Customers book inspections instantly based on technician availability by zone. AI sends prep instructions (clear attic access, secure pets).',
        icon: 'search',
      },
      {
        title: 'Pest Identification Help',
        description: 'AI asks questions to identify pest type, recommends service, and sets expectations for treatment timeline.',
        icon: 'bug_report',
      },
      {
        title: 'Recurring Service Management',
        description: 'Quarterly/monthly treatment customers reschedule, skip visits, or update service with AI assistance.',
        icon: 'repeat',
      },
    ],
    keyFeatures: [
      'Integration with PestPac, ServSuite, Briostack',
      'Pest type identification questionnaire',
      'Emergency vs. routine triage',
      'Service area zip code verification',
      'Free inspection scheduling',
      'Treatment follow-up reminders',
      'Seasonal service recommendations',
      'Before/after photo requests',
    ],
    stats: [
      { value: '4.2x', label: 'More emergency calls captured' },
      { value: '72%', label: 'After-hours bookings' },
      { value: '$127K', label: 'Additional revenue' },
      { value: '98%', label: 'Inspection show-up rate' },
    ],
    testimonial: {
      quote: 'Pest emergencies don\'t wait for business hours. The AI captures every call 24/7, dispatches our techs perfectly, and we\'ve doubled our customer base in one season.',
      author: 'Carlos Mendez',
      company: 'Mendez Pest Solutions',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
    },
    relatedIntegrations: ['pestpac', 'servsuite', 'briostack', 'fieldroutes'],
    ctaText: 'Start Pest Control Trial',
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    slug: 'restaurants',
    category: 'Hospitality',
    tagline: 'Reservations. Takeout. Catering. Automated.',
    description: 'AI phone system for restaurants. Handle reservations, takeout orders, and catering inquiries while your staff focuses on in-house guests.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070',
    painPoints: [
      'Peak dinner rush means unanswered phones and lost reservations.',
      'Takeout orders interrupt servers and create long hold times.',
      'Catering inquiries require menu details, headcount, and date availability.',
      'Reservation confirmations/reminders reduce no-shows but require staff time.',
      'Dietary restrictions, allergy questions, and menu details need accurate answers.',
    ],
    solutions: [
      {
        title: 'Reservation Management',
        description: 'AI books tables based on party size, time, and availability. Sends confirmations and reminders. Handles cancellations and waitlist.',
        icon: 'restaurant',
      },
      {
        title: 'Takeout Order Taking',
        description: 'AI takes phone orders, reads menu, suggests add-ons, processes payment, and gives pickup time estimate.',
        icon: 'takeout_dining',
      },
      {
        title: 'Catering Coordination',
        description: 'AI qualifies catering leads (date, headcount, budget), sends sample menus, and schedules tasting appointments.',
        icon: 'event',
      },
      {
        title: 'Menu Information',
        description: 'AI answers questions about ingredients, allergens, preparation methods, and makes recommendations based on preferences.',
        icon: 'menu_book',
      },
    ],
    keyFeatures: [
      'Integration with OpenTable, Resy, Toast, Square',
      'Party size and time availability checking',
      'Dietary restriction flagging',
      'Menu item descriptions and pricing',
      'Takeout order customization',
      'Payment processing over phone',
      'Catering package creation',
      'Special occasion notes (anniversary, birthday)',
    ],
    stats: [
      { value: '3.6x', label: 'More reservations booked' },
      { value: '56%', label: 'Increase in takeout orders' },
      { value: '$215K', label: 'Added annual revenue' },
      { value: '45 sec', label: 'Avg. answer time' },
    ],
    testimonial: {
      quote: 'Friday nights used to be chaos—phones ringing, servers stressed, reservations missed. Now the AI handles 100% of calls flawlessly. Our team serves guests, revenue is up 40%, and stress is down.',
      author: 'Chef Antonio Russo',
      company: 'Russo\'s Italian Kitchen',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
    },
    relatedIntegrations: ['opentable', 'resy', 'toast', 'square-restaurants'],
    ctaText: 'Try Restaurant AI',
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
export function getIndustriesByCategory(category: Industry['category']): Industry[] {
  return INDUSTRIES.filter((industry) => industry.category === category);
}

/**
 * Get all unique categories
 */
export function getCategories(): Industry['category'][] {
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
