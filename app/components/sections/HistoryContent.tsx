"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Array de imágenes para el tríptico cinemático
const images = [
  '/images/vineyards_andes_sunrise.webp',
  '/images/vintner_hands_grapes.webp',
  '/images/winery_barrels_cava.webp',
];

const HistoryContent: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const visualColumnRef = useRef<HTMLDivElement>(null);
  const [textColumnHeight, setTextColumnHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    // El hechizo ahora solo necesita correr una vez para medir el lienzo estable
    if (visualColumnRef.current) {
      setTextColumnHeight(visualColumnRef.current.offsetHeight);
    }
  }, []); // Array de dependencias vacío para que se ejecute solo al montar

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia de imagen cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row items-start gap-x-8 h-full max-h-[calc(90vh-80px)] font-sans text-bodega-dark">

      {/* === Columna de Texto con Altura Sincronizada y Estable === */}
      <div
        style={{ height: textColumnHeight }} // Usamos 'height' en lugar de 'maxHeight' para un control total
        className="w-3/5 p-4 overflow-y-auto [mask-image:linear-gradient(to_bottom,black_90%,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Título Principal */}
        <h2 className="font-serif text-3xl font-bold text-bodega-dark mb-4 text-center">
          El Alma de Navarra en el Corazón de Mendoza
        </h2>

        {/* Contenedor del Texto - La Narrativa */}
        <div className="max-w-4xl mx-auto text-lg text-bodega-dark/90 space-y-4">
          <p>
            Todo comenzó en 1580, en el Reino de Navarra, donde la familia Belasco ha perfeccionado el arte de la viticultura durante más de ocho siglos. Pero fue en 2003 cuando un sueño audaz nos trajo a Mendoza, Argentina. Aquí, en el corazón de la tierra del Malbec, decidimos reinterpretar nuestro legado. Con la sabiduría de nuestros ancestros y la audacia de la tierra de los Andes, hemos forjado una nueva historia, una que honra el pasado mientras mira al futuro.
          </p>
          <p className="font-bold text-bodega-dark">
            Nuestra filosofía es simple: el vino se hace en el viñedo. Cada botella es un testamento del terroir, un mapa líquido del sol, la altitud y la tierra que nutre nuestras vides. Te invitamos a experimentar no solo un vino, sino una historia.
          </p>
        </div>
      </div>

      {/* === Columna Visual con Altura Fija (El Lienzo Estable) === */}
      <div ref={visualColumnRef} className="w-2/5 relative h-[500px]"> {/* <--- ALTURA FIJA AQUÍ */}
        <div className="w-full h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              className="w-full h-full object-cover rounded-lg shadow-lg" // <-- LA DOCTRINA HA CAMBIADO
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HistoryContent;