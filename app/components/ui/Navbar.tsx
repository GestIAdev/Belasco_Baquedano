'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSantuario } from '../SantuarioContext';
import { NavLink } from '@/app/types';
import MobileMenu from './MobileMenu';
import HamburgerToggle from './HamburgerToggle';

interface NavbarProps {
  onNavClick: (link: NavLink) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const { activeSantuario, setActiveSantuario, inModal } = useSantuario();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll while mobile menu is open and add Escape handler
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const originalOverflow = document.body.style.overflow;
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  const navLinks: NavLink[] = [
    { id: 'history', title: 'Nuestra Historia', type: 'hologram' },
    { id: 'enoturismo', title: 'Enoturismo', type: 'hologram' },
    { id: 'restaurante', title: 'Restaurante', type: 'santuario' },
    { id: 'aromas', title: 'Sala de Aromas', type: 'santuario' },
    { id: 'tienda', title: 'Tienda', type: 'santuario' },
    { id: 'club', title: 'Club del Vino', type: 'santuario' },
    { id: 'eventos', title: 'Eventos', type: 'santuario' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[1000] bg-black/60 backdrop-blur-md h-20 border-b border-bodega-gold/20">
        <nav className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
          {/* === ZONA IZQUIERDA: EL ESTANDARTE === */}
          <button onClick={() => { if (!inModal) setActiveSantuario(null); }} className="hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Belasco de Baquedano Logo"
              width={280}
              height={64}
              priority
              className="w-auto h-24 lg:h-48"
            />
          </button>

          {/* === ZONA CENTRAL: NAVEGACIÓN (Solo Desktop) === */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavClick(link)}
                className={`font-sans text-lg transition-colors duration-200 ${link.type === 'santuario' && activeSantuario === link.id ? 'text-bodega-gold font-semibold' : 'text-bodega-stone hover:text-bodega-ivory'}`}
              >
                {link.title}
              </button>
            ))}
          </div>

          {/* === ZONA DERECHA: BLOQUE DE ACCIÓN (Solo Desktop) === */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => onNavClick({id: 'contacto', title: 'Contacto', type: 'hologram'})} className="font-sans px-5 py-2 rounded-md border border-bodega-gold/50 text-bodega-stone hover:bg-bodega-gold/10 hover:text-bodega-ivory transition-colors">
              Contacto
            </button>
            <button onClick={() => onNavClick({id: 'reservations', title: 'Reservar', type: 'hologram'})} className="font-sans px-5 py-2 rounded-md bg-bodega-gold text-black font-bold hover:bg-bodega-gold/80 transition-colors">
              Reservar
            </button>
          </div>

          {/* === DISPARADOR MÓVIL (Solo Móvil) === */}
          <div className="lg:hidden">
            <HamburgerToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(v => !v)} />
          </div>
        </nav>
      </header>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        onNavClick={onNavClick}
      />
    </>
  );
};

export default Navbar;
