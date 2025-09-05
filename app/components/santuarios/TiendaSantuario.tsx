// en app/components/santuarios/TiendaSantuario.tsx
"use client";

import React, { useState } from 'react';
import PergaminoSidebar from '../ui/PergaminoSidebar';
import { vinosData } from '@/app/data/vinosData';
import WinePlate from '../sections/tienda/WinePlate';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Vino } from '../sections/aromas/types';
import ModalPanel from '../ui/ModalPanel';
import WineDetail from '../sections/tienda/WineDetail';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TiendaSantuario: React.FC = () => {
  const [selectedVino, setSelectedVino] = useState<Vino | null>(null);

  return (
    <div className="relative w-full min-h-screen pt-16">
      {/* --- EL ALMA LÍQUIDA --- */}
      <div className="absolute inset-0 z-0 overflow-hidden -mt-16">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/wine-pour.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Contenedor Flex para el contenido */}
      <div className="relative z-10 flex flex-row">
        {/* El Pergamino ahora con un ancho fijo de 1/4 */}
        <div className="w-1/4 flex-shrink-0 self-stretch">
          <PergaminoSidebar>
            <h2 className="font-serif text-3xl font-bold text-bodega-ivory mb-6">
              La Bodega
            </h2>
            <div className="space-y-8">
              {/* Sección de Filtro por Varietal */}
              <div>
                <h3 className="text-xl font-bold text-bodega-gold mb-4">Varietal</h3>
                <div className="space-y-2 text-bodega-stone">
                  <label className="flex items-center gap-x-2"><input type="checkbox" className="accent-bodega-maroon" /> Malbec</label>
                  <label className="flex items-center gap-x-2"><input type="checkbox" className="accent-bodega-maroon" /> Malbec Rosé</label>
                  <label className="flex items-center gap-x-2"><input type="checkbox" className="accent-bodega-maroon" /> Torrontés</label>
                </div>
              </div>
              {/* Sección de Filtro por Precio */}
              <div>
                <h3 className="text-xl font-bold text-bodega-gold mb-4">Rango de Precio</h3>
                <div className="flex items-center gap-x-2">
                  <input type="number" placeholder="Min" className="w-1/2 p-2 bg-bodega-dark/50 border-b border-bodega-gold focus:outline-none" />
                  <span className="text-bodega-stone">-</span>
                  <input type="number" placeholder="Max" className="w-1/2 p-2 bg-bodega-dark/50 border-b border-bodega-gold focus:outline-none" />
                </div>
              </div>
            </div>
          </PergaminoSidebar>
        </div>

        {/* El Lienzo de la Galería ocupa el espacio restante */}
        <div className="flex-grow p-8 h-[calc(100vh-4rem)] overflow-y-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {vinosData.map(vino => (
              <motion.div 
                key={vino.id} 
                variants={cardVariants} 
                onClick={() => setSelectedVino(vino)}
              >
                <WinePlate vino={vino} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedVino && (
          <ModalPanel 
            isOpen={!!selectedVino} 
            onClose={() => setSelectedVino(null)}
            title="Detalle del Tesoro"
          >
            <WineDetail vino={selectedVino} />
          </ModalPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TiendaSantuario;