"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Evento, MediaItem } from '@/app/types'; // <-- USANDO LA LEY CORRECTA
import PunkVideoPlayer from '@/app/components/ui/PunkVideoPlayer'; // <-- Asumiendo que vive aquí

interface EventDetailModalProps {
  event: Evento | null;
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Reseteamos el índice cuando el evento cambia
  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [event]);

  if (!event) return null;
  
  // LA DOCTRINA PURA: Leemos directamente de la galería unificada
  const allMedia: MediaItem[] = event.gallery;
  const currentMedia = allMedia[currentMediaIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % allMedia.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="relative bg-neutral-950 border border-bodega-gold/30 rounded-lg shadow-lg w-full max-w-6xl h-[90vh] flex flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-bodega-ivory/50 hover:text-bodega-ivory z-20"><X size={24} /></button>

            {/* Media Slider (Saga Visual) */}
            <div className="relative w-2/3 h-full flex-shrink-0 bg-black overflow-hidden">
              {allMedia.length > 0 && currentMedia ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMediaIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    {currentMedia.type === 'image' ? (
                      <Image src={currentMedia.url} alt={event.title} layout="fill" className="object-contain" />
                    ) : (
                      <PunkVideoPlayer src={currentMedia.url} />
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-neutral-800 text-neutral-400">Sin multimedia para esta crónica.</div>
              )}
                 {allMedia.length > 1 && (
                   <>
                     <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"><ChevronLeft size={24} /></button>
                     <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"><ChevronRight size={24} /></button>
                   </>
                 )}
            </div>

            {/* Narrative Codex (Códice Narrativo) */}
            <div className="flex-grow p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <h3 className="font-serif text-3xl font-bold text-bodega-gold mb-2">{event.title}</h3>
              <p className="text-bodega-stone/80 text-sm mb-4">{event.date}</p>
              <p className="text-bodega-stone/80 text-lg leading-relaxed">{event.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventDetailModal;
