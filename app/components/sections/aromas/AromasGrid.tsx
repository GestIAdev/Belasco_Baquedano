// en app/components/sections/aromas/AromasGrid.tsx
"use client";

import React, { useState } from 'react';
import type { Aroma } from '@/app/data/aromasData';
import { motion, AnimatePresence } from 'framer-motion';
import AromaBubble from './AromaBubble';
import AromaDetailModal from './AromaDetailModal';

const mockAromas = [
  { id: 1, nombre: 'Ciruela Negra', imageUrl: '/images/aromas/ciruela_negra.jpg', descripcion: 'Una nota profunda y madura, característica de los grandes Malbec.' },
  { id: 2, nombre: 'Fresa', imageUrl: '/images/aromas/fresa.jpg', descripcion: 'Un toque de dulzura y frescura que evoca frutas rojas de verano.' },
  { id: 3, nombre: 'Cereza', imageUrl: '/images/aromas/cereza.jpg', descripcion: 'Vibrante y jugosa, una explosión de fruta en nariz.' },
  { id: 4, nombre: 'Frambuesa', imageUrl: '/images/aromas/frambuesa.jpg', descripcion: 'Delicada y perfumada, aporta elegancia al conjunto.' },
  { id: 5, nombre: 'Violeta', imageUrl: '/images/aromas/violeta.jpg', descripcion: 'La firma floral inconfundible de los Malbec de altura de Mendoza.' },
  { id: 6, nombre: 'Rosa', imageUrl: '/images/aromas/rosa.jpg', descripcion: 'Un aroma clásico que aporta una capa de complejidad y romanticismo.' },
  { id: 7, nombre: 'Menta', imageUrl: '/images/aromas/menta.jpg', descripcion: 'Una nota herbal y refrescante que levanta el perfil del vino.' },
  { id: 8, nombre: 'Vainilla', imageUrl: '/images/aromas/vainilla.jpg', descripcion: 'El dulce beso del roble francés, resultado de una crianza paciente.' },
  { id: 9, nombre: 'Cuero', imageUrl: '/images/aromas/cuero.jpg', descripcion: 'Un aroma terciario noble, indicativo de evolución y guarda.' },
  { id: 10, nombre: 'Cedro', imageUrl: '/images/aromas/cedro.jpg', descripcion: 'Elegantes notas de madera fina y caja de puros.' },
  { id: 11, nombre: 'Miel', imageUrl: '/images/aromas/miel.jpg', descripcion: 'Un toque de dulzor y complejidad que aparece con el tiempo.' },
  { id: 12, nombre: 'Levadura', imageUrl: '/images/aromas/levadura.jpg', descripcion: 'Un recuerdo sutil del proceso de fermentación, aportando carácter.' },
  { id: 13, nombre: 'Romero', imageUrl: '/images/aromas/romero.jpg', descripcion: 'Una especia herbal y mediterránea que añade una dimensión intrigante.' },
  { id: 14, nombre: 'Alquitrán', imageUrl: '/images/aromas/alquitran.jpg', descripcion: 'Una nota mineral intensa, presente en vinos de gran estructura.' },
  { id: 15, nombre: 'Vinagre', imageUrl: '/images/aromas/vinagre.jpg', descripcion: 'Una lección sobre los defectos: el avinagramiento es una señal de alerta.' }
];

type AromasGridProps = {
  aromas?: Aroma[];
  onAromaClick?: (aroma: Aroma) => void;
};

const AromasGrid: React.FC<AromasGridProps> = ({ aromas = mockAromas as Aroma[], onAromaClick }) => {
  const [selectedAroma, setSelectedAroma] = useState<Aroma | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const handleClick = (aroma: Aroma) => {
    if (onAromaClick) return onAromaClick(aroma);
    setSelectedAroma(aroma);
  };

  return (
    <div className="w-full h-full min-h-0">
      <motion.div 
        className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {aromas.map(aroma => (
          <AromaBubble 
            key={aroma.id} 
            aroma={aroma} 
            onClick={() => handleClick(aroma)} 
          />
        ))}
      </motion.div>

      <AnimatePresence>
        <AromaDetailModal aroma={selectedAroma} isOpen={!!selectedAroma} onClose={() => setSelectedAroma(null)} />
      </AnimatePresence>
    </div>
  );
};

export default AromasGrid;
