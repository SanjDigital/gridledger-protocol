import { useInstitutionalMode } from '@/contexts/InstitutionalModeContext';

/**
 * Institutional Mode Toggle
 * Allows stakeholders to view the system through different lenses:
 * - Executive: Outcome-focused, capital impact
 * - Technical: Integration, API, implementation
 * - Audit: Verification, compliance, audit trail
 */
export function InstitutionalModeToggle() {
  const { mode, setMode } = useInstitutionalMode();

  const modes = [
    {
      id: 'executive',
      label: 'Executive View',
      description: 'Capital outcomes & ROI',
      icon: '📊',
    },
    {
      id: 'technical',
      label: 'Technical View',
      description: 'Integration & systems',
      icon: '⚙️',
    },
    {
      id: 'audit',
      label: 'Audit View',
      description: 'Verification & compliance',
      icon: '🔐',
    },
  ] as const;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-white font-mono text-sm">GL-1 Protocol</div>

        <div className="flex items-center gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as typeof mode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === m.id
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
              title={m.description}
            >
              <span className="mr-2">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        <div className="text-gray-500 text-xs font-mono">v1.0</div>
      </div>
    </div>
  );
}
