import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * COGNITIVE FRICTION MOMENT
 * Inserted after Section 8 (Fiduciary Shift)
 * 
 * Forces institutional mind to reconcile contradiction:
 * "If deterministic verification reduces exposure from 720h to 24h,
 *  what justifies continued deployment under the legacy model?"
 * 
 * No buttons. Just pause. Forces reflection.
 */
export default function CognitiveFriction() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
      const fullText =
        'If deterministic verification reduces exposure from 720h to 24h, what justifies continued deployment under the legacy model?';
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(fullText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center px-4 py-20 bg-black"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Pause indicator */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="inline-flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-6 py-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">
              Institutional Pause
            </p>
          </div>
        </div>

        {/* The question */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8 h-32 md:h-40 flex items-center justify-center">
            <span className="inline-block min-h-[1em]">{displayedText}</span>
          </h2>
        </div>

        {/* Reflection prompt */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="border-t border-gray-800 pt-12">
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">
              Consider
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
                  Legacy Model
                </p>
                <p className="text-white font-medium">30 day exposure window</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
                  GridLedger Model
                </p>
                <p className="text-green-500 font-medium">24 hour exposure window</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
                  Ratio
                </p>
                <p className="text-red-500 font-medium">30x less exposure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll prompt */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-gray-600 text-xs uppercase tracking-widest">
            Scroll to continue
          </p>
        </div>
      </div>
    </section>
  );
}
