'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './ui/Navbar';
import ModalPanel from './ui/ModalPanel';
import HistoryContent from './sections/HistoryContent';
import EnoturismoContent from './sections/EnoturismoContent';
import ContactoContent from './sections/ContactoContent';
import { useSantuario } from './SantuarioContext';

const RestaurantContent = () => <div>Contenido del Restaurante...</div>;
const ReservationsContent = () => <div>Contenido de Reservas...</div>;

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
    <div className="bg-black text-white">
      {/* FASE 1: Construir el Bastión del Centinela */}
      {/* Temporarily render Navbar always for debugging */} 
      <header className="relative z-50">
        <Navbar onOpenPanel={handleNavClick} />
      </header>

      {/* FASE 2: El Contenido Fluye Debajo */}
      {/* El pt-20 en cada Santuario sigue siendo la clave para dejar el espacio físico. */}
      <main>
        {children}
      </main>

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
    </div>
  );
};

export default AppWrapper;