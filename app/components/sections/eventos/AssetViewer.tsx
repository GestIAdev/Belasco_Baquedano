"use client";



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evento, MediaItem } from '@/app/types';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ActiveProjection {
  item: Evento | MediaItem;
  contextItems: (Evento | MediaItem)[];
  initialIndex: number;
}

interface AssetViewerProps {
  projection: ActiveProjection;
}

// Helper para saber si el asset es una Crónica (Evento) o un MediaItem individual
function isChronicle(item: Evento | MediaItem): item is Evento {
  return (item as Evento).gallery !== undefined;
}

const AssetViewer: React.FC<AssetViewerProps> = ({ projection }) => {
  const [currentSlide, setCurrentSlide] = useState(projection.initialIndex);

  const { item, contextItems } = projection;

  const mediaToShow = isChronicle(item) ? item.gallery : contextItems.filter(m => !isChronicle(m));
  const description = item.description || 'No hay descripción disponible.';

  useEffect(() => {
    setCurrentSlide(projection.initialIndex);
  }, [projection.initialIndex]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === mediaToShow.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? mediaToShow.length - 1 : prev - 1));
  };

  const activeMedia = mediaToShow[currentSlide];

  return (
    <motion.div 
      key={item.id} 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full h-full flex flex-row bg-black/30 border border-bodega-gold/10 rounded-lg overflow-hidden shadow-2xl shadow-black/50"
    >
      {/* Directiva 3.2: El Escenario Principal (75%) */}
      <div className="w-3/4 h-full bg-black relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMedia.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {(() => {
              // Extraemos url y title de forma segura
              const src = 'url' in activeMedia ? activeMedia.url : '';
              const title = 'title' in activeMedia ? activeMedia.title : 'Recurso';

              if ('type' in activeMedia && activeMedia.type === 'image') {
                return <Image src={src} alt={title} fill className="object-contain" />;
              }

              return <video src={src} className="w-full h-full object-contain" controls autoPlay loop muted />;
            })()}
          </motion.div>
        </AnimatePresence>
        
        {mediaToShow.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white hover:bg-bodega-gold transition-colors z-10">
              <ChevronLeft size={28} />
            </button>
            <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white hover:bg-bodega-gold transition-colors z-10">
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>

      {/* Directiva 3.2: El Códice Narrativo (25%) */}
      <div className="w-1/4 h-full flex flex-col p-6 bg-stone-950/60 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-bodega-gold/20">
        <h2 className="text-2xl font-bold text-bodega-gold font-serif mb-3">{item.title}</h2>
        {isChronicle(item) && (
            <p className="text-sm text-bodega-gold/70 mb-4">{item.date}</p>
        )}
        <div className="prose prose-invert prose-sm prose-p:text-bodega-stone/80 prose-p:leading-relaxed">
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AssetViewer;
