// en app/components/sections/tienda/WineDetail.tsx
"use client";

import { Vino } from "@/app/components/sections/aromas/types";
import Image from "next/image";
import { aromasData } from "@/app/components/sections/aromas/types";
import AromaBubble from "../aromas/AromaBubble";

interface WineDetailProps {
  vino: Vino;
}

const WineDetail: React.FC<WineDetailProps> = ({ vino }) => {
  const associatedAromas = aromasData.filter(aroma => vino.aromas.includes(aroma.id));

  return (
    <div className="flex flex-row items-start gap-x-8 h-full p-4">
      <div className="w-1/3 h-full">
        <div className="relative w-full aspect-[3/4]">
           <Image 
              src={vino.imagen_url}
              alt={`Botella de ${vino.nombre}`}
              fill
              style={{ objectFit: 'contain' }}
              className="drop-shadow-lg"
            />
        </div>
      </div>

      <div className="w-2/3">
        <h2 className="font-serif text-4xl font-bold text-bodega-maroon">{vino.nombre}</h2>
        <p className="text-bodega-stone text-lg mb-4">Añada {vino.añada}</p>
        <hr className="border-bodega-gold/30 my-4" />
        <div className="space-y-4 text-bodega-dark/90 leading-relaxed">
          <p><strong>Notas de Cata:</strong> {vino.notas_cata}</p>
          <p><strong>Maridaje:</strong> {vino.maridaje}</p>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold text-bodega-dark mb-3">Constelación de Aromas:</h4>
          <div className="flex flex-wrap gap-4">
            {associatedAromas.length > 0 ? (
              associatedAromas.map(aroma => (
                <div key={aroma.id} className="w-20 h-20">
                  <AromaBubble aroma={aroma} onClick={() => {}} layoutMode="detail" />
                </div>
              ))
            ) : (
              <p className="text-sm italic text-bodega-stone/70">
                Los secretos de este vino aún están por descubrir.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineDetail;