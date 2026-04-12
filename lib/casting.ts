export type OpportunityType = "sag" | "non_sag" | "print_model" | "runway_model" | "background_actress" | "commercial" | "film" | "tv";

export type ApplicationStatus = "draft" | "submitted" | "under_review" | "approved" | "dismissed" | "booked";

export interface CastingOpportunity {
  id: string;
  title: string;
  type: OpportunityType;
  location: string;
  agency: string;
  deadline: string;
  compensation: string;
  description: string;
  requirements: string[];
  isSag: boolean;
}

export interface CastingApplication {
  id: string;
  opportunityId: string;
  dancerId: string;
  status: ApplicationStatus;
  headshots: string[];
  resume: string;
  coverLetter: string;
  submittedAt: number | null;
}

export interface SagPipelineStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  resources: string[];
}

export const SAG_PIPELINE_STEPS: SagPipelineStep[] = [
  {
    id: "eligibility",
    title: "Check SAG-AFTRA Eligibility",
    description: "Determine your path: principal performer, background via SAG vouchers, or through a SAG signatory project.",
    completed: false,
    resources: ["SAG-AFTRA official eligibility page", "Voucher tracking guide"]
  },
  {
    id: "register-casting",
    title: "Register on Major Casting Platforms",
    description: "Create profiles on Casting Networks, Actors Access, Backstage, and Central Casting for background work.",
    completed: false,
    resources: ["Casting Networks signup", "Actors Access profile tips", "Central Casting registration"]
  },
  {
    id: "headshots",
    title: "Get Professional Headshots",
    description: "Book a session with a reputable headshot photographer. You need theatrical and commercial looks.",
    completed: false,
    resources: ["Top headshot photographers by city", "What casting directors look for"]
  },
  {
    id: "resume",
    title: "Build Your Acting Resume",
    description: "Format your resume industry-standard: name, union status, agent, credits (Film/TV/Theatre/Commercial), training, skills.",
    completed: false,
    resources: ["Resume template download", "Sample resumes from working actors"]
  },
  {
    id: "training",
    title: "Take Acting Classes",
    description: "Enroll in scene study, cold reading, improv, and on-camera technique at a reputable studio.",
    completed: false,
    resources: ["Top acting schools by market", "Online masterclass options"]
  },
  {
    id: "background-work",
    title: "Book Background Work",
    description: "Work as a background actor to earn SAG vouchers, learn on-set etiquette, and build your comfort on camera.",
    completed: false,
    resources: ["How to get SAG vouchers", "Background actor best practices"]
  },
  {
    id: "sag-join",
    title: "Join SAG-AFTRA",
    description: "Once eligible, pay the initiation fee and dues to become a SAG-AFTRA member.",
    completed: false,
    resources: ["Current SAG-AFTRA fees", "Benefits of membership"]
  },
  {
    id: "agent",
    title: "Secure Representation",
    description: "Research and submit to legitimate talent agencies. Prepare a strong reel, headshots, and resume package.",
    completed: false,
    resources: ["How to find a legit agent", "Top agencies by market"]
  },
  {
    id: "modeling-transition",
    title: "Explore Print & Runway Modeling",
    description: "Leverage your look and platform following to book print campaigns and runway shows alongside acting.",
    completed: false,
    resources: ["Model agency submission guide", "Portfolio requirements by agency type"]
  },
  {
    id: "brand-building",
    title: "Build Your Brand & Social Presence",
    description: "Transition your social media following into a professional brand that casting directors and agents take seriously.",
    completed: false,
    resources: ["Social media strategy for actors", "Creating a professional website"]
  }
];

export const SAMPLE_OPPORTUNITIES: CastingOpportunity[] = [
  {
    id: "opp-1",
    title: "Lead Role — Independent Film 'Midnight Garden'",
    type: "film",
    location: "Los Angeles, CA",
    agency: "Paradigm Talent Agency",
    deadline: "2026-05-15",
    compensation: "$5,000/week SAG Scale",
    description: "Seeking a strong female lead (25-35) for an independent drama. Character is a dancer turned private investigator.",
    requirements: ["SAG-AFTRA member", "Dance experience preferred", "Self-tape audition required"],
    isSag: true
  },
  {
    id: "opp-2",
    title: "Background Actress — HBO Series",
    type: "background_actress",
    location: "Atlanta, GA",
    agency: "Central Casting",
    deadline: "2026-04-30",
    compensation: "$200/day + meals",
    description: "Multiple background roles needed for nightclub and restaurant scenes in upcoming HBO drama series.",
    requirements: ["Ages 21-40", "Evening availability", "Own wardrobe: upscale cocktail attire"],
    isSag: false
  },
  {
    id: "opp-3",
    title: "Print Model — Luxury Swimwear Campaign",
    type: "print_model",
    location: "Miami, FL",
    agency: "Wilhelmina Models",
    deadline: "2026-05-01",
    compensation: "$3,500/day",
    description: "High-end swimwear brand seeking confident, diverse models for their summer print campaign.",
    requirements: ["Strong portfolio", "Comfort in swimwear", "Professional demeanor"],
    isSag: false
  },
  {
    id: "opp-4",
    title: "Runway Model — Paris Fashion Week Emerging Designers",
    type: "runway_model",
    location: "Paris, France",
    agency: "Elite Model Management",
    deadline: "2026-06-01",
    compensation: "$2,000/show + travel",
    description: "Emerging designer showcase seeking diverse runway models for Paris Fashion Week presentations.",
    requirements: ["5'8\" minimum height", "Strong walk", "Passport required"],
    isSag: false
  },
  {
    id: "opp-5",
    title: "Commercial — National Fitness Brand",
    type: "commercial",
    location: "New York, NY",
    agency: "Don Buchwald & Associates",
    deadline: "2026-04-28",
    compensation: "SAG Scale + residuals",
    description: "National television commercial for a major fitness brand. Looking for athletic, energetic performers.",
    requirements: ["SAG-AFTRA member", "Athletic build", "Dance/movement skills a plus"],
    isSag: true
  },
  {
    id: "opp-6",
    title: "TV Co-Star — Network Drama Pilot",
    type: "tv",
    location: "New York, NY",
    agency: "Gersh Agency",
    deadline: "2026-05-10",
    compensation: "SAG Scale co-star rate",
    description: "Recurring co-star role as a nightclub performer in a new network drama pilot about the entertainment industry.",
    requirements: ["SAG-AFTRA member", "Dance ability required", "Available for 3-week shoot"],
    isSag: true
  }
];

export const AGENCY_RESEARCH_MARKETS = [
  "Los Angeles", "New York", "Atlanta", "Miami", "Paris",
  "London", "Milan", "Chicago", "Dallas", "Nashville"
] as const;
