// ============================================
// PRE-BUILT SCENARIOS FOR SCENARIO BUILDER
// 18 Curated Conversations Across 6 Industries
// ============================================

export type BusinessType = "plumbing" | "dental" | "hvac" | "auto" | "law" | "general";
export type ScenarioCategory =
  | "emergency"
  | "routine"
  | "pricing"
  | "scheduling"
  | "complaint"
  | "after_hours";
export type Intent =
  | "emergency"
  | "service_request"
  | "inquiry"
  | "schedule"
  | "pricing"
  | "complaint"
  | "general";

export interface TranscriptMessage {
  timestamp: string;
  speaker: "AI" | "Caller";
  text: string;
  emotion?: "neutral" | "frustrated" | "relieved" | "curious" | "urgent" | "happy";
}

export interface ScenarioOutcome {
  leadScore: number;
  intent: Intent;
  actionTaken: string;
  crmFields: {
    name?: string;
    phone?: string;
    service?: string;
    urgency?: "low" | "medium" | "high";
    appointmentTime?: string;
  };
}

export interface Scenario {
  id: string;
  title: string;
  businessType: BusinessType;
  category: ScenarioCategory;
  description: string;
  callerPersona: string;
  duration: string;
  transcript: TranscriptMessage[];
  outcome: ScenarioOutcome;
}

// ==================== PLUMBING SCENARIOS ====================

const plumbingEmergency: Scenario = {
  id: "plumbing-emergency",
  title: "Emergency Pipe Burst",
  businessType: "plumbing",
  category: "emergency",
  description: "Homeowner with burst pipe flooding basement at 11 PM",
  callerPersona: "Panicked homeowner, water everywhere",
  duration: "1:52",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Thank you for calling Elite Plumbing Services. This is your AI assistant. How can I help you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:06",
      speaker: "Caller",
      text: "Oh thank god someone answered! I have water shooting everywhere in my basement - a pipe just burst!",
      emotion: "urgent",
    },
    {
      timestamp: "0:13",
      speaker: "AI",
      text: "I understand this is urgent. First, can you locate your main water shut-off valve and turn it off? It's usually near your water meter.",
      emotion: "neutral",
    },
    {
      timestamp: "0:21",
      speaker: "Caller",
      text: "Okay, okay... I found it. Turning it now. The water stopped!",
      emotion: "relieved",
    },
    {
      timestamp: "0:27",
      speaker: "AI",
      text: "Perfect, you've prevented further damage. Now let me get an emergency plumber to you right away. May I have your name and address?",
      emotion: "neutral",
    },
    {
      timestamp: "0:35",
      speaker: "Caller",
      text: "I'm David Chen, 847 Maple Drive.",
      emotion: "neutral",
    },
    {
      timestamp: "0:39",
      speaker: "AI",
      text: "Thank you, David. I have a certified plumber available who can be there within 45 minutes. The emergency service fee is $150 plus parts and labor. Should I dispatch them now?",
      emotion: "neutral",
    },
    {
      timestamp: "0:51",
      speaker: "Caller",
      text: "Yes, please send them immediately!",
      emotion: "urgent",
    },
    {
      timestamp: "0:54",
      speaker: "AI",
      text: "Done. Mike Thompson is on his way - he's our senior technician with 15 years experience. I'm texting you his photo and live ETA. Is there anything else I can help with while you wait?",
      emotion: "neutral",
    },
    {
      timestamp: "1:05",
      speaker: "Caller",
      text: "No, that's perfect. Thank you so much for answering so late.",
      emotion: "relieved",
    },
    {
      timestamp: "1:10",
      speaker: "AI",
      text: "That's what we're here for, David. Mike will take great care of you. Have a good night.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 10,
    intent: "emergency",
    actionTaken: "Emergency Service Dispatched",
    crmFields: {
      name: "David Chen",
      service: "Burst Pipe Repair",
      urgency: "high",
      appointmentTime: "Within 45 minutes",
    },
  },
};

const plumbingWaterHeater: Scenario = {
  id: "plumbing-water-heater",
  title: "Water Heater Repair",
  businessType: "plumbing",
  category: "routine",
  description: "Customer with no hot water needs service scheduled",
  callerPersona: "Inconvenienced homeowner, patient but wants resolution",
  duration: "1:38",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Thank you for calling Elite Plumbing. How can I help you today?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, my water heater isn't working. We haven't had hot water since yesterday morning.",
      emotion: "frustrated",
    },
    {
      timestamp: "0:12",
      speaker: "AI",
      text: "I'm sorry to hear that - no hot water is definitely frustrating. Is your water heater gas or electric?",
      emotion: "neutral",
    },
    {
      timestamp: "0:18",
      speaker: "Caller",
      text: "It's gas. It's about 8 years old.",
      emotion: "neutral",
    },
    {
      timestamp: "0:22",
      speaker: "AI",
      text: "Got it. Sometimes it's a simple fix like relighting the pilot. Have you checked if the pilot light is on?",
      emotion: "neutral",
    },
    {
      timestamp: "0:29",
      speaker: "Caller",
      text: "I tried that already - it won't stay lit.",
      emotion: "frustrated",
    },
    {
      timestamp: "0:33",
      speaker: "AI",
      text: "That's helpful information - likely the thermocouple needs replacement. It's a common repair. I can have a technician there tomorrow morning between 8-10 AM, or afternoon 1-3 PM. Which works better?",
      emotion: "neutral",
    },
    { timestamp: "0:45", speaker: "Caller", text: "Morning would be great.", emotion: "neutral" },
    {
      timestamp: "0:48",
      speaker: "AI",
      text: "Perfect. May I have your name and phone number for the appointment?",
      emotion: "neutral",
    },
    {
      timestamp: "0:52",
      speaker: "Caller",
      text: "Sarah Mitchell, 555-234-8891.",
      emotion: "neutral",
    },
    {
      timestamp: "0:58",
      speaker: "AI",
      text: "Great, Sarah. You're booked for tomorrow 8-10 AM. The diagnostic is $95, and if it's the thermocouple, parts and labor typically run $150-200. We'll call 30 minutes before arrival.",
      emotion: "neutral",
    },
    {
      timestamp: "1:12",
      speaker: "Caller",
      text: "That sounds reasonable. Thank you!",
      emotion: "happy",
    },
    {
      timestamp: "1:15",
      speaker: "AI",
      text: "You're welcome! We'll have your hot water back in no time.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 8,
    intent: "service_request",
    actionTaken: "Appointment Scheduled",
    crmFields: {
      name: "Sarah Mitchell",
      phone: "555-234-8891",
      service: "Water Heater Repair",
      urgency: "medium",
      appointmentTime: "Tomorrow 8-10 AM",
    },
  },
};

const plumbingPricing: Scenario = {
  id: "plumbing-pricing",
  title: "Drain Cleaning Quote",
  businessType: "plumbing",
  category: "pricing",
  description: "Customer asking about drain cleaning costs",
  callerPersona: "Price-conscious customer comparing options",
  duration: "1:24",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Elite Plumbing, how can I help you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:04",
      speaker: "Caller",
      text: "Hi, I was wondering how much you charge for drain cleaning?",
      emotion: "curious",
    },
    {
      timestamp: "0:09",
      speaker: "AI",
      text: "Great question! Our drain cleaning starts at $149 for a standard clean. Which drain is giving you trouble?",
      emotion: "neutral",
    },
    {
      timestamp: "0:16",
      speaker: "Caller",
      text: "It's my kitchen sink. It's been draining really slowly.",
      emotion: "neutral",
    },
    {
      timestamp: "0:21",
      speaker: "AI",
      text: "Kitchen drains are often caused by grease buildup. Our $149 service includes a thorough cleaning and camera inspection to make sure there's no deeper issue. We guarantee the work for 30 days.",
      emotion: "neutral",
    },
    {
      timestamp: "0:35",
      speaker: "Caller",
      text: "That's not bad. How soon could you come out?",
      emotion: "curious",
    },
    {
      timestamp: "0:39",
      speaker: "AI",
      text: "We have availability tomorrow afternoon or Thursday morning. Would either of those work for you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:46",
      speaker: "Caller",
      text: "Thursday morning would be perfect.",
      emotion: "neutral",
    },
    {
      timestamp: "0:49",
      speaker: "AI",
      text: "Excellent! May I have your name and address to get that scheduled?",
      emotion: "neutral",
    },
    {
      timestamp: "0:53",
      speaker: "Caller",
      text: "Tom Rivera, 2201 Oak Street.",
      emotion: "neutral",
    },
    {
      timestamp: "0:58",
      speaker: "AI",
      text: "You're all set, Tom. Thursday between 9-11 AM. We'll text you a reminder and the technician's ETA.",
      emotion: "neutral",
    },
    { timestamp: "1:07", speaker: "Caller", text: "Great, thanks for the info!", emotion: "happy" },
  ],
  outcome: {
    leadScore: 7,
    intent: "pricing",
    actionTaken: "Appointment Scheduled",
    crmFields: {
      name: "Tom Rivera",
      service: "Drain Cleaning",
      urgency: "low",
      appointmentTime: "Thursday 9-11 AM",
    },
  },
};

// ==================== DENTAL SCENARIOS ====================

const dentalEmergency: Scenario = {
  id: "dental-emergency",
  title: "Severe Toothache",
  businessType: "dental",
  category: "emergency",
  description: "Patient with severe tooth pain needs same-day appointment",
  callerPersona: "In significant pain, needs immediate help",
  duration: "1:45",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Good morning, Bright Smile Dental. How may I help you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, I'm in a lot of pain. My tooth has been throbbing all night and I can barely eat.",
      emotion: "urgent",
    },
    {
      timestamp: "0:13",
      speaker: "AI",
      text: "I'm so sorry you're in pain. We'll get you seen today. Can you point to which tooth is hurting - is it in the front, back, upper, or lower?",
      emotion: "neutral",
    },
    {
      timestamp: "0:22",
      speaker: "Caller",
      text: "It's in the back, lower right side. The pain is shooting up to my ear.",
      emotion: "frustrated",
    },
    {
      timestamp: "0:29",
      speaker: "AI",
      text: "That sounds like it could be an infection. Dr. Martinez has an emergency slot at 11:30 AM today. Can you make it in then?",
      emotion: "neutral",
    },
    {
      timestamp: "0:38",
      speaker: "Caller",
      text: "Yes, absolutely. I'll take it.",
      emotion: "relieved",
    },
    {
      timestamp: "0:41",
      speaker: "AI",
      text: "Perfect. In the meantime, you can take ibuprofen for the pain if you're able. Are you a current patient with us?",
      emotion: "neutral",
    },
    {
      timestamp: "0:49",
      speaker: "Caller",
      text: "No, this is my first time calling.",
      emotion: "neutral",
    },
    {
      timestamp: "0:52",
      speaker: "AI",
      text: "No problem! May I have your name and a good phone number?",
      emotion: "neutral",
    },
    {
      timestamp: "0:56",
      speaker: "Caller",
      text: "Jennifer Walsh, 555-876-4321.",
      emotion: "neutral",
    },
    {
      timestamp: "1:02",
      speaker: "AI",
      text: "Thank you, Jennifer. I'm texting you new patient forms to save time. We're at 450 Main Street. Plan to arrive by 11:15 so we can get your paperwork done.",
      emotion: "neutral",
    },
    {
      timestamp: "1:15",
      speaker: "Caller",
      text: "Thank you so much. I really appreciate you fitting me in.",
      emotion: "relieved",
    },
    {
      timestamp: "1:20",
      speaker: "AI",
      text: "Of course! We'll get you feeling better soon. See you at 11:30.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 9,
    intent: "emergency",
    actionTaken: "Emergency Appointment Booked",
    crmFields: {
      name: "Jennifer Walsh",
      phone: "555-876-4321",
      service: "Emergency Dental - Possible Infection",
      urgency: "high",
      appointmentTime: "Today 11:30 AM",
    },
  },
};

const dentalNewPatient: Scenario = {
  id: "dental-new-patient",
  title: "New Patient Cleaning",
  businessType: "dental",
  category: "scheduling",
  description: "New patient scheduling first cleaning and exam",
  callerPersona: "Health-conscious adult establishing dental care",
  duration: "1:32",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Bright Smile Dental, this is your AI assistant. How can I help?",
      emotion: "neutral",
    },
    {
      timestamp: "0:06",
      speaker: "Caller",
      text: "Hi, I just moved to the area and I'm looking for a new dentist. Do you take new patients?",
      emotion: "curious",
    },
    {
      timestamp: "0:13",
      speaker: "AI",
      text: "Welcome to the neighborhood! Yes, we're accepting new patients. We'd love to have you. What type of appointment are you looking for?",
      emotion: "neutral",
    },
    {
      timestamp: "0:22",
      speaker: "Caller",
      text: "Just a regular cleaning and checkup. It's been about 6 months since my last one.",
      emotion: "neutral",
    },
    {
      timestamp: "0:28",
      speaker: "AI",
      text: "Perfect timing! Our new patient special includes a comprehensive exam, full cleaning, and X-rays for $99. That's a $250 value.",
      emotion: "neutral",
    },
    {
      timestamp: "0:38",
      speaker: "Caller",
      text: "Oh wow, that's a great deal. What times do you have available?",
      emotion: "happy",
    },
    {
      timestamp: "0:43",
      speaker: "AI",
      text: "We have openings Monday at 2 PM, Wednesday at 10 AM, or Friday at 4 PM. Any preference?",
      emotion: "neutral",
    },
    {
      timestamp: "0:51",
      speaker: "Caller",
      text: "Wednesday at 10 works great for me.",
      emotion: "neutral",
    },
    {
      timestamp: "0:55",
      speaker: "AI",
      text: "Wonderful! May I have your name and phone number?",
      emotion: "neutral",
    },
    {
      timestamp: "0:59",
      speaker: "Caller",
      text: "Michael Torres, 555-234-5678.",
      emotion: "neutral",
    },
    {
      timestamp: "1:05",
      speaker: "AI",
      text: "You're all set, Michael! Wednesday at 10 AM. I'll text you our new patient forms to fill out ahead of time. Do you have dental insurance you'd like us to verify?",
      emotion: "neutral",
    },
    {
      timestamp: "1:17",
      speaker: "Caller",
      text: "Yes, I have Delta Dental through my employer.",
      emotion: "neutral",
    },
    {
      timestamp: "1:21",
      speaker: "AI",
      text: "Great, we'll verify your benefits before your visit. See you Wednesday!",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 8,
    intent: "schedule",
    actionTaken: "New Patient Appointment Booked",
    crmFields: {
      name: "Michael Torres",
      phone: "555-234-5678",
      service: "New Patient Exam + Cleaning",
      urgency: "low",
      appointmentTime: "Wednesday 10 AM",
    },
  },
};

const dentalInsurance: Scenario = {
  id: "dental-insurance",
  title: "Insurance Question",
  businessType: "dental",
  category: "pricing",
  description: "Caller asking about insurance coverage and costs",
  callerPersona: "Budget-conscious patient researching options",
  duration: "1:28",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Bright Smile Dental, how can I assist you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, I need some dental work done and I'm trying to figure out costs. Do you take Cigna insurance?",
      emotion: "curious",
    },
    {
      timestamp: "0:13",
      speaker: "AI",
      text: "Yes, we're in-network with Cigna! What type of dental work do you need?",
      emotion: "neutral",
    },
    {
      timestamp: "0:18",
      speaker: "Caller",
      text: "My dentist said I need a crown. What would that cost with insurance?",
      emotion: "curious",
    },
    {
      timestamp: "0:24",
      speaker: "AI",
      text: "Crowns typically run $800-1200 depending on the material. With Cigna, you're usually covered at 50% after your deductible. So your out-of-pocket would be around $400-600.",
      emotion: "neutral",
    },
    {
      timestamp: "0:37",
      speaker: "Caller",
      text: "That's helpful. Do you offer payment plans?",
      emotion: "curious",
    },
    {
      timestamp: "0:41",
      speaker: "AI",
      text: "Absolutely! We offer CareCredit with 0% interest for 12 months, or we can set up an in-house payment plan. Would you like to schedule a consultation to get an exact quote?",
      emotion: "neutral",
    },
    { timestamp: "0:53", speaker: "Caller", text: "Yes, that would be great.", emotion: "neutral" },
    {
      timestamp: "0:56",
      speaker: "AI",
      text: "Perfect. We have availability Thursday at 3 PM or Friday at 11 AM. What's your name?",
      emotion: "neutral",
    },
    {
      timestamp: "1:03",
      speaker: "Caller",
      text: "Lisa Park. Thursday at 3 works.",
      emotion: "neutral",
    },
    {
      timestamp: "1:07",
      speaker: "AI",
      text: "You're booked, Lisa! Bring your Cigna card and we'll verify your exact benefits. See you Thursday!",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 7,
    intent: "pricing",
    actionTaken: "Consultation Scheduled",
    crmFields: {
      name: "Lisa Park",
      service: "Crown Consultation",
      urgency: "low",
      appointmentTime: "Thursday 3 PM",
    },
  },
};

// ==================== HVAC SCENARIOS ====================

const hvacEmergency: Scenario = {
  id: "hvac-emergency",
  title: "AC Emergency - Heatwave",
  businessType: "hvac",
  category: "emergency",
  description: "Family without AC during 95°F heatwave",
  callerPersona: "Desperate parent with young children at home",
  duration: "1:48",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Climate Control HVAC, 24/7 service. How can I help?",
      emotion: "neutral",
    },
    {
      timestamp: "0:06",
      speaker: "Caller",
      text: "My AC completely stopped working and it's 95 degrees outside. I have two young kids and it's getting unbearable in here.",
      emotion: "urgent",
    },
    {
      timestamp: "0:15",
      speaker: "AI",
      text: "I completely understand - that's a tough situation with kids involved. Let me help you right away. When did it stop working?",
      emotion: "neutral",
    },
    {
      timestamp: "0:23",
      speaker: "Caller",
      text: "About an hour ago. It was running fine then just... nothing. No air at all.",
      emotion: "frustrated",
    },
    {
      timestamp: "0:30",
      speaker: "AI",
      text: "Have you checked if the thermostat display is on and if the breaker tripped?",
      emotion: "neutral",
    },
    {
      timestamp: "0:36",
      speaker: "Caller",
      text: "Thermostat is on but I didn't check the breaker. Hold on...",
      emotion: "neutral",
    },
    {
      timestamp: "0:45",
      speaker: "Caller",
      text: "Okay, the breaker looks fine. Still nothing.",
      emotion: "frustrated",
    },
    {
      timestamp: "0:50",
      speaker: "AI",
      text: "Sounds like it could be the compressor or capacitor. I have a technician who can be there in about 90 minutes. The emergency service call is $99, and most repairs are completed same-day.",
      emotion: "neutral",
    },
    {
      timestamp: "1:05",
      speaker: "Caller",
      text: "Yes, please send someone. This is miserable.",
      emotion: "urgent",
    },
    {
      timestamp: "1:09",
      speaker: "AI",
      text: "On it. May I have your name and address?",
      emotion: "neutral",
    },
    {
      timestamp: "1:12",
      speaker: "Caller",
      text: "Amanda Foster, 1892 Sunset Boulevard.",
      emotion: "neutral",
    },
    {
      timestamp: "1:18",
      speaker: "AI",
      text: "Thank you, Amanda. Carlos will be there by 3:30 PM. He's one of our best - he'll have you cooled down in no time. I'll text you his photo and live tracking.",
      emotion: "neutral",
    },
    {
      timestamp: "1:30",
      speaker: "Caller",
      text: "Thank you so much. You're a lifesaver!",
      emotion: "relieved",
    },
    {
      timestamp: "1:34",
      speaker: "AI",
      text: "Hang in there! Help is on the way.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 10,
    intent: "emergency",
    actionTaken: "Emergency Tech Dispatched",
    crmFields: {
      name: "Amanda Foster",
      service: "AC Emergency Repair",
      urgency: "high",
      appointmentTime: "Today by 3:30 PM",
    },
  },
};

const hvacHeating: Scenario = {
  id: "hvac-heating",
  title: "Furnace Making Noise",
  businessType: "hvac",
  category: "routine",
  description: "Homeowner concerned about strange furnace sounds",
  callerPersona: "Proactive homeowner wanting to prevent bigger issues",
  duration: "1:35",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Climate Control HVAC, how may I help you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, my furnace has been making a weird banging noise when it kicks on. Should I be worried?",
      emotion: "curious",
    },
    {
      timestamp: "0:13",
      speaker: "AI",
      text: "Good call reaching out - unusual noises are worth checking. Can you describe the banging? Is it a single loud bang or multiple smaller ones?",
      emotion: "neutral",
    },
    {
      timestamp: "0:22",
      speaker: "Caller",
      text: "It's like one big bang, then smaller rattling sounds. Then it runs fine.",
      emotion: "neutral",
    },
    {
      timestamp: "0:29",
      speaker: "AI",
      text: "That could be delayed ignition or loose ductwork. Neither is dangerous right now, but delayed ignition should be addressed before winter. Would you like to schedule a tune-up? We can diagnose and fix it.",
      emotion: "neutral",
    },
    {
      timestamp: "0:44",
      speaker: "Caller",
      text: "Yes, probably a good idea. What does that cost?",
      emotion: "curious",
    },
    {
      timestamp: "0:48",
      speaker: "AI",
      text: "Our furnace tune-up is $89 and includes a 21-point inspection. If repairs are needed, we'll quote before doing any work.",
      emotion: "neutral",
    },
    {
      timestamp: "0:58",
      speaker: "Caller",
      text: "That sounds fair. What's your availability?",
      emotion: "neutral",
    },
    {
      timestamp: "1:02",
      speaker: "AI",
      text: "We have tomorrow afternoon or Saturday morning. Which works better?",
      emotion: "neutral",
    },
    {
      timestamp: "1:08",
      speaker: "Caller",
      text: "Saturday morning, please. I'm Robert Kim.",
      emotion: "neutral",
    },
    {
      timestamp: "1:13",
      speaker: "AI",
      text: "Perfect, Robert! Saturday 9-11 AM. We'll call 30 minutes ahead. What's the best number?",
      emotion: "neutral",
    },
    {
      timestamp: "1:20",
      speaker: "Caller",
      text: "555-345-6789. Thanks for the help!",
      emotion: "happy",
    },
  ],
  outcome: {
    leadScore: 7,
    intent: "service_request",
    actionTaken: "Tune-Up Scheduled",
    crmFields: {
      name: "Robert Kim",
      phone: "555-345-6789",
      service: "Furnace Tune-Up + Diagnosis",
      urgency: "medium",
      appointmentTime: "Saturday 9-11 AM",
    },
  },
};

const hvacMaintenance: Scenario = {
  id: "hvac-maintenance",
  title: "Maintenance Plan Inquiry",
  businessType: "hvac",
  category: "pricing",
  description: "Homeowner interested in annual maintenance contract",
  callerPersona: "Smart homeowner thinking long-term",
  duration: "1:42",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Climate Control HVAC, this is your AI assistant.",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, I've heard I should get my HVAC serviced regularly. Do you have maintenance plans?",
      emotion: "curious",
    },
    {
      timestamp: "0:13",
      speaker: "AI",
      text: "Great question! Yes, we have a Comfort Club membership that's very popular. It includes two tune-ups per year - one for cooling, one for heating.",
      emotion: "neutral",
    },
    { timestamp: "0:23", speaker: "Caller", text: "What does that run?", emotion: "curious" },
    {
      timestamp: "0:26",
      speaker: "AI",
      text: "The plan is $199 per year, which saves you about $80 versus booking the tune-ups separately. Plus, members get 15% off all repairs and priority scheduling.",
      emotion: "neutral",
    },
    {
      timestamp: "0:39",
      speaker: "Caller",
      text: "Priority scheduling - what does that mean?",
      emotion: "curious",
    },
    {
      timestamp: "0:43",
      speaker: "AI",
      text: "If your AC or heat goes out, you jump to the front of the line. In summer when everyone's AC breaks, that can mean same-day service versus waiting 2-3 days.",
      emotion: "neutral",
    },
    {
      timestamp: "0:55",
      speaker: "Caller",
      text: "That's actually really valuable. I'll do it.",
      emotion: "happy",
    },
    {
      timestamp: "0:59",
      speaker: "AI",
      text: "Excellent choice! I'll set you up. May I have your name, address, and phone?",
      emotion: "neutral",
    },
    {
      timestamp: "1:05",
      speaker: "Caller",
      text: "Kevin O'Brien, 4521 Birch Lane, 555-456-7890.",
      emotion: "neutral",
    },
    {
      timestamp: "1:14",
      speaker: "AI",
      text: "You're enrolled, Kevin! Want to schedule your first tune-up now? We can do your AC before summer hits.",
      emotion: "neutral",
    },
    {
      timestamp: "1:22",
      speaker: "Caller",
      text: "Yes, let's do next week if possible.",
      emotion: "neutral",
    },
    {
      timestamp: "1:26",
      speaker: "AI",
      text: "Tuesday at 10 AM works. Welcome to the Comfort Club!",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 9,
    intent: "service_request",
    actionTaken: "Maintenance Plan Sold + Tune-Up Scheduled",
    crmFields: {
      name: "Kevin O'Brien",
      phone: "555-456-7890",
      service: "Comfort Club Membership + AC Tune-Up",
      urgency: "low",
      appointmentTime: "Tuesday 10 AM",
    },
  },
};

// ==================== AUTO SCENARIOS ====================

const autoCheckEngine: Scenario = {
  id: "auto-check-engine",
  title: "Check Engine Light",
  businessType: "auto",
  category: "routine",
  description: "Driver with check engine light needs diagnostic",
  callerPersona: "Concerned car owner, not mechanically inclined",
  duration: "1:38",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "AutoCare Pro, how can I help you today?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, my check engine light came on this morning. Is that something serious?",
      emotion: "curious",
    },
    {
      timestamp: "0:11",
      speaker: "AI",
      text: "It could be anything from a loose gas cap to something more significant. Is the light steady or flashing?",
      emotion: "neutral",
    },
    {
      timestamp: "0:18",
      speaker: "Caller",
      text: "It's steady, not flashing.",
      emotion: "neutral",
    },
    {
      timestamp: "0:21",
      speaker: "AI",
      text: "Good - a steady light means it's not an emergency, but you should get it checked soon. Is the car running normally otherwise?",
      emotion: "neutral",
    },
    {
      timestamp: "0:30",
      speaker: "Caller",
      text: "Yeah, it seems fine. Just that light is bugging me.",
      emotion: "neutral",
    },
    {
      timestamp: "0:35",
      speaker: "AI",
      text: "We can run a diagnostic to pull the error codes and tell you exactly what's wrong. It's a free service with any repair, or $49 standalone. What type of vehicle is it?",
      emotion: "neutral",
    },
    { timestamp: "0:48", speaker: "Caller", text: "2019 Honda Accord.", emotion: "neutral" },
    {
      timestamp: "0:51",
      speaker: "AI",
      text: "Great car! We have availability tomorrow morning or Thursday afternoon. Which works?",
      emotion: "neutral",
    },
    {
      timestamp: "0:59",
      speaker: "Caller",
      text: "Tomorrow morning, please. I'm Jessica Adams.",
      emotion: "neutral",
    },
    {
      timestamp: "1:04",
      speaker: "AI",
      text: "You're booked, Jessica! Drop off anytime after 7:30 AM. We'll call you with the diagnosis within an hour.",
      emotion: "neutral",
    },
    { timestamp: "1:14", speaker: "Caller", text: "Perfect, thank you!", emotion: "happy" },
    {
      timestamp: "1:16",
      speaker: "AI",
      text: "You're welcome! Drive safe - see you tomorrow.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 7,
    intent: "service_request",
    actionTaken: "Diagnostic Scheduled",
    crmFields: {
      name: "Jessica Adams",
      service: "Check Engine Diagnostic - 2019 Honda Accord",
      urgency: "medium",
      appointmentTime: "Tomorrow morning",
    },
  },
};

const autoBrakes: Scenario = {
  id: "auto-brakes",
  title: "Brake Concerns",
  businessType: "auto",
  category: "routine",
  description: "Driver hearing brake squeaking, concerned about safety",
  callerPersona: "Safety-conscious driver, proactive about maintenance",
  duration: "1:45",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "AutoCare Pro, this is your AI assistant. How can I help?",
      emotion: "neutral",
    },
    {
      timestamp: "0:06",
      speaker: "Caller",
      text: "My brakes have been squeaking lately. Should I be worried?",
      emotion: "curious",
    },
    {
      timestamp: "0:12",
      speaker: "AI",
      text: "Squeaking is definitely worth checking out. Is it a high-pitched squeal when you brake, or more of a grinding sound?",
      emotion: "neutral",
    },
    {
      timestamp: "0:20",
      speaker: "Caller",
      text: "High-pitched, especially when I first start driving in the morning.",
      emotion: "neutral",
    },
    {
      timestamp: "0:26",
      speaker: "AI",
      text: "That's typically the wear indicators telling you it's time for new brake pads. The good news is you caught it early. How long has this been happening?",
      emotion: "neutral",
    },
    { timestamp: "0:36", speaker: "Caller", text: "Maybe a week or so.", emotion: "neutral" },
    {
      timestamp: "0:39",
      speaker: "AI",
      text: "You're in the safe zone then. I'd recommend getting them looked at within the next week or two. Our brake inspection is free, and pads typically run $150-250 per axle depending on your vehicle.",
      emotion: "neutral",
    },
    {
      timestamp: "0:54",
      speaker: "Caller",
      text: "I drive a 2020 Toyota RAV4. Can I come in tomorrow?",
      emotion: "neutral",
    },
    {
      timestamp: "1:00",
      speaker: "AI",
      text: "Absolutely! We have 8 AM, 11 AM, or 2 PM available. Which works?",
      emotion: "neutral",
    },
    {
      timestamp: "1:07",
      speaker: "Caller",
      text: "11 AM would be great. Name's Daniel Wright.",
      emotion: "neutral",
    },
    {
      timestamp: "1:12",
      speaker: "AI",
      text: "Perfect, Daniel. 11 AM for your RAV4. The inspection takes about 30 minutes. If you need pads, we can usually have you out within 2 hours.",
      emotion: "neutral",
    },
    {
      timestamp: "1:24",
      speaker: "Caller",
      text: "That works. Thanks for the info!",
      emotion: "happy",
    },
    {
      timestamp: "1:27",
      speaker: "AI",
      text: "You're welcome! Smart move getting this checked. See you at 11.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 8,
    intent: "service_request",
    actionTaken: "Brake Inspection Scheduled",
    crmFields: {
      name: "Daniel Wright",
      service: "Brake Inspection - 2020 Toyota RAV4",
      urgency: "medium",
      appointmentTime: "Tomorrow 11 AM",
    },
  },
};

const autoOilChange: Scenario = {
  id: "auto-oil-change",
  title: "Oil Change Scheduling",
  businessType: "auto",
  category: "scheduling",
  description: "Customer scheduling routine oil change",
  callerPersona: "Busy professional, values convenience",
  duration: "1:18",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "AutoCare Pro, how can I help you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:04",
      speaker: "Caller",
      text: "I need to schedule an oil change.",
      emotion: "neutral",
    },
    {
      timestamp: "0:07",
      speaker: "AI",
      text: "Happy to help! What type of vehicle?",
      emotion: "neutral",
    },
    { timestamp: "0:10", speaker: "Caller", text: "2021 BMW X3.", emotion: "neutral" },
    {
      timestamp: "0:13",
      speaker: "AI",
      text: "Nice vehicle! For the X3, we use full synthetic which is $79.99. Includes filter, fluid top-off, and a multi-point inspection. Takes about 30 minutes.",
      emotion: "neutral",
    },
    {
      timestamp: "0:25",
      speaker: "Caller",
      text: "That's reasonable. Do you have anything this week?",
      emotion: "neutral",
    },
    {
      timestamp: "0:29",
      speaker: "AI",
      text: "We have Wednesday at 4:30 PM or Friday at 8 AM. We also offer a complimentary car wash with every service.",
      emotion: "neutral",
    },
    {
      timestamp: "0:38",
      speaker: "Caller",
      text: "Friday at 8 works. Do I wait there?",
      emotion: "curious",
    },
    {
      timestamp: "0:42",
      speaker: "AI",
      text: "You can! We have free WiFi and coffee. Or we can drop you off nearby and pick you up. What's your name?",
      emotion: "neutral",
    },
    {
      timestamp: "0:50",
      speaker: "Caller",
      text: "Chris Martinez. I'll wait there - need to catch up on emails anyway.",
      emotion: "neutral",
    },
    {
      timestamp: "0:56",
      speaker: "AI",
      text: "Perfect, Chris! Friday 8 AM for your X3. We'll have you in and out by 8:30.",
      emotion: "neutral",
    },
    { timestamp: "1:04", speaker: "Caller", text: "Sounds good, thanks!", emotion: "happy" },
  ],
  outcome: {
    leadScore: 6,
    intent: "schedule",
    actionTaken: "Oil Change Scheduled",
    crmFields: {
      name: "Chris Martinez",
      service: "Full Synthetic Oil Change - 2021 BMW X3",
      urgency: "low",
      appointmentTime: "Friday 8 AM",
    },
  },
};

// ==================== LAW FIRM SCENARIOS ====================

const lawAccident: Scenario = {
  id: "law-accident",
  title: "Car Accident Inquiry",
  businessType: "law",
  category: "scheduling",
  description: "Accident victim seeking legal representation",
  callerPersona: "Injured person, unsure about legal process",
  duration: "2:05",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Thank you for calling Johnson & Associates. How may I assist you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:06",
      speaker: "Caller",
      text: "Hi, I was in a car accident last week and I'm not sure if I need a lawyer.",
      emotion: "curious",
    },
    {
      timestamp: "0:13",
      speaker: "AI",
      text: "I'm sorry to hear about your accident. Let me ask a few questions to help. Was the accident the other driver's fault?",
      emotion: "neutral",
    },
    {
      timestamp: "0:21",
      speaker: "Caller",
      text: "Yes, they ran a red light and hit me.",
      emotion: "neutral",
    },
    {
      timestamp: "0:25",
      speaker: "AI",
      text: "That's a clear case of liability on their part. Were you injured? Have you seen a doctor?",
      emotion: "neutral",
    },
    {
      timestamp: "0:32",
      speaker: "Caller",
      text: "I went to the ER that night. My neck and back are still really sore.",
      emotion: "frustrated",
    },
    {
      timestamp: "0:39",
      speaker: "AI",
      text: "I'm glad you got checked out. Soft tissue injuries can take time to heal. Has the other driver's insurance contacted you yet?",
      emotion: "neutral",
    },
    {
      timestamp: "0:48",
      speaker: "Caller",
      text: "Yes, they offered me $5,000 to settle. Is that good?",
      emotion: "curious",
    },
    {
      timestamp: "0:54",
      speaker: "AI",
      text: "Honestly, early settlement offers are usually much lower than what cases are worth, especially with ongoing injuries. Our attorneys handle cases like yours regularly and can evaluate if that's fair.",
      emotion: "neutral",
    },
    {
      timestamp: "1:08",
      speaker: "Caller",
      text: "What would it cost me to talk to someone?",
      emotion: "curious",
    },
    {
      timestamp: "1:12",
      speaker: "AI",
      text: "The consultation is completely free, and we work on contingency - meaning we only get paid if you win. You pay nothing upfront.",
      emotion: "neutral",
    },
    {
      timestamp: "1:22",
      speaker: "Caller",
      text: "Okay, I'd like to talk to someone then.",
      emotion: "neutral",
    },
    {
      timestamp: "1:26",
      speaker: "AI",
      text: "Excellent. Attorney Sarah Chen specializes in auto accidents. She has availability tomorrow at 2 PM or Thursday at 10 AM. What's your name?",
      emotion: "neutral",
    },
    {
      timestamp: "1:37",
      speaker: "Caller",
      text: "Marcus Johnson. Tomorrow at 2 works.",
      emotion: "neutral",
    },
    {
      timestamp: "1:42",
      speaker: "AI",
      text: "Perfect, Marcus. Bring any documents you have - police report, medical records, insurance communications. We're at 200 Legal Plaza, Suite 400.",
      emotion: "neutral",
    },
    {
      timestamp: "1:54",
      speaker: "Caller",
      text: "Thank you. I feel better about this now.",
      emotion: "relieved",
    },
    {
      timestamp: "1:58",
      speaker: "AI",
      text: "That's what we're here for. See you tomorrow at 2.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 9,
    intent: "schedule",
    actionTaken: "Free Consultation Scheduled",
    crmFields: {
      name: "Marcus Johnson",
      service: "Personal Injury - Auto Accident",
      urgency: "high",
      appointmentTime: "Tomorrow 2 PM",
    },
  },
};

const lawEstatePlanning: Scenario = {
  id: "law-estate-planning",
  title: "Estate Planning Inquiry",
  businessType: "law",
  category: "pricing",
  description: "Client asking about will and trust preparation",
  callerPersona: "Responsible adult planning for the future",
  duration: "1:52",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Johnson & Associates, how may I help you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, I'm interested in getting a will done. Maybe a trust too. What's involved?",
      emotion: "curious",
    },
    {
      timestamp: "0:12",
      speaker: "AI",
      text: "Smart thinking! Estate planning gives you peace of mind. Let me ask - do you have children or significant assets like a home?",
      emotion: "neutral",
    },
    {
      timestamp: "0:21",
      speaker: "Caller",
      text: "Yes, two kids and we own our home. That's actually why I'm calling - I want to make sure they're protected.",
      emotion: "neutral",
    },
    {
      timestamp: "0:30",
      speaker: "AI",
      text: "Absolutely understand. A basic will can handle guardianship for the kids and asset distribution. A trust adds benefits like avoiding probate and more control over when children receive assets.",
      emotion: "neutral",
    },
    {
      timestamp: "0:45",
      speaker: "Caller",
      text: "What's the cost difference?",
      emotion: "curious",
    },
    {
      timestamp: "0:48",
      speaker: "AI",
      text: "A simple will runs $500-800. A living trust package, which includes the trust, pour-over will, and powers of attorney, is typically $1,500-2,500 depending on complexity.",
      emotion: "neutral",
    },
    {
      timestamp: "1:02",
      speaker: "Caller",
      text: "The trust sounds like what we need. How do we start?",
      emotion: "neutral",
    },
    {
      timestamp: "1:07",
      speaker: "AI",
      text: "We begin with a planning session where the attorney learns about your family and goals. Takes about an hour. Would you like to schedule one?",
      emotion: "neutral",
    },
    {
      timestamp: "1:17",
      speaker: "Caller",
      text: "Yes, please. Can my spouse come too?",
      emotion: "curious",
    },
    {
      timestamp: "1:21",
      speaker: "AI",
      text: "Definitely - we encourage both spouses to attend. We have next Tuesday at 5:30 PM or Saturday at 10 AM. What works?",
      emotion: "neutral",
    },
    {
      timestamp: "1:31",
      speaker: "Caller",
      text: "Saturday is better. We're the Hendersons - Paul and Maria.",
      emotion: "neutral",
    },
    {
      timestamp: "1:37",
      speaker: "AI",
      text: "Perfect! Saturday at 10 AM with Attorney Roberts. I'll email you a questionnaire to fill out beforehand.",
      emotion: "neutral",
    },
    { timestamp: "1:46", speaker: "Caller", text: "Great, thank you!", emotion: "happy" },
  ],
  outcome: {
    leadScore: 8,
    intent: "pricing",
    actionTaken: "Estate Planning Consultation Scheduled",
    crmFields: {
      name: "Paul & Maria Henderson",
      service: "Estate Planning - Living Trust",
      urgency: "low",
      appointmentTime: "Saturday 10 AM",
    },
  },
};

const lawFollowUp: Scenario = {
  id: "law-followup",
  title: "Existing Client Follow-Up",
  businessType: "law",
  category: "routine",
  description: "Current client calling with case question",
  callerPersona: "Existing client seeking update on their case",
  duration: "1:28",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Johnson & Associates, how may I help you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, this is Rachel Kim. I'm a current client and I have a question about my case.",
      emotion: "neutral",
    },
    {
      timestamp: "0:11",
      speaker: "AI",
      text: "Hi Rachel! Let me pull up your file. Can you confirm your date of birth for security?",
      emotion: "neutral",
    },
    { timestamp: "0:17", speaker: "Caller", text: "March 15th, 1985.", emotion: "neutral" },
    {
      timestamp: "0:20",
      speaker: "AI",
      text: "Thank you. I see you're working with Attorney Chen on a personal injury matter. How can I help today?",
      emotion: "neutral",
    },
    {
      timestamp: "0:28",
      speaker: "Caller",
      text: "I got another letter from the insurance company. Should I respond to it?",
      emotion: "curious",
    },
    {
      timestamp: "0:34",
      speaker: "AI",
      text: "Great question - and no, please don't respond directly. Forward any communications to Attorney Chen and she'll handle it. Would you like me to have her call you to discuss?",
      emotion: "neutral",
    },
    {
      timestamp: "0:46",
      speaker: "Caller",
      text: "Yes, please. I want to make sure I don't mess anything up.",
      emotion: "curious",
    },
    {
      timestamp: "0:51",
      speaker: "AI",
      text: "Completely understand. She has some availability this afternoon around 3 PM or tomorrow morning. Which is better for a callback?",
      emotion: "neutral",
    },
    {
      timestamp: "1:00",
      speaker: "Caller",
      text: "This afternoon would be great.",
      emotion: "neutral",
    },
    {
      timestamp: "1:03",
      speaker: "AI",
      text: "Perfect. She'll call you around 3. In the meantime, go ahead and scan or photograph that letter and email it to sarah.chen@johnsonlaw.com.",
      emotion: "neutral",
    },
    { timestamp: "1:14", speaker: "Caller", text: "Will do. Thanks so much!", emotion: "relieved" },
    {
      timestamp: "1:17",
      speaker: "AI",
      text: "You're welcome, Rachel. Talk to you soon!",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 6,
    intent: "inquiry",
    actionTaken: "Attorney Callback Scheduled",
    crmFields: {
      name: "Rachel Kim",
      service: "Client Follow-Up - Personal Injury",
      urgency: "medium",
      appointmentTime: "Today 3 PM callback",
    },
  },
};

// ==================== GENERAL SCENARIOS ====================

const generalAfterHours: Scenario = {
  id: "general-after-hours",
  title: "After Hours Inquiry",
  businessType: "general",
  category: "after_hours",
  description: "2 AM call handled professionally by AI",
  callerPersona: "Customer with urgent question outside business hours",
  duration: "1:35",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Thank you for calling. Our office is currently closed, but I'm an AI assistant and can help you 24/7. How may I assist?",
      emotion: "neutral",
    },
    {
      timestamp: "0:10",
      speaker: "Caller",
      text: "Oh! I didn't expect anyone to answer. I have a plumbing emergency - my toilet is overflowing.",
      emotion: "urgent",
    },
    {
      timestamp: "0:18",
      speaker: "AI",
      text: "I'm glad you called! First, locate the shut-off valve behind the toilet and turn it clockwise to stop the water. Is there a valve there?",
      emotion: "neutral",
    },
    {
      timestamp: "0:28",
      speaker: "Caller",
      text: "Yes, I found it. Okay, it's off now.",
      emotion: "relieved",
    },
    {
      timestamp: "0:33",
      speaker: "AI",
      text: "Great job! That'll prevent further flooding. Now, would you like me to dispatch an emergency plumber tonight, or is this something that can wait until morning?",
      emotion: "neutral",
    },
    {
      timestamp: "0:44",
      speaker: "Caller",
      text: "What's the cost difference?",
      emotion: "curious",
    },
    {
      timestamp: "0:47",
      speaker: "AI",
      text: "Emergency after-hours service is $175 for the first hour. If you can wait, a regular service call in the morning is $95. The water is off now, so waiting is an option if you have another bathroom.",
      emotion: "neutral",
    },
    {
      timestamp: "1:02",
      speaker: "Caller",
      text: "We do have another bathroom. I'll wait until morning then.",
      emotion: "neutral",
    },
    {
      timestamp: "1:07",
      speaker: "AI",
      text: "Smart choice! I'll schedule you for first thing - 8 AM. What's your name and address?",
      emotion: "neutral",
    },
    {
      timestamp: "1:13",
      speaker: "Caller",
      text: "Brian Taylor, 789 Pine Street.",
      emotion: "neutral",
    },
    {
      timestamp: "1:18",
      speaker: "AI",
      text: "You're all set, Brian. A technician will be there at 8 AM. In the meantime, you might want to put down some towels around the toilet.",
      emotion: "neutral",
    },
    {
      timestamp: "1:28",
      speaker: "Caller",
      text: "Thank you so much. I can't believe I got a real answer at 2 AM!",
      emotion: "happy",
    },
    {
      timestamp: "1:33",
      speaker: "AI",
      text: "That's what we're here for! Get some rest.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 8,
    intent: "schedule",
    actionTaken: "Morning Appointment Scheduled",
    crmFields: {
      name: "Brian Taylor",
      service: "Toilet Repair",
      urgency: "medium",
      appointmentTime: "Tomorrow 8 AM",
    },
  },
};

const generalPricingNegotiation: Scenario = {
  id: "general-pricing-negotiation",
  title: "Pricing Discussion",
  businessType: "general",
  category: "pricing",
  description: "Customer asking about pricing and value",
  callerPersona: "Price-conscious customer evaluating options",
  duration: "1:48",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Good afternoon! How can I help you today?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "Hi, I'm shopping around for a service provider. What do you charge for your basic package?",
      emotion: "curious",
    },
    {
      timestamp: "0:12",
      speaker: "AI",
      text: "Great question! Our standard service package is $199, which includes a full inspection, service, and 30-day guarantee. What type of service are you looking for?",
      emotion: "neutral",
    },
    {
      timestamp: "0:24",
      speaker: "Caller",
      text: "That's a bit more than another quote I got. Can you do any better?",
      emotion: "curious",
    },
    {
      timestamp: "0:30",
      speaker: "AI",
      text: "I appreciate you sharing that. While I can't discount our standard rate, I can tell you what's included: certified technicians, same-day service when available, and a satisfaction guarantee. Many customers find the value exceeds the price.",
      emotion: "neutral",
    },
    {
      timestamp: "0:47",
      speaker: "Caller",
      text: "What about that guarantee - how does that work?",
      emotion: "curious",
    },
    {
      timestamp: "0:51",
      speaker: "AI",
      text: "If you're not satisfied or the issue returns within 30 days, we come back and fix it at no additional charge. We also have a referral program - refer a friend and you both get $25 off your next service.",
      emotion: "neutral",
    },
    {
      timestamp: "1:07",
      speaker: "Caller",
      text: "Okay, that's actually pretty good. When could you come out?",
      emotion: "neutral",
    },
    {
      timestamp: "1:12",
      speaker: "AI",
      text: "We have availability tomorrow between 10 AM and 12 PM, or Friday afternoon. Which works better?",
      emotion: "neutral",
    },
    {
      timestamp: "1:20",
      speaker: "Caller",
      text: "Tomorrow works. My name is Patricia Wong.",
      emotion: "neutral",
    },
    {
      timestamp: "1:25",
      speaker: "AI",
      text: "Excellent, Patricia! Tomorrow 10 AM - 12 PM. May I have your address and phone number?",
      emotion: "neutral",
    },
    {
      timestamp: "1:32",
      speaker: "Caller",
      text: "555-678-9012, 321 Cedar Avenue.",
      emotion: "neutral",
    },
    {
      timestamp: "1:39",
      speaker: "AI",
      text: "You're all set! We'll call 30 minutes before arrival. Thanks for giving us a try!",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 7,
    intent: "pricing",
    actionTaken: "Service Appointment Scheduled",
    crmFields: {
      name: "Patricia Wong",
      phone: "555-678-9012",
      service: "Standard Service Package",
      urgency: "low",
      appointmentTime: "Tomorrow 10 AM - 12 PM",
    },
  },
};

const generalComplaint: Scenario = {
  id: "general-complaint",
  title: "Complaint Handling",
  businessType: "general",
  category: "complaint",
  description: "Unhappy customer with service issue",
  callerPersona: "Frustrated customer wanting resolution",
  duration: "2:02",
  transcript: [
    {
      timestamp: "0:01",
      speaker: "AI",
      text: "Thank you for calling. How may I help you?",
      emotion: "neutral",
    },
    {
      timestamp: "0:05",
      speaker: "Caller",
      text: "I'm really upset. I had a technician come out yesterday and the problem isn't fixed. This is the second time!",
      emotion: "frustrated",
    },
    {
      timestamp: "0:14",
      speaker: "AI",
      text: "I'm truly sorry to hear that, and I completely understand your frustration. Let me pull up your account so I can help make this right. May I have your name?",
      emotion: "neutral",
    },
    {
      timestamp: "0:24",
      speaker: "Caller",
      text: "George Miller. I've already paid twice for something that should have been fixed the first time.",
      emotion: "frustrated",
    },
    {
      timestamp: "0:32",
      speaker: "AI",
      text: "Mr. Miller, I see your service history here. You're absolutely right - this should have been resolved. I'm going to flag this as a priority callback and have our service manager reach out to you within the hour.",
      emotion: "neutral",
    },
    {
      timestamp: "0:47",
      speaker: "Caller",
      text: "What's that going to do? I just want it fixed.",
      emotion: "frustrated",
    },
    {
      timestamp: "0:51",
      speaker: "AI",
      text: "Completely understand. Here's what I can do right now: I'm scheduling our senior technician to come out tomorrow at no additional charge. He's our best, and he'll stay until it's completely resolved.",
      emotion: "neutral",
    },
    {
      timestamp: "1:06",
      speaker: "Caller",
      text: "No additional charge? Even for parts?",
      emotion: "curious",
    },
    {
      timestamp: "1:10",
      speaker: "AI",
      text: "Correct. Parts and labor covered. We stand behind our work, and we clearly haven't delivered that for you. I'm also making a note for the manager to discuss a partial refund for your previous visits.",
      emotion: "neutral",
    },
    {
      timestamp: "1:25",
      speaker: "Caller",
      text: "Okay... that's actually reasonable. What time tomorrow?",
      emotion: "neutral",
    },
    {
      timestamp: "1:30",
      speaker: "AI",
      text: "I have 9 AM or 1 PM. Which works better?",
      emotion: "neutral",
    },
    {
      timestamp: "1:35",
      speaker: "Caller",
      text: "9 AM. And I appreciate you actually listening.",
      emotion: "relieved",
    },
    {
      timestamp: "1:40",
      speaker: "AI",
      text: "Of course, Mr. Miller. I'm sorry we let you down, but we're going to make it right. You'll also get a call from our manager today about the refund.",
      emotion: "neutral",
    },
    {
      timestamp: "1:52",
      speaker: "Caller",
      text: "Thank you. I'll see the tech tomorrow.",
      emotion: "neutral",
    },
    {
      timestamp: "1:56",
      speaker: "AI",
      text: "Thank you for giving us another chance. Have a good day.",
      emotion: "neutral",
    },
  ],
  outcome: {
    leadScore: 6,
    intent: "complaint",
    actionTaken: "Priority Service Scheduled + Manager Callback",
    crmFields: {
      name: "George Miller",
      service: "Warranty Repair - Priority",
      urgency: "high",
      appointmentTime: "Tomorrow 9 AM",
    },
  },
};

// ==================== EXPORT ALL SCENARIOS ====================

export const scenarios: Scenario[] = [
  // Plumbing
  plumbingEmergency,
  plumbingWaterHeater,
  plumbingPricing,
  // Dental
  dentalEmergency,
  dentalNewPatient,
  dentalInsurance,
  // HVAC
  hvacEmergency,
  hvacHeating,
  hvacMaintenance,
  // Auto
  autoCheckEngine,
  autoBrakes,
  autoOilChange,
  // Law
  lawAccident,
  lawEstatePlanning,
  lawFollowUp,
  // General
  generalAfterHours,
  generalPricingNegotiation,
  generalComplaint,
];

// Helper function to get scenarios by business type
export function getScenariosByBusinessType(type: BusinessType): Scenario[] {
  return scenarios.filter((s) => s.businessType === type);
}

// Helper function to get scenarios by category
export function getScenariosByCategory(category: ScenarioCategory): Scenario[] {
  return scenarios.filter((s) => s.category === category);
}

// Get unique business types
export const businessTypes: BusinessType[] = [
  "plumbing",
  "dental",
  "hvac",
  "auto",
  "law",
  "general",
];

// Get unique categories
export const categories: ScenarioCategory[] = [
  "emergency",
  "routine",
  "pricing",
  "scheduling",
  "complaint",
  "after_hours",
];

// Business type display names
export const businessTypeLabels: Record<BusinessType, string> = {
  plumbing: "Plumbing",
  dental: "Dental",
  hvac: "HVAC",
  auto: "Automotive",
  law: "Law Firm",
  general: "General",
};

// Category display names
export const categoryLabels: Record<ScenarioCategory, string> = {
  emergency: "Emergency",
  routine: "Routine Service",
  pricing: "Pricing Inquiry",
  scheduling: "Scheduling",
  complaint: "Complaint",
  after_hours: "After Hours",
};
