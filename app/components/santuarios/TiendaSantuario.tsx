"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vino } from '@/app/types';
import { vinosData } from '@/app/data/vinosData';
import { useWineFilter } from '@/app/hooks/useWineFilter';
import PergaminoMaestro from '@/app/components/ui/PergaminoMaestro';
import WineCard from '@/app/components/sections/tienda/WineCard';
import WineDetail from '@/app/components/sections/tienda/WineDetail';
import MobileWineViewer from '@/app/components/sections/tienda/MobileWineViewer';
import MobileShopOverlay from '@/app/components/sections/tienda/MobileShopOverlay';
import TiendaFilters from '@/app/components/sections/tienda/TiendaFilters';

const TiendaSantuario: React.FC = () => {
  const [selectedVino, setSelectedVino] = useState<Vino | null>(null);
  const [mobileOpenVino, setMobileOpenVino] = useState<Vino | null>(null);
  const [activeTab, setActiveTab] = useState('Tipo');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
    filteredVinos, currency,
    priceBounds, vintageBounds,
    selectedTipos, selectedVarietals, selectedMaridajes, priceRange, vintageRange,
    handleToggle, setPriceRange, setVintageRange, setCurrency,
    setSelectedTipos, setSelectedVarietals, setSelectedMaridajes,
  } = useWineFilter(vinosData);

  return (
  <section className="w-full h-[calc(100vh-5rem)] flex flex-col lg:flex-row overflow-hidden bg-black text-white">
      <div className="flex w-full h-full min-h-0">
      {/* Mobile CTA: show only on small screens */}
      <div className="w-full lg:hidden relative h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Background video (same as desktop) */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/wine-pour.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-serif text-bodega-gold mb-2">Explorar la Bodega</h2>
          <p className="text-bodega-stone/70 mb-4">Filtra y descubre nuestra colección desde tu dispositivo.</p>
          {/* Explicit handler + higher z to ensure clicks register above any overlays */}
          <button onClick={() => { setMobileFiltersOpen(true); }} className="relative z-50 bg-bodega-gold text-bodega-dark px-6 py-3 rounded-full text-lg">Filtrar Catálogo</button>
        </div>
      </div>

      <div className="w-1/2 flex-shrink-0 min-h-0 box-border hidden lg:block">
        <PergaminoMaestro>
          


            <TiendaFilters
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedTipos={selectedTipos}
              selectedVarietals={selectedVarietals}
              selectedMaridajes={selectedMaridajes}
              handleToggle={handleToggle}
              setSelectedTipos={setSelectedTipos}
              setSelectedVarietals={setSelectedVarietals}
              setSelectedMaridajes={setSelectedMaridajes}
              priceBounds={priceBounds}
              vintageBounds={vintageBounds}
              priceRange={priceRange}
              vintageRange={vintageRange}
              setPriceRange={setPriceRange}
              setVintageRange={setVintageRange}
              setCurrency={setCurrency}
              currency={currency}
              filteredCount={filteredVinos.length}
            />

            <div className="mb-2 shrink-0 text-center text-bodega-stone/50 text-xs">{filteredVinos.length} vinos encontrados</div>
            <div className="flex items-center justify-between mb-2">
              <div />
              <button onClick={() => setMobileFiltersOpen(true)} className="sm:hidden bg-bodega-gold/90 text-bodega-dark px-3 py-1 rounded-full">Filtros</button>
            </div>

            <motion.div className="grid grid-cols-4 gap-4 overflow-y-auto flex-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
              {filteredVinos.map(vino => <WineCard key={vino.id} vino={vino} onSelect={(v) => {
                if (typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches) {
                  setMobileOpenVino(v);
                } else {
                  setSelectedVino(v);
                }
              }} currency={currency} onOpenMobile={(v) => setMobileOpenVino(v)} />)}
            </motion.div>
        </PergaminoMaestro>
  </div>
  <div className="w-1/2 relative flex-1 min-h-0 box-border hidden lg:block">
        <div className="absolute inset-0 z-0"><video autoPlay loop muted playsInline className="w-full h-full object-cover"><source src="/videos/wine-pour.mp4" type="video/mp4" /></video><div className="absolute inset-0 bg-black/60" /></div>
  <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-8 text-center text-white/80"> 
          <AnimatePresence>{!selectedVino && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><h2 className="text-4xl font-serif text-bodega-gold/80">Nuestra Colección</h2><p className="mt-4 text-bodega-stone">Seleccione un vino para descubrir su historia.</p></motion.div>}</AnimatePresence>
        </div>
        <AnimatePresence>
          {selectedVino && <motion.div className="absolute inset-0 z-20 flex items-center justify-center p-8 md:p-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedVino(null)} /><motion.div className="relative w-full h-full max-w-md max-h-[90vh] bg-bodega-dark/60 backdrop-blur-xl rounded-2xl border border-bodega-gold/30 shadow-2xl shadow-black/50 overflow-hidden"><WineDetail vino={selectedVino} onClose={() => setSelectedVino(null)} currency={currency} /></motion.div></motion.div>}
        </AnimatePresence>
    {/* TEMP DEBUG: show when overlay state is open (remove after verifying) */}
    {mobileFiltersOpen && <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] bg-bodega-gold text-bodega-dark px-3 py-1 rounded">Filtros abiertos</div>}
  {/* Mobile wine viewer (full-screen drawer) - removed from inside hidden lg block so it can show on mobile */}
      </div>
      </div>
      {/* Mobile full-screen overlay (render outside hidden/lg block so mobile can see it) */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <MobileShopOverlay
            vinos={filteredVinos}
            currency={currency}
            selectedTipos={selectedTipos}
            selectedVarietals={selectedVarietals}
            selectedMaridajes={selectedMaridajes}
            handleToggle={handleToggle}
            setSelectedTipos={setSelectedTipos}
            setSelectedVarietals={setSelectedVarietals}
            setSelectedMaridajes={setSelectedMaridajes}
            priceBounds={priceBounds}
            vintageBounds={vintageBounds}
            priceRange={priceRange}
            vintageRange={vintageRange}
            setPriceRange={setPriceRange}
            setVintageRange={setVintageRange}
            onClose={() => setMobileFiltersOpen(false)}
            onSelectMobile={(v) => { setMobileOpenVino(v); }}
          />
        )}
      </AnimatePresence>

      {/* Mobile wine viewer (full-screen drawer) rendered globally so it is visible on mobile */}
      <AnimatePresence>
        {mobileOpenVino && <MobileWineViewer vino={mobileOpenVino} onClose={() => setMobileOpenVino(null)} currency={currency} />}
      </AnimatePresence>
    </section>
  );
};
export default TiendaSantuario;