// app/components/ui/MobileMenu.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { NavLink } from '@/app/types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  onNavClick: (link: NavLink) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks, onNavClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
  duration: 0.3,
  when: 'beforeChildren',
  staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          id="mobile-menu"
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-lg flex flex-col items-center justify-between p-8"
          onClick={(e) => {
            // Close only when clicking on the backdrop (not on inner content)
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* --- Estandarte y Botón de Cierre --- */}
          <div className="w-full flex justify-between items-center">
            <div className="relative w-40 h-10">
                <Image
                    src="/logo.png"
                    alt="Belasco de Baquedano Logo"
                    fill
                    className="object-contain"
                />
            </div>
            <button onClick={onClose} className="text-bodega-stone hover:text-white">
              <X size={32} />
            </button>
          </div>

          {/* --- Navegación Central con Alma --- */}
          <motion.div className="flex flex-col items-center space-y-4 w-full">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                variants={itemVariants}
                onClick={() => {
                  onNavClick(link);
                  onClose();
                }}
                className="w-full text-center font-sans text-3xl text-bodega-stone hover:text-bodega-gold transition-colors py-3 border-b border-bodega-gold/10"
              >
                {link.title}
              </motion.button>
            ))}
          </motion.div>

          {/* --- Bloque de Acción Final --- */}
          <motion.div 
            className="w-full flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navLinks.length * 0.05 + 0.2 }}
          >
            <button onClick={() => { onNavClick({id: 'contacto', title: 'Contacto', type: 'hologram'}); onClose(); }} className="font-sans px-5 py-3 text-lg rounded-md border border-bodega-gold/50 text-bodega-stone hover:bg-bodega-gold/10 hover:text-bodega-ivory transition-colors">
              Contacto
            </button>
            <button onClick={() => { onNavClick({id: 'reservations', title: 'Reservar', type: 'hologram'}); onClose(); }} className="font-sans px-5 py-3 text-lg rounded-md bg-bodega-gold text-black font-bold hover:bg-bodega-gold/80 transition-colors">
              Reservar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
