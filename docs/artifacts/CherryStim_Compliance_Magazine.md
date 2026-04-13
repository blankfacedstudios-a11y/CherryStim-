# CHERRYSTIM — Compliance & Governance Guide

**Platform Safety, Moderation, and Regulatory Framework**
*Version 1.0 — April 2026*

---

## Introduction

CherryStim is a premium, invitation-only live-streaming platform connecting dancers with clients through four immersive viewing modes: 2D Classic, 3D Experience, VR Mode, and Full Immersive. This document defines the compliance framework, content policies, moderation systems, financial regulations, and user conduct rules that govern every interaction on the platform.

The CherryStim compliance program exists to protect dancers, maintain a respectful community, ensure financial regulatory adherence, and uphold the platform's reputation as a luxury-tier experience.

---

## Platform Content Policies

### Community Standards

CherryStim operates under a zero-tolerance policy for solicitation, exploitation, harassment, and illegal activity. Every user — client and dancer — agrees to the following upon joining:

- **Respectful interaction at all times.** Dancers are professionals; clients are guests.
- **No solicitation of any kind.** The platform is for live entertainment, not arranging off-platform meetings.
- **No sharing of personal contact information** (phone numbers, addresses, social media handles) through chat.
- **No discriminatory language** based on race, ethnicity, gender identity, sexual orientation, religion, or disability.
- **No threats, intimidation, or coercion** directed at any user.
- **No recording, screenshotting, or redistribution** of live stream content without explicit consent.
- **All users must be 18 years of age or older.** Age verification is enforced at signup.
- **Tipping is expected.** Clients who consistently fail to tip will receive low ratings from dancers, which impacts access privileges.

### Dancer Code of Conduct

- Maintain professional boundaries during all interactions
- Report any suspicious or threatening behavior immediately through the in-app safety button
- Do not share personal identifying information with clients
- Comply with all streaming schedule commitments
- Maintain equipment and streaming quality standards appropriate to your tier

### Client Code of Conduct

- Always tip dancers for their time and performance
- Respect the performer's boundaries and content guidelines
- Do not attempt to arrange off-platform meetings or contact
- Accept rating consequences for poor behavior
- Low ratings result in limited platform access — this is enforced automatically

---

## Content Moderation System

### Overview

CherryStim deploys a multi-layered, real-time content moderation engine that scans every text message and voice transcript on the platform. The system operates with zero human delay — flagged content is caught and actioned before it reaches the recipient.

### Blocked Words

The following words are blocked across all platform communications. Any message containing these terms (in any form, including leet-speak variants) will be intercepted:

| Category | Blocked Words |
|---|---|
| **Sexual acts** | sex, fuck, blowjob, anal, cum, orgasm, orgy, threesome, foursome, masturbate, jerk off |
| **Body parts** | dick, cock, pussy, tits |
| **Nudity** | nude, nudes, naked |
| **Solicitation terms** | escort, prostitute, hooker, whore, pimp, trick, flowers |
| **Directives** | suck me, ride me, bang me |
| **External platforms** | onlyfans, fansly |
| **Payment solicitation** | cashapp me, venmo me, paypal me |

**Additional blocked terms** in the system include: bj, handjob, hj, prostitution, masturbation.

### Blocked Phrases

The following phrases trigger immediate escalation (severity level: "ban"):

| Blocked Phrase |
|---|
| pay for sex |
| how much for sex |
| how much for head |
| how much for a bj |
| how much for a blowjob |
| sex for money |
| cash for sex |
| money for sex |
| buy sex |
| sell sex |
| sex work |
| escort service |
| happy ending |
| full service |
| pay to play |
| how much for everything |
| what are your rates |
| come to my hotel |
| come to my room |
| meet up for fun |
| meet in person |

Any message matching a blocked phrase results in an **immediate temporary ban** — no warnings, no escalation steps.

### Solicitation Detection Patterns

Beyond exact word and phrase matching, the moderation engine uses regular expression pattern detection to catch creative solicitation attempts:

- **Price negotiation**: "how much for...", "how much to...", "how much do you charge..."
- **Rate inquiry**: "what's your rate", "what is your price", "what is your fee"
- **Meeting requests**: "can you meet...", "will you come...", "can you visit..."
- **Service expansion**: "do you do extra", "do you offer private", "can you do more"
- **Payment offers**: "paying you for extra", "pay for private", "pay for special"
- **Dollar amounts**: "$50 for an hour", "$200 to get...", "$100/session"
- **Contact exchange**: "send me your number", "give me your snap", "get my insta"

These patterns are evaluated against every message using case-insensitive regex matching.

### Leet-Speak Normalization

Users who attempt to bypass the word filter using character substitutions are caught by CherryStim's text normalization engine. Before any message is checked against blocked lists, it passes through a normalization pipeline:

| Character | Normalized To | Example |
|---|---|---|
| 0 | o | h0t → hot |
| 1 | i | b1tch → bitch |
| 3 | e | s3x → sex |
| 4 | a | 4ss → ass |
| 5 | s | 5ex → sex |
| 7 | t | 7its → tits |
| 8 | b | 8j → bj |
| @ | a | @ss → ass |
| $ | s | fu$k → fuck |
| ! | i | d!ck → dick |
| \| | i | d\|ck → dick |
| * | (removed) | f*ck → fck → fuck |
| _ | (removed) | f_uck → fuck |

The system also generates all plausible variants of each blocked word using these substitution maps and stores them in a pre-computed set for instant lookup. This means even novel combinations like "s3x", "fu$k", "@n@l", or "d!ck" are caught on the first attempt.

### Voice Moderation

Voice transcript flagging is enabled for all live streams and FaceTime-style calls. The speech-to-text engine produces a transcript in real time, and the **exact same moderation pipeline** (blocked words, blocked phrases, solicitation patterns, leet-speak normalization) is applied to voice content.

When a voice transcript is flagged, the system logs the violation and applies the same escalating enforcement as text violations.

---

## Escalating Enforcement

CherryStim uses a progressive discipline model. Each user's violation count is tracked persistently.

### Enforcement Ladder

| Offense | Action | Duration | Details |
|---|---|---|---|
| **1st offense** | Message blocked | Instant | The message is intercepted and replaced with "***". A warning notification is shown to the sender. The intended recipient never sees the original message. |
| **2nd offense** | User muted | 10 minutes | The user cannot send any messages for 10 minutes. A countdown timer is displayed. Their prior violation history is noted. |
| **3rd offense and beyond** | Temporary ban | 24 hours | The user is locked out of the platform for 24 hours. They receive a notification explaining the ban reason and duration. |
| **Solicitation detected** | Immediate temporary ban | 24 hours | If any blocked phrase or solicitation pattern is matched, the user is banned for 24 hours immediately — regardless of their prior violation count. |

### Severity Classification

The moderation engine classifies every flagged message into one of three severity levels:

- **Warning** — A single prohibited word was detected. Message is blocked; user is warned.
- **Block** — Three or more prohibited terms in a single message, or the user has one or more prior violations. User is muted for 10 minutes.
- **Ban** — A blocked phrase (solicitation) was detected, or the user has accumulated 3+ violations. Immediate 24-hour temporary ban.

### Permanent Review

Users who accumulate repeated temporary bans are escalated to a permanent review queue. A human moderator evaluates the account history and determines whether to issue a permanent ban or restore access with conditions.

---

## Rating System Rules

### How Ratings Work

After every interaction (stream, chat session, or FaceTime call), both dancers and clients can rate each other on a 0–100 scale. Ratings drive platform access, visibility, and trust.

### Weighted Rating Calculation

Not all ratings carry equal weight. CherryStim protects dancers from retaliatory or unfair ratings:

| Rating Direction | Weight |
|---|---|
| **Client rating a dancer** | **1/4 weight** (0.25x) |
| **Dancer rating a client** | **Full weight** (1.0x) |

This means a sour client leaving a vindictive 10/100 score on a dancer only counts as 2.5 effective points in the weighted average. Meanwhile, a dancer's rating of a client counts at full face value.

**Rationale:** Dancers are the talent and lifeblood of the platform. Clients sometimes leave unfairly low ratings after being rejected for solicitation or bad behavior. The 1/4 weight policy prevents rating abuse.

### The 75% Threshold

75% is the critical rating threshold on CherryStim:

- **Clients below 75%**: Platform access is **limited**. The client loses access to premium features, advanced filters, and priority viewing. They must either pay a premium fee to temporarily restore access or improve their rating through positive interactions and generous tipping.
- **Dancers below 75%**: Visibility on the browse page is **reduced**. Their profile appears lower in search results and browse listings.

### Bad Rating Pattern Detection

The system monitors for clients who systematically leave unfairly low ratings:

- **Trigger**: Average rating below 40 across 5 or more ratings within a rolling 30-day window
- **Consequence**: The client's ability to rate dancers is **blocked for 2 weeks** (14 days)
- **Purpose**: Prevents rating abuse and protects dancers from coordinated or habitual bad-faith scoring

### Client Conduct Summary

| Behavior | Consequence |
|---|---|
| Failing to tip | Dancers give low ratings → access limited below 75% |
| Consistently low ratings given | Rating ability blocked for 2 weeks |
| Below 75% rating | Limited app access, must pay premium or improve |
| Solicitation | Immediate 24-hour ban + flagged for permanent review |

---

## KYC/AML Compliance — Card Program

### Identity Verification

All users applying for a CherryStim metal debit card must complete identity verification (Know Your Customer). The platform integrates with leading identity verification providers:

| Provider | Service | Website |
|---|---|---|
| **Plaid** | Bank account verification, income verification | plaid.com |
| **Socure** | AI-powered identity verification, fraud prevention | socure.com |
| **Jumio** | Document verification (ID scan), biometric matching | jumio.com |

### KYC Requirements

Applicants must provide:

- **Government-issued photo ID** (passport, driver's license, or national ID card)
- **Selfie verification** (biometric match against photo ID)
- **Proof of address** (utility bill, bank statement, or government correspondence dated within 90 days)
- **Date of birth confirmation** (must be 18 years or older)
- **Social Security Number** (for US residents) or equivalent national identifier

### AML (Anti-Money Laundering) Protocols

- **Transaction monitoring**: All card transactions are monitored in real time for suspicious patterns
- **Suspicious Activity Reporting (SAR)**: Unusual transaction patterns are flagged and reported to FinCEN as required by the Bank Secrecy Act
- **Currency Transaction Reports (CTR)**: Transactions exceeding $10,000 are reported as required by federal law
- **Sanctions screening**: All users are screened against OFAC and international sanctions lists
- **Ongoing monitoring**: Customer profiles are periodically re-verified for continued compliance

---

## Credit Bureau Compliance

### Metro 2 Format Reporting

CherryStim's card program builds credit for dancers by reporting on-time payments to all three major credit bureaus:

| Bureau | Reporting | Format |
|---|---|---|
| **Equifax** | Monthly | Metro 2 |
| **Experian** | Monthly | Metro 2 |
| **TransUnion** | Monthly | Metro 2 |

**Metro 2** is the standardized data format required by the Consumer Data Industry Association (CDIA) for furnishing consumer credit information. CherryStim's data furnisher agreements ensure:

- Accurate and timely monthly reporting of payment history
- Proper dispute handling per the Fair Credit Reporting Act (FCRA)
- Compliance with the FCRA's accuracy and dispute resolution requirements
- Data furnisher registration with each bureau
- Regular audits of reported data for accuracy

### Credit Building Features

- On-time card payment history reported monthly
- CherryStim Black Card holders receive an annual credit score boost consultation
- In-app credit score tracking and education tools
- Dedicated financial advisor access (Gold and Black card tiers)

---

## PCI-DSS Compliance

### Payment Card Industry Data Security Standard

All payment processing within CherryStim adheres to PCI-DSS requirements:

- **Network Security**: Firewalls and network segmentation protect cardholder data
- **Encryption**: All cardholder data is encrypted in transit (TLS 1.2+) and at rest (AES-256)
- **Access Control**: Role-based access to payment systems; principle of least privilege enforced
- **Monitoring**: All access to payment systems is logged and monitored
- **Vulnerability Management**: Regular security scans and penetration testing
- **Tokenization**: Card numbers are tokenized through the issuing partner (Marqeta) — CherryStim never stores raw card numbers
- **Digital Wallet Security**: Apple Pay, Google Pay, and Samsung Pay integrations use device-level tokenization

### Issuing Partner Compliance

CherryStim's recommended issuing partner, **Marqeta**, maintains PCI-DSS Level 1 certification (the highest level), handling $383B+ in transaction volume with 99.99% uptime. Their infrastructure provides:

- Dynamic spend controls and real-time authorization
- Tokenization for all digital wallet integrations
- Sandbox API for development and testing
- Production deployment in weeks

---

## GDPR and CCPA Data Privacy

### GDPR (European Users)

For users in the European Economic Area, CherryStim complies with the General Data Protection Regulation:

- **Right to Access**: Users can request a complete export of their personal data
- **Right to Erasure**: Users can request deletion of their account and all associated data
- **Right to Rectification**: Users can correct inaccurate personal information
- **Right to Portability**: Data can be exported in machine-readable format
- **Consent Management**: Explicit opt-in consent required for data collection beyond essential platform operation
- **Data Processing Agreements**: All third-party processors (Supabase, Marqeta, LiveKit) have signed DPAs
- **Data Protection Officer**: Designated DPO contactable through the platform's privacy portal

### CCPA (California Users)

For California residents, CherryStim complies with the California Consumer Privacy Act:

- **Right to Know**: Full disclosure of what personal information is collected and how it is used
- **Right to Delete**: Request deletion of personal information
- **Right to Opt-Out**: Opt out of the sale of personal information (CherryStim does not sell personal data)
- **Non-Discrimination**: Users who exercise CCPA rights receive the same service quality and pricing

### Data Retention

| Data Type | Retention Period |
|---|---|
| Account profile | Duration of account + 30 days after deletion request |
| Chat messages | 90 days (auto-purged) |
| Stream recordings | Not stored (live only, unless dancer opts in to replay) |
| Transaction history | 7 years (regulatory requirement) |
| KYC documents | 5 years after account closure (BSA requirement) |
| Moderation logs | 1 year |
| Rating history | Duration of account |

---

## Age Verification

### Requirements

- **Minimum age**: 18 years old for all users (dancers and clients)
- **Verification at signup**: Date of birth is collected and validated during account creation
- **ID verification for card program**: Government-issued photo ID with date of birth confirmation
- **Biometric verification**: Selfie-to-ID matching through Jumio or equivalent provider
- **Re-verification**: Periodic age re-verification for accounts flagged by the trust and safety team

### Enforcement

- Accounts found to belong to minors are **immediately suspended** and reported to the National Center for Missing & Exploited Children (NCMEC) if applicable
- Falsifying age information results in permanent ban and potential legal referral
- All age verification data is stored encrypted and access-restricted per PCI-DSS and privacy regulations

---

## Dancer Safety Protocols

### In-App Safety Features

- **Emergency button**: One-tap access to block a user and report the interaction, available during every stream and chat
- **Instant user blocking**: Dancers can block any client immediately; blocked users cannot view, message, or interact with the dancer
- **Anonymous reporting**: All reports are anonymized during investigation to protect the reporter
- **Real-time moderation alerts**: Dancers are notified when the system catches a flagged message in their chat

### Physical Safety

- **No personal information sharing**: The platform actively prevents sharing of addresses, phone numbers, and social media handles through the moderation engine
- **Location privacy**: IP addresses and geolocation data are never exposed to other users
- **Secure payments**: All tipping and payments flow through the platform — dancers never share banking details with clients
- **Welcome package shipping**: Packages are shipped through CherryStim's fulfillment partner, not directly from clients

### Support Resources

- 24/7 safety support team accessible through the app
- Dedicated dancer advocate assigned to escalated safety concerns
- Partnerships with local law enforcement for credible threat escalation
- Mental health resources and crisis hotline information available in the dancer dashboard

---

## Compliance Contacts and Resources

| Organization | Purpose | Contact |
|---|---|---|
| SAG-AFTRA | Performer union, casting compliance | sagaftra.org |
| FinCEN | Financial crimes enforcement | fincen.gov |
| FTC | Consumer protection, advertising compliance | ftc.gov |
| CDIA | Metro 2 format and credit reporting standards | cdiaonline.org |
| PCI Security Standards Council | PCI-DSS compliance framework | pcisecuritystandards.org |

---

## Document Control

| Field | Value |
|---|---|
| **Document** | CherryStim Compliance & Governance Guide |
| **Version** | 1.0 |
| **Effective Date** | April 2026 |
| **Review Cycle** | Quarterly |
| **Owner** | CherryStim Trust & Safety Team |
| **Classification** | Internal — All Employees |

---

*CherryStim — Where luxury meets innovation.*
*© 2026 CherryStim. All rights reserved.*
