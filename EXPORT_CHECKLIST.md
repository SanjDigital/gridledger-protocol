# GitHub Export Checklist — Constitutional Move

**Repository:** `SanjDigital/grid-ledger-insights`  
**Status:** Ready for export  
**Date:** May 11, 2026

---

## Pre-Export Verification

### ✅ Gate 1: Governance Interface Integrity
- [x] Mandate-logging frontend complete
- [x] Friction-gated submission form operational
- [x] Three-gate mechanics (scroll enforcement, acknowledgment, closing statement)
- [x] Immutable audit trail schema (mandate_submissions)
- [x] Friction analytics logging (friction_analytics)
- [x] tRPC procedures for mandate.submit and friction.logEvent
- [x] Database migrations generated and tested

### ✅ Gate 2: Canonical Public Interface
- [x] README.md created with mission statement
- [x] ISIC 7490 classification included
- [x] Replayability guarantee in plain language
- [x] Independent accessibility statement
- [x] Architecture Statement reference (placeholder for SSRN)
- [x] Getting Started section with installation steps
- [x] API reference documentation

### ✅ Gate 3: Brand Reconciliation
- [x] No "Grit Enterprise" references found
- [x] Entity identifier consistent: GridLedger IP Ltd — Verification Authority (ISIC 7490)
- [x] Page title: "GridLedger Protocol GL-1"
- [x] No version inconsistencies

### ✅ Operational/Verification Layer Separation
- [x] No hardcoded credentials in source code
- [x] All API keys reference environment variables
- [x] No database connection strings hardcoded
- [x] `.env` files properly excluded via `.gitignore`
- [x] No `.env` files staged in git
- [x] Verification layer (seal replay code) is public
- [x] Operational layer (credentials, database) is protected

### ✅ Code Quality
- [x] TypeScript compilation passes (`pnpm check`)
- [x] No linting errors
- [x] All components render without errors
- [x] Database schema valid
- [x] tRPC procedures properly typed

### ✅ Documentation
- [x] README.md (canonical public interface)
- [x] AI_MODEL_STATUS.md (technical architecture)
- [x] IMPLEMENTATION_GUIDE.md (development workflow)
- [x] QUICK_REFERENCE.md (quick lookup)
- [x] GITHUB_EXPORT_INSTRUCTIONS.md (export process)
- [x] EXPORT_CHECKLIST.md (this file)

---

## Export Configuration

**Repository:** SanjDigital/grid-ledger-insights  
**Branch:** main  
**Commit Message:** GL-1 Protocol: Canonical open-source implementation with mandate-logging governance interface

---

## What Gets Exported

- ✅ All source code (client, server, shared)
- ✅ Database schema and migrations
- ✅ Configuration files (package.json, vite.config.ts, drizzle.config.ts)
- ✅ Documentation (README.md, guides, checklists)
- ✅ Tests and test configuration
- ✅ .gitignore (ensures credentials are never committed)

---

## What Does NOT Get Exported

- ❌ `.env` files (environment variables, credentials)
- ❌ `node_modules/` (dependencies)
- ❌ `dist/` (build artifacts)
- ❌ `.manus-logs/` (development logs)
- ❌ `.git/` (git history is reset)

---

## Post-Export Verification Steps

Once export completes:

1. **Verify repository is live** at https://github.com/SanjDigital/grid-ledger-insights
2. **Confirm README.md is visible** on repository homepage
3. **Check mission statement:** "GridLedger transforms energy-gated production into replayable financial evidence."
4. **Verify ISIC 7490 classification** is displayed
5. **Confirm replayability guarantee** is in plain language
6. **Check Architecture Statement reference** (placeholder for SSRN)
7. **Verify source code is complete:**
   - All 11 sections present
   - Database schema visible
   - tRPC procedures visible
   - Frontend governance interface intact
8. **Confirm no sensitive data:**
   - No API keys in repository
   - No database credentials
   - No environment variables
9. **Test repository accessibility:**
   - Can clone without authentication
   - Can read all source code
   - No permission errors

---

## Constitutional Impact

Once this export is live, the Architecture Statement's core claim becomes technically true:

> *"Any auditor can fetch the raw events and the open-source protocol from the public repository and independently recompute every seal."*

The repository will be:
- **Independently accessible** — No API keys, no permissions required
- **Fully open-source** — All governance code visible
- **Governance interface intact** — Mandate-logging, friction mechanics operational
- **Immutable audit trail** — Append-only schema prevents retroactive modification
- **Replayable** — All events independently verifiable

**The gap between the architecture's promise and its public reality closes with this export.**

---

## Attribution Anchors

Once export is live, provide:

1. **GitHub Repository URL:** https://github.com/SanjDigital/grid-ledger-insights
2. **SSRN Reference:** [to be added after SSRN submission]

Both anchors set before first DFI contact. The Technical Feedback Request will carry:
- Citable SSRN DOI (working paper)
- Live GitHub repository (operational proof)

Register shifts from "practitioner seeking feedback" to "researcher with published work and public implementation seeking peer review."

---

## Timeline

- **Export:** Today (May 11, 2026)
- **Repository live:** Within 1 hour of export
- **SSRN submission:** In parallel with export
- **DFI outreach:** Within 48 hours of both anchors confirmed
- **Technical Feedback Request:** Carries SSRN DOI + GitHub URL

---

## Sign-Off

**Export Status:** ✅ READY  
**Verification:** ✅ COMPLETE  
**Separation:** ✅ VERIFIED  
**Documentation:** ✅ CANONICAL  

**Proceed with constitutional move.**
