"use client";

import React from 'react';
import { useSantuario } from '../SantuarioContext';

interface NavbarProps {
  onOpenPanel: (hologram: { id: string; title: string }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenPanel }) => {
  const { setActiveSantuario } = useSantuario();

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-bodega-dark/80 backdrop-blur-sm h-16">
      <nav className="container mx-auto flex items-center justify-between h-full px-4 border-b border-bodega-gold/30">
        <button onClick={() => setActiveSantuario(null)} className="font-serif text-2xl font-bold text-bodega-ivory">
          Belasco
        </button>
        <div className="flex items-center space-x-8">
          <button onClick={() => onOpenPanel({ id: 'history', title: 'Nuestra Historia' })} className="font-sans text-bodega-stone hover:text-bodega-ivory">Nuestra Historia</button>
          {/* CORRECCIÓN: Enoturismo ahora abre un ModalPanel (Pergamino) */}
          <button onClick={() => onOpenPanel({ id: 'enoturismo', title: 'Enoturismo' })} className="font-sans text-bodega-stone hover:text-bodega-ivory">Enoturismo</button>
          <button onClick={() => setActiveSantuario('restaurant')} className="font-sans text-bodega-stone hover:text-bodega-ivory">Restaurante</button>
          <button onClick={() => setActiveSantuario('aromas')} className="font-sans text-bodega-stone hover:text-bodega-ivory">Sala de Aromas</button>
          <button onClick={() => setActiveSantuario('tienda')} className="font-sans text-bodega-stone hover:text-bodega-ivory">Tienda</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onOpenPanel({ id: 'contacto', title: 'Contacto' })} className="font-sans px-4 h-10 border border-bodega-gold text-bodega-ivory">Contacto</button>
          <button onClick={() => onOpenPanel({ id: 'reservations', title: 'Reservar' })} className="font-sans px-4 h-10 border border-bodega-gold text-bodega-gold">Reservar</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;