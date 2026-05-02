import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * SECTION 10 — FINAL DECISION GATE + CTA
 * Design Philosophy: Force institutional response
 * - Minimal, centered layout
 * - Binary choice presentation
 * - Integration request form
 */
export default function DecisionGate() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);
  const [formStep, setFormStep] = useState('choice'); // 'choice' or 'form'
  const [formData, setFormData] = useState({
    institutionName: '',
    deployableCapital: '',
    riskTolerance: '',
    nodeType: '',
  });
  const [submitted, setSubmitted] = useState(false);

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
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStep('choice');
      setFormData({
        institutionName: '',
        deployableCapital: '',
        riskTolerance: '',
        nodeType: '',
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

            {/* Final statement */}
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
                  <p className="text-white text-lg">The system is operational.</p>
                  <p className="text-white text-lg">The audit trail exists.</p>
                  <p className="text-green-500 text-lg font-medium">
                    The decision is institutional.
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
                onClick={() => setFormStep('form')}
                className="px-8 py-4 bg-green-500 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-green-400 transition-colors"
              >
                Request Node Integration
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Integration Request Form */}
            <div
              className={`transition-all duration-1000 ${
                showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Request Received
                  </h3>
                  <p className="text-gray-400">
                    Our verification team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
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
                      Deployable Capital (MWK)
                    </label>
                    <input
                      type="text"
                      name="deployableCapital"
                      value={formData.deployableCapital}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="e.g., 50,000,000"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">
                      Risk Tolerance
                    </label>
                    <select
                      name="riskTolerance"
                      value={formData.riskTolerance}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select risk tolerance</option>
                      <option value="conservative">Conservative</option>
                      <option value="moderate">Moderate</option>
                      <option value="aggressive">Aggressive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">
                      Node Type
                    </label>
                    <select
                      name="nodeType"
                      value={formData.nodeType}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select node type</option>
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-500 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-green-400 transition-colors"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormStep('choice')}
                      className="flex-1 px-6 py-3 bg-gray-900 border border-gray-800 text-white font-bold uppercase tracking-widest rounded-lg hover:border-gray-700 transition-colors"
                    >
                      Back
                    </button>
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
