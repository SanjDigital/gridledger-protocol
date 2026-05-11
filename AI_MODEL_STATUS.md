# GridLedger Protocol GL-1 — AI Model Handoff Status

**Project Version:** 952f063c  
**Last Updated:** May 11, 2026  
**Status:** Week 1 Complete — Operational Mandate Logging System Deployed  
**Dev Server:** Running on port 3000  

---

## Executive Summary

The GridLedger Protocol GL-1 is **not a landing page**—it is an **institutional pressure instrument** designed to force capital deployment decisions through controlled narrative flow, cognitive friction moments, and immutable accountability records.

**Core Innovation:** Every form submission creates a timestamped, institution-tagged, capital-range-captured record in an append-only audit trail. The closing statement "This standard now exists. Any deployment outside it becomes a recorded deviation" is now **operational**, not rhetorical.

---

## Architecture Overview

### Technology Stack
- **Frontend:** React 19 + Tailwind CSS 4 + TypeScript
- **Backend:** Express 4 + tRPC 11 + Node.js
- **Database:** MySQL/TiDB (Drizzle ORM)
- **Auth:** Manus OAuth 2.0 (built-in)
- **Deployment:** Manus WebDev platform

### Project Structure
```
gridledger-protocol/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/          ← 11 scroll sections
│   │   │   ├── InstitutionalModeToggle.tsx
│   │   │   ├── LiveCycleFeed.tsx
│   │   │   └── ExternalAnchor.tsx
│   │   ├── contexts/
│   │   │   └── InstitutionalModeContext.tsx
│   │   ├── hooks/
│   │   │   ├── useInView.ts       ← Scroll detection
│   │   │   └── useAuth.ts         ← Auth state
│   │   ├── lib/
│   │   │   └── trpc.ts            ← tRPC client
│   │   ├── pages/
│   │   │   └── Home.tsx           ← Main page (11 sections)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css              ← Dark theme + animations
│   └── index.html
├── server/
│   ├── mandate.ts                 ← Mandate logging helpers
│   ├── friction.ts                ← Friction analytics helpers
│   ├── routers.ts                 ← tRPC procedures
│   ├── db.ts                      ← Database query helpers
│   ├── storage.ts                 ← S3 file storage
│   └── _core/                     ← Framework plumbing (OAuth, context, etc.)
├── drizzle/
│   ├── schema.ts                  ← Database schema (3 tables)
│   └── migrations/                ← SQL migrations
├── shared/
│   ├── const.ts
│   └── types.ts
└── vitest.config.ts               ← Test configuration
```

---

## Database Schema

### Table 1: mandate_submissions (Immutable Append-Only)
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

**Purpose:** Creates institutional accountability chain. Every submission is timestamped, institution-tagged, and capital-range-captured. No deletion endpoint.

### Table 2: friction_analytics (Audit Trail)
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

**Purpose:** Tracks institutional engagement patterns. Identifies where belief breaks (friction points), which modes are selected first, which external sources are accessed.

### Table 3: users (Authentication)
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  lastSignedIn TIMESTAMP DEFAULT NOW()
);
```

---

## Page Structure: 11 Scroll Sections

Each section = 100vh (full screen). Scroll-snap enabled for controlled pacing.

| Section | Component | Purpose | Key Feature |
|---------|-----------|---------|-------------|
| 1 | Hero | Entry point | Authority establishment |
| 2 | StructuralDeficit | Problem definition | Split-screen comparison |
| 3 | Breakthrough | Core idea | Pipeline visualization |
| 4 | System | Mechanism explanation | 4-step waterfall |
| 5 | VerificationLayer | Cryptographic authority | SHA256 commitment + live feed |
| 6 | RiskCompression | Institutional insight | Timeline + comparison table |
| 7 | CapitalVelocity | Economic impact | Throughput visualization |
| 8 | FiduciaryShift | Institutional pressure | Binary fork forcing choice |
| 9 | CognitiveFrictionHardened | **BLOCKS SCROLL** | Requires explicit interaction |
| 10 | GlassBox | Live system | Verification dashboard |
| 11 | DecisionGate | Final mandate capture | Form submission → logs to DB |

---

## Backend tRPC Procedures

### mandate.submit (PUBLIC)
**Purpose:** Log institutional deployment mandate to immutable audit trail.

```typescript
Input: {
  institutionName: string,
  authorisationLevel: 'Board' | 'Risk Committee' | 'Credit Officer' | 'IT Operations',
  capitalRange: '<10M' | '10M-100M' | '100M-1B' | '>1B',
  sector: string,
  modeViewed?: 'Executive' | 'Technical' | 'Audit',
  frictionPoint?: string,
  anchorLinksOpened?: string[],
  declarationText: string
}

Output: {
  submissionId: string,
  success: boolean
}
```

**Called by:** DecisionGate form submission  
**Logs to:** mandate_submissions table  
**Metadata captured:** IP address, user agent, timestamp (UTC)

### mandate.list (PROTECTED/ADMIN)
**Purpose:** Retrieve submissions for audit trail analysis.

```typescript
Input: {
  limit?: number (default 100),
  offset?: number (default 0)
}

Output: MandateSubmission[]
```

**Access:** Admin only (role === 'admin')

### friction.logEvent (PUBLIC)
**Purpose:** Log institutional engagement events for audit trail.

```typescript
Input: {
  eventType: 'mode_selection' | 'anchor_link_open' | 'friction_point_enter' | 
            'friction_point_exit' | 'form_start' | 'form_submit' | 'form_abandon',
  modeSelected?: 'Executive' | 'Technical' | 'Audit',
  anchorLinkType?: 'audit_trail' | 'cycle_data' | 'cycle_replay',
  sectionName?: string,
  durationMs?: number,
  scrollPosition?: number,
  sessionId: string
}

Output: {
  eventId: string,
  success: boolean
}
```

**Called by:** All interactive components  
**Logs to:** friction_analytics table

### friction.analyze (PROTECTED/ADMIN)
**Purpose:** Analyze friction points to identify where institutional belief breaks.

```typescript
Output: {
  modeSelections: [{mode_selected, count, avg_timestamp}],
  anchorLinkAccess: [{anchor_link_type, count, avg_scroll_position}],
  frictionPointDwell: [{section_name, interactions, avg_dwell_ms, max_dwell_ms, min_dwell_ms}],
  formEvents: [{event_type, count}],
  timestamp: string
}
```

**Access:** Admin only  
**Purpose:** Identify which sections cause institutional hesitation

---

## Frontend Components

### InstitutionalModeToggle
- Displays: Executive | Technical | Audit
- Location: Top-right corner
- Default: Executive
- Logs: mode_selection event to friction_analytics
- **Status:** Implemented but mode-specific rendering NOT YET ACTIVE

### LiveCycleFeed
- Simulated real-time verification data
- Located in VerificationLayer section
- Shows: cycle_id, timestamp, verification_hash, status
- Clickable rows for detailed view
- **Status:** Implemented

### ExternalAnchor
- Links to audit trail, cycle data, cycle replay
- Placed at moments of doubt (Verification Layer, Risk Compression, Glass Box)
- Logs: anchor_link_open event
- **Status:** Implemented

### CognitiveFrictionHardened
- **CRITICAL:** Cannot be scrolled past
- Blocks wheel scroll events until interaction complete
- Three response buttons:
  1. "I Acknowledge This Contradiction" → proceeds
  2. "I Need More Information" → opens external sources
  3. "I Disagree With This Premise" → logs objection
- All responses logged to friction_analytics
- **Status:** Implemented, needs browser testing

---

## Design System

### Color Palette
- **Background:** #0A0A0A (pure black)
- **Text:** #FFFFFF (white)
- **Accent (Verification):** #22c55e (green)
- **Accent (Error/Risk):** #ef4444 (red)
- **Neutral:** #666666 (gray)

### Typography
- **Headings:** Courier Prime (monospace, institutional)
- **Body:** Inter (sans-serif, readable)
- **Data:** Courier New (monospace, technical)

### Animations
- **Section entry:** Fade in + slide up (0.8s ease-out)
- **Numbers:** Count-up animation (2s)
- **Hashes:** Typewriter effect (30ms per character)
- **Locks:** Toggle animation (0.3s)

---

## Deployment Sequence (4-Week Plan)

### Week 1: ✅ COMPLETE
- [x] Backend mandate logging system operational
- [x] Immutable append-only schema
- [x] tRPC procedures for mandate.submit and friction.logEvent
- [x] Hardened friction moment component created
- [x] Database migration deployed

### Week 2: 🔄 IN PROGRESS
- [ ] Mode-specific content rendering (Executive/Technical/Audit views)
- [ ] Remove two-thirds of page content per mode
- [ ] Surface only relevant third for each stakeholder
- [ ] Default to Executive, mode selection explicit
- [ ] Test with 3 internal readers

### Week 3: 📋 PLANNED
- [ ] Friction moment hardening validation
- [ ] Cross-browser scroll blocking test
- [ ] Ensure cannot be bypassed
- [ ] Performance testing with 100+ concurrent users

### Week 4: 🚀 PLANNED
- [ ] Institutional transmission protocol
- [ ] URL delivery to NBM Risk Desk and RBM Financial Stability
- [ ] Regulatory Brief as cover document
- [ ] Treat as instrument deployment, not landing page

---

## Key Files to Know

### Frontend
- `client/src/pages/Home.tsx` — Main page, renders all 11 sections
- `client/src/components/sections/*.tsx` — Individual section components
- `client/src/contexts/InstitutionalModeContext.tsx` — Mode state management
- `client/src/index.css` — Dark theme, animations, scroll-snap

### Backend
- `server/routers.ts` — tRPC procedure definitions
- `server/mandate.ts` — Mandate logging helpers
- `server/friction.ts` — Friction analytics helpers
- `drizzle/schema.ts` — Database schema

### Configuration
- `vite.config.ts` — Vite build configuration
- `drizzle.config.ts` — Drizzle ORM configuration
- `package.json` — Dependencies and scripts

---

## Environment Variables (Auto-Injected)

```
DATABASE_URL              # MySQL connection string
JWT_SECRET               # Session signing secret
VITE_APP_ID              # Manus OAuth app ID
OAUTH_SERVER_URL         # Manus OAuth backend
VITE_OAUTH_PORTAL_URL    # Manus login portal
OWNER_OPEN_ID            # Owner's OpenID
OWNER_NAME               # Owner's name
BUILT_IN_FORGE_API_URL   # Manus APIs endpoint
BUILT_IN_FORGE_API_KEY   # Manus APIs bearer token
VITE_FRONTEND_FORGE_API_KEY  # Frontend API key
VITE_FRONTEND_FORGE_API_URL  # Frontend APIs endpoint
```

---

## Development Workflow

### Start Dev Server
```bash
cd /home/ubuntu/gridledger-protocol
pnpm dev
```

### Database Migrations
```bash
pnpm db:push  # Generate + apply migrations
```

### Type Checking
```bash
pnpm check
```

### Testing
```bash
pnpm test    # Run vitest
```

### Build for Production
```bash
pnpm build
```

---

## Critical Implementation Notes

### 1. Mandate Logging is Operational
- Every form submission creates immutable record
- No deletion endpoint exists
- This makes the closing statement operational: "Any deployment outside this standard becomes a recorded deviation"

### 2. Friction Analytics Tracks Decision-Making
- Mode selection: Which view does reader choose first?
- Anchor link access: Which external sources are accessed?
- Friction point dwell: Time spent on 720h vs 24h reconciliation
- Form events: Submission, abandonment, objection

### 3. Hardened Friction Moment is NOT Optional
- Cannot be scrolled past
- Requires explicit interaction (acknowledge, disagree, or request info)
- All responses logged
- This is the institutional decision point

### 4. Mode-Specific Rendering is NOT YET ACTIVE
- Toggle exists but doesn't change content
- Week 2 task: Remove 2/3 of content per mode
- Executive view: ROI, capital commitment, timeline
- Technical view: Integration complexity, verification details
- Audit view: Verification details, audit trail, compliance

### 5. External Anchors Reinforce Authority
- Placed at moments of doubt
- Link to audit trail, cycle data, cycle replay
- Log access for friction analysis

---

## Next Steps for AI Model

### Immediate (Week 2)
1. **Implement mode-specific content rendering**
   - Create conditional rendering in each section
   - Executive: Show ROI, capital, timeline
   - Technical: Show integration, verification, complexity
   - Audit: Show verification, audit trail, compliance
   - Test with 3 internal readers

2. **Validate friction moment scroll blocking**
   - Test on Chrome, Firefox, Safari
   - Ensure cannot be bypassed with keyboard
   - Test on mobile (if applicable)

3. **Add friction analytics logging to all interactive components**
   - Mode toggle: Log mode_selection
   - Anchor links: Log anchor_link_open
   - Form start: Log form_start
   - Form abandon: Log form_abandon

### Medium Term (Week 3-4)
1. **Prepare institutional transmission protocol**
   - Create delivery URL with tracking
   - Prepare Regulatory Brief as cover document
   - Set up mandate submission monitoring dashboard

2. **Performance testing**
   - Load test with 100+ concurrent users
   - Verify database write performance
   - Monitor friction analytics query performance

3. **Audit trail analysis**
   - Build admin dashboard to view submissions
   - Analyze friction points
   - Identify where belief breaks

---

## Known Limitations

1. **Mode-specific rendering not active** — Toggle exists but doesn't filter content (Week 2 task)
2. **Friction moment scroll blocking** — Needs cross-browser testing
3. **No email notifications** — Form submissions don't send emails (can be added)
4. **No mandate export** — Cannot export submissions as CSV/PDF (can be added)
5. **No real verification data** — Live cycle feed is simulated (can connect to real API)

---

## Support & Debugging

### Common Issues

**Q: Form submission not logging?**  
A: Check browser console for tRPC errors. Verify mandate.submit procedure is accessible. Check database connection.

**Q: Friction moment scroll blocking not working?**  
A: Test on different browsers. May need to adjust wheel event listener. Check if passive event listeners are interfering.

**Q: Mode toggle not changing content?**  
A: Mode-specific rendering not yet implemented. This is Week 2 task.

### Logs
- Dev server logs: `server/_core/index.ts` output
- Browser console: Check for tRPC errors
- Database: Query mandate_submissions and friction_analytics tables directly

---

## Contact & Escalation

**Project Owner:** SanjDigital  
**Repository:** SanjDigital/grid-ledger-insights  
**Deployment Platform:** Manus WebDev  
**Current Version:** 952f063c  

For questions about architecture, design decisions, or deployment strategy, refer to the memo files in the project root.
