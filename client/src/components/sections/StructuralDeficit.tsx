import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * SECTION 2 — THE STRUCTURAL DEFICIT
 * Design Philosophy: Problem definition with precision
 * - Split screen layout (left vs right) for institutional comparison
 * - Left: Traditional Banking (behavioral proxies)
 * - Right: Production Reality (physical truth)
 * - Emphasizes the gap where capital fails
 */
export default function StructuralDeficit() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="section-base">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Traditional Banking */}
          <div
            className={`transition-all duration-1000 ${
              showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Traditional Banking
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-300">Documents</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-300">Human judgment</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-300">Delayed reporting</p>
              </div>
            </div>
          </div>

          {/* Right: Production Reality */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Production Reality
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-300">Machines</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-300">Energy</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-300">Real-time output</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core insight */}
        <div
          className={`mt-16 pt-12 border-t border-gray-800 transition-all duration-1000 delay-400 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-xl text-gray-400">
              Financial systems operate on <span className="text-white font-medium">behavioral proxies.</span>
            </p>
            <p className="text-xl text-gray-400">
              Production operates on <span className="text-white font-medium">physical truth.</span>
            </p>
            <p className="text-xl text-red-500 font-medium">
              The gap between the two is where capital fails.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
