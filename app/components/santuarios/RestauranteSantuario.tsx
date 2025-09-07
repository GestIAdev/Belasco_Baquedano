'use client';

import React, { useState } from 'react';
import { Plato, MenuChapter, MenuSubcategory } from '@/app/types';
import { menuData } from '@/app/data/menuData';
import { vinosData } from '@/app/data/vinosData';
import DishCard from '@/app/components/sections/restaurante/DishCard';
import PlatoDetalle from '@/app/components/sections/restaurante/PlatoDetalle';
import MenuCard from '@/app/components/sections/restaurante/MenuCard';
import MenuImageViewer from '@/app/components/sections/restaurante/MenuImageViewer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Definimos los capítulos de nuestro teatro
type CapituloId = MenuChapter['id'];

const RestauranteSantuario = () => {
  const [capituloActivo, setCapituloActivo] = useState<CapituloId>('a-la-carta');
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(null);
  const [platoSeleccionado, setPlatoSeleccionado] = useState<Plato | null>(null);
  const [menuSeleccionado, setMenuSeleccionado] = useState<Plato | null>(null);

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
    <section className="flex w-full h-screen bg-black text-white pt-20 overflow-hidden">
      {/* El Pergamino (El Libreto) - 40% */}
      <div 
        className="w-2/5 h-full bg-neutral-950/50 p-8 border-r border-neutral-800 overflow-x-hidden relative flex flex-col"
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
        <h1 className="text-3xl font-bold text-amber-300 mb-8 relative z-10">La Carta Viva</h1>
        
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

              {contentToDisplay.map((item: any) => {
                if ('platos' in item && item.platos) {
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => setSubcategoriaActiva(item.id)}
                      className="p-4 border-b border-bodega-gold/20 hover:bg-bodega-ivory/10 transition-colors duration-200 cursor-pointer"
                    >
                      <h4 className="font-bold text-bodega-ivory text-xl">{item.nombre}</h4>
                    </div>
                  );
                } else {
                  if (capituloActivo === 'menus') {
                    return (
                      <MenuCard
                        key={item.id}
                        menu={item}
                        onSelect={setMenuSeleccionado}
                      />
                    );
                  } else {
                    return (
                      <DishCard 
                        key={item.id} 
                        plato={item} 
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

      {/* El Lienzo (El Escenario) - 60% */}
      <div 
        className="w-3/5 h-full relative flex flex-col" 
      >
        {/* Background Images */}
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
        
        <div className="relative z-10 flex flex-col h-full"> 
          {platoSeleccionado ? (
            <PlatoDetalle plato={platoSeleccionado} vinos={vinosData} />
          ) : menuSeleccionado ? (
            <MenuImageViewer imageUrl={menuSeleccionado.imageUrl} altText={menuSeleccionado.nombre} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-neutral-400 p-12"> 
              <h2 className="text-3xl font-bold mb-4">Explore nuestra propuesta gastronómica</h2>
              <p className="text-lg">Seleccione un plato del libreto para ver sus detalles.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RestauranteSantuario;
