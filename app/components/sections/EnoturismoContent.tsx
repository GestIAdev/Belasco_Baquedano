"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Array de imágenes para el carrusel cinemático de Enoturismo
const images = [
  '/images/enoturismo_sala_aromas.webp',
  '/images/enoturismo_degustacion_andes.webp',
  '/images/enoturismo_restaurante_vista.webp',
];

const EnoturismoContent: React.FC = () => {
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
        <h2 className="font-serif text-3xl font-bold text-bodega-maroon mb-4 text-center">
          Un Viaje de los Sentidos
        </h2>

        {/* Contenedor del Texto - La Narrativa */}
        <div className="max-w-4xl mx-auto text-lg text-bodega-dark/90 space-y-4">
          <p>
            En Belasco de Baquedano, creemos que el vino es una experiencia que debe vivirse con cada sentido. Te invitamos a un viaje inmersivo, desde la tierra hasta la copa, en el corazón de Mendoza.
          </p>
          <div>
            <h3 className="font-bold text-bodega-maroon text-xl mb-2">La Visita Guiada</h3>
            <p>
              Recorre los pasillos de nuestra bodega y descubre los secretos de nuestra elaboración. Siente el silencio de la cava subterránea y aprende cómo transformamos la uva Malbec en un tesoro líquido.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-bodega-maroon text-xl mb-2">La Sala de los Aromas</h3>
            <p>
              Adéntrate en la única Sala de Aromas de Argentina. Un santuario con 46 aromas distintos que te enseñará a identificar las notas más sutiles del vino, desde la vainilla y el cuero hasta los frutos rojos y las especias. Una experiencia inolvidable que cambiará tu forma de degustar.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-bodega-maroon text-xl mb-2">Nuestras Degustaciones</h3>
            <p>
              Culmina tu visita con una degustación guiada por nuestros expertos. Elige entre nuestra <strong>Degustación Clásica</strong> (3 vinos) o la <strong>Experiencia Premium</strong> (5 de nuestros mejores Malbecs), con la opción de añadir una picada de fiambres y quesos de la región.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-bodega-maroon text-xl mb-2">Eventos Exclusivos: Vive la Noche Mendocina</h3>
            <p>
              Más allá del día, la magia de Belasco de Baquedano se extiende al anochecer. Te invitamos a nuestros eventos especiales:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>Sunset entre Viñedos:</strong> Disfruta de la caída del sol sobre la Cordillera de los Andes con música en vivo, cócteles de autor y nuestros vinos premium. Una experiencia inolvidable.
              </li>
              <li>
                <strong>Cenas Maridaje Estrelladas:</strong> Noches mágicas bajo el cielo mendocino, donde nuestros chefs preparan menús exclusivos armonizados con las mejores añadas de la bodega.
              </li>
              <li>
                <strong>Festivales de Vendimia:</strong> Únete a la celebración ancestral de la cosecha. Música, gastronomía y, por supuesto, nuestros vinos, en una fiesta que honra la tradición.
              </li>
            </ul>
            <p className="mt-4">
              Mantente atento a nuestro calendario para conocer las fechas de nuestros próximos eventos y reservar tu lugar en estas experiencias únicas.
            </p>
          </div>
        </div>
      </div>

      {/* === Columna Visual con Altura Fija (El Lienzo Estable) === */}
      <div ref={visualColumnRef} className="w-2/5 relative h-[600px]"> {/* <--- ALTURA FIJA AQUÍ */}
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

export default EnoturismoContent;