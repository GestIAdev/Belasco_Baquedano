'use client';

import React, { useState } from 'react';
import Navbar from './ui/Navbar';
import ModalPanel from './ui/ModalPanel';
import HistoryContent from './sections/HistoryContent';
import EnoturismoContent from './sections/EnoturismoContent';
import ContactoContent from './sections/ContactoContent';
import { useSantuario } from './SantuarioContext';

const RestaurantContent = () => <div>Contenido del Restaurante...</div>;
const ReservationsContent = () => <div>Contenido de Reservas...</div>;

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [activeHologram, setActiveHologram] = useState<{ id: string; title: string } | null>(null);
  const { setActiveSantuario } = useSantuario();

  const openHologram = (hologram: { id: string; title: string }) => {
    setActiveHologram(hologram);
  };

  const closeHologram = () => {
    setActiveHologram(null);
  };

  const handleNavClick = (hologram: { id: string; title: string }) => {
    if (hologram.id === 'aromas') {
      setActiveSantuario('aromas');
    } else {
      openHologram(hologram);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen"> {/* Replaced fragment with div and added grid styles */}
      <Navbar onOpenPanel={handleNavClick} />
      <main className="pt-16 overflow-hidden">{children}</main>
      {activeHologram && (
        <ModalPanel
          isOpen={!!activeHologram}
          onClose={closeHologram}
          title={activeHologram.title}
        >
          {activeHologram.id === 'history' && <HistoryContent />}
          {activeHologram.id === 'enoturismo' && <EnoturismoContent />}
          {activeHologram.id === 'contacto' && <ContactoContent />}
          {activeHologram.id === 'restaurant' && <RestaurantContent />}
          {activeHologram.id === 'reservations' && <ReservationsContent />}
        </ModalPanel>
      )}
    </div> // Closing div
  );
};

export default AppWrapper;
