"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Aroma, aromasData } from '@/app/data/aromasData';
import PergaminoMaestro from '@/app/components/ui/PergaminoMaestro';
import AromaBubble from '@/app/components/sections/aromas/AromaBubble';
import AromaDetailModal from '@/app/components/sections/aromas/AromaDetailModal';

const AromasSantuario: React.FC = () => {
  const [selectedAroma, setSelectedAroma] = useState<Aroma | null>(null);

  const handleAromaClick = (aroma: Aroma) => {
    setSelectedAroma(aroma);
  };

  const handleCloseModal = () => {
    setSelectedAroma(null);
  };

  return (
    <div className="w-full h-full">
      {/* SECCIÓN RAÍZ con la Doctrina del Soberano Iluminado */}
      <section className="w-full h-[calc(100vh-5rem)] flex flex-col lg:flex-row overflow-hidden">
        
        {/* === El Pergamino (1/3 en Desktop, 1/2 en Móvil) === */}
        {/* ESTE CONTENEDOR ES AHORA UN FLEX CONTAINER DISCIPLINADO */}
        <div className="w-full lg:w-1/3 h-1/2 lg:h-full flex-shrink-0 flex flex-col min-h-0">
          <PergaminoMaestro>
              <h1 className="text-3xl lg:text-4xl font-bold text-bodega-gold text-center pt-6 pb-4">El Pergamino del Saber</h1>
              
              <div className="flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden pr-4 text-sm lg:text-base">
                <div className="space-y-4 text-bodega-stone/80 leading-relaxed">
                  <h2 className="text-xl lg:text-2xl font-bold text-bodega-gold">Un Viaje al Corazón del Vino</h2>
                  <p>
                    Nuestra Sala de Aromas no es un museo; es un <strong>oráculo</strong>. Un santuario diseñado para decodificar el lenguaje secreto que cada botella de Belasco susurra.
                  </p>
                  <p>
                    Al aprender a identificar estos &quot;hilos de Ariadna&quot;, no solo degustas el vino: lo <strong>comprendes</strong>. Te conviertes en un iniciado, un guardián de su historia. 
                  </p>
                  <div className="border-t border-bodega-gold/10 my-6 pt-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-bodega-gold">El Lenguaje del Vino</h2>
                      <ul className="list-disc list-inside space-y-3 pt-4">
                        <li><strong className="text-bodega-gold/90">Aromas Primarios:</strong> Provenientes de la propia uva; el ADN de la fruta, la flor y la tierra.</li>
                        <li><strong className="text-bodega-gold/90">Aromas Secundarios:</strong> Nacidos del caos controlado de la fermentación.</li>
                        <li><strong className="text-bodega-gold/90">Aromas Terciarios (Bouquet):</strong> Forjados en el silencio de la barrica.</li>
                      </ul>
                  </div>
                    <p className="pt-4 italic">
                      Explora la biblioteca en el Lienzo. Toca un aroma. Descubre su historia.
                    </p>
                </div>
              </div>
          </PergaminoMaestro>
        </div>

        {/* === El Lienzo (2/3 en Desktop, 1/2 en Móvil) === */}
        <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative flex items-center justify-center p-4 lg:p-8">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: "url('/images/santuario_background.webp')" }}
          />
          <motion.div 
            className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-5 gap-4 w-full"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {aromasData.slice(0, 15).map((aroma: Aroma) => (
              <AromaBubble key={aroma.id} aroma={aroma} onClick={() => handleAromaClick(aroma)} />
            ))}
          </motion.div>
        </div>
      </section>

      <AromaDetailModal 
        aroma={selectedAroma} 
        isOpen={!!selectedAroma} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default AromasSantuario;


