import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { CycleDataLink } from '@/components/ExternalAnchor';

/**
 * SECTION 6 — RISK COMPRESSION
 * Design Philosophy: Institutional insight delivery
 * - Timeline compression visualization
 * - Comparison table: Legacy vs GridLedger
 * - Emphasizes risk containment vs management
 */
export default function RiskCompression() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);
  const [legacyHours, setLegacyHours] = useState(0);
  const [gridledgerHours, setGridledgerHours] = useState(0);

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
      // Animate numbers
      const legacyInterval = setInterval(() => {
        setLegacyHours((prev) => (prev < 720 ? prev + 30 : 720));
      }, 30);
      const gridledgerInterval = setInterval(() => {
        setGridledgerHours((prev) => (prev < 24 ? prev + 1 : 24));
      }, 30);
      return () => {
        clearInterval(legacyInterval);
        clearInterval(gridledgerInterval);
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
            Risk Compression
          </h2>
          <p
            className={`text-lg text-gray-400 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The most important institutional insight
          </p>
        </div>

        {/* Timeline compression visualization */}
        <div
          className={`mb-16 transition-all duration-1000 delay-300 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Legacy */}
            <div className="bg-gray-900 border border-red-500/30 rounded-lg p-8">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                Traditional
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-red-500">
                  {legacyHours}
                </div>
                <p className="text-gray-400">hours</p>
              </div>
              <div className="w-full bg-gray-800 rounded h-2">
                <div
                  className="bg-red-500 h-2 rounded transition-all duration-300"
                  style={{ width: `${(legacyHours / 720) * 100}%` }}
                />
              </div>
            </div>

            {/* GridLedger */}
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                GridLedger
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-green-500">
                  {gridledgerHours}
                </div>
                <p className="text-gray-400">hours</p>
              </div>
              <div className="w-full bg-gray-800 rounded h-2">
                <div
                  className="bg-green-500 h-2 rounded transition-all duration-300"
                  style={{ width: `${(gridledgerHours / 24) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div
          className={`mb-12 transition-all duration-1000 delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm uppercase tracking-widest">Risk Model Comparison</p>
            <CycleDataLink />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-gray-400 text-sm uppercase tracking-widest font-medium">
                    Model
                  </th>
                  <th className="px-6 py-4 text-gray-400 text-sm uppercase tracking-widest font-medium">
                    Risk Window
                  </th>
                  <th className="px-6 py-4 text-gray-400 text-sm uppercase tracking-widest font-medium">
                    Exposure
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">Legacy Lending</td>
                  <td className="px-6 py-4 text-gray-400">30 Days</td>
                  <td className="px-6 py-4 text-red-500">Accumulating</td>
                </tr>
                <tr className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">GridLedger</td>
                  <td className="px-6 py-4 text-gray-400">~24 Hours</td>
                  <td className="px-6 py-4 text-green-500">Reset Per Cycle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Core statement */}
        <div
          className={`text-center pt-8 border-t border-gray-800 transition-all duration-1000 delay-700 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl md:text-3xl text-white font-light">
            Risk is no longer <span className="font-medium">managed.</span>
            <br />
            It is <span className="text-green-500 font-medium">contained.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
