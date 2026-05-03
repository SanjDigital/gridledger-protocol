import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { trpc } from '@/lib/trpc';
import { nanoid } from 'nanoid';

/**
 * HARDENED COGNITIVE FRICTION MOMENT
 * Inserted after Section 8 (Fiduciary Shift)
 * 
 * CRITICAL: Cannot be scrolled past. Requires explicit interaction.
 * 
 * Forces institutional mind to reconcile contradiction:
 * "If deterministic verification reduces exposure from 720h to 24h,
 *  what justifies continued deployment under the legacy model?"
 * 
 * Interaction options:
 * 1. "I acknowledge this contradiction" - proceeds to form
 * 2. "I need more information" - opens external anchor links
 * 3. "I disagree with this premise" - logs objection
 * 
 * Form cannot be accessed without explicit interaction at this point.
 */
export default function CognitiveFrictionHardened() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [interactionState, setInteractionState] = useState<'reading' | 'interacting' | 'resolved'>('reading');
  const [sessionId] = useState(() => nanoid());
  const frictionLog = trpc.friction.logEvent.useMutation();

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
          // After text finishes, allow interaction
          setInteractionState('interacting');
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const handleAcknowledge = async () => {
    try {
      await frictionLog.mutateAsync({
        eventType: 'friction_point_exit',
        sectionName: 'CognitiveFriction',
        sessionId,
      });
    } catch (error) {
      console.error('Failed to log friction event:', error);
    }
    setInteractionState('resolved');
  };

  const handleDisagree = async () => {
    try {
      await frictionLog.mutateAsync({
        eventType: 'form_abandon',
        sectionName: 'CognitiveFriction',
        sessionId,
      });
    } catch (error) {
      console.error('Failed to log friction event:', error);
    }
    // Still allow proceeding - this is a data point
    setInteractionState('resolved');
  };

  const handleMoreInfo = async () => {
    try {
      await frictionLog.mutateAsync({
        eventType: 'anchor_link_open',
        anchorLinkType: 'audit_trail',
        sectionName: 'CognitiveFriction',
        sessionId,
      });
    } catch (error) {
      console.error('Failed to log friction event:', error);
    }
    // Open external resources
    window.open('#audit-trail-modal', '_blank');
  };

  // Block scrolling if not resolved
  useEffect(() => {
    if (isInView && interactionState !== 'resolved') {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY > 0) {
          e.preventDefault();
        }
      };
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [isInView, interactionState]);

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
              {interactionState === 'resolved'
                ? 'Acknowledged'
                : 'Institutional Pause — Requires Response'}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        {/* Interaction buttons - only show after text finishes */}
        {interactionState !== 'reading' && (
          <div
            className={`mt-12 transition-all duration-1000 ${
              interactionState === 'interacting'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            {interactionState === 'interacting' ? (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm mb-6">
                  This moment requires your explicit response before proceeding.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAcknowledge}
                    className="px-6 py-3 bg-green-500 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-green-400 transition-colors"
                  >
                    I Acknowledge This Contradiction
                  </button>
                  <button
                    onClick={handleMoreInfo}
                    className="px-6 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-500 font-bold uppercase tracking-widest rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    I Need More Information
                  </button>
                  <button
                    onClick={handleDisagree}
                    className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 font-bold uppercase tracking-widest rounded-lg hover:border-gray-700 transition-colors"
                  >
                    I Disagree With This Premise
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-green-500 text-sm font-mono mb-4">
                  ✓ Response recorded
                </p>
                <p className="text-gray-500 text-xs uppercase tracking-widest">
                  Scroll to continue
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
