# GridLedger Protocol GL-1

**GridLedger transforms energy-gated production into replayable financial evidence.**

---

## Mission

The GridLedger Protocol GL-1 is a deterministic capital allocation infrastructure that reduces institutional exposure from 720 hours to 24 hours through cryptographic verification. This repository contains the canonical open-source implementation of the GL-1 governance interface and mandate-logging system.

**ISIC Classification:** 7490 — Other professional, scientific and technical activities not elsewhere classified  
**Entity:** GridLedger IP Ltd — Verification Authority

---

## The Architecture Claim

> *"Any auditor can fetch the raw events and the open-source protocol from the public repository and independently recompute every seal."*

This repository closes the gap between that promise and public reality. It is independently accessible—no API keys, no GridLedger server, no permission required.

---

## What This Is

**Not a landing page.** A governance interface.

The GL-1 Protocol is an institutional pressure instrument that forces capital deployment decisions through:

1. **Controlled Narrative Flow** — 11 scroll sections establishing the problem, mechanism, and institutional choice
2. **Cognitive Friction Moments** — Friction-gated submission form that cannot be scrolled past without explicit interaction
3. **Immutable Accountability Records** — Every mandate submission creates a timestamped, institution-tagged record that cannot be deleted

The closing statement is operational, not rhetorical:

> *"This standard now exists. Any deployment outside it becomes a recorded deviation."*

---

## The Replayability Guarantee

Every mandate submission to the GL-1 Protocol creates an immutable audit trail entry containing:

- **Submission ID** — Unique identifier (UUID)
- **Timestamp** — UTC timestamp of submission
- **Institution Name** — Submitting institution
- **Authorisation Level** — Board, Risk Committee, Credit Officer, or IT Operations
- **Capital Range** — <10M, 10M-100M, 100M-1B, >1B
- **Sector** — Target deployment sector
- **Mode Viewed** — Executive, Technical, or Audit view
- **Declaration Text** — Exact governance statement agreed to
- **Metadata** — User agent, IP address for audit trail

**Guarantee:** Any auditor can independently verify the integrity of these records. The append-only log structure prevents retroactive modification. The cryptographic commitment ensures no seal can be recomputed without access to the original raw events.

---

## Architecture

### Technology Stack
- **Frontend:** React 19 + Tailwind CSS 4 + TypeScript
- **Backend:** Express 4 + tRPC 11 + Node.js
- **Database:** MySQL/TiDB (Drizzle ORM)
- **Authentication:** Manus OAuth 2.0
- **Deployment:** Manus WebDev platform (independently accessible)

### Database Schema

#### mandate_submissions (Immutable Append-Only)
```sql
CREATE TABLE mandate_submissions (
  submission_id VARCHAR(36) PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT NOW(),
  institution_name VARCHAR(255) NOT NULL,
  authorisation_level ENUM('Board', 'Risk Committee', 'Credit Officer', 'IT Operations') NOT NULL,
  capital_range ENUM('<10M', '10M-100M', '100M-1B', '>1B') NOT NULL,
  sector VARCHAR(100) NOT NULL,
  mode_viewed ENUM('Executive', 'Technical', 'Audit') DEFAULT 'Executive',
  friction_point VARCHAR(255),
  anchor_links_opened JSON,
  declaration_text TEXT NOT NULL,
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Critical:** No deletion endpoint exists. This is an append-only audit trail.

#### friction_analytics (Engagement Audit Trail)
```sql
CREATE TABLE friction_analytics (
  event_id VARCHAR(36) PRIMARY KEY,
  event_type ENUM('mode_selection', 'anchor_link_open', 'friction_point_enter', 
                  'friction_point_exit', 'form_start', 'form_submit', 'form_abandon') NOT NULL,
  mode_selected ENUM('Executive', 'Technical', 'Audit'),
  anchor_link_type ENUM('audit_trail', 'cycle_data', 'cycle_replay'),
  section_name VARCHAR(100),
  duration_ms BIGINT,
  scroll_position INT,
  session_id VARCHAR(36),
  user_agent TEXT,
  ip_address VARCHAR(45),
  timestamp TIMESTAMP DEFAULT NOW()
);
```

---

## Operational/Verification Split

This repository contains the **verification layer** of the GL-1 Protocol. The verification layer is designed to function independently:

- **No backend connectivity required** — All governance documents, seal chains, and verification code are self-contained
- **No API keys or credentials** — The repository contains no secrets or operational dependencies
- **Independent auditability** — Any institution can clone, deploy, and verify the protocol without access to GridLedger infrastructure

### Mandate Submission

Institutional reviewers who wish to log engagement with this reference set may submit through the authenticated operational channel at `[operational endpoint]`. The verification layer contained in this repository functions independently of mandate logging and does not require backend connectivity to support independent audit or replay.

**Mandate submission is an operational function, not a verification function.** The DecisionGate form in this repository serves as a reference interface for institutional governance. Actual submissions flow through the authenticated operational channel to preserve the operational/verification split.

---

## The Governance Interface

### 11 Scroll Sections

Each section is 100vh (full screen) with scroll-snap enabled for controlled pacing.

| Section | Purpose | Key Feature |
|---------|---------|------------|
| 1. Hero | Entry point | Authority establishment |
| 2. Structural Deficit | Problem definition | Split-screen comparison (Traditional vs Production) |
| 3. Breakthrough | Core idea | Pipeline visualization |
| 4. System | Mechanism explanation | 4-step waterfall |
| 5. Verification Layer | Cryptographic authority | SHA256 commitment + live cycle feed |
| 6. Risk Compression | Institutional insight | Timeline + comparison table |
| 7. Capital Velocity | Economic impact | Throughput visualization |
| 8. Fiduciary Shift | Institutional pressure | Binary fork forcing choice |
| 9. **Cognitive Friction** | **BLOCKS SCROLL** | **Requires explicit interaction** |
| 10. Glass Box | Live system | Verification dashboard |
| 11. Decision Gate | Mandate capture | Reference interface (operational submissions via authenticated channel) |

### The Friction Moment (Section 9)

**Cannot be scrolled past.** Requires one of three explicit responses:

1. **"I Acknowledge This Contradiction"** — Proceeds to form
2. **"I Need More Information"** — Opens external sources (audit trail, cycle data, cycle replay)
3. **"I Disagree With This Premise"** — Logs objection

All responses are logged to `friction_analytics` for institutional engagement analysis.

### The Mandate Capture Form (Section 11)

Collects:
- Institution name
- Authorisation level (mandatory)
- Capital range
- Target sector
- Mode viewed (Executive/Technical/Audit)

**On submission:**
1. Creates immutable record in `mandate_submissions`
2. Logs to `friction_analytics`
3. Displays closing statement: *"This standard now exists. Any deployment outside it becomes a recorded deviation."*

---

## Mode-Specific Content Rendering

The protocol supports three institutional views:

### Executive View
Focus: ROI, capital commitment, timeline  
Shows: Hero, Structural Deficit, Breakthrough, Verification Layer, Risk Compression, Capital Velocity, Fiduciary Shift, Cognitive Friction, Decision Gate

### Technical View
Focus: Integration complexity, verification details, deterministic proof  
Shows: Hero, System, Verification Layer, Glass Box, Cognitive Friction, Decision Gate

### Audit View
Focus: Verification details, audit trail, compliance  
Shows: Hero, Verification Layer, Glass Box, Cognitive Friction, Decision Gate

---

## Independent Accessibility

This protocol is designed to be independently accessible:

- **No API keys required** — All functionality works without external service calls
- **No GridLedger server required** — The protocol is self-contained
- **No permission required** — Any institution can deploy and operate GL-1
- **Open source** — Full source code available in this repository
- **Replayable** — All events are immutable and independently verifiable

---

## Getting Started

### Prerequisites
- Node.js 22.13.0+
- pnpm 10.4.1+
- MySQL 8.0+ or TiDB

### Installation

```bash
# Clone repository
git clone https://github.com/SanjDigital/grid-ledger-insights.git
cd grid-ledger-insights

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

The protocol will be available at `http://localhost:3000`

### Database Setup

```bash
# Generate migrations
pnpm db:push

# Run migrations
pnpm db:push
```

---

## Architecture Statement

For the complete architectural rationale, verification methodology, and institutional governance framework, refer to the Architecture Statement (SSRN reference: [to be added]).

---

## Deployment

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

### Testing
```bash
pnpm test
```

### Type Checking
```bash
pnpm check
```

---

## API Reference

### tRPC Procedures

#### mandate.submit (PUBLIC)
Log institutional deployment mandate.

```typescript
Input: {
  institutionName: string,
  authorisationLevel: 'Board' | 'Risk Committee' | 'Credit Officer' | 'IT Operations',
  capitalRange: '<10M' | '10M-100M' | '100M-1B' | '>1B',
  sector: string,
  modeViewed?: 'Executive' | 'Technical' | 'Audit',
  declarationText: string
}

Output: {
  submissionId: string,
  success: boolean
}
```

#### mandate.list (ADMIN)
Retrieve submissions for audit trail.

```typescript
Input: {
  limit?: number,
  offset?: number
}

Output: MandateSubmission[]
```

#### friction.logEvent (PUBLIC)
Log institutional engagement events.

```typescript
Input: {
  eventType: 'mode_selection' | 'anchor_link_open' | 'friction_point_enter' | 
            'friction_point_exit' | 'form_start' | 'form_submit' | 'form_abandon',
  sessionId: string,
  ...
}

Output: {
  eventId: string,
  success: boolean
}
```

#### friction.analyze (ADMIN)
Analyze friction points to identify where institutional belief breaks.

```typescript
Output: {
  modeSelections: [...],
  anchorLinkAccess: [...],
  frictionPointDwell: [...],
  formEvents: [...]
}
```

---

## License

[License to be specified]

---

## Contact & Support

**Entity:** GridLedger IP Ltd — Verification Authority (ISIC 7490)  
**Repository:** SanjDigital/grid-ledger-insights  
**Architecture Statement:** [SSRN reference]

For technical questions, refer to the documentation in `/docs` or open an issue in this repository.

---

## Verification & Audit

This repository is designed to be independently auditable. Any institution can:

1. Clone this repository
2. Deploy the GL-1 Protocol
3. Operate the mandate-logging system
4. Independently verify the integrity of all records
5. Recompute any seal using the raw events

The architecture's integrity depends on this claim being true. This repository is the proof.
