// app/components/sections/restaurante/MobilePergaminoOverlay.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Plato, MenuChapter, MenuSubcategory } from '@/app/types';
import DishCard from '@/app/components/sections/restaurante/DishCard';
import MenuCard from '@/app/components/sections/restaurante/MenuCard';

interface MobilePergaminoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuChapter[];
  capituloActivo: MenuChapter['id'];
  setCapituloActivo: (id: MenuChapter['id']) => void;
  subcategoriaActiva: string | null;
  setSubcategoriaActiva: (id: string | null) => void;
  setPlatoSeleccionado: (plato: Plato | null) => void;
  setMenuSeleccionado: (menu: Plato | null) => void;
  setMobileViewerItem: (item: Plato | null) => void;
  setMobileViewerMode: (mode: 'default' | 'menu') => void; // Added
  activeChapter: MenuChapter | undefined;
  contentToDisplay: Plato[] | MenuSubcategory[] | MenuChapter[];
}

const MobilePergaminoOverlay: React.FC<MobilePergaminoOverlayProps> = ({
  isOpen,
  onClose,
  menuData,
  capituloActivo,
  setCapituloActivo,
  subcategoriaActiva,
  setSubcategoriaActiva,
  setPlatoSeleccionado,
  setMenuSeleccionado,
  setMobileViewerItem,
  setMobileViewerMode, // Added
  activeChapter,
  contentToDisplay,
}) => {
  const portalRoot = useRef<Element | null>(null);

  useEffect(() => {
    portalRoot.current = document.getElementById('portal-root');
    if (!portalRoot.current) {
      const div = document.createElement('div');
      div.id = 'portal-root';
      document.body.appendChild(div);
      portalRoot.current = div;
    }
  }, []);

  if (!isOpen || !portalRoot.current) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col animate-fade-in">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-white">
          <X size={32} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Content from the original Pergamino (El Libreto) */}
        <div
          className="relative flex-col h-full" // Adjusted for mobile overlay
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
          <h1 className="text-3xl font-bold text-bodega-gold text-center pt-6 pb-4">La Carta Viva</h1>

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
                          onSelect={(menu) => {
                            setMenuSeleccionado(menu); // For desktop projector
                            setMobileViewerItem(menu); // For mobile projector
                            setMobileViewerMode('menu'); // Added
                            onClose(); // Close overlay after selection
                          }}
                        />
                      );
                    } else {
                      return (
                        <DishCard
                          key={(item as Plato).id}
                          plato={item as Plato}
                          onSelect={(plato) => {
                            setPlatoSeleccionado(plato); // For desktop projector
                            setMobileViewerItem(plato); // For mobile projector
                            onClose(); // Close overlay after selection
                          }}
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
      </div>
    </div>,
    portalRoot.current
  );
};

export default MobilePergaminoOverlay;