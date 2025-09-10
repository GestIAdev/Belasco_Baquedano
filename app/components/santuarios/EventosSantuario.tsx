"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evento, MediaItem, MediaCategory } from '@/app/types';
import { eventosData } from '@/app/data/eventosData';
import { mediaData } from '@/app/data/mediaData';
import { enoturismoData } from '@/app/data/enoturismoData'; // Added import
import PergaminoMaestro from '@/app/components/ui/PergaminoMaestro';
import ChronicleCard from '../sections/eventos/ChronicleCard';
import AssetViewer from '../sections/eventos/AssetViewer';

// Definimos un tipo para el activo que puede ser mostrado en el Lienzo
type ActiveAsset = Evento | MediaItem;

type TabId = 'eventos' | 'videos' | 'galeria' | 'enoturismo';

const EventosSantuario: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('eventos');
    const [activeSubTab, setActiveSubTab] = useState<'proximo' | 'pasado'>('proximo');
    // Definimos un tipo para el activo que puede ser mostrado en el Lienzo

    const [activeProjection, setActiveProjection] = useState<ActiveProjection | null>(null);

    // Memoizamos los items a mostrar en el Pérgamino según la pestaña activa
    const itemsForTab = useMemo(() => {
        switch (activeTab) {
            case 'eventos':
                return eventosData.filter(e => e.status === activeSubTab);
            case 'videos':
                return mediaData.filter(m => m.category === 'Videos');
            case 'galeria':
                return mediaData.filter(m => m.category === 'Galería');
            case 'enoturismo':
                // Placeholder: En el futuro, podríamos tener un tipo de crónica para enoturismo
                return enoturismoData; // Changed to enoturismoData
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
        <>
            <section className="flex w-full h-screen bg-black text-white pt-20 overflow-hidden">
                {/* FASE 2: EL PERGAMINO COMO \"ARCHIVADOR TÁCTICO\" */}
                <div className="w-3/10 h-full flex-shrink-0">
                    <PergaminoMaestro>
                        <h1 className="text-4xl font-bold text-bodega-gold mb-4 shrink-0">Crónicas de Belasco</h1>
                        <div className="flex border-b border-bodega-gold/10 shrink-0">
                            {tabs.map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="relative px-4 py-3 text-lg transition-colors focus:outline-none">
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
                                    <div className="grid grid-cols-3 gap-2">
                                        <AnimatePresence>
                                            {itemsForTab.map((item, index) => (
                                                <ChronicleCard key={item.id} item={item} onClick={() => setActiveProjection({ item, contextItems: itemsForTab, initialIndex: index })} />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </>
                            ) : (
                                <div className="grid grid-cols-3 gap-2">
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

                {/* FASE 3: EL LIENZO COMO \"PROYECTOR DE SAGAS\" */}
                <div className="w-7/10 h-full relative bg-black/30">
                    <div className="absolute inset-0 z-0 bg-stone-950/70" />
                    <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!activeProjection ? (
                                <motion.div key="placeholder" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="text-center">
                                    <h2 className="text-5xl font-serif text-bodega-gold/80">El Escenario</h2>
                                    <p className="mt-4 text-bodega-stone text-xl max-w-2xl">Selecciona una crónica del archivador para proyectar su historia.</p>
                                </motion.div>
                            ) : (
                                <AssetViewer key={activeProjection.item.id} projection={activeProjection} />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EventosSantuario;
