import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * SECTION 7 — CAPITAL VELOCITY
 * Design Philosophy: Economic impact visualization
 * - Static vs rotating loop comparison
 * - 1 Turn/Month → 25 Turns/Month
 * - Emphasizes throughput as profit driver
 */
export default function CapitalVelocity() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);
  const [staticTurns, setStaticTurns] = useState(0);
  const [rotatingTurns, setRotatingTurns] = useState(0);

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
      // Animate turns
      const staticInterval = setInterval(() => {
        setStaticTurns((prev) => (prev < 1 ? prev + 0.05 : 1));
      }, 100);
      const rotatingInterval = setInterval(() => {
        setRotatingTurns((prev) => (prev < 25 ? prev + 1 : 25));
      }, 50);
      return () => {
        clearInterval(staticInterval);
        clearInterval(rotatingInterval);
      };
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
            Capital Velocity
          </h2>
          <p
            className={`text-lg text-gray-400 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Why this matters economically
          </p>
        </div>

        {/* Velocity comparison */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-1000 delay-300 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Static */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 flex flex-col items-center justify-center">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">
              Traditional Model
            </p>
            <div className="relative w-32 h-32 mb-6">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-gray-700"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-red-500"
                  strokeWidth="2"
                  strokeDasharray={`${251.2 * (staticTurns / 1)} 251.2`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-red-500">
                  {staticTurns.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-center">
              1 Turn <span className="text-gray-500">/</span> Month
            </p>
          </div>

          {/* Rotating */}
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-12 flex flex-col items-center justify-center">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">
              GridLedger Model
            </p>
            <div className="relative w-32 h-32 mb-6">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-gray-700"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-green-500"
                  strokeWidth="2"
                  strokeDasharray={`${251.2 * (rotatingTurns / 25)} 251.2`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-500">
                  {Math.round(rotatingTurns)}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-center">
              25 Turns <span className="text-gray-500">/</span> Month
            </p>
          </div>
        </div>

        {/* Economic insight */}
        <div
          className={`text-center pt-8 border-t border-gray-800 transition-all duration-1000 delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl md:text-3xl text-white font-light mb-6">
            Profit becomes a function of <span className="font-medium">throughput,</span> not{' '}
            <span className="font-medium">scale.</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">
                Metric
              </p>
              <p className="text-white font-medium">Cycle Time</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">
                Traditional
              </p>
              <p className="text-red-500 font-medium">30 days</p>
            </div>
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">
                GridLedger
              </p>
              <p className="text-green-500 font-medium">~24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
