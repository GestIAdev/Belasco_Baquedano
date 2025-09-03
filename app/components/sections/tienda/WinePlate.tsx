// en app/components/sections/tienda/WinePlate.tsx
"use client";

import { Vino } from "@/app/components/sections/aromas/types";
import Image from "next/image";
import { motion } from "framer-motion";

interface WinePlateProps {
  vino: Vino;
}

const WinePlate: React.FC<WinePlateProps> = ({ vino }) => {
  return (
    <motion.div 
      className="relative group cursor-pointer max-w-xs mx-auto"
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
    >
      {/* La Esfera de Cristal */}
      <div className="relative aspect-square w-full rounded-full overflow-hidden z-10 
                     bg-bodega-dark/60 backdrop-blur-sm border border-bodega-gold/30
                     shadow-lg">
        <Image 
          src={vino.imagen_url}
          alt={`Botella de ${vino.nombre}`}
          fill
          style={{ objectFit: 'contain' }}
          className="p-4 drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* La Placa Informativa */}
      <div className="relative w-[90%] mx-auto p-4 pt-12 rounded-b-lg -mt-10 
                     bg-bodega-dark/70 backdrop-blur-sm 
                     border-x border-b border-t border-bodega-gold/30
                     text-center transition-all duration-300 group-hover:bg-bodega-dark/50">
        
        <h3 className="font-serif text-xl font-bold text-bodega-ivory whitespace-normal">
          {vino.nombre}
        </h3>
        <p className="text-bodega-stone text-sm mb-2">
          Añada {vino.añada}
        </p>
        <span className="font-sans text-lg font-bold text-bodega-gold">
          ${vino.precio}
        </span>
      </div>
    </motion.div>
  );
};

export default WinePlate;