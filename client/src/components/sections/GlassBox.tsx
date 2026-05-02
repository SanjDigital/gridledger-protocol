import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { CycleReplayLink } from '@/components/ExternalAnchor';

/**
 * SECTION 9 — THE GLASS BOX (LIVE SYSTEM)
 * Design Philosophy: Make it real and tangible
 * - Dashboard UI showing live verification
 * - Energy Input, Cash Output, Cycle Progress
 * - Seal Status and Next Tranche lock
 */
export default function GlassBox() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);
  const [cycleProgress, setCycleProgress] = useState(0);

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
      const interval = setInterval(() => {
        setCycleProgress((prev) => (prev < 82 ? prev + 2 : 82));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="section-base">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-1000 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The Glass Box
          </h2>
          <p
            className={`text-lg text-gray-400 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Live system verification
          </p>
        </div>

        {/* Dashboard */}
        <div
          className={`bg-gray-900 border border-green-500/30 rounded-lg overflow-hidden transition-all duration-1000 delay-300 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Dashboard header */}
          <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
                  Live Verification Panel
                </p>
                <p className="text-white font-mono text-sm">Node ID: GL-1-PROD-2026</p>
              </div>
              <div className="flex items-center gap-4">
                <CycleReplayLink />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-green-500 text-sm font-medium">ACTIVE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-8 space-y-8">
            {/* Energy Input */}
            <div className="border-b border-gray-800 pb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  Energy Input
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-lg">✔</span>
                  <span className="text-green-500 font-mono font-medium">MATCHED</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Allocated
                  </p>
                  <p className="text-white font-mono text-lg">2,500 MWh</p>
                </div>
                <div className="bg-gray-800 rounded p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Consumed
                  </p>
                  <p className="text-white font-mono text-lg">2,500 MWh</p>
                </div>
                <div className="bg-gray-800 rounded p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Variance
                  </p>
                  <p className="text-green-500 font-mono text-lg">0.00%</p>
                </div>
              </div>
            </div>

            {/* Cash Output */}
            <div className="border-b border-gray-800 pb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  Cash Output
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-lg">✔</span>
                  <span className="text-green-500 font-mono font-medium">MATCHED</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Expected
                  </p>
                  <p className="text-white font-mono text-lg">$187,500</p>
                </div>
                <div className="bg-gray-800 rounded p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Received
                  </p>
                  <p className="text-white font-mono text-lg">$187,500</p>
                </div>
                <div className="bg-gray-800 rounded p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Reconciled
                  </p>
                  <p className="text-green-500 font-mono text-lg">100%</p>
                </div>
              </div>
            </div>

            {/* Cycle Progress */}
            <div className="border-b border-gray-800 pb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  Cycle Progress
                </p>
                <p className="text-white font-mono font-medium">{cycleProgress}%</p>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${cycleProgress}%` }}
                />
              </div>
            </div>

            {/* Seal Status */}
            <div className="border-b border-gray-800 pb-8">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                Seal Status
              </p>
              <div className="bg-gray-800 rounded p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-green-500 text-lg">✓</span>
                  <p className="text-green-500 font-mono font-medium">VERIFIED</p>
                </div>
                <p className="text-gray-500 font-mono text-xs break-all">
                  sha256:7b9a1c3d5e2f4a6b8c0d9e1f2a3b4c5d6e7f8a9b
                </p>
              </div>
            </div>

            {/* Next Tranche */}
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                Next Tranche
              </p>
              <div className="bg-gray-800 rounded p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-mono font-medium">$187,500</p>
                  <p className="text-gray-500 text-sm">Scheduled in 4.3 hours</p>
                </div>
                <div className="text-3xl">🔒</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statement */}
        <div
          className={`text-center pt-12 transition-all duration-1000 delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl md:text-3xl text-white font-light">
            This is not <span className="font-medium">reporting.</span>
            <br />
            This is <span className="text-green-500 font-medium">live verification.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
