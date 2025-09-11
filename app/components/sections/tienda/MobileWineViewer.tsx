"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Vino } from '@/app/types';
import { aromasData } from '@/app/data/aromasData';

const MicroAroma: React.FC<{ aromaId: number | string }> = ({ aromaId }) => {
  const aroma = aromasData.find(a => a.id === aromaId);
  if (!aroma) return null;
  return (
    <div className="flex items-center gap-x-1.5 bg-black/30 rounded-full px-2 py-0.5 text-xs border border-bodega-gold/10">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: aroma.color }} />
      <span className="text-bodega-stone/70">{aroma.nombre}</span>
    </div>
  );
};

const MobileWineViewer: React.FC<{ vino: Vino; onClose: () => void; currency: 'usd' | 'ars' }> = ({ vino, onClose, currency }) => {
  const notasList = vino.notas_cata.split(',').map(n => n.trim());
  const price = currency === 'ars' ? vino.precio.ars.toLocaleString('es-AR', { minimumFractionDigits: 0 }) : vino.precio.usd.toFixed(2);
  const prefix = currency === 'usd' ? '$' : 'ARS';

  return (
    <AnimatePresence>
      <div className="fixed left-0 right-0 top-[5rem] bottom-0 z-50">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        </motion.div>
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} className="relative z-50 w-full h-full bg-bodega-dark/80 backdrop-blur-md p-4 overflow-auto">
          <div className="flex items-start gap-4">
            <div className="w-1/2 max-w-[180px] h-[260px] relative">
              <Image src={vino.imagen_url} alt={vino.nombre} fill className="object-contain" unoptimized />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-xl text-bodega-gold">{vino.nombre}</h3>
                  <p className="text-sm text-bodega-stone/80">{vino.tipo} • {vino.varietal} • {vino.anada}</p>
                </div>
                <button onClick={onClose} className="text-bodega-gold/80 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="mt-3 text-bodega-stone text-sm leading-relaxed">{vino.descripcion}</p>
              <div className="mt-4">
                <p className="text-2xl font-bold text-white/90">{prefix} {price}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-bodega-gold/10 pt-4">
            <h4 className="font-bold text-bodega-gold/90 mb-2 uppercase tracking-wider">Notas de Cata</h4>
            <ul className="list-disc list-inside text-bodega-stone/80 font-light space-y-1">{notasList.map((n, i) => <li key={i}>{n}</li>)}</ul>
          </div>

          <div className="mt-4">
            <h4 className="font-bold text-bodega-gold/90 mb-2 uppercase tracking-wider">Maridaje</h4>
            <ul className="list-disc list-inside text-bodega-stone/80 font-light space-y-1">{vino.maridaje.map((m, i) => <li key={i}>{m}</li>)}</ul>
          </div>

          <div className="mt-4">
            <h4 className="font-bold text-bodega-gold/90 mb-2 uppercase tracking-wider">Aromas</h4>
            <div className="flex flex-wrap gap-1.5">{vino.aromas.map((a, i) => <MicroAroma key={i} aromaId={a} />)}</div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <motion.button whileTap={{ scale: 0.95 }} className="bg-bodega-gold text-bodega-dark font-bold py-3 px-6 rounded-full w-full max-w-xs">
              Añadir a la cesta
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MobileWineViewer;
