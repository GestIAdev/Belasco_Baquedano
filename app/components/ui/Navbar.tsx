'use client';

import React from 'react';
import Image from 'next/image';
import { useSantuario } from '../SantuarioContext';
import { NavLink } from '@/app/types';

interface NavbarProps {
  onOpenPanel: (hologram: { id: string; title: string }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenPanel }) => {
  const { activeSantuario, setActiveSantuario } = useSantuario();

  const navLinks: NavLink[] = [
    { id: 'history', title: 'Nuestra Historia', type: 'hologram' },
    { id: 'enoturismo', title: 'Enoturismo', type: 'hologram' },
    { id: 'restaurante', title: 'Restaurante', type: 'santuario' },
    { id: 'aromas', title: 'Sala de Aromas', type: 'santuario' },
    { id: 'tienda', title: 'Tienda', type: 'santuario' },
  { id: 'club', title: 'Club del Vino', type: 'santuario' },
    { id: 'eventos', title: 'Eventos', type: 'santuario' }, // <-- EL NUEVO COMANDO
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-black/60 backdrop-blur-md h-20 border-b border-bodega-gold/20">
      <nav className="container mx-auto flex items-center justify-between h-full px-8">
        {/* === ZONA IZQUIERDA: EL ESTANDARTE === */}
        <button onClick={() => setActiveSantuario(null)} className="hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Belasco de Baquedano Logo"
              width={280} // Aumentamos también este valor para que Next.js reserve más espacio.
              height={120} // Nueva altura sugerida
              priority
              className="w-auto h-46" // Cambia h-10 a h-16 (o h-18 si quieres más)
            />    

        </button>

        {/* === ZONA CENTRAL: NAVEGACIÓN === */}
        <div className="flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                if (link.type === 'santuario') {
                  setActiveSantuario(link.id);
                } else {
                  onOpenPanel({ id: link.id, title: link.title });
                }
              }}
              className={`font-sans text-lg transition-colors duration-300 ease-in-out focus:outline-none
                ${link.type === 'santuario' && activeSantuario === link.id
                  ? 'text-bodega-gold font-semibold' // Estado activo
                  : 'text-bodega-stone hover:text-bodega-ivory'
                }
              `}
            >
              {link.title}
            </button>
          ))}
        </div>

        {/* === ZONA DERECHA: BLOQUE DE ACCIÓN === */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onOpenPanel({ id: 'contacto', title: 'Contacto' })} 
            className="font-sans px-5 py-2 rounded-md border border-bodega-gold/50 text-bodega-stone hover:bg-bodega-gold/10 hover:text-bodega-ivory transition-colors"
          >
            Contacto
          </button>
          <button 
            onClick={() => onOpenPanel({ id: 'reservations', title: 'Reservar' })} 
            className="font-sans px-5 py-2 rounded-md bg-bodega-gold text-black font-bold hover:bg-bodega-gold/80 transition-colors"
          >
            Reservar
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
