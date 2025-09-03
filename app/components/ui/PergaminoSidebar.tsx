// en app/components/ui/PergaminoSidebar.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react'; // Un icono para nuestro sello

interface PergaminoSidebarProps {
  children: React.ReactNode;
  className?: string;
}

const PergaminoSidebar: React.FC<PergaminoSidebarProps> = ({ children, className }) => {
  return (
    <motion.div 
      initial={{ x: '-100%' }} 
      animate={{ x: '0%' }} 
      transition={{ duration: 0.7, ease: 'easeOut' }}
      // --- LOS HECHIZOS DE ARTE ESTÁN AQUÍ ---
      className={`h-full w-full bg-bodega-dark/60 backdrop-blur-md p-8 text-bodega-stone overflow-y-auto border-r-2 border-bodega-gold/50 flex flex-col
                 ${className || ''}`}
    >
      {/* Contenido principal que crece para ocupar el espacio */}
      <div className="flex-grow">
        {children}
      </div>

      {/* El Sello del Escriba (Mi Sorpresa) */}
      <div className="flex-shrink-0 pt-8 text-center">
        <div className="inline-block p-3 rounded-full bg-bodega-maroon shadow-lg">
          <Feather size={24} className="text-bodega-gold" />
        </div>
      </div>
    </motion.div>
  );
};

export default PergaminoSidebar;