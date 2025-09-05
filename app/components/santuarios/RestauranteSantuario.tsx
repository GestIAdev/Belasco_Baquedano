'use client';

import React, { useState } from 'react';
import { Plato, MenuChapter, MenuSubcategory } from '@/app/types';
import { menuData } from '@/app/data/menuData';
import { vinosData } from '@/app/data/vinosData';
import DishCard from '@/app/components/ui/DishCard';
import PlatoDetalle from '@/app/components/ui/PlatoDetalle';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Definimos los capítulos de nuestro teatro
type CapituloId = MenuChapter['id'];

const RestauranteSantuario = () => {
  const [capituloActivo, setCapituloActivo] = useState<CapituloId>('a-la-carta');
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(null);
  const [platoSeleccionado, setPlatoSeleccionado] = useState<Plato | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string, x: number, y: number } | null>(null);

  const handleShowPreview = (src: string | null, x: number, y: number) => {
    setPreviewImage(src ? { src, x, y } : null);
  };

  // Find the active chapter data
  const activeChapter = menuData.find(chapter => chapter.id === capituloActivo);

  // Determine what to display in the list area
  let contentToDisplay: Plato[] | MenuSubcategory[] | MenuChapter[] = [];
  if (activeChapter) {
    if (subcategoriaActiva) {
      // Display dishes of the active subcategory
      const activeSubcategory = activeChapter.subcategorias?.find(sub => sub.id === subcategoriaActiva);
      if (activeSubcategory) {
        contentToDisplay = activeSubcategory.platos;
      }
    } else if (activeChapter.subcategorias) {
      // Display subcategories of the active chapter
      contentToDisplay = activeChapter.subcategorias;
    } else if (activeChapter.platos) {
      // Display dishes directly if no subcategories (e.g., Menús, Menú Especial)
      contentToDisplay = activeChapter.platos;
    }
  }

  return (
    <section className="flex w-full h-screen bg-black text-white">
      {/* El Pergamino (El Libreto) - 40% */}
      <div 
        className="w-2/5 h-full bg-neutral-950/50 p-8 border-r border-neutral-800 overflow-x-hidden overflow-y-hidden relative" // Added relative
      >
        {/* Overlay for the background image opacity */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "url('/images/belascos_blason_transparente.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            opacity: 0.09, // This is the requested opacity for the blason
            zIndex: 0, // Changed from -1 to 0
          }}
        ></div>
        <h1 className="text-3xl font-bold text-amber-300 mb-8 relative z-10">La Carta Viva</h1> {/* Changed z-0 to z-10 */}
        
        {/* Navegación Superior (Selector de Capítulos) */}
        <div className="flex justify-around space-x-4 mb-8 bg-black/50 p-2 rounded-lg relative z-10"> {/* Changed z-0 to z-10 */}
          {menuData.map(chapter => (
            <button 
              key={chapter.id}
              onClick={() => { 
                setCapituloActivo(chapter.id); 
                setSubcategoriaActiva(null); // Reset subcategory on chapter change
                setPlatoSeleccionado(null); // Reset dish selection
              }}
              className={`px-4 py-2 rounded-md transition-colors duration-200 
                ${capituloActivo === chapter.id 
                  ? 'bg-bodega-gold text-black font-semibold'
                  : 'text-bodega-gold border border-bodega-gold/50 hover:bg-bodega-gold/20'
                }`}
            >
              {chapter.nombre}
            </button>
          ))}
        </div>

        {/* Aquí se renderiza la lista de platos/subcategorías (DishCard 2.0) */}
        <div 
          className="overflow-y-auto h-[calc(100%-150px)] [&::-webkit-scrollbar]:hidden relative z-10" // Changed z-0 to z-10
          style={{ 
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", // Fade effect
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" // Webkit
          }}
        >
          {/* Render Subcategories or Dishes based on active state */}
          {contentToDisplay.length > 0 ? (
            <div>
              {/* Back button for subcategories */}
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
                  return (
                    <DishCard 
                      key={item.id} 
                      plato={item} 
                      onSelect={setPlatoSeleccionado} 
                      onShowPreview={handleShowPreview} 
                    />
                  );
                }
              })}
            </div>
          ) : (
            <div className="text-center text-neutral-400 mt-10">
              <p>No hay contenido disponible para este capítulo/subcategoría.</p>
            </div>
          )}
        </div>
      </div>

      {/* El Lienzo (El Escenario) - 60% */}
      <div 
        className="w-3/5 h-full p-12 relative flex flex-col overflow-hidden" 
      >
        {/* --- Lienzo de Dos Mundos --- */}
        <div className="absolute inset-0">
          {/* Imagen de la Terraza - Parte Superior Izquierda */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
            style={{ 
              backgroundImage: "url('/images/restaurante-terraza.webp')",
              clipPath: "polygon(0 0, 100% 0, 0% 100%, 0 100%)"
            }}
          ></div>
          {/* Imagen del Interior - Parte Inferior Derecha */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
            style={{ 
              backgroundImage: "url('/images/restaurante-interior.webp')",
              clipPath: "polygon(100% 0, 100% 100%, 0 100%, 100% 0)"
            }}
          ></div>
          {/* Degradado de Fusión en la Diagonal */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom right, transparent 48%, rgba(0,0,0,0.5) 50%, transparent 52%)"
            }}
          ></div>
        </div>

        {/* Velo oscuro para la atmósfera */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 p-12 flex flex-col h-full"> 
          {platoSeleccionado ? (
            <PlatoDetalle plato={platoSeleccionado} vinos={vinosData} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-neutral-400"> 
              <h2 className="text-3xl font-bold mb-4">Explore nuestra propuesta gastronómica</h2>
              <p className="text-lg">Seleccione un plato del libreto para ver sus detalles.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Global Preview Image (Micro-previsualización) --- */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ 
              position: 'fixed', 
              left: previewImage.x + 20, // Offset from cursor
              top: previewImage.y + 20, // Offset from cursor
              pointerEvents: 'none', // Allow clicks to pass through
              zIndex: 9999, // Ensure it's on top
            }}
            className="rounded-md shadow-lg shadow-black/50 border-2 border-bodega-gold/50 overflow-hidden"
          >
            <Image 
              src={previewImage.src}
              alt="Vista previa"
              width={150} // Fixed size for preview
              height={150} // Fixed size for preview
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RestauranteSantuario;