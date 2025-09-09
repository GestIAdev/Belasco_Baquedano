"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
// Importa algunos íconos para darle un toque visual
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactoContent: React.FC = () => {
  // --- Hechizo de Sincronización (adaptado) ---
  const visualColumnRef = useRef<HTMLDivElement>(null);
  const [textColumnHeight, setTextColumnHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (visualColumnRef.current) {
      setTextColumnHeight(visualColumnRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="flex flex-row items-start gap-x-8 h-full">

      {/* === Columna de Narrativa y Formulario (60%) === */}
      <div 
        style={{ height: textColumnHeight }}
        className="w-3/5 p-4 overflow-y-auto [mask-image:linear-gradient(to_bottom,black_90%,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <h2 className="font-serif text-3xl font-bold text-bodega-maroon mb-6">
          Póngase en Contacto
        </h2>
        
        {/* Información de Contacto */}
        <div className="space-y-4 text-lg text-bodega-dark/90 mb-8">
          <div className="flex items-center gap-x-3">
            <MapPin size={20} className="text-bodega-maroon" />
            <span>Cobos 8260, Agrelo, Luján de Cuyo, Mendoza</span>
          </div>
          <div className="flex items-center gap-x-3">
            <Phone size={20} className="text-bodega-maroon" />
            <span>+54 9 261 302 3491 (Reservas por WhatsApp)</span>
          </div>
          <div className="flex items-center gap-x-3">
            <Mail size={20} className="text-bodega-maroon" />
            <span>turismo@grupolanavarra.com</span>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <form className="space-y-4">
          <input type="text" placeholder="Nombre" className="w-full p-2 bg-bodega-ivory/50 border-b-2 border-bodega-gold focus:outline-none focus:border-bodega-maroon transition-colors" />
          <input type="email" placeholder="Email" className="w-full p-2 bg-bodega-ivory/50 border-b-2 border-bodega-gold focus:outline-none focus:border-bodega-maroon transition-colors" />
          <input type="text" placeholder="Asunto" className="w-full p-2 bg-bodega-ivory/50 border-b-2 border-bodega-gold focus:outline-none focus:border-bodega-maroon transition-colors" />
          <textarea placeholder="Mensaje" rows={4} className="w-full p-2 bg-bodega-ivory/50 border-b-2 border-bodega-gold focus:outline-none focus:border-bodega-maroon transition-colors"></textarea>
          <button type="submit" className="px-6 py-2 bg-bodega-maroon text-bodega-ivory font-bold rounded-md hover:bg-bodega-dark transition-colors">
            Enviar Mensaje
          </button>
        </form>
      </div>

      {/* === Columna Visual (40%) === */}
      <div ref={visualColumnRef} className="w-2/5 relative h-[600px]"> {/* Altura ajustada para el mapa */}
        <div className="w-full h-full flex flex-col gap-y-4">
          {/* Imagen Superior */}
          <div className="h-1/2 w-full">
            <div className="w-full h-full relative rounded-lg shadow-lg overflow-hidden">
              <Image src="/images/contacto.webp" alt="Entrada de la Bodega Belasco de Baquedano" fill className="object-cover" />
            </div>
          </div>
          {/* Mapa de Google */}
          <div className="h-1/2 w-full">
            {/* --- Placeholder para el Mapa de Google --- */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.961014282301!2d-68.8951113848119!3d-33.00519998090501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e72a8d1b11c39%3A0x10d9c4bba648e7e!2sBodega%20Belasco%20de%20Baquedano!5e0!3m2!1ses-419!2sar!4v1693457890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoContent;