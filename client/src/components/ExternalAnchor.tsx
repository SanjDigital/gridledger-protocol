/**
 * External Anchor Links
 * 
 * Authority reinforcement at exact moments of doubt
 * - Section 5: "View External Audit Trail"
 * - Section 6: "View Cycle Duration Data"
 * - Section 9: "Replay Last 10 Cycles"
 * 
 * Even if staged: Must feel like auditor-accessible infrastructure
 */

interface ExternalAnchorProps {
  type: 'audit_trail' | 'cycle_data' | 'cycle_replay';
  label: string;
  description?: string;
}

export function ExternalAnchor({ type, label, description }: ExternalAnchorProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Track click
    console.log(`External anchor clicked: ${type}`);

    // Simulate opening verification interface
    const urls: Record<string, string> = {
      audit_trail: '#audit-trail-modal',
      cycle_data: '#cycle-data-modal',
      cycle_replay: '#cycle-replay-modal',
    };

    // In production, this would open a modal or navigate to verification interface
    alert(
      `${label}\n\n${description || 'Verification interface would open here.'}`
    );
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-mono rounded hover:bg-green-500/20 hover:border-green-500/50 transition-colors group"
    >
      <span>{label}</span>
      <svg
        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}

/**
 * Audit Trail Link - Section 5
 * Provides access to external verification records
 */
export function AuditTrailLink() {
  return (
    <ExternalAnchor
      type="audit_trail"
      label="View External Audit Trail"
      description="Access the complete cryptographic audit trail and external verification anchors for all cycles."
    />
  );
}

/**
 * Cycle Data Link - Section 6
 * Shows historical cycle duration and risk compression data
 */
export function CycleDataLink() {
  return (
    <ExternalAnchor
      type="cycle_data"
      label="View Cycle Duration Data"
      description="Historical data showing 24-hour cycle consistency vs legacy 30-day exposure windows."
    />
  );
}

/**
 * Cycle Replay Link - Section 9
 * Allows replay of recent verification cycles
 */
export function CycleReplayLink() {
  return (
    <ExternalAnchor
      type="cycle_replay"
      label="Replay Last 10 Cycles"
      description="Step through the last 10 completed verification cycles with full data transparency."
    />
  );
}
