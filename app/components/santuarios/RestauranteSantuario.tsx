'use client';

import React, { useState, useEffect } from 'react';
import { useSantuario } from '@/app/components/SantuarioContext';
import { Plato, MenuChapter, MenuSubcategory } from '@/app/types';
import { menuData } from '@/app/data/menuData';
import { vinosData } from '@/app/data/vinosData';
import DishCard from '@/app/components/sections/restaurante/DishCard';
import PlatoDetalle from '@/app/components/sections/restaurante/PlatoDetalle';
import MenuCard from '@/app/components/sections/restaurante/MenuCard';
import MenuImageViewer from '@/app/components/sections/restaurante/MenuImageViewer';
import MobileItemViewer from '@/app/components/sections/restaurante/MobileItemViewer';
import MobilePergaminoOverlay from '@/app/components/sections/restaurante/MobilePergaminoOverlay'; // New import

// Definimos los capítulos de nuestro teatro
type CapituloId = MenuChapter['id'];

const RestauranteSantuario = () => {
  const [capituloActivo, setCapituloActivo] = useState<CapituloId>('a-la-carta');
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(null);
  const [platoSeleccionado, setPlatoSeleccionado] = useState<Plato | null>(null);
  const [menuSeleccionado, setMenuSeleccionado] = useState<Plato | null>(null);
  const [pergaminoOpen, setPergaminoOpen] = useState(false);
  const [mobileViewerItem, setMobileViewerItem] = useState<Plato | null>(null);
  const [mobileViewerMode, setMobileViewerMode] = useState<'default' | 'menu'>('default');

  const { setInModal } = useSantuario();

  // EFECTO SOBERANO: La única fuente de verdad para el estado modal.
  useEffect(() => {
    setInModal(pergaminoOpen || !!mobileViewerItem);
  }, [pergaminoOpen, mobileViewerItem, setInModal]);

  // Find the active chapter data
  const activeChapter = menuData.find(chapter => chapter.id === capituloActivo);

  // Determine what to display in the list area
  let contentToDisplay: Plato[] | MenuSubcategory[] | MenuChapter[] = [];
  if (activeChapter) {
    if (subcategoriaActiva) {
      const activeSubcategory = activeChapter.subcategorias?.find(sub => sub.id === subcategoriaActiva);
      if (activeSubcategory) {
        contentToDisplay = activeSubcategory.platos;
      }
    } else if (activeChapter.subcategorias) {
      contentToDisplay = activeChapter.subcategorias;
    } else if (activeChapter.platos) {
      contentToDisplay = activeChapter.platos;
    }
  }

  return (
  <section className="w-full h-[calc(100vh-5rem)] flex flex-col lg:flex-row overflow-hidden bg-black text-white">
      {/* Mobile hero entry: full-height, dos bloques apilados (arriba/abajo) */}
      <div className="w-full lg:hidden h-[calc(100vh-5rem)] relative overflow-hidden flex flex-col">
        {/* Superior: imagen principal + contenido (flex-1) */}
        <div
          className="w-full flex-1 min-h-0 relative bg-cover bg-center"
          style={{ backgroundImage: "url('/images/restaurante-terraza.webp')" }}
        >
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
            <h2 className="text-3xl font-serif text-bodega-gold mb-2 leading-tight max-w-[90%]">Explore nuestra propuesta gastronómica</h2>
            <p className="text-bodega-stone/70 mb-4 max-w-[85%]">Seleccione un plato del libreto para ver sus detalles.</p>
            <button type="button" aria-label="Abrir carta" onClick={(e) => { e.stopPropagation(); setPergaminoOpen(true); }} className="relative z-20 pointer-events-auto bg-bodega-gold text-bodega-dark px-6 py-3 rounded-full text-lg cursor-pointer">Versión móvil</button>
          </div>
        </div>

        {/* Inferior: imagen decorativa (flex-1) */}
        <div
          className="w-full flex-1 min-h-0 relative bg-cover bg-center"
          style={{ backgroundImage: "url('/images/restaurante-interior.webp')" }}
        >
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>
      </div>

  <div className="hidden lg:flex w-full h-full overflow-hidden">
      {/* El Pergamino (El Libreto) - 40% (hidden on mobile) */}
      <div
        className="lg:flex lg:w-2/5 bg-neutral-950/50 p-8 border-r border-neutral-800 overflow-x-hidden relative flex-col"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/belascos_blason_transparente.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            opacity: 0.09,
            zIndex: 0,
          }}
        ></div>
        <h1 className="text-3xl lg:text-4xl font-bold text-bodega-gold text-center pt-6 pb-4">La Carta Viva</h1>

        <div className="flex justify-around border-b border-neutral-700 mb-8 relative z-10 shrink-0">
          {menuData.map(chapter => (
            <button
              key={chapter.id}
              onClick={() => {
                setCapituloActivo(chapter.id);
                setSubcategoriaActiva(null);
                setPlatoSeleccionado(null);
                setMenuSeleccionado(null);
              }}
              className={`px-4 py-3 -mb-px text-lg transition-colors duration-300 ease-in-out focus:outline-none
                ${capituloActivo === chapter.id
                  ? 'border-b-2 border-bodega-gold text-bodega-gold font-semibold'
                  : 'border-b-2 border-transparent text-neutral-400 hover:text-bodega-gold'
                }`}
            >
              {chapter.nombre}
            </button>
          ))}
        </div>

        <div
          className="overflow-y-auto flex-1 min-h-0 [&::-webkit-scrollbar]:hidden relative z-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
          }}
        >
          {contentToDisplay.length > 0 ? (
            <div>
              {subcategoriaActiva && (
                <button
                  onClick={() => setSubcategoriaActiva(null)}
                  className="mb-4 px-4 py-2 bg-neutral-800 rounded-md hover:bg-neutral-700 transition-colors"
                >
                  &larr; Volver a {activeChapter?.nombre}
                </button>
              )}

              {contentToDisplay.map((item: MenuSubcategory | Plato | MenuChapter) => {
                if ('platos' in item && (item as MenuSubcategory).platos) {
                  return (
                    <div
                      key={(item as MenuSubcategory).id}
                      onClick={() => setSubcategoriaActiva((item as MenuSubcategory).id)}
                      className="p-4 border-b border-bodega-gold/20 hover:bg-bodega-ivory/10 transition-colors duration-200 cursor-pointer"
                    >
                      <h4 className="font-bold text-bodega-ivory text-xl">{item.nombre}</h4>
                    </div>
                  );
                } else {
                  if (capituloActivo === 'menus') {
                    return (
                      <MenuCard
                        key={(item as Plato).id}
                        menu={item as Plato}
                        onSelect={setMenuSeleccionado}
                      />
                    );
                  } else {
                    return (
                      <DishCard
                        key={(item as Plato).id}
                        plato={item as Plato}
                        onSelect={setPlatoSeleccionado}
                      />
                    );
                  }
                }
              })}
            </div>
          ) : (
            <div className="text-center text-neutral-400 mt-10">
              <p>No hay contenido disponible para este capítulo.</p>
            </div>
          )}
        </div>
      </div>

      {/* El Lienzo (El Escenario) - 60% (hidden on mobile) */}
      <div 
        className="hidden lg:flex lg:w-3/5 relative lg:flex-1 min-h-0 overflow-hidden box-border lg:flex-col" 
      >
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
            style={{ 
              backgroundImage: "url('/images/restaurante-terraza.webp')",
              clipPath: "polygon(0 0, 100% 0, 0% 100%, 0 100%)"
            }}
          ></div>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
            style={{ 
              backgroundImage: "url('/images/restaurante-interior.webp')",
              clipPath: "polygon(100% 0, 100% 100%, 0 100%, 100% 0)"
            }}
          ></div>
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom right, transparent 48%, rgba(0,0,0,0.5) 50%, transparent 52%)"
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 flex flex-col flex-1 items-center justify-center"> 
          {platoSeleccionado ? (
            <PlatoDetalle plato={platoSeleccionado} vinos={vinosData} />
          ) : menuSeleccionado ? (
            <MenuImageViewer imageUrl={menuSeleccionado.imageUrl} altText={menuSeleccionado.nombre} />
          ) : (
            <div className="text-center text-neutral-400 p-12"> 
              <h2 className="text-3xl font-bold mb-4">Explore nuestra propuesta gastronómica</h2>
              <p className="text-lg">Seleccione un plato del libreto para ver sus detalles.</p>
            </div>
          )}
        </div>
      </div>

  </div>
      {/* Mobile overlay for Pergamino (full-screen) */}
      {pergaminoOpen && (
        <MobilePergaminoOverlay
          isOpen={pergaminoOpen}
          onClose={() => setPergaminoOpen(false)}
          menuData={menuData}
          capituloActivo={capituloActivo}
          setCapituloActivo={setCapituloActivo}
          subcategoriaActiva={subcategoriaActiva}
          setSubcategoriaActiva={setSubcategoriaActiva}
          setPlatoSeleccionado={setPlatoSeleccionado}
          setMenuSeleccionado={setMenuSeleccionado}
          setMobileViewerItem={setMobileViewerItem}
          setMobileViewerMode={setMobileViewerMode} // Added
          activeChapter={activeChapter}
          contentToDisplay={contentToDisplay}
        />
      )}

      {/* Mobile item viewer (activates when an item is selected for mobile) */}
      {mobileViewerItem && (
        <MobileItemViewer
          item={mobileViewerItem}
          mode={mobileViewerMode}
          onClose={() => { setMobileViewerItem(null); setMobileViewerMode('default'); }}
          onViewInLienzo={(p) => {
            // Move selected item to the desktop projector (lienzo)
            setMobileViewerItem(null);
            setMobileViewerMode('default');
            setPlatoSeleccionado(p);
          }}
        />
      )}

    </section>
  );
};

export default RestauranteSantuario;