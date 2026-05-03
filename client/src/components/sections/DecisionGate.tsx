import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { trpc } from '@/lib/trpc';
import { nanoid } from 'nanoid';

/**
 * SECTION 10 — FINAL DECISION GATE + MANDATE CAPTURE
 * Design Philosophy: Force institutional response
 * - Binary choice presentation
 * - Upgraded to "Submit Deployment Mandate" (not "Request Integration")
 * - Form fields for capital allocation, not lead collection
 * - Final statement upgraded: "This standard now exists. Any deployment outside it becomes a recorded deviation."
 */
export default function DecisionGate() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);
  const [formStep, setFormStep] = useState('choice'); // 'choice' or 'form'
  const [formData, setFormData] = useState({
    institutionName: '',
    deployableCapital: '',
    targetSector: '',
    riskWindow: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingData, setTrackingData] = useState({
    formStarted: false,
    fieldsFilled: 0,
  });
  const [sessionId] = useState(() => nanoid());
  const mandateSubmit = trpc.mandate.submit.useMutation();

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
    }
  }, [isInView]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Track field completion
    const filledCount = Object.values({ ...formData, [name]: value }).filter(
      (v) => v !== ''
    ).length;
    setTrackingData((prev) => ({
      ...prev,
      fieldsFilled: filledCount,
    }));
  };

  const handleFormStart = () => {
    setTrackingData((prev) => ({
      ...prev,
      formStarted: true,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log form submission to mandate log
    try {
      await mandateSubmit.mutateAsync({
        institutionName: formData.institutionName,
        authorisationLevel: 'Credit Officer',
        capitalRange: (formData.deployableCapital as any) || '<10M',
        sector: formData.targetSector,
        modeViewed: 'Executive',
        declarationText: 'This standard now exists. Any deployment outside it becomes a recorded deviation.',
      });
    } catch (error) {
      console.error('Failed to submit mandate:', error);
    }
    
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStep('choice');
      setFormData({
        institutionName: '',
        deployableCapital: '',
        targetSector: '',
        riskWindow: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section ref={ref} className="section-base">
      <div className="max-w-4xl mx-auto w-full">
        {formStep === 'choice' ? (
          <>
            {/* Decision Gate */}
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                The Decision
              </h2>
              <div className="max-w-3xl mx-auto space-y-8 mb-12">
                <div className="bg-red-500/5 border border-red-500/30 rounded-lg p-8">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Do you authorize capital deployment into a verified system
                    <br />
                    where exposure resets every cycle,
                  </p>
                </div>

                <div className="text-2xl text-gray-500 font-light">OR</div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Continue deploying capital into environments
                    <br />
                    where verification occurs after loss?
                  </p>
                </div>
              </div>
            </div>

            {/* Final statement - UPGRADED */}
            <div
              className={`text-center mb-12 transition-all duration-1000 delay-300 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="border-t border-gray-800 pt-12">
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">
                  Status
                </p>
                <div className="space-y-3">
                  <p className="text-white text-lg">This standard now exists.</p>
                  <p className="text-green-500 text-lg font-medium">
                    Any deployment outside it becomes a recorded deviation.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`text-center transition-all duration-1000 delay-500 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={() => {
                  setFormStep('form');
                  handleFormStart();
                }}
                className="px-8 py-4 bg-green-500 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-green-400 transition-colors"
              >
                Submit Deployment Mandate
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Mandate Capture Form */}
            <div
              className={`transition-all duration-1000 ${
                showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Mandate Received
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Capital deployment mandate logged in institutional record.
                  </p>
                  <p className="text-green-500 text-sm font-mono">
                    Verification team will initiate integration within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6" onFocus={handleFormStart}>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
                      Deployment Mandate Submission
                    </p>
                    <p className="text-gray-500 text-sm">
                      Complete this form to authorize capital deployment into the verified GridLedger system.
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="Enter institution name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">
                      Deployable Capital Range (MWK)
                    </label>
                    <select
                      name="deployableCapital"
                      value={formData.deployableCapital}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select capital range</option>
                      <option value="10m-50m">10M - 50M MWK</option>
                      <option value="50m-100m">50M - 100M MWK</option>
                      <option value="100m-500m">100M - 500M MWK</option>
                      <option value="500m-1b">500M - 1B MWK</option>
                      <option value="1b+">1B+ MWK</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">
                      Target Sector
                    </label>
                    <select
                      name="targetSector"
                      value={formData.targetSector}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select sector</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="energy">Energy</option>
                      <option value="processing">Processing</option>
                      <option value="multi">Multi-sector</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">
                      Risk Window Preference
                    </label>
                    <select
                      name="riskWindow"
                      value={formData.riskWindow}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select preference</option>
                      <option value="24h">24 Hour Cycles</option>
                      <option value="48h">48 Hour Cycles</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-500 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-green-400 transition-colors"
                    >
                      Submit Mandate
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormStep('choice')}
                      className="flex-1 px-6 py-3 bg-gray-900 border border-gray-800 text-white font-bold uppercase tracking-widest rounded-lg hover:border-gray-700 transition-colors"
                    >
                      Back
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-500 text-xs">
                      <span className="text-green-500 font-mono">{trackingData.fieldsFilled}/4</span> fields completed
                    </p>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
