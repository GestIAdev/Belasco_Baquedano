"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vino, TipoVino, MaridajeIdeal } from '@/app/types';
import RangeSlider from '@/app/components/ui/RangeSlider';
import WineCard from './WineCard';

type Props = {
  vinos: Vino[];
  currency: 'usd' | 'ars';
  selectedTipos: TipoVino[];
  selectedVarietals: string[];
  selectedMaridajes: MaridajeIdeal[];
  handleToggle: <T extends string>(setter: React.Dispatch<React.SetStateAction<T[]>>, value: T) => void;
  setSelectedTipos: React.Dispatch<React.SetStateAction<TipoVino[]>>;
  setSelectedVarietals: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedMaridajes: React.Dispatch<React.SetStateAction<MaridajeIdeal[]>>;
  priceBounds: {min:number;max:number};
  vintageBounds: {min:number;max:number};
  priceRange: {min:number;max:number};
  vintageRange: {min:number;max:number};
  setPriceRange: (r:{min:number;max:number})=>void;
  setVintageRange: (r:{min:number;max:number})=>void;
  onClose: () => void;
  onSelectMobile: (v: Vino) => void;
};

const allTipos: TipoVino[] = ["Tinto","Blanco","Rosado","Espumoso"];

const MobileShopOverlay: React.FC<Props> = ({ vinos, currency, selectedTipos, selectedVarietals, selectedMaridajes, handleToggle, setSelectedTipos, setSelectedVarietals, setSelectedMaridajes, priceBounds, vintageBounds, priceRange, vintageRange, setPriceRange, setVintageRange, onClose, onSelectMobile }) => {
  const [openSection, setOpenSection] = useState<string | null>('Tipo');

  const toggle = (s: string) => setOpenSection(prev => prev === s ? null : s);

  return (
    <AnimatePresence>
      <motion.div key="mobile-shop-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80">
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} className="absolute inset-0 top-[5rem] bg-bodega-dark/95 p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl text-bodega-gold">Explorar la Bodega</h2>
            <button onClick={onClose} className="text-bodega-gold/80 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-3">
            {/* Accordion */}
            <div className="bg-black/20 rounded-md p-2">
              <button onClick={() => toggle('Tipo')} className="w-full text-left flex items-center justify-between py-2 px-2">
                <span className="font-bold text-bodega-gold">Tipo</span>
                <span className="text-bodega-stone">{openSection === 'Tipo' ? '-' : '+'}</span>
              </button>
              {openSection === 'Tipo' && (
                <div className="pt-2 pb-3 grid grid-cols-2 gap-2">
                  {allTipos.map(t => <button key={t} onClick={() => handleToggle(setSelectedTipos, t)} className={`px-3 py-2 rounded-full border ${selectedTipos.includes(t) ? 'bg-bodega-gold text-bodega-dark' : 'bg-black/30 text-bodega-stone/80'}`}>{t}</button>)}
                </div>
              )}
            </div>

            <div className="bg-black/20 rounded-md p-2">
              <button onClick={() => toggle('Varietal')} className="w-full text-left flex items-center justify-between py-2 px-2">
                <span className="font-bold text-bodega-gold">Varietal</span>
                <span className="text-bodega-stone">{openSection === 'Varietal' ? '-' : '+'}</span>
              </button>
              {openSection === 'Varietal' && (
                <div className="pt-2 pb-3 grid grid-cols-2 gap-2">
                  {[...new Set(vinos.map(v => v.varietal))].map(v => <button key={v} onClick={() => handleToggle(setSelectedVarietals, v)} className={`px-3 py-2 rounded-full border ${selectedVarietals.includes(v) ? 'bg-bodega-gold text-bodega-dark' : 'bg-black/30 text-bodega-stone/80'}`}>{v}</button>)}
                </div>
              )}
            </div>

            <div className="bg-black/20 rounded-md p-2">
              <button onClick={() => toggle('Maridaje')} className="w-full text-left flex items-center justify-between py-2 px-2">
                <span className="font-bold text-bodega-gold">Maridaje</span>
                <span className="text-bodega-stone">{openSection === 'Maridaje' ? '-' : '+'}</span>
              </button>
              {openSection === 'Maridaje' && (
                <div className="pt-2 pb-3 grid grid-cols-2 gap-2">
                  {(['Carnes Rojas','Pescados y Mariscos','Pastas','Quesos','Postres','Comida Asiática'] as MaridajeIdeal[]).map(m => <button key={m} onClick={() => handleToggle(setSelectedMaridajes, m)} className={`px-3 py-2 rounded-full border ${selectedMaridajes.includes(m) ? 'bg-bodega-gold text-bodega-dark' : 'bg-black/30 text-bodega-stone/80'}`}>{m}</button>)}
                </div>
              )}
            </div>

            <div className="bg-black/20 rounded-md p-2">
              <button onClick={() => toggle('Precio')} className="w-full text-left flex items-center justify-between py-2 px-2">
                <span className="font-bold text-bodega-gold">Precio</span>
                <span className="text-bodega-stone">{openSection === 'Precio' ? '-' : '+'}</span>
              </button>
              {openSection === 'Precio' && <div className="pt-2 pb-3"><RangeSlider prefix={currency === 'usd' ? '$' : 'ARS '} min={priceBounds.min} max={priceBounds.max} initialMin={priceRange.min} initialMax={priceRange.max} onChange={setPriceRange} /></div>}
            </div>

            <div className="bg-black/20 rounded-md p-2">
              <button onClick={() => toggle('Añada')} className="w-full text-left flex items-center justify-between py-2 px-2">
                <span className="font-bold text-bodega-gold">Añada</span>
                <span className="text-bodega-stone">{openSection === 'Añada' ? '-' : '+'}</span>
              </button>
              {openSection === 'Añada' && <div className="pt-2 pb-3"><RangeSlider min={vintageBounds.min} max={vintageBounds.max} step={1} initialMin={vintageRange.min} initialMax={vintageRange.max} onChange={setVintageRange} /></div>}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-bold text-bodega-gold mb-2">Resultados</h4>
            <div className="grid grid-cols-2 gap-3">
              {vinos.map(v => (
                <div key={v.id}>
                  {/* Pass a clear onSelect with logging to ensure handler fires */}
                  <WineCard vino={v} onSelect={(vino) => { onSelectMobile(vino); }} currency={currency} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileShopOverlay;
