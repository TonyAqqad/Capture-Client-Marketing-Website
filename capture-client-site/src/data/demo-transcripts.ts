/**
 * Demo Transcripts for AI Voice Agent Conversations
 *
 * These realistic conversation examples are used as fallbacks when the API is unavailable
 * and as example conversations users can explore to understand the AI voice agent capabilities.
 */

export type BusinessType = 'plumbing' | 'dental' | 'auto' | 'hvac' | 'law' | 'general';

export interface TranscriptMessage {
  role: 'ai' | 'caller';
  text: string;
  timestamp?: number; // seconds into call
}

export interface ExtractedData {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  urgency?: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface CallOutcome {
  leadCaptured: boolean;
  appointmentBooked: boolean;
  leadScore: number;
  extractedData: ExtractedData;
}

export interface DemoTranscript {
  id: string;
  businessType: BusinessType;
  businessName: string;
  scenario: string;
  messages: TranscriptMessage[];
  outcome: CallOutcome;
  duration: number; // total seconds
}

export const demoTranscripts: DemoTranscript[] = [
  // ============================================
  // PLUMBING TRANSCRIPTS
  // ============================================
  {
    id: 'plumb-emergency-001',
    businessType: 'plumbing',
    businessName: 'Quick Flow Plumbing',
    scenario: 'Emergency leak call (urgent)',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling Quick Flow Plumbing! This is your AI assistant. How can I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Oh god, I've got water everywhere! There's a pipe burst under my kitchen sink and I can't get it to stop!",
        timestamp: 4
      },
      {
        role: 'ai',
        text: "I understand this is stressful. First, have you been able to locate and turn off the water shutoff valve? It's usually under the sink or near the water meter.",
        timestamp: 12
      },
      {
        role: 'caller',
        text: "I tried but the valve is stuck, it won't turn. Water is getting everywhere!",
        timestamp: 20
      },
      {
        role: 'ai',
        text: "Okay, try turning off the main water supply to your home if you can. In the meantime, I'm flagging this as an emergency. Can I get your name and address so we can dispatch someone right away?",
        timestamp: 26
      },
      {
        role: 'caller',
        text: "It's Mike Thompson, I'm at 425 Oak Street in Riverside.",
        timestamp: 36
      },
      {
        role: 'ai',
        text: "Got it, Mike. And what's the best phone number to reach you at?",
        timestamp: 42
      },
      {
        role: 'caller',
        text: "555-234-8901. Please hurry!",
        timestamp: 47
      },
      {
        role: 'ai',
        text: "Mike, I've marked this as a priority emergency. A technician will call you back within 10 minutes and we'll have someone to your home at 425 Oak Street as quickly as possible. Try to contain the water with towels in the meantime. Is there anything else I can help with right now?",
        timestamp: 52
      },
      {
        role: 'caller',
        text: "No, just please send someone fast. Thank you!",
        timestamp: 68
      },
      {
        role: 'ai',
        text: "Help is on the way, Mike. Hang in there!",
        timestamp: 73
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 98,
      extractedData: {
        name: 'Mike Thompson',
        phone: '555-234-8901',
        service: 'Emergency pipe repair',
        urgency: 'high',
        notes: 'Burst pipe under kitchen sink. Shutoff valve stuck. Water damage occurring. Dispatch immediately to 425 Oak Street, Riverside.'
      }
    },
    duration: 78
  },
  {
    id: 'plumb-quote-001',
    businessType: 'plumbing',
    businessName: 'Quick Flow Plumbing',
    scenario: 'Quote request for bathroom remodel',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling Quick Flow Plumbing! This is your AI assistant. How can I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Hi, yeah, um, I'm thinking about redoing my master bathroom and I need some plumbing work done.",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "That sounds like an exciting project! I'd be happy to help you get started. Can you tell me a bit more about what plumbing work you're planning? Are you moving any fixtures or adding new ones?",
        timestamp: 12
      },
      {
        role: 'caller',
        text: "Well, we want to move the toilet to the other wall, add a double vanity where the single one is now, and put in one of those fancy rainfall shower systems. Oh, and maybe a small soaking tub.",
        timestamp: 20
      },
      {
        role: 'ai',
        text: "Nice! Moving the toilet and adding a double vanity will require some drain line work, and the rainfall shower might need upgraded water pressure. This sounds like a comprehensive project. For an accurate quote, we'd want to send someone out to assess the space. Can I get your name?",
        timestamp: 36
      },
      {
        role: 'caller',
        text: "Sure, it's Jennifer Walsh.",
        timestamp: 48
      },
      {
        role: 'ai',
        text: "Thanks, Jennifer. And what's the best number to reach you?",
        timestamp: 52
      },
      {
        role: 'caller',
        text: "555-876-3421. I'm usually available afternoons.",
        timestamp: 56
      },
      {
        role: 'ai',
        text: "Perfect. And do you have a general contractor handling the remodel, or would you like us to coordinate with you directly?",
        timestamp: 62
      },
      {
        role: 'caller',
        text: "We have a contractor but he said to get my own plumber. His name is Dave if you need to coordinate.",
        timestamp: 68
      },
      {
        role: 'ai',
        text: "Great! I've got all your information, Jennifer. Someone from our team will call you this afternoon to schedule a free in-home estimate. The consultation usually takes about 30 minutes and there's no obligation. Is there anything else I can help you with?",
        timestamp: 78
      },
      {
        role: 'caller',
        text: "No, that's perfect. Thanks so much!",
        timestamp: 90
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: false,
      leadScore: 85,
      extractedData: {
        name: 'Jennifer Walsh',
        phone: '555-876-3421',
        service: 'Bathroom remodel plumbing',
        urgency: 'low',
        notes: 'Master bathroom remodel. Moving toilet, adding double vanity, rainfall shower, possible soaking tub. Has general contractor named Dave. Prefers afternoon callbacks.'
      }
    },
    duration: 95
  },

  // ============================================
  // DENTAL TRANSCRIPTS
  // ============================================
  {
    id: 'dental-new-patient-001',
    businessType: 'dental',
    businessName: 'Smile Bright Dental',
    scenario: 'New patient scheduling',
    messages: [
      {
        role: 'ai',
        text: "Good morning! Thank you for calling Smile Bright Dental. This is your AI assistant. How may I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Hi, I just moved to the area and I'm looking for a new dentist. Do you accept new patients?",
        timestamp: 6
      },
      {
        role: 'ai',
        text: "Welcome to the neighborhood! Yes, we're absolutely accepting new patients and we'd love to have you. Are you looking to schedule a general checkup and cleaning, or is there a specific concern you'd like addressed?",
        timestamp: 12
      },
      {
        role: 'caller',
        text: "Just a checkup for now. It's been, um, probably about a year since my last one, maybe a bit longer actually.",
        timestamp: 22
      },
      {
        role: 'ai',
        text: "No worries at all! A comprehensive new patient exam would be perfect. That includes a full checkup, X-rays, and a cleaning. Can I get your name?",
        timestamp: 30
      },
      {
        role: 'caller',
        text: "Sarah Mitchell.",
        timestamp: 38
      },
      {
        role: 'ai',
        text: "Thanks, Sarah! And a good phone number for you?",
        timestamp: 42
      },
      {
        role: 'caller',
        text: "555-442-9876.",
        timestamp: 46
      },
      {
        role: 'ai',
        text: "Great! Do you have a preference for mornings or afternoons? We have openings this Thursday at 10 AM or next Monday at 2 PM.",
        timestamp: 50
      },
      {
        role: 'caller',
        text: "Thursday morning would be great actually.",
        timestamp: 58
      },
      {
        role: 'ai',
        text: "Perfect! I've got you down for Thursday at 10 AM for a new patient comprehensive exam. We'll send you some forms via email to fill out beforehand. What email address should we use?",
        timestamp: 62
      },
      {
        role: 'caller',
        text: "sarah.mitchell@email.com",
        timestamp: 72
      },
      {
        role: 'ai',
        text: "You're all set, Sarah! Thursday at 10 AM. Please arrive about 15 minutes early with your ID and insurance card if you have one. We'll send you a confirmation and those forms shortly. Welcome to Smile Bright Dental!",
        timestamp: 76
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 92,
      extractedData: {
        name: 'Sarah Mitchell',
        phone: '555-442-9876',
        email: 'sarah.mitchell@email.com',
        service: 'New patient comprehensive exam',
        urgency: 'medium',
        notes: 'New to area. Last dental visit over 1 year ago. Appointment: Thursday 10 AM.'
      }
    },
    duration: 88
  },
  {
    id: 'dental-insurance-001',
    businessType: 'dental',
    businessName: 'Smile Bright Dental',
    scenario: 'Insurance question',
    messages: [
      {
        role: 'ai',
        text: "Good afternoon! Thank you for calling Smile Bright Dental. This is your AI assistant. How can I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Yeah, hi. I'm trying to figure out if you take my insurance. I've got Delta Dental through my employer.",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "Great question! Yes, we do accept Delta Dental. We're in-network with most of their PPO and Premier plans. Do you happen to know which specific plan you have?",
        timestamp: 12
      },
      {
        role: 'caller',
        text: "I think it's the PPO? I'm honestly not totally sure, my HR just signed us up for it.",
        timestamp: 20
      },
      {
        role: 'ai',
        text: "No problem! If you'd like, we can verify your benefits for you before your appointment. We just need your name as it appears on your insurance card and your member ID number.",
        timestamp: 28
      },
      {
        role: 'caller',
        text: "Oh that would be helpful. It's Robert Chen, and let me find my card... okay, the ID is DCH-4492817.",
        timestamp: 36
      },
      {
        role: 'ai',
        text: "Got it, Robert. We'll verify your coverage and give you a call back with the details. What's the best number to reach you?",
        timestamp: 48
      },
      {
        role: 'caller',
        text: "555-339-6654. I'm in meetings until 3 though.",
        timestamp: 54
      },
      {
        role: 'ai',
        text: "I'll make a note to call after 3 PM. While I have you, would you like to go ahead and schedule an appointment? We can confirm the insurance details before then.",
        timestamp: 60
      },
      {
        role: 'caller',
        text: "Sure, why not. What do you have next week?",
        timestamp: 70
      },
      {
        role: 'ai',
        text: "We have Tuesday at 4:30 PM or Wednesday at 9 AM available.",
        timestamp: 74
      },
      {
        role: 'caller',
        text: "Tuesday at 4:30 works better for me.",
        timestamp: 80
      },
      {
        role: 'ai',
        text: "Perfect! You're scheduled for Tuesday at 4:30 PM, and we'll call you after 3 today to confirm your Delta Dental benefits. Thanks for calling, Robert!",
        timestamp: 84
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 88,
      extractedData: {
        name: 'Robert Chen',
        phone: '555-339-6654',
        service: 'Dental checkup - insurance verification needed',
        urgency: 'low',
        notes: 'Delta Dental PPO (possibly). Member ID: DCH-4492817. Call after 3 PM. Appointment: Tuesday 4:30 PM.'
      }
    },
    duration: 92
  },

  // ============================================
  // AUTO REPAIR TRANSCRIPTS
  // ============================================
  {
    id: 'auto-check-engine-001',
    businessType: 'auto',
    businessName: 'Precision Auto Care',
    scenario: 'Check engine light inquiry',
    messages: [
      {
        role: 'ai',
        text: "Thanks for calling Precision Auto Care! This is your AI assistant. What can I help you with today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "My check engine light came on this morning and I'm kind of freaking out. Is it safe to drive?",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "I understand the concern! A few quick questions: Is the light solid or flashing? And is the car running any differently - any strange sounds, smells, or loss of power?",
        timestamp: 12
      },
      {
        role: 'caller',
        text: "It's solid, not flashing. The car seems to be running okay, maybe a tiny bit rough at idle but I'm not sure if I'm imagining it.",
        timestamp: 20
      },
      {
        role: 'ai',
        text: "A solid light with mostly normal operation usually isn't an immediate emergency, but you'll want to get it diagnosed soon. It could be something simple like a loose gas cap, or it might need attention. We offer free diagnostic scans to read the code. Would you like to bring it in?",
        timestamp: 30
      },
      {
        role: 'caller',
        text: "Yeah, probably should. What's it gonna cost me to fix whatever it is?",
        timestamp: 44
      },
      {
        role: 'ai',
        text: "Hard to say until we see the code, but the diagnostic is free. Common causes range from $50 for a sensor to a few hundred for something more involved. We always give you a full estimate before doing any work. Can I get your name?",
        timestamp: 50
      },
      {
        role: 'caller',
        text: "It's Tony Russo.",
        timestamp: 64
      },
      {
        role: 'ai',
        text: "Thanks, Tony. And what kind of car is it?",
        timestamp: 68
      },
      {
        role: 'caller',
        text: "2019 Honda Accord. About 65,000 miles on it.",
        timestamp: 72
      },
      {
        role: 'ai',
        text: "Good cars. And the best number to reach you?",
        timestamp: 78
      },
      {
        role: 'caller',
        text: "555-901-2233.",
        timestamp: 82
      },
      {
        role: 'ai',
        text: "Great! We can get you in tomorrow morning at 8 AM for a quick diagnostic, or Thursday afternoon if that's better?",
        timestamp: 86
      },
      {
        role: 'caller',
        text: "Tomorrow morning works. I'll be there at 8.",
        timestamp: 94
      },
      {
        role: 'ai',
        text: "Perfect, Tony! You're set for tomorrow at 8 AM. We're at 890 Auto Plaza Drive. The diagnostic takes about 30 minutes, and then we'll go over what we find. See you tomorrow!",
        timestamp: 98
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 90,
      extractedData: {
        name: 'Tony Russo',
        phone: '555-901-2233',
        service: 'Check engine light diagnostic',
        urgency: 'medium',
        notes: '2019 Honda Accord, 65K miles. Solid CEL, possible rough idle. Free diagnostic tomorrow 8 AM.'
      }
    },
    duration: 108
  },
  {
    id: 'auto-oil-change-001',
    businessType: 'auto',
    businessName: 'Precision Auto Care',
    scenario: 'Oil change scheduling',
    messages: [
      {
        role: 'ai',
        text: "Thanks for calling Precision Auto Care! This is your AI assistant. What can I help you with today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "I need to schedule an oil change. Do I need an appointment or can I just come in?",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "We take both! Walk-ins are welcome, but appointments guarantee you don't have to wait. What kind of vehicle do you have?",
        timestamp: 12
      },
      {
        role: 'caller',
        text: "It's a 2021 Ford F-150.",
        timestamp: 20
      },
      {
        role: 'ai',
        text: "Nice truck! That one takes synthetic blend or full synthetic oil. Our synthetic blend change is $49.99 and full synthetic is $79.99 for your F-150. Both include a multi-point inspection. Which would you prefer?",
        timestamp: 24
      },
      {
        role: 'caller',
        text: "I'll do the full synthetic. When can you fit me in?",
        timestamp: 36
      },
      {
        role: 'ai',
        text: "We have an opening this Saturday at 10 AM, or I can get you in next Tuesday at any time. What works for you?",
        timestamp: 42
      },
      {
        role: 'caller',
        text: "Saturday at 10 is perfect.",
        timestamp: 50
      },
      {
        role: 'ai',
        text: "Great! Can I get your name for the appointment?",
        timestamp: 54
      },
      {
        role: 'caller',
        text: "Marcus Williams.",
        timestamp: 58
      },
      {
        role: 'ai',
        text: "And a phone number, Marcus?",
        timestamp: 62
      },
      {
        role: 'caller',
        text: "555-774-3320.",
        timestamp: 66
      },
      {
        role: 'ai',
        text: "You're all set! Saturday at 10 AM for a full synthetic oil change on your F-150. It'll take about 30-45 minutes. We're at 890 Auto Plaza Drive. See you then, Marcus!",
        timestamp: 70
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 85,
      extractedData: {
        name: 'Marcus Williams',
        phone: '555-774-3320',
        service: 'Full synthetic oil change',
        urgency: 'low',
        notes: '2021 Ford F-150. Full synthetic oil change $79.99. Saturday 10 AM appointment.'
      }
    },
    duration: 80
  },

  // ============================================
  // HVAC TRANSCRIPTS
  // ============================================
  {
    id: 'hvac-emergency-001',
    businessType: 'hvac',
    businessName: 'CoolBreeze HVAC',
    scenario: 'AC not working (summer emergency)',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling CoolBreeze HVAC! This is your AI assistant. How can I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "My AC just stopped working and it's 95 degrees outside! I've got elderly parents staying with me and I'm really worried about them.",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "I completely understand the urgency, especially with elderly family members. Let me help you right away. First, is the unit making any sounds at all, or is it completely silent?",
        timestamp: 14
      },
      {
        role: 'caller',
        text: "It's running - I can hear the fan - but it's just blowing warm air. I've already checked the thermostat and it's set to cool at 72.",
        timestamp: 22
      },
      {
        role: 'ai',
        text: "Good troubleshooting! When the fan runs but air isn't cold, it's often a refrigerant issue or a compressor problem. Have you checked if the outdoor unit is running?",
        timestamp: 32
      },
      {
        role: 'caller',
        text: "I don't even know where that is, to be honest. I just need someone here fast. Can you send someone today?",
        timestamp: 40
      },
      {
        role: 'ai',
        text: "Absolutely. We have emergency service available today. Can I get your name and address?",
        timestamp: 48
      },
      {
        role: 'caller',
        text: "Linda Park. I'm at 2847 Maple Court in Westbrook.",
        timestamp: 54
      },
      {
        role: 'ai',
        text: "Thanks, Linda. And your phone number?",
        timestamp: 60
      },
      {
        role: 'caller',
        text: "555-612-8847. Please, as soon as possible.",
        timestamp: 64
      },
      {
        role: 'ai',
        text: "I've marked this as a priority emergency call given the heat and your parents' safety. A technician will call you within 30 minutes to confirm an arrival time. In the meantime, keep everyone hydrated and try to stay in the coolest part of the house. Do you have any fans you can run?",
        timestamp: 70
      },
      {
        role: 'caller',
        text: "Yes, we have some box fans. Thank you so much for getting someone out so quickly.",
        timestamp: 86
      },
      {
        role: 'ai',
        text: "Of course, Linda. Help is on the way. The technician will call you shortly!",
        timestamp: 94
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 99,
      extractedData: {
        name: 'Linda Park',
        phone: '555-612-8847',
        service: 'Emergency AC repair',
        urgency: 'high',
        notes: 'AC blowing warm air, fan running. Elderly parents in home during heat wave. Priority emergency - 2847 Maple Court, Westbrook. Dispatch ASAP.'
      }
    },
    duration: 100
  },
  {
    id: 'hvac-maintenance-001',
    businessType: 'hvac',
    businessName: 'CoolBreeze HVAC',
    scenario: 'Annual maintenance scheduling',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling CoolBreeze HVAC! This is your AI assistant. How can I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Hi there. I want to get my furnace checked before winter. Do you guys do tune-ups?",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "Great thinking to get ahead of the cold weather! Yes, we offer comprehensive furnace tune-ups. Our maintenance service includes a full inspection, cleaning, and safety check. It's $129 for standard systems. Is this a gas or electric furnace?",
        timestamp: 12
      },
      {
        role: 'caller',
        text: "Gas. It's about 8 years old, seems to be working fine but I figure better safe than sorry, you know?",
        timestamp: 26
      },
      {
        role: 'ai',
        text: "Absolutely! Eight years is a good time to be proactive. We'll check the heat exchanger, clean the burners, test the safety controls, and make sure everything's running efficiently. When would be a good time for you?",
        timestamp: 34
      },
      {
        role: 'caller',
        text: "I work from home, so I'm pretty flexible. Maybe sometime next week?",
        timestamp: 48
      },
      {
        role: 'ai',
        text: "We have openings Monday through Friday next week. Would a morning or afternoon work better?",
        timestamp: 54
      },
      {
        role: 'caller',
        text: "How about Wednesday afternoon? Maybe around 2?",
        timestamp: 60
      },
      {
        role: 'ai',
        text: "Wednesday at 2 PM works perfectly. Can I get your name?",
        timestamp: 66
      },
      {
        role: 'caller',
        text: "James Norton.",
        timestamp: 70
      },
      {
        role: 'ai',
        text: "And your address and phone number, James?",
        timestamp: 74
      },
      {
        role: 'caller',
        text: "156 Pine Ridge Drive, and my number is 555-228-9014.",
        timestamp: 78
      },
      {
        role: 'ai',
        text: "You're all set, James! Wednesday at 2 PM at 156 Pine Ridge Drive for your furnace tune-up. The technician will call 30 minutes before arriving. The service takes about an hour, and you'll get a full report of your system's condition. Anything else I can help with?",
        timestamp: 86
      },
      {
        role: 'caller',
        text: "Nope, that's everything. Thanks!",
        timestamp: 100
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 82,
      extractedData: {
        name: 'James Norton',
        phone: '555-228-9014',
        service: 'Furnace tune-up/maintenance',
        urgency: 'low',
        notes: 'Gas furnace, 8 years old, working fine. Preventive maintenance. Wednesday 2 PM at 156 Pine Ridge Drive.'
      }
    },
    duration: 105
  },

  // ============================================
  // LAW FIRM TRANSCRIPTS
  // ============================================
  {
    id: 'law-injury-001',
    businessType: 'law',
    businessName: 'Thompson & Associates Law',
    scenario: 'Personal injury consultation',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling Thompson & Associates Law Firm. This is your AI assistant. How may I direct your call today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Hi, um, I was in a car accident last week and someone told me I should talk to a lawyer. I'm not really sure if I have a case or anything.",
        timestamp: 6
      },
      {
        role: 'ai',
        text: "I'm sorry to hear about your accident. You've come to the right place - we handle personal injury cases and offer free consultations. Can you tell me a little about what happened? Were you injured?",
        timestamp: 16
      },
      {
        role: 'caller',
        text: "Yeah, my back has been really hurting. I've been to the doctor twice. The other driver ran a red light and hit me.",
        timestamp: 26
      },
      {
        role: 'ai',
        text: "That sounds like a clear case of the other driver being at fault. Have you been contacted by any insurance companies yet?",
        timestamp: 36
      },
      {
        role: 'caller',
        text: "The other driver's insurance called yesterday but I didn't know what to say so I didn't really tell them much.",
        timestamp: 44
      },
      {
        role: 'ai',
        text: "Smart move not to give a recorded statement without legal guidance. One of our attorneys should speak with you soon. This sounds like exactly the type of case we handle. Can I get your name?",
        timestamp: 52
      },
      {
        role: 'caller',
        text: "Patricia Gomez.",
        timestamp: 64
      },
      {
        role: 'ai',
        text: "Thank you, Patricia. And the best phone number to reach you?",
        timestamp: 68
      },
      {
        role: 'caller',
        text: "555-441-7823. But what does a consultation cost?",
        timestamp: 72
      },
      {
        role: 'ai',
        text: "Personal injury consultations are completely free, and if we take your case, we work on contingency - meaning you don't pay anything unless we win. An attorney will call you within the next two hours to discuss the details. Is there an email address where we can send some information in the meantime?",
        timestamp: 78
      },
      {
        role: 'caller',
        text: "Sure, it's p.gomez@webmail.com. Thank you, this is a relief.",
        timestamp: 96
      },
      {
        role: 'ai',
        text: "You're very welcome, Patricia. Please don't speak to any insurance companies until you've talked with our attorney. They'll call you shortly. Take care!",
        timestamp: 102
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: false,
      leadScore: 95,
      extractedData: {
        name: 'Patricia Gomez',
        phone: '555-441-7823',
        email: 'p.gomez@webmail.com',
        service: 'Personal injury consultation',
        urgency: 'high',
        notes: 'Car accident last week. Other driver ran red light. Back injury, 2 doctor visits. Insurance company called but no statement given. Callback within 2 hours - HIGH PRIORITY.'
      }
    },
    duration: 110
  },
  {
    id: 'law-business-001',
    businessType: 'law',
    businessName: 'Thompson & Associates Law',
    scenario: 'Business formation inquiry',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling Thompson & Associates Law Firm. This is your AI assistant. How may I direct your call today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Yeah, I'm starting a business with a partner and we need to figure out what kind of entity to form. LLC, corporation, whatever.",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "Congratulations on starting your business! We have attorneys who specialize in business formation and can help you choose the right structure. What type of business will you be operating?",
        timestamp: 14
      },
      {
        role: 'caller',
        text: "It's a tech consulting firm. We'll both be working in it and we want to protect ourselves from liability but also keep taxes reasonable.",
        timestamp: 24
      },
      {
        role: 'ai',
        text: "Those are great considerations. An LLC or S-Corp might work well for your situation, but the right choice depends on your specific circumstances. Our business attorney can walk you through the pros and cons. Would you like to schedule a consultation?",
        timestamp: 34
      },
      {
        role: 'caller',
        text: "What does that run? I'm trying to keep startup costs down.",
        timestamp: 48
      },
      {
        role: 'ai',
        text: "Understandable! Our initial business consultations are $150 for a 30-minute session. If you decide to move forward with formation, that amount is credited toward your services. For an LLC, the full formation package starts at $650 plus filing fees.",
        timestamp: 54
      },
      {
        role: 'caller',
        text: "That's not bad. Okay, let's set something up. Sooner is better - we're trying to get this going.",
        timestamp: 70
      },
      {
        role: 'ai',
        text: "Perfect! Can I get your name?",
        timestamp: 78
      },
      {
        role: 'caller',
        text: "David Chang.",
        timestamp: 82
      },
      {
        role: 'ai',
        text: "And a phone number and email, David?",
        timestamp: 86
      },
      {
        role: 'caller',
        text: "555-883-2901, and david.chang@techmail.com.",
        timestamp: 90
      },
      {
        role: 'ai',
        text: "Our business formation attorney has availability Thursday at 3 PM or Friday at 10 AM. Which works better?",
        timestamp: 96
      },
      {
        role: 'caller',
        text: "Friday at 10 would be great.",
        timestamp: 104
      },
      {
        role: 'ai',
        text: "You're confirmed for Friday at 10 AM. I'll send a confirmation email with our office address and what to bring. We look forward to helping you get your business started right, David!",
        timestamp: 108
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 88,
      extractedData: {
        name: 'David Chang',
        phone: '555-883-2901',
        email: 'david.chang@techmail.com',
        service: 'Business formation consultation',
        urgency: 'medium',
        notes: 'Tech consulting firm with partner. Interested in LLC or S-Corp. Consultation Friday 10 AM. $150 consultation fee.'
      }
    },
    duration: 118
  },

  // ============================================
  // GENERAL TRANSCRIPTS
  // ============================================
  {
    id: 'general-afterhours-001',
    businessType: 'general',
    businessName: 'Riverside Home Services',
    scenario: 'After-hours call handling',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling Riverside Home Services. Our office is currently closed, but I'm the after-hours AI assistant and I'm happy to help. Is this an emergency, or would you like to leave a message for a callback tomorrow?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Oh, I didn't realize you were closed. It's not really an emergency. I just wanted to get some information about your handyman services.",
        timestamp: 10
      },
      {
        role: 'ai',
        text: "No problem! I can answer general questions and take your information so someone can call you during business hours. We offer a wide range of handyman services including repairs, installations, painting, and general maintenance. What type of project do you have in mind?",
        timestamp: 18
      },
      {
        role: 'caller',
        text: "I need someone to install some ceiling fans and maybe fix a few doors that aren't closing right. Nothing major.",
        timestamp: 32
      },
      {
        role: 'ai',
        text: "Those are common requests! We can definitely help with both. Ceiling fan installation typically runs $75-150 per fan depending on the complexity, and door adjustments are usually billed hourly at $65 per hour. Would you like someone to call you tomorrow to schedule an estimate?",
        timestamp: 40
      },
      {
        role: 'caller',
        text: "Yeah, that would be great. When do you open?",
        timestamp: 56
      },
      {
        role: 'ai',
        text: "We open at 8 AM and someone will call you in the morning. Can I get your name and number?",
        timestamp: 62
      },
      {
        role: 'caller',
        text: "Michelle Torres, 555-367-4412.",
        timestamp: 68
      },
      {
        role: 'ai',
        text: "Thanks, Michelle! Is morning or afternoon better for a callback?",
        timestamp: 74
      },
      {
        role: 'caller',
        text: "Anytime is fine, I'll have my phone with me.",
        timestamp: 80
      },
      {
        role: 'ai',
        text: "Perfect! Someone will call you tomorrow morning about the ceiling fans and door repairs. Have a great evening, Michelle!",
        timestamp: 84
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: false,
      leadScore: 75,
      extractedData: {
        name: 'Michelle Torres',
        phone: '555-367-4412',
        service: 'Ceiling fan installation, door repair',
        urgency: 'low',
        notes: 'After-hours call. Needs ceiling fans installed and door adjustments. Callback tomorrow morning.'
      }
    },
    duration: 90
  },
  {
    id: 'general-pricing-001',
    businessType: 'general',
    businessName: 'CleanPro Services',
    scenario: 'Pricing inquiry',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling CleanPro Services! This is your AI assistant. How can I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Hi, I'm just shopping around for cleaning services. What do you charge?",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "Happy to help! Our pricing depends on the size of your home and the type of cleaning. Are you looking for regular weekly or bi-weekly service, or a one-time deep clean?",
        timestamp: 10
      },
      {
        role: 'caller',
        text: "Probably bi-weekly. I've got a 3 bedroom house, about 1,800 square feet.",
        timestamp: 20
      },
      {
        role: 'ai',
        text: "For a 3 bedroom home around 1,800 square feet, bi-weekly standard cleaning typically runs $140-160 per visit. That includes all rooms, bathrooms, kitchen, dusting, vacuuming, and mopping. We're also running a special for new customers - 25% off your first cleaning.",
        timestamp: 26
      },
      {
        role: 'caller',
        text: "That's in line with what I've been seeing. What about if I wanted add-ons like inside the fridge or oven?",
        timestamp: 44
      },
      {
        role: 'ai',
        text: "Great question! Inside the refrigerator is $25 extra, and oven cleaning is $35. We can add those to any visit or just do them occasionally. Would you like to schedule a free walkthrough? We can give you an exact quote and you can meet the team.",
        timestamp: 50
      },
      {
        role: 'caller',
        text: "Yeah, I think that makes sense. I want to meet whoever's going to be in my house, you know?",
        timestamp: 66
      },
      {
        role: 'ai',
        text: "Absolutely, we completely understand! Can I get your name and contact information to schedule that walkthrough?",
        timestamp: 74
      },
      {
        role: 'caller',
        text: "Angela Kim. My number is 555-492-1108.",
        timestamp: 80
      },
      {
        role: 'ai',
        text: "Thanks, Angela! We have walkthrough appointments available Saturday morning or Monday afternoon. What works for you?",
        timestamp: 86
      },
      {
        role: 'caller',
        text: "Saturday morning is better.",
        timestamp: 94
      },
      {
        role: 'ai',
        text: "How does Saturday at 10 AM sound?",
        timestamp: 98
      },
      {
        role: 'caller',
        text: "Perfect.",
        timestamp: 102
      },
      {
        role: 'ai',
        text: "Great! Saturday at 10 AM for a free walkthrough and quote. I just need your address, Angela.",
        timestamp: 105
      },
      {
        role: 'caller',
        text: "892 Willow Lane.",
        timestamp: 112
      },
      {
        role: 'ai',
        text: "You're all set! Saturday at 10 AM at 892 Willow Lane. Remember, first-time customers get 25% off. We'll see you then, Angela!",
        timestamp: 116
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 86,
      extractedData: {
        name: 'Angela Kim',
        phone: '555-492-1108',
        service: 'Bi-weekly house cleaning',
        urgency: 'low',
        notes: '3 bed, 1800 sq ft home. Interested in bi-weekly cleaning. Free walkthrough Saturday 10 AM at 892 Willow Lane. 25% new customer discount applies.'
      }
    },
    duration: 125
  },
  {
    id: 'general-complaint-001',
    businessType: 'general',
    businessName: 'Summit Property Management',
    scenario: 'Complaint handling (shows AI de-escalation)',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling Summit Property Management. This is your AI assistant. How can I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Yeah, I need to talk to someone about my apartment. This is the third time I've called about my heat not working and nobody's done anything!",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "I'm really sorry to hear you've been dealing with this heating issue for so long - that's completely unacceptable, especially with the cold weather. Let me take down all the details so we can escalate this and get it resolved today. What's your name and unit number?",
        timestamp: 14
      },
      {
        role: 'caller',
        text: "Frank Morrison, unit 412. I've been waiting two weeks! I have a kid here and it's freezing at night. This is ridiculous.",
        timestamp: 26
      },
      {
        role: 'ai',
        text: "Frank, you're absolutely right to be frustrated - two weeks with a child in a cold apartment is not okay. I'm flagging this as an urgent priority right now. Have you had to use space heaters or been managing any other way?",
        timestamp: 36
      },
      {
        role: 'caller',
        text: "Yeah, we've got two space heaters running but my electric bill is going to be through the roof. This isn't right.",
        timestamp: 48
      },
      {
        role: 'ai',
        text: "I completely agree. Here's what I'm going to do: I'm marking this as a same-day emergency repair because of the child in the home. I'm also noting the space heater usage so we can discuss compensation for your increased electric bill. A maintenance manager will call you within one hour to confirm a technician visit today. What's your best phone number?",
        timestamp: 56
      },
      {
        role: 'caller',
        text: "It's 555-728-3301. And I better actually hear from someone this time.",
        timestamp: 74
      },
      {
        role: 'ai',
        text: "Frank, I hear you. I've documented this as a priority escalation and noted this is your third call. The maintenance manager will call within one hour. If for any reason you don't hear from them, please call back and ask to be transferred to the property manager directly. Is there anything else I can document about the issue?",
        timestamp: 80
      },
      {
        role: 'caller',
        text: "No, I just want it fixed. I appreciate you actually listening. The other times I called nobody seemed to care.",
        timestamp: 100
      },
      {
        role: 'ai',
        text: "I'm sorry about those previous experiences. You deserve better service than that. You'll hear from us within the hour, and we'll get your heat working today. Stay warm, Frank.",
        timestamp: 108
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 65,
      extractedData: {
        name: 'Frank Morrison',
        phone: '555-728-3301',
        service: 'Emergency heating repair - escalation',
        urgency: 'high',
        notes: 'Unit 412. Third call about heating - 2 weeks with issue. Child in apartment. Using space heaters. PRIORITY ESCALATION - same-day repair required. Note: discuss compensation for electric bill increase.'
      }
    },
    duration: 115
  },
  {
    id: 'plumb-water-heater-001',
    businessType: 'plumbing',
    businessName: 'Quick Flow Plumbing',
    scenario: 'Water heater replacement inquiry',
    messages: [
      {
        role: 'ai',
        text: "Thank you for calling Quick Flow Plumbing! This is your AI assistant. How can I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "Hi, my water heater is pretty old and I think it might be time to replace it. It's making weird noises and the water isn't as hot as it used to be.",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "Those are definitely signs that it might be on its last legs. How old is the water heater, and do you know if it's gas or electric?",
        timestamp: 16
      },
      {
        role: 'caller',
        text: "It's gas, and I think it's about 12 years old? We've been here 8 years and it was already here when we moved in.",
        timestamp: 24
      },
      {
        role: 'ai',
        text: "Twelve years is getting up there for a gas water heater - most last 10-15 years. The rumbling noises are usually sediment buildup. You could potentially get more life out of it with a flush, but at 12 years, replacement is worth considering. Are you interested in getting a quote for a new unit?",
        timestamp: 34
      },
      {
        role: 'caller',
        text: "Yeah, I'd rather replace it before it fails completely. What are my options?",
        timestamp: 50
      },
      {
        role: 'ai',
        text: "Great thinking! We offer traditional tank water heaters starting around $1,200 installed, or tankless units starting around $2,500. Tankless costs more upfront but saves on energy bills and lasts longer. We can send someone to assess your setup and give you exact pricing. Would you like to schedule that?",
        timestamp: 56
      },
      {
        role: 'caller',
        text: "Sure, let's do that. I'm curious about the tankless option actually.",
        timestamp: 74
      },
      {
        role: 'ai',
        text: "I'll make a note that you're interested in tankless options. Can I get your name?",
        timestamp: 80
      },
      {
        role: 'caller',
        text: "It's Gregory Lawson.",
        timestamp: 86
      },
      {
        role: 'ai',
        text: "Thanks, Gregory. Your address and phone number?",
        timestamp: 90
      },
      {
        role: 'caller',
        text: "5620 Cedar Street, and 555-814-9927.",
        timestamp: 94
      },
      {
        role: 'ai',
        text: "Perfect! I can get a technician out there Thursday between 9 and 12, or Friday afternoon. Which works better?",
        timestamp: 100
      },
      {
        role: 'caller',
        text: "Friday afternoon is better for me.",
        timestamp: 108
      },
      {
        role: 'ai',
        text: "You're set for Friday afternoon at 5620 Cedar Street. The technician will call when they're on the way. They'll assess your current setup, discuss tankless vs. traditional options, and give you a detailed quote. No obligation, of course. Anything else I can help with, Gregory?",
        timestamp: 112
      },
      {
        role: 'caller',
        text: "Nope, that's it. Thank you!",
        timestamp: 128
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 87,
      extractedData: {
        name: 'Gregory Lawson',
        phone: '555-814-9927',
        service: 'Water heater replacement quote',
        urgency: 'medium',
        notes: '12-year-old gas water heater making noise, water not as hot. Interested in tankless option. Friday afternoon appointment at 5620 Cedar Street.'
      }
    },
    duration: 135
  },
  {
    id: 'dental-toothache-001',
    businessType: 'dental',
    businessName: 'Smile Bright Dental',
    scenario: 'Urgent toothache call',
    messages: [
      {
        role: 'ai',
        text: "Good morning! Thank you for calling Smile Bright Dental. This is your AI assistant. How may I help you today?",
        timestamp: 0
      },
      {
        role: 'caller',
        text: "I have a really bad toothache that started last night. It kept me up. Is there any way I can be seen today?",
        timestamp: 5
      },
      {
        role: 'ai',
        text: "I'm sorry you're in pain! We do keep emergency slots available. Can you tell me where the pain is located and what it feels like - is it sharp, throbbing, or sensitive to hot and cold?",
        timestamp: 14
      },
      {
        role: 'caller',
        text: "It's my bottom left molar, kind of in the back. It's throbbing and it hurt really bad when I drank coffee this morning. I took ibuprofen but it's barely helping.",
        timestamp: 24
      },
      {
        role: 'ai',
        text: "That sounds like it could be an infection or possibly a cracked tooth. This definitely needs to be seen soon. We have an emergency opening at 11:30 this morning - can you make that?",
        timestamp: 38
      },
      {
        role: 'caller',
        text: "Yes, absolutely. I'll make it work.",
        timestamp: 48
      },
      {
        role: 'ai',
        text: "Good. Can I get your name?",
        timestamp: 52
      },
      {
        role: 'caller',
        text: "Christina Valle.",
        timestamp: 56
      },
      {
        role: 'ai',
        text: "Thanks, Christina. Are you an existing patient with us, or is this your first visit?",
        timestamp: 60
      },
      {
        role: 'caller',
        text: "First visit. I usually go to a dentist across town but they couldn't fit me in for a week.",
        timestamp: 64
      },
      {
        role: 'ai',
        text: "We're glad we can help! I'll need a phone number and, if possible, an email to send new patient forms.",
        timestamp: 74
      },
      {
        role: 'caller',
        text: "555-261-9080, and christina.valle@mymail.com.",
        timestamp: 80
      },
      {
        role: 'ai',
        text: "You're booked for 11:30 AM. I'll email forms right away - please try to complete them before you arrive if you can, but don't worry if you can't. In the meantime, keep taking ibuprofen as directed and avoid very hot or cold foods and drinks. The doctor will take great care of you!",
        timestamp: 88
      },
      {
        role: 'caller',
        text: "Thank you so much. I really appreciate getting in so quickly.",
        timestamp: 106
      }
    ],
    outcome: {
      leadCaptured: true,
      appointmentBooked: true,
      leadScore: 94,
      extractedData: {
        name: 'Christina Valle',
        phone: '555-261-9080',
        email: 'christina.valle@mymail.com',
        service: 'Emergency dental - toothache',
        urgency: 'high',
        notes: 'New patient. Severe toothache, lower left molar, throbbing, temperature sensitive. Possible infection or crack. Emergency appointment 11:30 AM today. Send new patient forms.'
      }
    },
    duration: 112
  }
];

/**
 * Get a random transcript, optionally filtered by business type
 */
export function getRandomTranscript(businessType?: BusinessType): DemoTranscript {
  let filteredTranscripts = demoTranscripts;

  if (businessType) {
    filteredTranscripts = demoTranscripts.filter(t => t.businessType === businessType);
  }

  if (filteredTranscripts.length === 0) {
    // Fallback to all transcripts if no matches
    filteredTranscripts = demoTranscripts;
  }

  const randomIndex = Math.floor(Math.random() * filteredTranscripts.length);
  return filteredTranscripts[randomIndex];
}

/**
 * Get all demo transcripts
 */
export function getAllTranscripts(): DemoTranscript[] {
  return [...demoTranscripts];
}

/**
 * Get transcripts filtered by business type
 */
export function getTranscriptsByBusiness(type: BusinessType): DemoTranscript[] {
  return demoTranscripts.filter(t => t.businessType === type);
}

/**
 * Get transcript by ID
 */
export function getTranscriptById(id: string): DemoTranscript | undefined {
  return demoTranscripts.find(t => t.id === id);
}

/**
 * Get all available business types
 */
export function getAvailableBusinessTypes(): BusinessType[] {
  const types = new Set(demoTranscripts.map(t => t.businessType));
  return Array.from(types) as BusinessType[];
}

/**
 * Get transcripts by urgency level
 */
export function getTranscriptsByUrgency(urgency: 'low' | 'medium' | 'high'): DemoTranscript[] {
  return demoTranscripts.filter(t => t.outcome.extractedData.urgency === urgency);
}

/**
 * Get transcripts where appointments were booked
 */
export function getBookedAppointmentTranscripts(): DemoTranscript[] {
  return demoTranscripts.filter(t => t.outcome.appointmentBooked);
}

/**
 * Get high-scoring leads (score >= 90)
 */
export function getHighScoringLeads(): DemoTranscript[] {
  return demoTranscripts.filter(t => t.outcome.leadScore >= 90);
}

export default demoTranscripts;
