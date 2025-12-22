/**
 * Industry-Specific FAQ Data
 * Comprehensive FAQs for each industry covering pricing, compliance, setup, integrations, and ROI
 */

import { IndustryFAQ } from "./industries";

export const INDUSTRY_FAQS: Record<string, IndustryFAQ[]> = {
  legal: [
    {
      question: "How much does an AI receptionist cost for law firms?",
      answer:
        "Our AI voice agents for law firms start at $97/month for the Starter plan (up to 100 calls), which is 98% less expensive than hiring a full-time receptionist. The Growth plan ($997/mo for 500 calls) and Enterprise plan (custom pricing for unlimited calls) scale with your firm's needs. All plans include 24/7 coverage, client intake, and integration with legal practice management software like Clio and MyCase.",
    },
    {
      question: "Is the AI receptionist HIPAA compliant and secure for attorney-client privilege?",
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

  "home-services": [
    {
      question: "How does the AI handle emergency calls at 2am?",
      answer:
        "The AI answers 24/7 and immediately assesses call urgency using smart triage questions. For true emergencies (burst pipes, no heat in winter, gas leaks), the AI dispatches your on-call technician via SMS and phone call with all customer details, location, and issue description. Non-emergency calls are scheduled for the next available slot. You set the criteria for what qualifies as an emergency for your business.",
    },
    {
      question: "Can the AI provide instant quotes to customers?",
      answer:
        "Yes. The AI can provide pricing estimates for common services you define (drain cleaning, AC tune-up, outlet installation, etc.) based on your pricing structure. For complex jobs requiring a site visit, the AI explains this to the customer and books a free estimate appointment. This gives customers instant information while ensuring accurate quotes for specialized work.",
    },
    {
      question: "How does the AI integrate with ServiceTitan, Jobber, or Housecall Pro?",
      answer:
        "We offer native integrations with all major field service software platforms. The AI automatically creates new jobs in your system, assigns them to technicians based on availability and location, syncs with your calendar, sends customer confirmations, and updates job status. All call recordings and notes are attached to the job record for your technicians to review before arrival.",
    },
    {
      question: "What happens during peak season when call volume spikes?",
      answer:
        "The AI scales instantly to handle unlimited simultaneous calls without adding staff or missing opportunities. During seasonal surges (summer AC failures, winter heating emergencies), the system maintains the same fast response time for every caller. You pay the same monthly rate regardless of call volume, unlike traditional call centers that charge per call or per minute.",
    },
    {
      question: "Can customers book specific technicians or time slots?",
      answer:
        "Yes. The AI presents real-time availability from your calendar and allows customers to select their preferred date and time. If you have multiple technicians, the AI can route based on specialization (HVAC vs. plumbing), location (nearest available), or customer preference. The system automatically optimizes routes to minimize drive time and maximize daily appointments.",
    },
    {
      question: "How quickly can we set up the AI for our home services business?",
      answer:
        "Most home service companies are operational in 24-48 hours. Setup includes: (1) Integrating with your field service software, (2) Setting service area boundaries and pricing, (3) Configuring emergency protocols and technician dispatch rules, (4) Testing common call scenarios (emergency, quote request, routine appointment). We handle the technical work while you focus on your business.",
    },
  ],

  "real-estate": [
    {
      question: "How does the AI qualify real estate leads?",
      answer:
        "The AI asks pre-qualification questions about budget, timeline, financing status, preferred neighborhoods, and must-have features. It scores leads as hot (ready to buy within 30 days), warm (3-6 months), or cold (just browsing), allowing you to prioritize follow-up. High-priority leads get instant callback requests, while others are nurtured automatically with property matches.",
    },
    {
      question: "Can the AI schedule showings and sync with my calendar?",
      answer:
        "Yes. The AI integrates with your Google Calendar, Outlook, or real estate CRM to show real-time availability. Buyers select showing times that work for both parties, receive confirmation with property address and lockbox codes, and get automated reminders. The AI can schedule back-to-back showings efficiently and handles rescheduling if conflicts arise.",
    },
    {
      question: "What happens when I'm already showing a property and miss a call?",
      answer:
        "The AI captures every call while you're busy. It qualifies the lead, answers questions about your listings, sends property details via SMS or email, and books the next showing in your calendar. You never miss an opportunity, and you can focus 100% on the client you're with, knowing the AI is capturing your next commission.",
    },
    {
      question: "Does the AI work for both buyer leads and seller inquiries?",
      answer:
        "Absolutely. For buyers, the AI qualifies prospects and schedules showings. For sellers, it gathers property details (address, bedrooms, condition, desired timeline), answers questions about your selling process, and books comparative market analysis (CMA) appointments. The AI can handle listings, expired listing inquiries, FSBO contacts, and general real estate questions.",
    },
    {
      question: "How does the AI handle after-hours and weekend calls?",
      answer:
        "Real estate happens on nights and weekends when buyers are free. The AI captures 100% of these calls when competitors let them go to voicemail. It responds instantly, qualifies leads, schedules showings for the following day, and sends you a summary each morning. Studies show 67% of real estate leads come after 5pm - now you'll capture them all.",
    },
    {
      question: "Can the AI integrate with Follow Up Boss, kvCORE, or other real estate CRMs?",
      answer:
        "Yes. We integrate with all major real estate platforms including Follow Up Boss, kvCORE, BoomTown, Zillow, and more. The AI automatically creates lead records, logs all interactions, schedules follow-up tasks, and syncs showing appointments. Your entire lead pipeline stays organized in one place, and you can track ROI on every conversation.",
    },
  ],

  healthcare: [
    {
      question: "Is the AI receptionist HIPAA compliant?",
      answer:
        "Yes, we are fully HIPAA compliant with Business Associate Agreement (BAA) available for all healthcare clients. All patient calls are encrypted end-to-end, stored on secure US-based servers, and protected with multi-factor authentication. We conduct regular security audits, maintain audit logs for compliance, and never use patient data for training or analytics without explicit consent.",
    },
    {
      question: "Can the AI schedule appointments and integrate with our EHR system?",
      answer:
        "Yes. We integrate with Epic, Athenahealth, Kareo, DrChrono, NextGen, and other major EHR systems. The AI checks real-time provider availability, books appointments, verifies insurance, collects copays, sends confirmation emails/SMS, and creates patient records automatically. Existing patients can reschedule or cancel, and new patients complete intake forms before their first visit.",
    },
    {
      question: "How does the AI triage urgent patient calls?",
      answer:
        "The AI uses clinical protocols you define to assess symptom urgency. Chest pain, difficulty breathing, severe injuries, or other emergencies are immediately escalated to your nurse hotline or directed to 911. Urgent symptoms get same-day appointments, routine issues are scheduled normally, and prescription refills or billing questions are handled without provider involvement.",
    },
    {
      question: "What about patients who prefer speaking to a human?",
      answer:
        'The AI is designed to sound natural and conversational, but patients can always request to speak with staff by saying "I need a person" or "transfer me to reception." The AI seamlessly transfers the call with full context (patient name, reason for call, urgency level) so your staff can pick up exactly where the AI left off. Most patients don\'t realize they\'re speaking with AI.',
    },
    {
      question: "Can the AI reduce no-shows with appointment reminders?",
      answer:
        "Yes. The AI sends automated appointment reminders via phone call, SMS, and email at intervals you specify (72 hours, 24 hours, 2 hours before). Patients can confirm, reschedule, or cancel with a simple reply. Studies show automated reminders reduce no-shows by 60%, which means $150-$300 recovered per prevented no-show. The AI also fills cancelled slots by calling patients on your waitlist.",
    },
    {
      question: "How quickly can the AI be set up for our medical practice?",
      answer:
        "Most practices are live in 3-5 business days. Setup includes: (1) HIPAA compliance documentation and BAA signing, (2) EHR integration and calendar sync, (3) Clinical triage protocols customization, (4) Insurance verification setup, (5) Testing with sample patient scenarios. We work with your IT team and provide staff training to ensure a smooth transition.",
    },
  ],

  automotive: [
    {
      question: "How does the AI handle both service and sales calls?",
      answer:
        "The AI is smart enough to identify call intent and route accordingly. Service calls go to the service department for appointment booking with your DMS integration. Sales calls are qualified for new/used vehicle interest, trade-in value, financing needs, and test drive scheduling. The AI captures all details and alerts your sales or service team immediately based on call type and urgency.",
    },
    {
      question: "Can the AI schedule service appointments in our DMS?",
      answer:
        "Yes. We integrate with CDK Global, Reynolds & Reynolds, Dealertrack, ELeads, and other dealership management systems. The AI checks service advisor availability, books oil changes, inspections, warranty work, and repairs directly into your DMS. Customers receive confirmation with service time, advisor name, and what to bring. The AI also checks for open recalls and recommends service.",
    },
    {
      question: "Does the AI work for both dealerships and independent shops?",
      answer:
        "Absolutely. For dealerships, the AI handles new car sales, used inventory questions, financing, trade-ins, parts, and service. For independent shops, it books repairs, provides estimates, checks parts availability, and schedules inspections. We customize the AI vocabulary and processes to match your specific business, whether you're a franchised dealer or independent operation.",
    },
    {
      question: "How does the AI help with service reminders and recalls?",
      answer:
        "The AI proactively calls customers when they're due for service (based on your DMS data), explains what's needed, provides pricing, and books appointments instantly. For safety recalls, the AI notifies affected customers, explains the recall details, and schedules complimentary repair appointments. This automated outreach increases service revenue and ensures customer safety.",
    },
  ],

  restaurants: [
    {
      question: "Can the AI take phone orders and process payments?",
      answer:
        "Yes. The AI reads your menu, takes custom orders with modifications (no onions, extra cheese), suggests add-ons to increase ticket size, processes credit card payments securely, and provides pickup time estimates based on kitchen capacity. Orders go directly to your POS system (Toast, Square, etc.) so your kitchen gets tickets instantly without staff writing anything down.",
    },
    {
      question: "How does the AI handle reservations and table availability?",
      answer:
        "The AI integrates with OpenTable, Resy, or your reservation system to show real-time table availability. It books reservations based on party size, preferred time, and seating area (patio, bar, dining room). The AI asks about special occasions (birthday, anniversary) so your staff can prepare, and sends confirmation/reminder messages to reduce no-shows.",
    },
    {
      question: "Can the AI answer questions about menu items and allergens?",
      answer:
        "Yes. The AI is trained on your complete menu with ingredients, preparation methods, common allergens (gluten, nuts, dairy, shellfish), and dietary options (vegan, vegetarian, gluten-free). It can recommend dishes based on preferences, explain daily specials, and flag dietary restrictions for your kitchen staff. The AI never guesses - if it doesn't know something, it offers to transfer to staff.",
    },
    {
      question: "What happens during dinner rush when the phone rings non-stop?",
      answer:
        "The AI handles unlimited simultaneous calls, so every customer gets instant service even during your busiest hours. While your servers focus on in-house guests, the AI takes takeout orders, books reservations, answers menu questions, and coordinates catering inquiries. No more choosing between answering phones and serving tables - the AI does both.",
    },
  ],
};

// Export function to get FAQs for a specific industry
export function getIndustryFAQs(industrySlug: string): IndustryFAQ[] {
  return INDUSTRY_FAQS[industrySlug] || [];
}
