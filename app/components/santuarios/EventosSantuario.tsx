"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evento, MediaItem } from '@/app/types';
import { eventosData } from '@/app/data/eventosData';
import { mediaData } from '@/app/data/mediaData';
import { enoturismoData } from '@/app/data/enoturismoData';
import PergaminoMaestro from '@/app/components/ui/PergaminoMaestro';
import ChronicleCard from '../sections/eventos/ChronicleCard';
import AssetViewer from '../sections/eventos/AssetViewer';

type ActiveAsset = Evento | MediaItem;

type ActiveProjection = {
    item: ActiveAsset;
    contextItems: ActiveAsset[];
    initialIndex: number;
};

type TabId = 'eventos' | 'videos' | 'galeria' | 'enoturismo';

const EventosSantuario: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('eventos');
    const [activeSubTab, setActiveSubTab] = useState<'proximo' | 'pasado'>('proximo');
    const [activeProjection, setActiveProjection] = useState<ActiveProjection | null>(null);

    const itemsForTab = useMemo(() => {
        switch (activeTab) {
            case 'eventos':
                return eventosData.filter(e => e.status === activeSubTab);
            case 'videos':
                return mediaData.filter(m => m.category === 'Videos');
            case 'galeria':
                return mediaData.filter(m => m.category === 'Galería');
            case 'enoturismo':
                return enoturismoData;
            default:
                return [];
        }
    }, [activeTab, activeSubTab]);

    const tabs: {id: TabId, label: string}[] = [
        {id: 'eventos', label: 'Eventos'},
        {id: 'videos', label: 'Videos'},
        {id: 'galeria', label: 'Galería'},
        {id: 'enoturismo', label: 'Enoturismo'},
    ];

    return (
        // El Soberano Iluminado: calcula su propia altura y define el layout principal.
        <section className="w-full h-[calc(100vh-5rem)] flex flex-col lg:flex-row overflow-hidden">
            
            {/* El Pérgamino: se apila en móvil (ocupa la mitad superior), se posiciona a la izquierda en desktop */}
            <div className="w-full lg:w-[30%] h-1/2 lg:h-full flex-shrink-0">
                <PergaminoMaestro>
                    <h1 className="text-3xl lg:text-4xl font-bold text-bodega-gold text-center pt-6 pb-4">Crónicas de Belasco</h1>
                    
                    <div className="flex border-b border-bodega-gold/10 shrink-0">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="relative px-4 py-3 text-base lg:text-lg transition-colors focus:outline-none">
                                <span className={activeTab === tab.id ? 'text-bodega-gold' : 'text-bodega-stone/60 hover:text-bodega-gold'}>{tab.label}</span>
                                {activeTab === tab.id && (<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bodega-gold" layoutId="eventos-underline" />)}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto min-h-0 p-2 pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-bodega-gold/20 [&::-webkit-scrollbar-track]:bg-transparent">
                        {activeTab === 'eventos' ? (
                            <>
                                <div className="flex p-2 shrink-0">
                                    <button onClick={() => setActiveSubTab('proximo')} className={`flex-1 py-2 text-center ${activeSubTab === 'proximo' ? 'text-bodega-gold border-b-2 border-bodega-gold' : 'text-bodega-stone/50'}`}>
                                        Próximos
                                    </button>
                                    <button onClick={() => setActiveSubTab('pasado')} className={`flex-1 py-2 text-center ${activeSubTab === 'pasado' ? 'text-bodega-gold border-b-2 border-bodega-gold' : 'text-bodega-stone/50'}`}>
                                        Crónicas
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    <AnimatePresence>
                                        {itemsForTab.map((item, index) => (
                                            <ChronicleCard key={item.id} item={item} onClick={() => setActiveProjection({ item, contextItems: itemsForTab, initialIndex: index })} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                <AnimatePresence>
                                    {itemsForTab.map((item, index) => (
                                        <ChronicleCard key={item.id} item={item} onClick={() => setActiveProjection({ item, contextItems: itemsForTab, initialIndex: index })} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </PergaminoMaestro>
            </div>

            {/* El Lienzo: se apila en móvil (ocupa la mitad inferior), se posiciona a la derecha en desktop */}
            <div className="w-full lg:w-[70%] h-1/2 lg:h-full relative flex-1 bg-black/30">
                <div className="absolute inset-0 z-0 bg-stone-950/70" />
                
                {/* Contenedor SIN PADDING que aloja al AssetViewer */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!activeProjection ? (
                            <motion.div key="placeholder" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="text-center p-8">
                                <h2 className="text-4xl lg:text-5xl font-serif text-bodega-gold/80">El Escenario</h2>
                                <p className="mt-4 text-lg lg:text-xl text-bodega-stone max-w-2xl">Selecciona una crónica del archivador para proyectar su historia.</p>
                            </motion.div>
                        ) : (
                            <AssetViewer key={activeProjection.item.id} projection={activeProjection} />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default EventosSantuario;
