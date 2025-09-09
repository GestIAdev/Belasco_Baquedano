import React from 'react';
import Image from 'next/image';

const PergaminoMaestro: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="w-full h-full bg-neutral-950/50 flex flex-col relative shadow-2xl border-r border-neutral-800">
      {/* Capa 0: El Blasón como marca de agua de fondo */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-2/3 h-2/3 relative opacity-10">
          <Image src="/images/belascos_blason_transparente.png" alt="Blasón de Belasco" fill className="object-contain" />
        </div>
      </div>
      {/* Capa 1: El Contenido, que se renderizará por encima del blasón */}
      <div className="relative z-10 w-full flex flex-col p-8 flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
};

export default PergaminoMaestro;