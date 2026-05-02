import React, { createContext, useContext, useState } from 'react';

type InstitutionalMode = 'executive' | 'technical' | 'audit';

interface InstitutionalModeContextType {
  mode: InstitutionalMode;
  setMode: (mode: InstitutionalMode) => void;
}

const InstitutionalModeContext = createContext<InstitutionalModeContextType | undefined>(undefined);

export function InstitutionalModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<InstitutionalMode>('executive');

  return (
    <InstitutionalModeContext.Provider value={{ mode, setMode }}>
      {children}
    </InstitutionalModeContext.Provider>
  );
}

export function useInstitutionalMode() {
  const context = useContext(InstitutionalModeContext);
  if (!context) {
    throw new Error('useInstitutionalMode must be used within InstitutionalModeProvider');
  }
  return context;
}
