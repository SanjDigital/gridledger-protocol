# GridLedger Protocol GL-1 — Verification Governance Layer

**GridLedger transforms energy-gated production into replayable financial evidence.**

---

## About This Repository

This repository contains the **GL-1 Protocol reference implementation and verification governance layer**. It is part of a three-repository architecture:

| Repository | Function |
|-----------|----------|
| **grid-ledger-insights** | Trust Anchor — governance documents, seal chain CSV, Auditor's Toolkit |
| **gridledger-dashboard** | Operational Dashboard — live verification interface (private) |
| **gridledger-protocol** (this repo) | Protocol Reference — governance interface specification, mandate submission reference |

---

## Entity

**GridLedger IP Ltd — Verification Authority**  
ISIC Rev. 4, Section M, Division 74, Class 7490  
Lilongwe, Malawi

---

## The Architecture Claim

> *"Any auditor can fetch the raw events and the open-source protocol from the public repository and independently recompute every seal."*

This repository is part of the public verification layer. It is independently accessible — no API keys, no GridLedger server, no permission required.

---

## What This Repository Contains

1. **Protocol Specification** — The GL-1 governance interface design, friction mechanics, and institutional submission framework
2. **Reference Mandate Interface** — A demonstration of the institutional governance submission form (operational submissions flow through the authenticated Railway backend)
3. **Mode-Specific Rendering Logic** — Executive, Technical, and Audit view specifications

---

## What This Repository Is Not

- **Not the operational backend.** The live API runs on Railway (FastAPI + PostgreSQL). This repository contains the protocol specification, not the operational deployment.
- **Not the Trust Anchor.** Seal chain CSV, governance documents, and the Auditor's Toolkit live in `SanjDigital/grid-ledger-insights`.
- **Not the dashboard.** The live verification dashboard is deployed at `https://gridledger-dashboard.vercel.app`.

---

## Operational/Verification Split

This repository is part of the **verification layer**. It functions independently of the operational backend:

- No backend connectivity required for independent audit or replay
- No API keys or credentials contained in this repository
- Mandate submission is an **operational function**, not a verification function

**Mandate Submission:** The DecisionGate form in this repository serves as a reference interface for institutional governance. Actual mandate submissions flow through the authenticated operational channel at the Railway backend to preserve the operational/verification split.

---

## Governance Documents

The complete constitutional architecture is maintained in the Trust Anchor repository (`SanjDigital/grid-ledger-insights`):

- `ARCHITECTURE.md` — Operational/verification split, replayability guarantee
- `VERIFICATION_BOUNDARY.md` — Replayability Constraint
- `CREDENTIAL_POLICY.md` — Runtime-bound authentication
- `ADMISSIBILITY_PRINCIPLES.md` — Evidentiary capture doctrine, issuer-pays clause
- `THREAT_MODEL.md` — Failure-domain taxonomy

---

## Institutional Engagement

Institutional reviewers who wish to log engagement with the GL-1 Protocol may submit through the authenticated operational channel. The verification layer functions independently of mandate logging.

---

## Technology Stack (Reference Implementation)

- **Frontend:** React + TypeScript + Tailwind CSS
- **Operational Backend:** FastAPI + PostgreSQL (deployed on Railway)
- **Trust Anchor:** GitHub public repository
- **This Repository:** Protocol specification and reference interface

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm or npm

### Installation

```bash
git clone https://github.com/SanjDigital/gridledger-protocol.git
cd gridledger-protocol
pnpm install
pnpm dev
