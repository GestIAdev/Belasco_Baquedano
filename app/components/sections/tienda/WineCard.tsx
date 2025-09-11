import { Vino } from '@/app/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// El soldado ahora necesita saber qué divisa mostrar
const WineCard: React.FC<{vino: Vino, onSelect: (vino: Vino) => void, currency: 'usd' | 'ars', onOpenMobile?: (vino: Vino) => void}> = ({ vino, onSelect, currency, onOpenMobile }) => {

    // Lógica de combate para seleccionar y formatear el precio correcto
    const price = currency === 'ars' 
        ? vino.precio.ars.toLocaleString('es-AR') // Formato elegante para pesos
        : vino.precio.usd.toFixed(2); // Formato clásico para dólares

    const prefix = currency === 'usd' ? '$' : 'ARS';

    const [img, setImg] = useState(vino.imagen_url);

    return (
        <motion.div
            className="cursor-pointer group bg-transparent rounded-lg overflow-hidden flex flex-col h-full border border-transparent hover:border-bodega-gold/20 hover:bg-black/20 transition-all duration-300"
            onClick={() => onSelect(vino)}
            variants={cardVariants}
            layout
        >
            <div className="w-full aspect-[3/4] overflow-hidden p-2 relative">
                <Image 
                    src={img}
                    alt={`Botella de ${vino.nombre}`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                    onError={() => setImg('https://placehold.co/400x600/1a1a1a/a88b57?text=Vino')}
                />
            </div>
            <div className="p-3 text-center mt-auto">
                <h3 className="font-serif text-base text-bodega-gold group-hover:text-white transition-colors truncate">{vino.nombre}</h3>
                {/* El soldado ahora muestra el precio correcto */}
                <p className="text-2xl font-bold text-bodega-stone">{prefix} {price}</p>
                                {/* Botón rápido para abrir versión móvil (visible sólo en pantallas pequeñas) */}
                                {onOpenMobile && (
                                    <button onClick={(e) => { e.stopPropagation(); onOpenMobile(vino); }} className="mt-2 text-xs px-3 py-1 rounded-md bg-black/30 text-bodega-stone/80 sm:hidden">
                                        Ver (móvil)
                                    </button>
                                )}
            </div>
        </motion.div>
    );
};

export default WineCard;