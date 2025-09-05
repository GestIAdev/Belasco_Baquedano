'use client';

import React from 'react';
import Image from 'next/image';
import { Plato } from '@/app/types';

interface MenuCardProps {
  menu: Plato;
  onSelect: (menu: Plato) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(menu)}
      className="flex items-center gap-4 p-4 border-b border-bodega-gold/20 hover:bg-bodega-ivory/10 transition-colors duration-200 cursor-pointer"
    >
      {/* Miniatura del Cartel del Menú */}
      <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0 border border-bodega-gold/30">
        <Image
          src={menu.imagenMiniatura}
          alt={`Miniatura de ${menu.nombre}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Información del Menú */}
      <div>
        <h4 className="font-bold text-bodega-ivory text-lg">{menu.nombre}</h4>
        <p className="text-sm text-bodega-stone/90 mt-1 pr-4">{menu.descripcion}</p>
        <p className="font-bold text-bodega-gold text-lg mt-2">${menu.precio.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MenuCard;