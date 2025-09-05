'use client';

import React from 'react'; // Removed useState
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; // Keep for potential future use or if parent uses it
import { Plato } from '@/app/types'; // RUTA DE IMPORTACIÓN CORREGIDA

interface DishCardProps {
  plato: Plato;
  onSelect: (plato: Plato) => void;
  onShowPreview: (imageUrl: string | null, x: number, y: number) => void; // NUEVA PROP
}

const DishCard: React.FC<DishCardProps> = ({ plato, onSelect, onShowPreview }) => {
  return (
    <div 
      onMouseEnter={(e) => onShowPreview(plato.imagenMiniatura, e.clientX, e.clientY)} // Modificado
      onMouseLeave={() => onShowPreview(null, 0, 0)} // Modificado
      onClick={() => onSelect(plato)}
      className="relative flex justify-between items-center p-4 border-b border-bodega-gold/20 hover:bg-bodega-ivory/10 transition-colors duration-200 cursor-pointer"
    >
      {/* --- Información del Plato --- */}
      <div>
        <h4 className="font-bold text-bodega-ivory text-lg">{plato.nombre}</h4>
        <p className="text-sm text-bodega-stone/90 mt-1 pr-4 truncate w-64">{plato.descripcion}</p>
      </div>
      <p className="font-bold text-bodega-gold text-lg shrink-0">${plato.precio.toFixed(2)}</p>

      {/* --- Micro-previsualización (Thumbnail) - ELIMINADO DE AQUÍ --- */}
      {/* La lógica de previsualización ahora se maneja en el componente padre (RestauranteSantuario) */}
    </div>
  );
};

export default DishCard;
