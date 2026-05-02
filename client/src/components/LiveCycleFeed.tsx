import { useEffect, useState } from 'react';

interface Cycle {
  id: number;
  seal: string;
  status: 'VERIFIED' | 'PENDING' | 'FAILED';
  timestamp: string;
  energyMWh: number;
  revenueMWK: number;
}

/**
 * Live Cycle Feed Component
 * Simulates real-time verification cycles to prove operational status
 * Used in Section 5 (Verification Layer) and Section 9 (Glass Box)
 */
export function LiveCycleFeed({ maxCycles = 5 }: { maxCycles?: number }) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Generate simulated cycle data
  useEffect(() => {
    const generateCycle = (index: number): Cycle => {
      const baseId = 10442 - index;
      const hash = `sha256:${Math.random().toString(16).slice(2, 18)}...`;
      return {
        id: baseId,
        seal: hash,
        status: index === 0 ? 'VERIFIED' : index === 1 ? 'PENDING' : 'VERIFIED',
        timestamp: new Date(Date.now() - index * 3600000).toISOString(),
        energyMWh: 2500 + Math.random() * 500,
        revenueMWK: 187500 + Math.random() * 37500,
      };
    };

    const initialCycles = Array.from({ length: maxCycles }, (_, i) =>
      generateCycle(i)
    );
    setCycles(initialCycles);

    // Simulate new cycle every 30 seconds
    const interval = setInterval(() => {
      setCycles((prev) => {
        const newCycle = generateCycle(0);
        return [newCycle, ...prev.slice(0, maxCycles - 1)];
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [maxCycles]);

  return (
    <div className="space-y-3">
      {cycles.map((cycle) => (
        <div
          key={cycle.id}
          className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors cursor-pointer"
          onClick={() =>
            setExpandedId(expandedId === cycle.id ? null : cycle.id)
          }
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-white font-mono font-medium">
                  Cycle #{cycle.id}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded font-mono font-medium ${
                    cycle.status === 'VERIFIED'
                      ? 'bg-green-500/10 text-green-500'
                      : cycle.status === 'PENDING'
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {cycle.status}
                </span>
              </div>
              <p className="text-gray-500 text-xs font-mono">
                {cycle.seal}
              </p>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                expandedId === cycle.id ? 'rotate-180' : ''
              }`}
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

          {expandedId === cycle.id && (
            <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                    Energy Consumed
                  </p>
                  <p className="text-white font-mono">
                    {cycle.energyMWh.toFixed(1)} MWh
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                    Revenue
                  </p>
                  <p className="text-white font-mono">
                    {cycle.revenueMWK.toFixed(0)} MWK
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Timestamp
                </p>
                <p className="text-white font-mono text-sm">
                  {new Date(cycle.timestamp).toLocaleString()}
                </p>
              </div>
              {cycle.status === 'VERIFIED' && (
                <button className="w-full mt-3 px-3 py-2 bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-mono rounded hover:bg-green-500/20 transition-colors">
                  Verify Seal on Blockchain
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
