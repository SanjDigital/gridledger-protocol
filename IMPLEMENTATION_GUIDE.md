# GridLedger Protocol GL-1 — Technical Implementation Guide

**For:** AI Models taking over development  
**Purpose:** Step-by-step guide to implement Week 2-4 features  
**Last Updated:** May 11, 2026

---

## Week 2: Mode-Specific Content Rendering

### Objective
Transform the page so Executive/Technical/Audit views show only relevant content. Remove 2/3 of content per mode.

### Implementation Steps

#### Step 1: Update InstitutionalModeContext to Track Active Mode
File: `client/src/contexts/InstitutionalModeContext.tsx`

The context already exists. Verify it exports:
```typescript
export const useInstitutionalMode = () => {
  const context = useContext(InstitutionalModeContext);
  return context;
};
```

#### Step 2: Define Content Maps for Each Mode
File: `client/src/lib/modeContentMap.ts` (CREATE NEW)

```typescript
export type ContentMode = 'Executive' | 'Technical' | 'Audit';

export const sectionVisibility: Record<ContentMode, Record<string, boolean>> = {
  Executive: {
    Hero: true,
    StructuralDeficit: true,
    Breakthrough: true,
    System: false,           // Hide technical details
    VerificationLayer: true,
    RiskCompression: true,
    CapitalVelocity: true,
    FiduciaryShift: true,
    CognitiveFriction: true,
    GlassBox: false,         // Hide live dashboard
    DecisionGate: true,
  },
  Technical: {
    Hero: true,
    StructuralDeficit: false, // Skip problem definition
    Breakthrough: false,
    System: true,            // Show mechanism
    VerificationLayer: true,
    RiskCompression: false,  // Skip business metrics
    CapitalVelocity: false,
    FiduciaryShift: false,
    CognitiveFriction: true,
    GlassBox: true,          // Show live dashboard
    DecisionGate: true,
  },
  Audit: {
    Hero: true,
    StructuralDeficit: false,
    Breakthrough: false,
    System: false,
    VerificationLayer: true, // Show verification details
    RiskCompression: false,
    CapitalVelocity: false,
    FiduciaryShift: false,
    CognitiveFriction: true,
    GlassBox: true,          // Show audit trail
    DecisionGate: true,
  },
};

export const sectionContent: Record<ContentMode, Record<string, string[]>> = {
  Executive: {
    StructuralDeficit: ['problem', 'impact', 'capital_implications'],
    VerificationLayer: ['verification_benefit', 'risk_reduction', 'timeline'],
    RiskCompression: ['exposure_reduction', 'capital_efficiency'],
    CapitalVelocity: ['throughput', 'roi', 'deployment_speed'],
    FiduciaryShift: ['institutional_choice', 'mandate'],
  },
  Technical: {
    System: ['mechanism', 'verification_process', 'deterministic_proof'],
    VerificationLayer: ['sha256_commitment', 'cycle_feed', 'verification_details'],
    GlassBox: ['live_verification', 'cycle_data', 'technical_metrics'],
  },
  Audit: {
    VerificationLayer: ['audit_trail', 'verification_details', 'compliance'],
    GlassBox: ['audit_dashboard', 'verification_log', 'compliance_status'],
  },
};
```

#### Step 3: Wrap Each Section with Mode Filter
File: `client/src/pages/Home.tsx`

```typescript
import { useInstitutionalMode } from '@/contexts/InstitutionalModeContext';
import { sectionVisibility } from '@/lib/modeContentMap';

export default function Home() {
  const { mode } = useInstitutionalMode();
  const visible = sectionVisibility[mode];

  return (
    <div className="grid-container h-screen overflow-y-scroll">
      {visible.Hero && <Hero />}
      {visible.StructuralDeficit && <StructuralDeficit />}
      {visible.Breakthrough && <Breakthrough />}
      {visible.System && <System />}
      {visible.VerificationLayer && <VerificationLayer />}
      {visible.RiskCompression && <RiskCompression />}
      {visible.CapitalVelocity && <CapitalVelocity />}
      {visible.FiduciaryShift && <FiduciaryShift />}
      {visible.CognitiveFriction && <CognitiveFrictionHardened />}
      {visible.GlassBox && <GlassBox />}
      {visible.DecisionGate && <DecisionGate />}
    </div>
  );
}
```

#### Step 4: Update Each Section to Show/Hide Content Based on Mode
Example: `client/src/components/sections/VerificationLayer.tsx`

```typescript
import { useInstitutionalMode } from '@/contexts/InstitutionalModeContext';

export default function VerificationLayer() {
  const { mode } = useInstitutionalMode();
  const showAuditTrail = mode === 'Audit';
  const showTechnicalDetails = mode === 'Technical';

  return (
    <section>
      {/* Always show */}
      <h2>Verification Layer</h2>

      {/* Executive + Technical */}
      {(mode === 'Executive' || mode === 'Technical') && (
        <div>
          <p>Verification benefit text...</p>
        </div>
      )}

      {/* Technical only */}
      {showTechnicalDetails && (
        <div>
          <p>SHA256 commitment details...</p>
          <LiveCycleFeed />
        </div>
      )}

      {/* Audit only */}
      {showAuditTrail && (
        <div>
          <p>Audit trail and compliance details...</p>
          <AuditTrailTable />
        </div>
      )}
    </section>
  );
}
```

#### Step 5: Add Friction Logging for Mode Selection
File: `client/src/components/InstitutionalModeToggle.tsx`

```typescript
import { trpc } from '@/lib/trpc';
import { nanoid } from 'nanoid';

export default function InstitutionalModeToggle() {
  const { mode, setMode } = useInstitutionalMode();
  const [sessionId] = useState(() => nanoid());
  const frictionLog = trpc.friction.logEvent.useMutation();

  const handleModeChange = async (newMode: ContentMode) => {
    // Log mode selection
    try {
      await frictionLog.mutateAsync({
        eventType: 'mode_selection',
        modeSelected: newMode,
        sessionId,
      });
    } catch (error) {
      console.error('Failed to log mode selection:', error);
    }

    setMode(newMode);
  };

  return (
    <div className="flex gap-2">
      {(['Executive', 'Technical', 'Audit'] as const).map((m) => (
        <button
          key={m}
          onClick={() => handleModeChange(m)}
          className={`px-4 py-2 rounded ${
            mode === m
              ? 'bg-green-500 text-black'
              : 'bg-gray-900 text-gray-400'
          }`}
        >
          {m} View
        </button>
      ))}
    </div>
  );
}
```

#### Step 6: Test with 3 Internal Readers
- Reader 1 (Executive): Verify Executive view shows ROI, capital, timeline
- Reader 2 (Technical): Verify Technical view shows integration, verification
- Reader 3 (Audit): Verify Audit view shows verification, audit trail

### Acceptance Criteria
- [ ] Executive view shows only: Hero, StructuralDeficit, Breakthrough, VerificationLayer, RiskCompression, CapitalVelocity, FiduciaryShift, CognitiveFriction, DecisionGate
- [ ] Technical view shows only: Hero, System, VerificationLayer, GlassBox, CognitiveFriction, DecisionGate
- [ ] Audit view shows only: Hero, VerificationLayer, GlassBox, CognitiveFriction, DecisionGate
- [ ] Mode selection logs to friction_analytics
- [ ] 3 internal readers confirm correct content visibility
- [ ] Scroll performance not degraded

---

## Week 3: Friction Moment Hardening & Validation

### Objective
Ensure cognitive friction moment cannot be bypassed. Validate scroll blocking across browsers.

### Implementation Steps

#### Step 1: Cross-Browser Scroll Blocking Test
File: `client/src/components/sections/CognitiveFrictionHardened.tsx`

The component already implements scroll blocking. Test on:
- Chrome (Windows, Mac, Linux)
- Firefox (Windows, Mac, Linux)
- Safari (Mac, iOS)
- Edge (Windows)

**Test Cases:**
1. Mouse wheel scroll down → blocked until interaction
2. Keyboard arrow down → blocked until interaction
3. Keyboard Page Down → blocked until interaction
4. Touch swipe (mobile) → blocked until interaction
5. Spacebar scroll → blocked until interaction

#### Step 2: Add Keyboard Event Blocking
Update `CognitiveFrictionHardened.tsx`:

```typescript
useEffect(() => {
  if (isInView && interactionState !== 'resolved') {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block arrow down, page down, spacebar
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }
}, [isInView, interactionState]);
```

#### Step 3: Add Touch Event Blocking (Mobile)
```typescript
useEffect(() => {
  if (isInView && interactionState !== 'resolved') {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      if (touchEndY < touchStartY) {
        // Swipe up - allow
        return;
      }
      // Swipe down - block
      e.preventDefault();
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }
}, [isInView, interactionState]);
```

#### Step 4: Add Visual Feedback
When user tries to scroll past friction moment:
```typescript
const [scrollAttempts, setScrollAttempts] = useState(0);

const handleWheel = (e: WheelEvent) => {
  if (e.deltaY > 0) {
    e.preventDefault();
    setScrollAttempts(prev => prev + 1);
    
    // Show visual feedback after 3 attempts
    if (scrollAttempts > 3) {
      // Pulse animation on buttons
      // Or toast: "This moment requires your response"
    }
  }
};
```

#### Step 5: Validate Friction Logging
Ensure all three response paths log correctly:
```typescript
// Test 1: Acknowledge
- Logs: friction_point_exit
- Proceeds to next section

// Test 2: Need More Info
- Logs: anchor_link_open
- Opens external resource
- Allows proceeding

// Test 3: Disagree
- Logs: form_abandon
- Allows proceeding
```

### Acceptance Criteria
- [ ] Scroll blocking works on Chrome, Firefox, Safari, Edge
- [ ] Keyboard scroll blocking works (arrow down, page down, spacebar)
- [ ] Touch scroll blocking works on mobile
- [ ] All three response paths log correctly
- [ ] Visual feedback shows after 3 scroll attempts
- [ ] Cannot bypass with any input method
- [ ] Performance not degraded

---

## Week 4: Institutional Transmission Protocol

### Objective
Prepare URL delivery to NBM Risk Desk and RBM Financial Stability with Regulatory Brief as cover document.

### Implementation Steps

#### Step 1: Create Admin Dashboard
File: `client/src/pages/AdminDashboard.tsx`

```typescript
export default function AdminDashboard() {
  const { user } = useAuth();
  const mandateList = trpc.mandate.list.useQuery({ limit: 100 });
  const frictionAnalysis = trpc.friction.analyze.useQuery();

  if (user?.role !== 'admin') {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="p-8">
      <h1>Mandate Submissions</h1>
      
      {/* Submissions Table */}
      <table>
        <thead>
          <tr>
            <th>Institution</th>
            <th>Authorisation Level</th>
            <th>Capital Range</th>
            <th>Sector</th>
            <th>Mode Viewed</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {mandateList.data?.map(submission => (
            <tr key={submission.submissionId}>
              <td>{submission.institutionName}</td>
              <td>{submission.authorisationLevel}</td>
              <td>{submission.capitalRange}</td>
              <td>{submission.sector}</td>
              <td>{submission.modeViewed}</td>
              <td>{new Date(submission.timestamp).toISOString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Friction Analysis */}
      <h2>Friction Point Analysis</h2>
      <div>
        <p>Mode Selections: {JSON.stringify(frictionAnalysis.data?.modeSelections)}</p>
        <p>Anchor Link Access: {JSON.stringify(frictionAnalysis.data?.anchorLinkAccess)}</p>
        <p>Friction Point Dwell: {JSON.stringify(frictionAnalysis.data?.frictionPointDwell)}</p>
      </div>

      {/* Export Button */}
      <button onClick={() => exportToCSV(mandateList.data)}>
        Export Submissions as CSV
      </button>
    </div>
  );
}
```

#### Step 2: Add Export Functionality
File: `server/routers.ts`

```typescript
mandate: router({
  // ... existing procedures

  export: protectedProcedure
    .input(z.object({ format: z.enum(['csv', 'json']) }))
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const submissions = await getMandateSubmissions(10000, 0);

      if (input.format === 'csv') {
        const csv = convertToCSV(submissions);
        return { data: csv, filename: `mandates_${Date.now()}.csv` };
      } else {
        return { data: JSON.stringify(submissions, null, 2), filename: `mandates_${Date.now()}.json` };
      }
    }),
}),
```

#### Step 3: Create Regulatory Brief Template
File: `/home/ubuntu/gridledger-protocol/REGULATORY_BRIEF.md`

```markdown
# GridLedger Protocol GL-1 — Regulatory Brief

**Prepared for:** NBM Risk Desk, RBM Financial Stability  
**Date:** [DATE]  
**Classification:** Institutional  

## Executive Summary

The GridLedger Protocol GL-1 is a deterministic capital allocation infrastructure that reduces institutional exposure from 720 hours to 24 hours through cryptographic verification.

## Key Metrics

- **Exposure Reduction:** 30x (720h → 24h)
- **Verification Method:** SHA256 commitment with immutable audit trail
- **Institutional Accountability:** Every deployment creates timestamped record
- **Capital Efficiency:** Enables faster deployment cycles

## Institutional Mandate

This standard now exists. Any deployment outside it becomes a recorded deviation.

## Submission Data

[INSERT MANDATE SUBMISSION TABLE]

## Friction Point Analysis

[INSERT FRICTION ANALYSIS]

## Recommendations

1. Deploy GL-1 for capital allocation decisions
2. Monitor mandate submissions for institutional adoption
3. Analyze friction points to identify remaining objections
4. Establish governance framework for recorded deviations
```

#### Step 4: Create Delivery URL with Tracking
File: `server/routers.ts`

```typescript
system: router({
  // ... existing procedures

  generateDeliveryUrl: protectedProcedure
    .input(z.object({
      institution: z.string(),
      recipient: z.string(),
      regulatoryBody: z.enum(['NBM', 'RBM']),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const trackingId = nanoid();
      const baseUrl = process.env.VITE_FRONTEND_URL || 'https://gridledger.manus.space';
      const deliveryUrl = `${baseUrl}?tracking=${trackingId}&institution=${input.institution}&recipient=${input.recipient}`;

      // Log delivery
      await logDelivery({
        trackingId,
        institution: input.institution,
        recipient: input.recipient,
        regulatoryBody: input.regulatoryBody,
        timestamp: new Date(),
      });

      return { deliveryUrl, trackingId };
    }),
}),
```

#### Step 5: Monitor Delivery & Engagement
Create analytics dashboard to track:
- URL clicks by institution
- Mode selection patterns
- Friction point engagement
- Mandate submission rate
- Time to decision

### Acceptance Criteria
- [ ] Admin dashboard displays all mandate submissions
- [ ] Export to CSV/JSON works
- [ ] Regulatory Brief template created
- [ ] Delivery URL generation works
- [ ] Tracking ID system operational
- [ ] Analytics dashboard shows engagement metrics
- [ ] Delivery URLs sent to NBM Risk Desk and RBM Financial Stability

---

## Testing Checklist

### Unit Tests
- [ ] mandate.submit logs correctly
- [ ] friction.logEvent logs correctly
- [ ] Mode filtering works correctly
- [ ] Scroll blocking works

### Integration Tests
- [ ] Form submission → mandate logged → friction events logged
- [ ] Mode selection → friction event logged → content filtered
- [ ] Friction moment interaction → friction event logged → scroll unblocked

### Performance Tests
- [ ] Page load time < 2s
- [ ] Scroll performance smooth (60fps)
- [ ] Database writes < 100ms
- [ ] API responses < 200ms

### Browser Tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Deployment Checklist

### Before Week 2 Deployment
- [ ] Mode-specific rendering complete
- [ ] All 3 internal readers validated
- [ ] TypeScript check passes
- [ ] Tests pass
- [ ] Performance acceptable

### Before Week 3 Deployment
- [ ] Friction moment scroll blocking tested on all browsers
- [ ] Keyboard/touch blocking works
- [ ] All friction logging working
- [ ] Admin dashboard functional

### Before Week 4 Deployment
- [ ] Regulatory Brief prepared
- [ ] Delivery URL system working
- [ ] Analytics dashboard operational
- [ ] Mandate export working
- [ ] Final institutional review complete

---

## Common Pitfalls to Avoid

1. **Don't modify mandate_submissions table directly** — It's append-only for audit trail
2. **Don't skip friction logging** — Every interaction must be logged
3. **Don't make friction moment optional** — It must block scroll
4. **Don't hardcode institution names** — Use form input
5. **Don't skip cross-browser testing** — Scroll blocking is browser-specific
6. **Don't expose mandate data publicly** — Admin only
7. **Don't modify declaration_text after submission** — It's immutable

---

## Questions & Escalation

If you encounter issues:

1. **TypeScript errors:** Run `pnpm check` to see full error list
2. **Database errors:** Check DATABASE_URL in environment
3. **tRPC errors:** Check browser console and server logs
4. **Scroll blocking not working:** Test on different browsers, check event listeners
5. **Mode filtering not working:** Verify InstitutionalModeContext is providing mode correctly

For architectural questions, refer to `AI_MODEL_STATUS.md`.
