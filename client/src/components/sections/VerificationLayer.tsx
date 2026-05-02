import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { LiveCycleFeed } from '@/components/LiveCycleFeed';
import { AuditTrailLink } from '@/components/ExternalAnchor';

/**
 * SECTION 5 — THE VERIFICATION LAYER
 * Design Philosophy: Cryptographic authority introduction
 * - Transaction → Hash → External Anchor flow
 * - Monospace data display for technical authority
 * - SHA256 commitment visualization
 */
export default function VerificationLayer() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);
  const [displayHash, setDisplayHash] = useState('');

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
      // Simulate hash typing
      const hash = 'sha256:7b9a1c3d5e2f4a6b8c0d9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0';
      let index = 0;
      const interval = setInterval(() => {
        if (index < hash.length) {
          setDisplayHash(hash.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
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
            The Verification Layer
          </h2>
          <p
            className={`text-lg text-gray-400 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Cryptographic authority
          </p>
        </div>

        {/* Verification flow */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Transaction */}
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
                Input
              </p>
              <p className="text-white font-mono text-sm">Transaction</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>

            {/* Hash */}
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
                Process
              </p>
              <p className="text-green-500 font-mono text-sm">Hash (SHA256)</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>

            {/* Anchor */}
            <div className="flex-1 bg-gray-900 border border-green-500/30 rounded-lg p-6 text-center">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
                Output
              </p>
              <p className="text-green-500 font-mono text-sm">External Anchor</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-400 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Each production cycle is sealed using <span className="text-white font-medium">SHA256</span> and
            committed to an <span className="text-white font-medium">external audit layer.</span>
          </p>
        </div>

        {/* Live verification feed */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-400 text-sm uppercase tracking-widest">
              Live Cycle Feed (Real-time Verification)
            </p>
            <AuditTrailLink />
          </div>
          <LiveCycleFeed maxCycles={5} />
        </div>
      </div>
    </section>
  );
}
