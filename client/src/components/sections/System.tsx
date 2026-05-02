import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * SECTION 4 — THE SYSTEM (WATERFALL)
 * Design Philosophy: Mechanism explanation with sequential appearance
 * - 4 stacked cards in clean grid
 * - Each block appears sequentially on scroll
 * - Explains the complete capital flow cycle
 */
export default function System() {
  const { ref, isInView } = useInView();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowContent(true);
    }
  }, [isInView]);

  const systemSteps = [
    {
      number: '01',
      title: 'Capital Injection',
      description: 'Liquidity enters the node as energy tokens',
      icon: '💧',
    },
    {
      number: '02',
      title: 'Production Gate',
      description: 'Machines operate only under verified energy allocation',
      icon: '🚪',
    },
    {
      number: '03',
      title: 'Revenue Capture',
      description: 'Payments reconciled against energy consumption',
      icon: '📊',
    },
    {
      number: '04',
      title: 'Deterministic Settlement',
      description: 'Repayment triggered per verified cycle',
      icon: '✓',
    },
  ];

  return (
    <section ref={ref} className="section-base">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-1000 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The System
          </h2>
          <p
            className={`text-lg text-gray-400 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Mechanism explained clearly
          </p>
        </div>

        {/* System cards */}
        <div className="space-y-6">
          {systemSteps.map((step, index) => (
            <div
              key={step.number}
              className={`transition-all duration-700 ${
                showContent
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{
                transitionDelay: showContent ? `${index * 150}ms` : '0ms',
              }}
            >
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-green-500/50 transition-colors">
                <div className="flex items-start gap-6">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="text-4xl font-bold text-green-500 opacity-20">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{step.icon}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector line */}
                  {index < systemSteps.length - 1 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-green-500 to-transparent mt-full" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className={`mt-12 pt-8 border-t border-gray-800 transition-all duration-1000 delay-700 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest">
            Each cycle is deterministic and verified
          </p>
        </div>
      </div>
    </section>
  );
}
