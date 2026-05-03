import Hero from '@/components/sections/Hero';
import StructuralDeficit from '@/components/sections/StructuralDeficit';
import Breakthrough from '@/components/sections/Breakthrough';
import System from '@/components/sections/System';
import VerificationLayer from '@/components/sections/VerificationLayer';
import RiskCompression from '@/components/sections/RiskCompression';
import CapitalVelocity from '@/components/sections/CapitalVelocity';
import FiduciaryShift from '@/components/sections/FiduciaryShift';
import CognitiveFrictionHardened from '@/components/sections/CognitiveFrictionHardened';
import GlassBox from '@/components/sections/GlassBox';
import DecisionGate from '@/components/sections/DecisionGate';

/**
 * GridLedger Protocol GL-1 - Main Page
 * 
 * Scroll Flow: [Hero] → [Problem] → [Breakthrough] → [System] → [Verification Layer] 
 *             → [Risk Compression] → [Velocity Engine] → [Fiduciary Standard] 
 *             → [COGNITIVE FRICTION] → [Glass Box Dashboard] → [Final Decision Gate]
 * 
 * Each section = one full screen (100vh)
 * Snap-to-section scrolling for controlled pacing
 * Cognitive friction moment forces institutional reconciliation
 * No clutter. No distractions. Controlled narrative flow.
 */
export default function Home() {
  return (
    <div className="grid-container h-screen overflow-y-scroll">
      {/* Section 1: Hero - Entry Point */}
      <Hero />

      {/* Section 2: Structural Deficit - Problem Definition */}
      <StructuralDeficit />

      {/* Section 3: Breakthrough - Core Idea */}
      <Breakthrough />

      {/* Section 4: System - Mechanism Explanation */}
      <System />

      {/* Section 5: Verification Layer - Cryptographic Authority */}
      <VerificationLayer />

      {/* Section 6: Risk Compression - Institutional Insight */}
      <RiskCompression />

      {/* Section 7: Capital Velocity - Economic Impact */}
      <CapitalVelocity />

      {/* Section 8: Fiduciary Shift - Institutional Pressure */}
      <FiduciaryShift />

      {/* Section 9: Cognitive Friction - Hardened (Requires Explicit Interaction) */}
      <CognitiveFrictionHardened />

      {/* Section 10: Glass Box - Live System */}
      <GlassBox />

      {/* Section 11: Final Decision Gate + Mandate Capture */}
      <DecisionGate />
    </div>
  );
}
