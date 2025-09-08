"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vino, TipoVino, MaridajeIdeal } from '@/app/types';
import { vinosData } from '@/app/data/vinosData';
import { useWineFilter, Currency } from '@/app/hooks/useWineFilter';
import PergaminoMaestro from '@/app/components/ui/PergaminoMaestro';
import WineCard from '@/app/components/sections/tienda/WineCard';
import WineDetail from '@/app/components/sections/tienda/WineDetail';
import RangeSlider from '@/app/components/ui/RangeSlider';

// --- Componentes Tácticos Locales ---
const allTipos: TipoVino[] = ["Tinto", "Blanco", "Rosado", "Espumoso"];
const allVarietals = [...new Set(vinosData.map(v => v.varietal))];
const allMaridajes: MaridajeIdeal[] = ["Carnes Rojas", "Pescados y Mariscos", "Pastas", "Quesos", "Postres", "Comida Asiática"];
const filterTabs = ['Tipo', 'Varietal', 'Maridaje', 'Precio', 'Añada'];

const FilterTab: React.FC<{label: string; isActive: boolean; onClick: () => void;}> = ({ label, isActive, onClick }) => (
  <button onClick={onClick} className="relative px-4 py-3 text-lg transition-colors duration-200 focus:outline-none">
    <span className={isActive ? 'text-bodega-gold' : 'text-bodega-stone/60 hover:text-bodega-gold'}>{label}</span>
    {isActive && (<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bodega-gold" layoutId="active-filter-underline" />)}
  </button>
);

const TacticalButton: React.FC<{label: string; isActive: boolean; onClick: () => void;}> = ({ label, isActive, onClick }) => (
  <button onClick={onClick} className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${isActive ? 'bg-bodega-gold text-bodega-dark border-bodega-gold' : 'bg-black/30 text-bodega-stone/70 border-bodega-gold/20 hover:border-bodega-gold/70 hover:text-bodega-stone'}`}>
    {label}
  </button>
);

const TiendaSantuario: React.FC = () => {
  const [selectedVino, setSelectedVino] = useState<Vino | null>(null);
  const [activeTab, setActiveTab] = useState('Tipo');

  const {
    filteredVinos, currency,
    priceBounds, vintageBounds,
    selectedTipos, selectedVarietals, selectedMaridajes, priceRange, vintageRange,
    handleToggle, setPriceRange, setVintageRange, setCurrency,
    setSelectedTipos, setSelectedVarietals, setSelectedMaridajes,
  } = useWineFilter(vinosData);

  return (
    <section className="flex w-full h-screen bg-black text-white pt-20 overflow-hidden">
      <div className="w-1/2 h-full flex-shrink-0">
        <PergaminoMaestro>
            <h1 className="text-3xl font-bold text-bodega-gold mb-4 shrink-0">La Bodega</h1>

            {/* --- PUESTO DE MANDO SOBERANO --- */}
            <div className="flex justify-between items-center border-b border-bodega-gold/10 mb-4 shrink-0">
              {/* Comandos de Filtro */}
              <div className="flex">
                {filterTabs.map(tab => (
                  <FilterTab key={tab} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
                ))}
              </div>
              {/* Comando Rebelde (Selector de Divisa) */}
              <div className="flex items-center space-x-1 text-xs p-0.5 rounded-md border border-bodega-gold/10 bg-black/20">
                <button onClick={() => setCurrency('usd')} className={`px-2 py-0.5 rounded ${currency === 'usd' ? 'bg-bodega-gold/80 text-black' : 'text-bodega-stone/50'}`}>USD</button>
                <button onClick={() => setCurrency('ars')} className={`px-2 py-0.5 rounded ${currency === 'ars' ? 'bg-bodega-gold/80 text-black' : 'text-bodega-stone/50'}`}>ARS</button>
              </div>
            </div>

            <div className="mb-4 shrink-0 min-h-[90px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {activeTab === 'Tipo' && <div className="flex flex-wrap gap-2 pt-2">{allTipos.map(t => <TacticalButton key={t} label={t} isActive={selectedTipos.includes(t)} onClick={() => handleToggle(setSelectedTipos, t)} />)}</div>}
                  {activeTab === 'Varietal' && <div className="flex flex-wrap gap-2 pt-2">{allVarietals.map(v => <TacticalButton key={v} label={v} isActive={selectedVarietals.includes(v)} onClick={() => handleToggle(setSelectedVarietals, v)} />)}</div>}
                  {activeTab === 'Maridaje' && <div className="flex flex-wrap gap-2 pt-2">{allMaridajes.map(m => <TacticalButton key={m} label={m} isActive={selectedMaridajes.includes(m)} onClick={() => handleToggle(setSelectedMaridajes, m)} />)}</div>}
                  {activeTab === 'Precio' && <div className="pt-6 px-2"><RangeSlider prefix={currency === 'usd' ? '$' : 'ARS '} min={priceBounds.min} max={priceBounds.max} initialMin={priceRange.min} initialMax={priceRange.max} onChange={setPriceRange} /></div>}
                  {activeTab === 'Añada' && <div className="pt-6 px-2"><RangeSlider min={vintageBounds.min} max={vintageBounds.max} step={1} initialMin={vintageRange.min} initialMax={vintageRange.max} onChange={setVintageRange} /></div>}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mb-2 shrink-0 text-center text-bodega-stone/50 text-xs">{filteredVinos.length} vinos encontrados</div>
            <motion.div className="grid grid-cols-4 gap-4 overflow-y-auto flex-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
              {filteredVinos.map(vino => <WineCard key={vino.id} vino={vino} onSelect={setSelectedVino} currency={currency} />)}
            </motion.div>
        </PergaminoMaestro>
      </div>
      <div className="w-1/2 h-full relative">
        <div className="absolute inset-0 z-0"><video autoPlay loop muted playsInline className="w-full h-full object-cover"><source src="/videos/wine-pour.mp4" type="video/mp4" /></video><div className="absolute inset-0 bg-black/60" /></div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center text-white/80"> 
          <AnimatePresence>{!selectedVino && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><h2 className="text-4xl font-serif text-bodega-gold/80">Nuestra Colección</h2><p className="mt-4 text-bodega-stone">Seleccione un vino para descubrir su historia.</p></motion.div>}</AnimatePresence>
        </div>
        <AnimatePresence>
          {selectedVino && <motion.div className="absolute inset-0 z-20 flex items-center justify-center p-8 md:p-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedVino(null)} /><motion.div className="relative w-full h-full max-w-md max-h-[90vh] bg-bodega-dark/60 backdrop-blur-xl rounded-2xl border border-bodega-gold/30 shadow-2xl shadow-black/50 overflow-hidden"><WineDetail vino={selectedVino} onClose={() => setSelectedVino(null)} currency={currency} /></motion.div></motion.div>}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default TiendaSantuario;