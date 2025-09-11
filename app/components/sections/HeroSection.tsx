import React from 'react';
import { motion } from 'framer-motion';

// La fuente se mantiene, es un arma válida.
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-dancing-script',
});

const HeroSection: React.FC = () => {
  return (
    // El Santuario Hero. Una sola alma, una sola estructura.
    // La Doctrina del Soberano Iluminado (h-[calc(100vh-5rem)]) se mantiene.
    <section className={`relative w-full h-[calc(100vh-5rem)] overflow-hidden ${dancingScript.variable}`}>
      
      {/* 1. EL FONDO UNIFICADO (NUESTRA VERDAD) */}
      {/* Este div ahora vive en todas las pantallas. No más 'hidden' ni 'lg:hidden'. */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-vineyard.webp')" }}
        aria-hidden
      >
        {/* El velo oscuro para asegurar contraste, también unificado. */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 2. EL CONTENIDO (NUESTRA VOZ) */}
      {/* Flota sobre el fondo unificado. Se adapta, no se reemplaza. */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-4">
        
        {/* Título: Adapta su tamaño, pero es el mismo elemento. */}
        <motion.h1
          className="font-serif-elegant text-4xl sm:text-6xl lg:text-8xl font-bold text-bodega-gold"
          style={{ textShadow: '0px 3px 12px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Belasco de Baquedano
        </motion.h1>

        {/* Lema: Adapta su tamaño y margen, pero es el mismo elemento. */}
        <motion.p
          className="mt-4 max-w-lg text-base lg:text-xl text-bodega-ivory/90"
          style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.7)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Donde el terroir de Mendoza se convierte en arte.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
