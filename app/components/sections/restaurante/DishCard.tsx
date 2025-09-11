'use client';

import React from 'react';
import { Plato } from '@/app/types';

interface DishCardProps {
  plato: Plato;
  onSelect: (plato: Plato) => void;
  onMobileView?: (plato: Plato) => void;
}

const DishCard: React.FC<DishCardProps> = ({ plato, onSelect, onMobileView }) => {
  return (
    <div 
      onClick={(e: React.MouseEvent) => { e.stopPropagation(); if (onMobileView) { onMobileView(plato); } else { onSelect(plato); } }}
      className="relative flex justify-between items-center p-4 border-b border-bodega-gold/20 hover:bg-bodega-ivory/10 transition-transform duration-150 transform active:scale-95 cursor-pointer box-border min-h-0 pointer-events-auto"
    >
      {/* --- Información del Plato --- */}
      <div>
        <h4 className="font-bold text-bodega-ivory text-lg">{plato.nombre}</h4>
        <p className="text-sm text-bodega-stone/90 mt-1 pr-4 truncate w-64">{plato.descripcion}</p>
      </div>
      <p className="font-bold text-bodega-gold text-lg shrink-0">${plato.precio.toFixed(2)}</p>
    </div>
  );
};

export default DishCard;