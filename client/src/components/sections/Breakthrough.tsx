import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * SECTION 3 — THE BREAKTHROUGH
 * Design Philosophy: Core idea introduction with visual pipeline
 * - Horizontal pipeline: Energy → Production → Cash → Verification Lock
 * - Clean visual flow showing the core mechanism
 * - Replaces trust with physics
 */
export default function Breakthrough() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
    }
  }, [isInView]);

  const stages = [
    { label: 'Energy', icon: '⚡' },
    { label: 'Production', icon: '⚙️' },
    { label: 'Cash', icon: '💰' },
    { label: 'Verification', icon: '🔐' },
  ];

  return (
    <section ref={ref} className="section-base">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-1000 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The Breakthrough
          </h2>
          <p
            className={`text-lg text-gray-400 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            One clean shift in how capital flows
          </p>
        </div>

        {/* Pipeline visualization */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="flex items-center justify-between gap-2 md:gap-4 mb-12">
            {stages.map((stage, index) => (
              <div key={stage.label} className="flex items-center flex-1">
                {/* Stage box */}
                <div
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-6 text-center"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div className="text-3xl mb-2">{stage.icon}</div>
                  <p className="text-white font-medium text-sm md:text-base">
                    {stage.label}
                  </p>
                </div>

                {/* Arrow */}
                {index < stages.length - 1 && (
                  <div className="flex-shrink-0 px-2 md:px-4">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-green-500"
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
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Core statement */}
        <div
          className={`border-t border-gray-800 pt-12 transition-all duration-1000 delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-2xl md:text-3xl text-white font-light">
              GridLedger replaces <span className="font-medium">trust</span> with{' '}
              <span className="text-green-500 font-medium">physics.</span>
            </p>
            <p className="text-lg md:text-xl text-gray-400">
              Capital is released only when production is verified.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
