"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plato } from '@/app/types';

interface Props {
  item: Plato;
  onClose: () => void;
  mode?: 'default' | 'menu';
  onViewInLienzo?: (p: Plato) => void;
}

const MobileItemViewer: React.FC<Props> = ({ item, onClose, mode = 'default', onViewInLienzo }) => {
  const [openAllergens, setOpenAllergens] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  const itemRecord = item as unknown as Record<string, unknown>;
  const reviews = itemRecord.reviews ?? itemRecord['reseñas'] ?? itemRecord['resenas'] ?? null;
  const allergens = itemRecord.alergenos ?? itemRecord['alérgenos'] ?? itemRecord.alergias ?? null;
  const history = itemRecord.historia ?? itemRecord.descripcion_larga ?? null;

  const renderReviews = () => {
    if (Array.isArray(reviews)) {
      if (reviews.length === 0) return <div>No hay reseñas aún.</div>;
      return (reviews as unknown[]).map((r, i) => {
        const rec = r as Record<string, unknown>;
        const author = rec.author ?? rec.nombre ?? `Usuario ${i + 1}`;
        const date = rec.date ?? rec.fecha ?? '';
        const text = rec.text ?? rec.comentario ?? rec.review ?? rec.reseña ?? String(r);
        return (
          <div key={i} className="mb-2 border-b border-neutral-800 pb-2">
            <div className="font-semibold text-sm">{String(author)}</div>
            <div className="text-xs text-neutral-400">{String(date)}</div>
            <div className="mt-1">{String(text)}</div>
          </div>
        );
      });
    }
    return (reviews && String(reviews)) || 'No hay reseñas.';
  };

  return (
  <div className="fixed left-0 right-0 z-[100000] lg:hidden" style={{ top: '5rem', bottom: 0 }}>
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full h-full overflow-hidden bg-neutral-950/95 text-white flex flex-col">
        <div className={mode === 'menu' ? 'relative w-full h-[70%] flex-shrink-0' : 'relative w-full h-[45%] md:h-2/3 flex-shrink-0'}>
            <Image src={item.imageUrl} alt={item.nombre} fill className="object-cover" unoptimized />
          </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="overflow-y-auto flex-1 mb-4 pb-4">
            <h3 className="text-2xl font-bold mb-2 text-bodega-ivory">{item.nombre}</h3>
            <p className="text-neutral-300 mb-4 whitespace-pre-line">{item.descripcion}</p>

            {/* Accordion - Opción 1: secciones expandibles (oculto para modo 'menu') */}
            {mode !== 'menu' && (
              <div className="space-y-2">
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-md overflow-hidden">
                <button
                  aria-expanded={openAllergens}
                  onClick={() => setOpenAllergens(v => !v)}
                  className="w-full text-left px-3 py-2 flex items-center justify-between"
                >
                  <span className="font-semibold">Alérgenos</span>
                  <span className="text-sm text-neutral-400">{openAllergens ? '−' : '+'}</span>
                </button>
                {openAllergens && (
                  <div className="px-3 pb-3 text-neutral-300 text-sm">{
                    Array.isArray(allergens)
                      ? ((allergens as unknown[]).length ? (allergens as unknown[]).join(', ') : 'No especificado')
                      : (allergens ? String(allergens) : 'No especificado')
                  }</div>
                )}
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 rounded-md overflow-hidden">
                <button
                  aria-expanded={openHistory}
                  onClick={() => setOpenHistory(v => !v)}
                  className="w-full text-left px-3 py-2 flex items-center justify-between"
                >
                  <span className="font-semibold">Historia / Notas</span>
                  <span className="text-sm text-neutral-400">{openHistory ? '−' : '+'}</span>
                </button>
                {openHistory && (
                  <div className="px-3 pb-3 text-neutral-300 text-sm whitespace-pre-line">{String(history) || 'No hay información adicional.'}</div>
                )}
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 rounded-md overflow-hidden">
                <button
                  aria-expanded={openReviews}
                  onClick={() => setOpenReviews(v => !v)}
                  className="w-full text-left px-3 py-2 flex items-center justify-between"
                >
                  <span className="font-semibold">Reseñas</span>
                  <span className="text-sm text-neutral-400">{openReviews ? '−' : '+'}</span>
                </button>
                {openReviews && (
                  <div className="px-3 pb-3 text-neutral-300 text-sm">
                    {renderReviews()}
                  </div>
                )}
              </div>
            </div>
            )}
          </div>
          <div className="flex gap-3 flex-none">
            {onViewInLienzo ? (
              <>
                <button onClick={() => { onViewInLienzo(item); onClose(); }} className="flex-1 bg-bodega-gold text-bodega-dark px-4 py-3 rounded-md">Ver en Lienzo</button>
                <button onClick={onClose} className="flex-1 border border-neutral-700 px-4 py-3 rounded-md">Volver</button>
              </>
            ) : (
              <button onClick={onClose} className="flex-1 border border-neutral-700 px-4 py-3 rounded-md">Volver</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileItemViewer;
