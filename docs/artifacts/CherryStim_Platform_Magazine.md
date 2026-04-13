# CHERRYSTIM — Platform Magazine

**Invitation-Only Immersive Luxury Streaming**
*Issue 1 — April 2026*

---

## About CherryStim

CherryStim is a premium, invitation-only live-streaming platform offering four distinct viewing experiences: 2D Classic, 3D Experience, VR Mode, and Full Immersive. The platform connects dancers (performers) with clients (viewers) through real-time immersive technology, blockchain-powered tipping, AR filters, and a full ecosystem of tools for career advancement.

**Platform at a Glance:**

- 23 application routes
- 367 automated tests across 40 test files
- Next.js 15 (App Router) + React 18 + TypeScript
- Three.js / WebXR for 3D and VR
- Supabase for authentication and database
- LiveKit for real-time video streaming
- Solana blockchain for cryptocurrency tipping

---

## The Four Experience Modes

### 2D Classic
Ultra-smooth HD cinema stream. Works on any device — phone, tablet, laptop, or desktop. Perfect for casual viewing with enhanced emoji animations and depth shadows.

### 3D Experience
Spatial depth with volumetric avatars and dynamic camera controls. Dancers appear as 3D volumetric figures with real-time video textures, floating in a customizable environment with orbiting gifts and particle effects.

### VR Mode
Full stereoscopic VR for headset users. Private session rooms with head tracking, hand controller support, and spatial audio. Requires a VR headset (Meta Quest, Apple Vision Pro, etc.).

### Full Immersive
The ultimate experience: VR + haptic touch feedback + live 3D gift throws. Viewers feel simulated touch pulses through haptic devices (bHaptics TactSuit, MANUS gloves). Emojis become physical 3D objects you can interact with in space.

---

## Authentication & User System

The platform features a complete authentication system powered by Supabase:

- **Sign up** with email/password, choose role (Client or Dancer)
- **Role-based routing**: Admins go to /admin, Dancers to /dancer/dashboard, Clients to /dashboard
- **Navigation header** with auth state, role-aware menu links, and logout
- **User seeding script** for pre-populating admin and test accounts
- **Profile creation** on signup: display name, role, tier, and coin wallet (500 starting coins)
- **Dancer profiles** include bio and gear ownership status

---

## Revenue Model

### Gear-Based Splits (Streaming Revenue)

| Who Owns the Gear | Performer Gets | Platform Gets |
|---|---|---|
| CherryStim provides gear | 64% | 36% |
| Dancer leases gear | 64% | 36% |
| Dancer owns their gear | 55% | 45% |

### Casting Revenue (Star Bright Lights)
All gigs booked through the casting module: **64% performer / 36% platform.**

### Tier-Based Splits
As dancers advance in tiers, their base split evolves:

| Tier | Performer | Platform |
|---|---|---|
| Rising | 70% | 30% |
| Pro | 70% | 30% |
| Elite | 65% | 35% |
| Premier | 60% | 40% |
| Virtuoso | 55% | 45% |

---

## Tier System

### Dancer Tiers (Earned Through Metrics)

Tiers are calculated based on: hours on app, total earnings, gifts received, campaigns completed, modules passed, and average rating.

1. **Rising** — New dancers, entry level
2. **Pro** — 50+ hours, $1,000+ earned, 50+ gifts, 70%+ rating
3. **Elite** — 200+ hours, $5,000+ earned, 200+ gifts, 80%+ rating
4. **Premier** — 500+ hours, $15,000+ earned, 500+ gifts, 85%+ rating
5. **Virtuoso** — 1,000+ hours, $50,000+ earned, 1,000+ gifts, 90%+ rating

### Client Tiers

1. **Basic** — Free entry
2. **Crush** — Earned or paid upgrade
3. **Sprung** — Enhanced features, reduced fees
4. **VIP** — Priority access, advanced filters
5. **Platinum** — All features, signature filters, private banking concierge

Clients can pay to upgrade instantly or earn their way up through time spent, money spent, interactions, and dancer ratings.

---

## Rating System

### How Ratings Work

- Dancers and clients rate each other after interactions
- **Client ratings on dancers count 1/4 weight** — this protects dancers from sour clients giving unfair low scores
- Dancer ratings on clients count full weight
- Ratings are calculated on a weighted average scale (0-100%)

### Consequences

- **Clients below 75%**: Limited app access. Must pay premium to restore temporarily, or improve rating through positive interactions and tipping
- **Dancers below 75%**: Reduced visibility on the browse page
- **Bad rating pattern detection**: If a client consistently gives very low scores (average below 40 over 5+ ratings in 30 days), their rating ability is blocked for 2 weeks
- **Always tip**: Failing to tip dancers will result in low ratings. Too low and you lose access.

---

## Star Bright Lights — Casting Module

CherryStim's gateway from social media model to the real deal. The casting module provides:

### Casting Opportunities
6 categories of real opportunities researched from the top 40 talent and modeling agencies across Los Angeles, New York, Atlanta, Miami, Paris, London, Milan, Chicago, Dallas, and Nashville:

- **SAG Film/TV roles** — Lead and co-star roles in features and series
- **Background actress work** — HBO, Netflix, major network productions
- **Print modeling** — Luxury brand campaigns (Wilhelmina, Elite)
- **Runway modeling** — Fashion week presentations
- **Commercials** — National TV spots (SAG scale + residuals)
- **TV co-star roles** — Recurring roles in pilots and series

### Application Flow
Dancers can apply directly from the app with headshots, resume, and cover letter. Push notifications alert them to auditions, approvals, dismissals, and booked gigs.

### SAG Pipeline — 10-Step Roadmap
A step-by-step walkthrough to SAG-AFTRA membership:

1. Check SAG-AFTRA Eligibility
2. Register on Major Casting Platforms (Casting Networks, Actors Access, Backstage, Central Casting)
3. Get Professional Headshots
4. Build Your Acting Resume
5. Take Acting Classes
6. Book Background Work (earn SAG vouchers)
7. Join SAG-AFTRA (pay initiation fee + dues)
8. Secure Representation (talent agent)
9. Explore Print & Runway Modeling
10. Build Your Brand & Social Presence

Each step includes curated resources researched from agencies worldwide.

---

## AR Filter Engine

17 premium AR filters across 10 categories, powered by world-class face and body tracking technology.

### Technology
- **240-point face mesh** (China/Japan-grade, sourced from Banuba, BytePlus, SNOW)
- **Real-time lip sync** — filters follow every word perfectly
- **33-joint body pose tracking** — full body segmentation
- **21-point hand tracking** — finger-level precision
- **Eye gaze tracking** — filters respond to where you look
- **Hair and skin segmentation** — AI-powered, real-time

### Filter Categories

| Category | Example Filters |
|---|---|
| Beauty & Enhance | Silk Skin HD, AI Face Sculpt (28-dimension morphing), Holographic Glam, Body Contour Pro |
| Fantasy & Mythical | Elven Queen, Dragon Empress, Mermaid Siren |
| Animals | Golden Fox, Snow Leopard, Mystic Butterfly |
| Avatar & Sci-Fi | Na'vi Spirit (full Avatar transformation), Cyber Android |
| Angel & Devil | Divine Angel (volumetric wings), Dark Seraph (horns + ember wings) |
| Cyberpunk & Neon | Neon Circuit (beat-reactive traces) |
| Glamour | Diamond Diva (prismatic light refraction) |
| Signature CherryStim | Cherry Goddess (platform exclusive — cherry petal storm + gold glow) |

### Client Tier Access

| Tier | Accessible Categories |
|---|---|
| Basic | Beauty, Animal |
| Crush | + Cyberpunk, Glamour, Artistic |
| Sprung | + Fantasy, Seasonal |
| VIP | + Avatar, Celestial |
| Platinum | + Signature CherryStim exclusives |

---

## Emoji System — Mode Adaptive

25 custom platform emojis across 6 categories, with rendering that adapts to your viewing mode:

- **2D Mode**: Enhanced depth shadows, float/bounce/explode animations — even in 2D, emojis feel 3D
- **3D Mode**: Full 3D models with physics engine (100 particles)
- **VR Mode**: Interactive — catch, throw, spatial positioning in your VR space (150 particles)
- **Immersive Mode**: All of the above + haptic pulses you physically feel through your device (200 particles)

**Categories**: Flirty (cherry kiss, rose toss, peach, burning love), Reactions (mind blown, fire, applause), Gift Emotes (diamond rain, gold shower, crown drop), Vibe (disco ball, champagne), Premium (NFT gem, supernova), Interactive (virtual hug, hand wave).

Each emoji has: sound effects, physics simulation, haptic triggers, and VR interaction capability.

---

## Content Moderation

### Text Moderation
Real-time scanning of all chat messages with:

- **30+ blocked words**: sex, fuck, blowjob, flowers, escort, nude, prostitute, and more
- **21+ blocked phrases**: "pay for sex", "how much for sex", "how much for a bj", etc.
- **Leet-speak detection**: Automatically decodes evasion attempts (s3x → sex, fu$k → fuck, @ss → ass)
- **Solicitation pattern detection**: Regex matching for "how much for...", "what's your rate", "$X for Y hour"

### Voice Moderation
Voice transcript flagging is enabled for live streams and FaceTime calls — the same word and phrase detection runs on speech-to-text transcripts.

### Escalating Enforcement

1. **First offense**: Message blocked, warning shown
2. **Second offense**: User muted for 10 minutes
3. **Third offense+**: Temporary ban for 24 hours
4. **Solicitation detected**: Immediate temporary ban

---

## CherryStim Card Program

### Three Metal Card Tiers

| Card | Material | Weight | Monthly Fee | Cashback |
|---|---|---|---|---|
| Cherry Card | Matte Black Stainless Steel | 22 grams | Free | 1% |
| Cherry Gold | Brushed Gold + Black Stainless | 28 grams | $9.99/mo | 2% |
| Cherry Black | Titanium + Stainless Blend | 30 grams | $24.99/mo | 3% |

### Key Features (All Cards)
- Direct deposit from CherryStim earnings
- Visa/Mastercard network — accepted worldwide
- Apple Pay, Google Pay, Samsung Pay
- ATM access at 55,000+ fee-free ATMs (Allpoint network)
- **Credit building**: On-time payments reported monthly to Equifax, Experian, and TransUnion (Metro 2 format)
- Real-time push notifications on every transaction
- In-app spending analytics and budgeting tools

### Partners
- **US Issuing**: Marqeta (recommended, $383B+ volume), Galileo (Javelin Best-in-Class 2025)
- **Dubai/UAE**: LivUp for business entity formation, NymCard for card issuing, SimpliFi as backup
- **Metal Manufacturing**: CARDMAKER (volume, 300K+ cards globally), Custom Card, Metal Credit Card (MCC)

---

## Welcome Packages

### Dancer Welcome Package (20 Items)

Every dancer receives a custom welcome package shipped to their door. Contents vary by tier:

**All Tiers**: Premium unboxing box, metal debit card, welcome magazine, fridge magnets

**Pro+**: Lupit LED dance pole ($450-650), Pleaser platform heels ($89-120), CherryStim neon sign ($120-180), ring light ($75-120), streaming tripod ($35-55), equipment guide, Star Bright Lights magazine, tanning lotion ($55-75)

**Elite+**: Galimard 'Cherry Noir' perfume from Grasse, France ($65-95), French lace lingerie from Calais ($180-280), radiance body oils ($45-65), UV blacklight sign ($75-110)

**Premier+**: Italian swimwear from Prato ($120-180), silk lounge robe ($65-95), cosmetics glam kit ($85-130)

**Virtuoso**: Everything above. Estimated package value: $1,200 - $1,800+

### Client Welcome Package (19 Items, Gender-Specific)

No dance pole — clients receive everything else, customized by gender:

**Female exclusive**: Cherry Noir perfume (Galimard), lip gloss duo, silk scarf, cosmetics kit
**Male exclusive**: Black Cherry Reserve cologne (Galimard), silk pocket square, gold cufflinks, grooming kit
**All genders**: Debit card, welcome magazine, fridge magnets, phone ring, mini neon sign, tanning lotion, body oil, silk robe, VR headset case

### Onboarding Checkout
- **Dancer**: 12-step checkbox process (tier → gear plan → card → shipping → shoe size → fragrance → lingerie → swimwear → robe → ceiling height for pole → review → confirm)
- **Client**: 8-step process (gender → tier → card → shipping → fragrance → robe size → review → confirm)

### Live Order Tracking
11-stage pipeline with individual supplier-level tracking: Pending → Processing → Sourcing from Suppliers → Supplier Shipped → Arrived at Warehouse → Assembling Package → Quality Check → Shipped to You → In Transit → Out for Delivery → Delivered.

---

## Equipment Partnerships

10 deep-researched VR, 3D, immersive camera and haptic providers:

| Provider | Category | Location | Key Product | Price Range |
|---|---|---|---|---|
| 4Dviews | Volumetric Capture | Grenoble, France | HOLOSYS+ (48 cameras, 6K) | $50K-$500K+ |
| Volucap | Volumetric Capture | Potsdam, Germany | Studio rental (65+ megapixels/cam) | Per-session |
| Evercoast | Volumetric Capture | New York, NY | Mavericks 4 + NYC Studio | Per-session + license |
| Splat Labs | Volumetric Capture | San Francisco, CA | PortalCam (portable, Gaussian splatting) | $4,999-$6,499 |
| Live Planet | VR Camera | Los Angeles, CA | Complete VR streaming system | $7,995 |
| Kandao | VR Camera | Shenzhen, China | 8K 3D VR180 camera | $3,500-$4,999 |
| bHaptics | Haptic Device | Seoul, South Korea | TactSuit Pro (32 feedback points) | $199-$529 |
| MANUS | Haptic Device | Eindhoven, Netherlands | Prime 3 Haptic XR gloves | $2,499-$4,999 |
| Intel RealSense | Depth Sensor | Santa Clara, CA | D455 stereo depth camera | $349-$499 |
| Cerevo | Streaming Hardware | Tokyo, Japan | LiveShell X (H.265 1080/60p) | $799 |

Bulk ordering and ambassador partnerships available for all providers.

---

## Security

### Security Headers (via Next.js Middleware)
- Content-Security-Policy (script, style, image, media, font, frame sources locked down)
- Strict-Transport-Security (HSTS, 1 year)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=self, microphone=self, xr-spatial-tracking=self

### Application Security
- Rate limiting per user/IP
- Input sanitization (HTML entity encoding, display name length limits)
- CSRF token generation
- File upload validation (JPEG/PNG/WebP/HEIC only, max 10MB)
- Supabase Row Level Security for database

---

## Admin Dashboard

The admin dashboard provides 6 management tabs:

1. **Overview**: Platform stats (card programs, dancer items, client items, luxury partners), recent order activity
2. **Card Program**: All 3 card tiers, issuing partners, metal manufacturers
3. **Dancer Packages**: All 20 items with tier/supplier info, edit controls
4. **Client Packages**: All 19 items with gender/tier info, edit controls
5. **Order Management**: Active orders with status tracking, progress bars, update actions
6. **Launch Roadmap**: 11-step card program roadmap with timelines and dependencies

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| UI | React 18 + Tailwind CSS |
| 3D/VR | Three.js + @react-three/fiber + @react-three/xr + @react-three/drei |
| State | Zustand |
| Auth + DB | Supabase |
| Streaming | LiveKit |
| Blockchain | Solana + @solana/web3.js |
| Testing | Vitest + React Testing Library + jsdom |
| Animations | Framer Motion + CSS animations |
| Icons | Lucide React |
| Toasts | Sonner |

---

*CherryStim — Where luxury meets innovation.*
*© 2026 CherryStim. All rights reserved.*
