"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { vinosData } from '@/app/data/vinosData';
import { TipoVino, MaridajeIdeal } from '@/app/types';
import RangeSlider from '@/app/components/ui/RangeSlider';

type Props = {
  activeTab: string;
  setActiveTab: (s: string) => void;
  selectedTipos: TipoVino[];
  selectedVarietals: string[];
  selectedMaridajes: MaridajeIdeal[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleToggle: (setter: React.Dispatch<React.SetStateAction<any[]>>, value: any) => void;
  setSelectedTipos: React.Dispatch<React.SetStateAction<TipoVino[]>>;
  setSelectedVarietals: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedMaridajes: React.Dispatch<React.SetStateAction<MaridajeIdeal[]>>;
  priceBounds: {min:number;max:number};
  vintageBounds: {min:number;max:number};
  priceRange: {min:number;max:number};
  vintageRange: {min:number;max:number};
  setPriceRange: (r:{min:number;max:number})=>void;
  setVintageRange: (r:{min:number;max:number})=>void;
  setCurrency: (c:'usd'|'ars') => void;
  currency: 'usd'|'ars';
  filteredCount: number;
};

const allTipos = ["Tinto", "Blanco", "Rosado", "Espumoso"] as const;
const allVarietals = [...new Set(vinosData.map(v => v.varietal))];
const allMaridajes = ["Carnes Rojas", "Pescados y Mariscos", "Pastas", "Quesos", "Postres", "Comida Asiática"] as const;

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

const TiendaFilters: React.FC<Props> = (props) => {
  const { activeTab, setActiveTab, selectedTipos, selectedVarietals, selectedMaridajes, handleToggle, setSelectedTipos, setSelectedVarietals, setSelectedMaridajes, priceBounds, vintageBounds, priceRange, vintageRange, setPriceRange, setVintageRange, setCurrency, currency, filteredCount } = props;

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold text-bodega-gold text-center pt-6 pb-4">La Bodega</h1>
      <div className="flex justify-between items-center border-b border-bodega-gold/10 mb-4 shrink-0">
        <div className="flex">
          {['Tipo','Varietal','Maridaje','Precio','Añada'].map(tab => (
            <FilterTab key={tab} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
          ))}
        </div>
        <div className="flex items-center space-x-1 text-xs p-0.5 rounded-md border border-bodega-gold/10 bg-black/20">
          <button onClick={() => setCurrency('usd')} className={`px-2 py-0.5 rounded ${currency === 'usd' ? 'bg-bodega-gold/80 text-black' : 'text-bodega-stone/50'}`}>USD</button>
          <button onClick={() => setCurrency('ars')} className={`px-2 py-0.5 rounded ${currency === 'ars' ? 'bg-bodega-gold/80 text-black' : 'text-bodega-stone/50'}`}>ARS</button>
        </div>
      </div>

      <div className="mb-4 shrink-0 min-h-[90px] flex flex-col justify-center">
        <div>
          {activeTab === 'Tipo' && <div className="flex flex-wrap gap-2 pt-2">{allTipos.map(t => <TacticalButton key={t} label={t} isActive={selectedTipos.includes(t)} onClick={() => handleToggle(setSelectedTipos, t)} />)}</div>}
          {activeTab === 'Varietal' && <div className="flex flex-wrap gap-2 pt-2">{allVarietals.map(v => <TacticalButton key={v} label={v} isActive={selectedVarietals.includes(v)} onClick={() => handleToggle(setSelectedVarietals, v)} />)}</div>}
          {activeTab === 'Maridaje' && <div className="flex flex-wrap gap-2 pt-2">{allMaridajes.map(m => <TacticalButton key={m} label={m} isActive={selectedMaridajes.includes(m)} onClick={() => handleToggle(setSelectedMaridajes, m)} />)}</div>}
          {activeTab === 'Precio' && <div className="pt-6 px-2"><RangeSlider prefix={currency === 'usd' ? '$' : 'ARS '} min={priceBounds.min} max={priceBounds.max} initialMin={priceRange.min} initialMax={priceRange.max} onChange={setPriceRange} /></div>}
          {activeTab === 'Añada' && <div className="pt-6 px-2"><RangeSlider min={vintageBounds.min} max={vintageBounds.max} step={1} initialMin={vintageRange.min} initialMax={vintageRange.max} onChange={setVintageRange} /></div>}
        </div>
      </div>

      <div className="mb-2 shrink-0 text-center text-bodega-stone/50 text-xs">{filteredCount} vinos encontrados</div>
    </div>
  );
};

export default TiendaFilters;
