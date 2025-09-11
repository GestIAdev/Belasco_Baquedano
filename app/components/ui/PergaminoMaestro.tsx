// app/components/ui/PergaminoMaestro.tsx
import React from 'react';
import Image from 'next/image';

const PergaminoMaestro: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    // EL TEMPLO: Ahora es un contenedor puro. Sin padding, sin flex.
  <div className="w-full h-full bg-neutral-950/50 relative shadow-2xl border-r border-neutral-800 overflow-hidden box-border min-h-0 flex flex-col">
      {/* Capa 0: El Blasón. Inalterado. */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-2/3 h-2/3 relative opacity-10">
          <Image src="/images/belascos_blason_transparente.png" alt="Blasón de Belasco" fill className="object-contain" unoptimized />
        </div>
      </div>
      
      {/* Capa 1: El contenido se renderiza directamente aquí. */}
      {children}
    </div>
  );
};

export default PergaminoMaestro;