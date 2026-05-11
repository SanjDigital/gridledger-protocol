# GridLedger Protocol GL-1 — Quick Reference Card

**Version:** 952f063c | **Status:** Week 1 Complete | **Dev Server:** Port 3000

---

## What Is This?

**Not a landing page.** An institutional pressure instrument that forces capital deployment decisions through:
1. Controlled narrative flow (11 scroll sections)
2. Cognitive friction moments (cannot scroll past without interaction)
3. Immutable accountability records (every submission logged to database)

---

## Key Concept

**Without the mandate log:** "Any deployment outside this standard becomes a recorded deviation" = rhetorical  
**With the mandate log:** "Any deployment outside this standard becomes a recorded deviation" = operational

Every form submission creates a timestamped, institution-tagged record that cannot be deleted.

---

## File Locations

| File | Purpose |
|------|---------|
| `client/src/pages/Home.tsx` | Main page (11 sections) |
| `client/src/components/sections/*.tsx` | Individual sections |
| `server/routers.ts` | tRPC procedures |
| `server/mandate.ts` | Mandate logging helpers |
| `server/friction.ts` | Friction analytics helpers |
| `drizzle/schema.ts` | Database schema |
| `client/src/contexts/InstitutionalModeContext.tsx` | Mode state |
| `client/src/components/InstitutionalModeToggle.tsx` | Mode toggle UI |

---

## Database Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `mandate_submissions` | Immutable audit trail | submission_id, institution_name, authorisation_level, capital_range, timestamp |
| `friction_analytics` | Engagement tracking | event_id, event_type, mode_selected, session_id, timestamp |
| `users` | Authentication | id, openId, role (admin/user) |

---

## tRPC Procedures

### mandate.submit (PUBLIC)
Logs institutional mandate. Called by form submission.
```
Input: institutionName, authorisationLevel, capitalRange, sector, modeViewed, declarationText
Output: { submissionId, success }
```

### mandate.list (ADMIN)
Retrieves submissions for audit trail.
```
Input: limit, offset
Output: MandateSubmission[]
```

### friction.logEvent (PUBLIC)
Logs user interaction events.
```
Input: eventType, modeSelected, sessionId, ...
Output: { eventId, success }
```

### friction.analyze (ADMIN)
Analyzes where institutional belief breaks.
```
Output: { modeSelections, anchorLinkAccess, frictionPointDwell, formEvents }
```

---

## Page Sections (11 Total)

| # | Name | Purpose | Key Feature |
|---|------|---------|------------|
| 1 | Hero | Entry | Authority |
| 2 | StructuralDeficit | Problem | Split-screen |
| 3 | Breakthrough | Idea | Pipeline |
| 4 | System | Mechanism | 4-step waterfall |
| 5 | VerificationLayer | Authority | SHA256 + live feed |
| 6 | RiskCompression | Insight | Timeline |
| 7 | CapitalVelocity | Impact | Throughput |
| 8 | FiduciaryShift | Pressure | Binary choice |
| 9 | **CognitiveFrictionHardened** | **BLOCKS SCROLL** | **Requires interaction** |
| 10 | GlassBox | System | Dashboard |
| 11 | DecisionGate | Mandate | Form → logs to DB |

---

## Deployment Sequence

```
Week 1: ✅ Backend mandate logging operational
Week 2: 🔄 Mode-specific content rendering (Executive/Technical/Audit)
Week 3: 📋 Friction moment hardening validation
Week 4: 🚀 Institutional transmission protocol
```

---

## Mode-Specific Rendering (Week 2)

**Executive View:** ROI, capital, timeline  
**Technical View:** Integration, verification, complexity  
**Audit View:** Verification, audit trail, compliance

Each mode shows only 1/3 of content. Hide 2/3.

---

## Friction Moment (Section 9)

**Cannot be scrolled past.** Requires one of three responses:
1. "I Acknowledge This Contradiction" → proceeds
2. "I Need More Information" → opens external sources
3. "I Disagree With This Premise" → logs objection

All responses logged to `friction_analytics`.

---

## Common Commands

```bash
# Start dev server
pnpm dev

# Type checking
pnpm check

# Database migration
pnpm db:push

# Run tests
pnpm test

# Build for production
pnpm build
```

---

## Environment Variables (Auto-Injected)

```
DATABASE_URL              # MySQL connection
JWT_SECRET               # Session signing
VITE_APP_ID              # OAuth app ID
OAUTH_SERVER_URL         # OAuth backend
OWNER_OPEN_ID            # Owner's ID
BUILT_IN_FORGE_API_KEY   # API key
```

---

## Critical Implementation Notes

### ✅ DO
- Log every form submission to mandate_submissions
- Log every user interaction to friction_analytics
- Block scroll at friction moment until interaction
- Make friction moment required, not optional
- Test scroll blocking on multiple browsers
- Export mandate data for institutional review

### ❌ DON'T
- Delete from mandate_submissions (append-only)
- Skip friction logging
- Make friction moment optional
- Hardcode institution names
- Expose mandate data publicly
- Modify declaration_text after submission

---

## Testing Checklist

- [ ] Form submission logs to mandate_submissions
- [ ] Friction events log to friction_analytics
- [ ] Scroll blocking works on Chrome, Firefox, Safari
- [ ] Keyboard scroll blocking works
- [ ] Touch scroll blocking works (mobile)
- [ ] Mode toggle logs to friction_analytics
- [ ] Mode filtering hides correct sections
- [ ] Admin dashboard shows submissions
- [ ] Export to CSV/JSON works

---

## Debugging

**Form not logging?**  
→ Check browser console for tRPC errors  
→ Verify mandate.submit procedure accessible  
→ Check database connection

**Scroll blocking not working?**  
→ Test on different browsers  
→ Check wheel event listener  
→ Verify passive event listeners not interfering

**Mode toggle not working?**  
→ Verify InstitutionalModeContext providing mode  
→ Check conditional rendering in sections  
→ Verify sectionVisibility map correct

---

## Key Files to Read First

1. **AI_MODEL_STATUS.md** — Full project overview
2. **IMPLEMENTATION_GUIDE.md** — Step-by-step implementation
3. **drizzle/schema.ts** — Database schema
4. **server/routers.ts** — tRPC procedures
5. **client/src/pages/Home.tsx** — Main page structure

---

## Architecture Decision Log

**Q: Why immutable mandate log?**  
A: Makes closing statement operational. Every submission creates timestamped, institution-tagged record.

**Q: Why hardened friction moment?**  
A: Forces institutional reconciliation of 720h vs 24h contradiction. Cannot be bypassed.

**Q: Why mode-specific rendering?**  
A: Different stakeholders need different information. Executive sees ROI, Technical sees integration, Audit sees verification.

**Q: Why friction analytics?**  
A: Identifies where institutional belief breaks. Data point for future refinement.

---

## Next Steps

1. **Read AI_MODEL_STATUS.md** (full context)
2. **Read IMPLEMENTATION_GUIDE.md** (step-by-step)
3. **Start Week 2:** Mode-specific rendering
4. **Test with 3 internal readers**
5. **Validate friction moment on all browsers**
6. **Prepare for Week 4 institutional transmission**

---

## Support

**Project:** GridLedger Protocol GL-1  
**Owner:** SanjDigital  
**Repository:** SanjDigital/grid-ledger-insights  
**Platform:** Manus WebDev  
**Current Version:** 952f063c

For questions, refer to AI_MODEL_STATUS.md or IMPLEMENTATION_GUIDE.md.
