'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plato, Vino } from '@/app/types';
import { Star, ShieldAlert, Wine } from 'lucide-react';

interface PlatoDetalleProps {
  plato: Plato;
  vinos: Vino[];
}

const PlatoDetalle: React.FC<PlatoDetalleProps> = ({ plato, vinos }) => {
  const recommendedWine = plato.vino_maridaje_id
    ? vinos.find(vino => vino.id === plato.vino_maridaje_id)
    : null;

  const averageRating = plato.reseñas && plato.reseñas.length > 0
    ? (plato.reseñas.reduce((sum, review) => sum + review.rating, 0) / plato.reseñas.length).toFixed(1)
    : 'N/A';

  return (
    <motion.div
      key={plato.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full flex flex-col font-serif min-h-0"
    >
      {/* --- Imagen Protagonista (ocupando 2/6 del Lienzo = 33.333%) --- */}
      <div 
        className="relative w-full h-[45%] lg:h-[45%] flex-none shadow-lg shadow-black/50 rounded-lg overflow-hidden"
      >
        <Image
          src={plato.imageUrl}
          alt={plato.nombre}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <h2 className="absolute bottom-4 left-4 text-2xl lg:bottom-6 lg:left-6 lg:text-4xl font-bold text-white tracking-wider">{plato.nombre}</h2>
      </div>

      {/* --- El Códice del Sabor (contenido restante; scroll interno) --- */}
      <div 
        className="w-full flex-1 p-4 lg:p-6 rounded-lg shadow-lg min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ 
          backgroundColor: "rgba(25, 25, 25, 0.95)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maskImage: "linear-gradient(to bottom, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent 100%)"
        }}
      >
        <div className="pr-4">
          {/* --- Contenido del Códice --- */}
          <h3 className="text-2xl lg:text-3xl font-bold text-bodega-ivory mb-2">{plato.nombre}</h3>
          <p className="text-bodega-stone text-base lg:text-lg mb-6">{plato.descripcion}</p>
          {plato.historiaPlato && (
            <p className="italic text-bodega-stone/80 mb-6">&quot;{plato.historiaPlato}&quot;</p>
          )}

          {/* ... Resto del contenido (Alérgenos, Maridaje, Reseñas) ... */}
          <div className="border-t border-bodega-gold/20 pt-6 mt-6 space-y-4">
            {plato.alergenos && plato.alergenos.length > 0 && (
              <div>
                <h4 className="font-bold text-bodega-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldAlert size={18} /> Alérgenos
                </h4>
                <div className="flex flex-wrap gap-2">
                  {plato.alergenos.map(alergeno => (
                    <span key={alergeno} className="bg-red-900/50 text-red-200 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {alergeno}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {recommendedWine && (
               <div>
                <h4 className="font-bold text-bodega-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Wine size={20} /> Maridaje Recomendado
                </h4>
                <Link 
                  href={`/shop/vinos/${recommendedWine.id}`} 
                  className="flex items-center gap-4 p-3 bg-bodega-ivory/10 rounded-md hover:bg-bodega-ivory/20 transition-colors cursor-pointer"
                >
                  <div className="relative w-16 h-16 shrink-0">
                        <Image
                      src={recommendedWine.imagen_url}
                      alt={recommendedWine.nombre}
                      fill
                      className="rounded-md object-cover"
                      sizes="64px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-bold text-bodega-ivory lg:text-lg">{recommendedWine.nombre}</p>
                    <p className="text-sm text-bodega-stone">{recommendedWine.varietal} - {recommendedWine.anada}</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
          {plato.reseñas && plato.reseñas.length > 0 && (
            <div className="border-t border-bodega-gold/20 pt-6 mt-6">
               <h4 className="font-bold text-bodega-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Star size={20} /> Reseñas de Comensales
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: Math.floor(parseFloat(averageRating)) }).map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                    {Array.from({ length: 5 - Math.ceil(parseFloat(averageRating)) }).map((_, i) => <Star key={i} size={20} className="opacity-30" />)}
                  </div>
                  <p className="text-bodega-ivory text-sm">{averageRating}/5 ({plato.reseñas.length} reseñas)</p>
                </div>
                <button className="bg-bodega-gold text-black px-4 py-2 rounded-md font-semibold hover:bg-bodega-gold/80 transition-colors">
                  [+] Ver Reseñas
                </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PlatoDetalle;
