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
    <>
      <section className="flex w-full h-screen bg-black text-white pt-20 overflow-hidden">
        {/* === El Pergamino (40%) - AHORA CON ALMA === */}
        <div className="w-2/5 h-full flex-shrink-0">
          <PergaminoMaestro>
              <div className="flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden pr-4">
                <h1 className="text-4xl font-bold text-bodega-gold mb-6">El Pergamino del Saber</h1>

                {/* --- ACTO I: EL SANTUARIO SENSORIAL --- */}
                <div className="space-y-4 text-bodega-stone/80 leading-relaxed">
                  <h2 className="text-2xl font-bold text-bodega-gold">Un Viaje al Corazón del Vino</h2>
                  <p>
                    Nuestra Sala de Aromas no es un museo; es un **oráculo**. Un santuario diseñado para decodificar el lenguaje secreto que cada botella de Belasco susurra. Aquí, hemos aislado y encapsulado las 46 esencias que componen el alma de nuestros vinos, desde la violeta que florece en la altura de nuestros Malbecs hasta el cuero noble que solo el tiempo puede forjar.
                  </p>
                  <p>
                    Es un campo de entrenamiento para los sentidos, un mapa líquido que te permite viajar a través de nuestro terroir sin moverte de la sala. Al aprender a identificar estos "hilos de Ariadna", no solo degustas el vino: lo **comprendes**. Te conviertes en un iniciado, un guardián de su historia. 
                  </p>

                  <div className="border-t border-bodega-gold/10 my-6 pt-6">
                    <h2 className="text-2xl font-bold text-bodega-gold">El Lenguaje del Vino</h2>
                     <ul className="list-disc list-inside space-y-3 pt-4">
                      <li><strong className="text-bodega-gold/90">Aromas Primarios:</strong> Provenientes de la propia uva; el ADN de la fruta, la flor y la tierra.</li>
                      <li><strong className="text-bodega-gold/90">Aromas Secundarios:</strong> Nacidos del caos controlado de la fermentación; el alma de la levadura.</li>
                      <li><strong className="text-bodega-gold/90">Aromas Terciarios (Bouquet):</strong> Forjados en el silencio de la barrica y la botella; la sabiduría del tiempo.</li>
                    </ul>
                  </div>
                   <p className="pt-4 italic">
                    Explora la biblioteca en el Lienzo. Toca un aroma. Descubre su historia y en qué vinos se esconde su alma.
                  </p>
                </div>
              </div>
          </PergaminoMaestro>
        </div>

        {/* === El Lienzo (60%) === */}
        <div className="w-3/5 h-full relative flex items-center justify-center p-8">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30" 
              style={{ backgroundImage: "url('/images/santuario_background.webp')" }}
            />
            <motion.div 
              className="grid grid-cols-5 gap-6 w-full"
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
    </>
  );
};

export default AromasSantuario;
