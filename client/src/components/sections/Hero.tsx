import { useEffect, useState } from 'react';

/**
 * SECTION 1 — HERO (ENTRY POINT)
 * Design Philosophy: Institutional authority establishment
 * - Full black background for maximum contrast
 * - Center-aligned text with minimal motion
 * - Subtle fade-in for entry
 * - Classification establishes credibility immediately
 */
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="section-hero">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Title */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-display text-white mb-4">
            GRIDLEDGER PROTOCOL
          </h1>
          <p className="text-mono text-gray-400">(GL-1)</p>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-subtitle text-white font-light">
            Deterministic Capital Allocation Infrastructure
          </p>
        </div>

        {/* Classification */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-classification text-gray-500">
              Verification Authority — ISIC Section M, Class 7490
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
          </div>
        </div>

        {/* Statement */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl md:text-3xl font-light text-white max-w-2xl mx-auto leading-relaxed">
            Capital is not scarce.
            <br />
            <span className="text-green-500 font-medium">Verification is.</span>
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className={`pt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
            <p>Scroll to continue</p>
            <div className="animate-bounce">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
