// en app/components/SantuarioContext.tsx
"use client";
import { createContext, useState, useContext, ReactNode } from 'react';

// 1. EL LENGUAJE BLINDADO: Definimos los únicos valores posibles
export type SantuarioActivo = 'aromas' | 'tienda' | 'restaurante' | 'club' | 'eventos' | null;
export type SantuarioId = SantuarioActivo;

type SantuarioContextType = {
  activeSantuario: SantuarioActivo;
  setActiveSantuario: (santuario: SantuarioActivo) => void;
  inModal: boolean;
  setInModal: (v: boolean) => void;
};

const SantuarioContext = createContext<SantuarioContextType | undefined>(undefined);

export const SantuarioProvider = ({ children }: { children: ReactNode }) => {
  // 2. El estado ahora usa nuestro tipo específico
  const [activeSantuario, setActiveSantuario] = useState<SantuarioActivo>(null);
  const [inModal, setInModal] = useState<boolean>(false);

  return (
    <SantuarioContext.Provider value={{ activeSantuario, setActiveSantuario, inModal, setInModal }}>
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