"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PergaminoSidebar from '../ui/PergaminoSidebar';
import { menuData } from '@/app/data/menuData';
import { Plato } from '../sections/aromas/types';
import { X } from 'lucide-react';
import { useSantuario } from '../SantuarioContext';

// Componente interno para la tarjeta del plato (lo refinaremos después)
const DishCard = ({ plato }: { plato: Plato }) => (
  <motion.div 
    className="py-4 border-b border-bodega-gold/20"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-bodega-ivory text-lg">{plato.nombre}</h4>
        <p className="text-sm text-bodega-stone/80 mt-1 max-w-md">{plato.descripcion}</p>
      </div>
      <p className="font-bold text-bodega-gold text-lg ml-4">${plato.precio}</p>
    </div>
  </motion.div>
);

const RestauranteSantuario: React.FC = () => {
  const { setActiveSantuario } = useSantuario();
  const [activeTab, setActiveTab] = useState<'principal' | 'entrante' | 'postre'>('principal');

  const filteredMenu = menuData.filter(plato => plato.categoria === activeTab);

  return (
    <div className="relative w-full min-h-screen pt-16">
      {/* ... Fondo de dos mundos sin cambios ... */}
      
      {/* Contenido Principal */}
      <div className="relative z-10 flex flex-row">
        <div className="w-1/3 flex-shrink-0">
          <PergaminoSidebar>
            <h2 className="font-serif text-4xl font-bold text-bodega-ivory mb-6">
              La Carta Viva
            </h2>
            
            {/* Pestañas de Navegación */}
            <div className="flex border-b border-bodega-gold/30 mb-4">
              <button onClick={() => setActiveTab('entrante')} className={`py-2 px-4 font-bold transition-colors ${activeTab === 'entrante' ? 'text-bodega-gold border-b-2 border-bodega-gold' : 'text-bodega-stone hover:text-bodega-gold/70'}`}>Entrantes</button>
              <button onClick={() => setActiveTab('principal')} className={`py-2 px-4 font-bold transition-colors ${activeTab === 'principal' ? 'text-bodega-gold border-b-2 border-bodega-gold' : 'text-bodega-stone hover:text-bodega-gold/70'}`}>Principales</button>
              <button onClick={() => setActiveTab('postre')} className={`py-2 px-4 font-bold transition-colors ${activeTab === 'postre' ? 'text-bodega-gold border-b-2 border-bodega-gold' : 'text-bodega-stone hover:text-bodega-gold/70'}`}>Postres</button>
            </div>

            {/* Lista de Platos Animada */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredMenu.map(plato => (
                    <DishCard key={plato.id} plato={plato} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </PergaminoSidebar>
        </div>

        {/* El Lienzo de la Galería (vacío por ahora) */}
        <div className="flex-grow">
          {/* Aquí irá el contenido visual si decidimos añadirlo */}
        </div>
      </div>
      
      {/* Botón de Cierre */}
      <button 
        onClick={() => setActiveSantuario(null)} 
        className="absolute top-20 right-6 z-20 text-bodega-ivory/50 hover:text-bodega-ivory transition-colors"
      >
        <X size={32} />
      </button>
    </div>
  );
};

export default RestauranteSantuario;