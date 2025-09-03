// ENTRANDO EN EL SANTUARIO...
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useSantuario } from '../SantuarioContext';
import AromaBubble from '../sections/aromas/AromaBubble';
import { Aroma, aromasData } from '../sections/aromas/types';
import PergaminoSidebar from '../ui/PergaminoSidebar'; // <-- IMPORTACIÓN

// El componente que orquesta la constelación
const Constellation = () => (
  <motion.div 
    layoutId="constellation"
    className="relative w-full h-full"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
        },
      },
    }}
  >
    {aromasData.map((aroma: Aroma) => (
      <AromaBubble key={aroma.id} aroma={aroma} onClick={() => console.log(aroma.nombre)} />
    ))}
  </motion.div>
);

const AromasSantuario: React.FC = () => {
  const { setActiveSantuario } = useSantuario();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black overflow-hidden"
    >
      {/* EL COSMOS VIVIENTE: Fondo con animación sutil */}
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/santuario_background.webp')" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* --- HECHIZO DEL POLVO DE ESTRELLAS --- */}
      <div className="stardust-bg" />
      
      {/* Barra Lateral del Pergamino (AHORA UN COMPONENTE REUTILIZABLE) */}
      <PergaminoSidebar className="bg-bodega-dark/40">
        <h2 className="font-serif text-4xl font-bold text-bodega-ivory mb-4">
          El Pergamino del Saber
        </h2>
        <p className="text-lg text-bodega-stone/90 mb-6 leading-relaxed">
          Los aromas del vino son su alma, un lenguaje que nos habla de su origen, su variedad y su crianza. Cada botella es un testamento del terroir, un mapa líquido forjado por el sol, la altitud y la tierra.
        </p>
        
        <hr className="border-bodega-gold/30 my-6" />

        <div className="space-y-4 text-lg text-bodega-stone/90 leading-relaxed">
          <p>Se agrupan en tres grandes familias:</p>
          <ul className="list-disc list-inside space-y-3 mt-4">
            <li>
              <strong className="text-bodega-gold">Aromas Primarios:</strong> Provenientes de la propia uva, son los aromas frutales, florales y vegetales.
            </li>
            <li>
              <strong className="text-bodega-stone">Aromas Secundarios:</strong> Nacidos durante la fermentación, como la levadura, el pan o la mantequilla.
            </li>
            <li>
              <strong className="text-bodega-stone">Aromas Terciarios (Bouquet):</strong> Desarrollados durante la crianza en barrica y botella, como el cuero, el tabaco, la vainilla y las especias.
            </li>
          </ul>
          <p className="mt-6 italic">
            Explora la constelación para descubrir los matices que componen nuestros vinos.
          </p>
        </div>
      </PergaminoSidebar>

      {/* El Lienzo de la Constelación (Espacio Central) */}
      <div className="absolute top-0 right-0 h-full w-3/4">
        <Constellation />
      </div>

      {/* Botón de Cierre */}
      <button 
        onClick={() => setActiveSantuario(null)} 
        className="absolute top-6 right-6 z-20 text-bodega-ivory/50 hover:text-bodega-ivory transition-colors"
      >
        <X size={32} />
      </button>
    </motion.div>
  );
};
export default AromasSantuario;