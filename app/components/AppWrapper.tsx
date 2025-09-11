// app/components/AppWrapper.tsx
'use client';

import React, { useState } from 'react';
import Navbar from './ui/Navbar';
import ModalPanel from './ui/ModalPanel';
import HistoryContent from './sections/HistoryContent';
import EnoturismoContent from './sections/EnoturismoContent';
import ContactoContent from './sections/ContactoContent';
import { useSantuario, SantuarioId } from './SantuarioContext';

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [activeHologram, setActiveHologram] = useState<{ id: string; title: string } | null>(null);
  const { setActiveSantuario, inModal } = useSantuario();

  const handleNavClick = (link: { id: string; title: string; type: string }) => {
    // If a modal/pergamino is open, avoid changing santuario via global nav clicks
    if (inModal && link.type === 'santuario') {
      // ignore nav that would change santuario while modal is active
      return;
    }

    if (link.type === 'santuario') {
      // empty id clears activeSantuario
      if (!link.id) {
        setActiveSantuario(null);
      } else {
        setActiveSantuario(link.id as SantuarioId);
      }
    } else {
      setActiveHologram({ id: link.id, title: link.title });
    }
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] bg-black text-white">
  <Navbar onNavClick={handleNavClick} />
      
  <main className="overflow-hidden pt-20 min-h-0 flex flex-col">
        {children}
      </main>

      {activeHologram && (
        <ModalPanel
          isOpen={!!activeHologram}
          onClose={() => setActiveHologram(null)}
          title={activeHologram.title}
        >
          {activeHologram.id === 'history' && <HistoryContent />}
          {activeHologram.id === 'enoturismo' && <EnoturismoContent />}
          {activeHologram.id === 'contacto' && <ContactoContent />}
        </ModalPanel>
      )}
    </div>
  );
};

export default AppWrapper;