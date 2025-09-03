
'use client';
import { createContext, useState, useContext, ReactNode } from 'react';

type SantuarioContextType = {
  activeSantuario: string | null;
  setActiveSantuario: (santuario: string | null) => void;
};

const SantuarioContext = createContext<SantuarioContextType | undefined>(undefined);

export const SantuarioProvider = ({ children }: { children: ReactNode }) => {
  const [activeSantuario, setActiveSantuario] = useState<string | null>(null);

  return (
    <SantuarioContext.Provider value={{ activeSantuario, setActiveSantuario }}>
      {children}
    </SantuarioContext.Provider>
  );
};

export const useSantuario = () => {
  const context = useContext(SantuarioContext);
  if (context === undefined) {
    throw new Error('useSantuario must be used within a SantuarioProvider');
  }
  return context;
};
