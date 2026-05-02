import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * SECTION 8 — THE FIDUCIARY SHIFT
 * Design Philosophy: Institutional pressure application
 * - Binary fork: Path A vs Path B
 * - Forces institutional response
 * - "Once verification exists, non-verification becomes a choice"
 */
export default function FiduciaryShift() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
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
            The Fiduciary Shift
          </h2>
          <p
            className={`text-lg text-gray-400 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Apply pressure (this is your trap)
          </p>
        </div>

        {/* Binary fork */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-1000 delay-300 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Path A */}
          <div className="bg-red-500/5 border border-red-500/30 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <h3 className="text-2xl font-bold text-white">Path A</h3>
            </div>
            <p className="text-lg font-medium text-white mb-6">
              Behavioral Lending
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-red-500">✗</span>
                <p className="text-gray-300">Subjective</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-red-500">✗</span>
                <p className="text-gray-300">Delayed</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-red-500">✗</span>
                <p className="text-gray-300">Unverified</p>
              </div>
            </div>
          </div>

          {/* Path B */}
          <div className="bg-green-500/5 border border-green-500/30 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <h3 className="text-2xl font-bold text-white">Path B</h3>
            </div>
            <p className="text-lg font-medium text-white mb-6">
              Deterministic Verification
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <p className="text-gray-300">Objective</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <p className="text-gray-300">Real-time</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <p className="text-gray-300">Enforced</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core statement */}
        <div
          className={`text-center pt-8 border-t border-gray-800 transition-all duration-1000 delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl md:text-3xl text-white font-light mb-8">
            Once verification exists,
            <br />
            <span className="text-red-500 font-medium">non-verification becomes a choice.</span>
          </p>
          <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-lg p-8">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
              The Implication
            </p>
            <p className="text-lg text-white leading-relaxed">
              Institutional actors must now <span className="font-medium">actively choose</span> to operate
              without verification. This shifts the burden of proof from the
              verified system to the unverified one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
