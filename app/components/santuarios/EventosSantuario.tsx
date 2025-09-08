"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evento, MediaItem, MediaCategory } from '@/app/types';
import { eventosData } from '@/app/data/eventosData';
import { mediaData } from '@/app/data/mediaData';
import PergaminoMaestro from '@/app/components/ui/PergaminoMaestro';
import MediaGrid from '@/app/components/sections/eventos/MediaGrid';

type TabId = 'eventos' | 'videos' | 'galeria' | 'enoturismo';
type EventoStatus = 'proximo' | 'pasado';

const EventCard: React.FC<{ evento: Evento, onClick: () => void }> = ({ evento, onClick }) => (
    <div onClick={onClick} className="p-4 border-b border-bodega-gold/10 hover:bg-black/20 cursor-pointer transition-colors">
        <h3 className="font-bold text-bodega-stone">{evento.title}</h3>
        <p className="text-sm text-bodega-gold/70">{evento.date}</p>
    </div>
);

const EventosSantuario: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('eventos');
    const [activeSubTab, setActiveSubTab] = useState<EventoStatus>('proximo');
    const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

    const proximosEventos = useMemo(() => eventosData.filter(e => e.status === 'proximo'), []);
    const eventosPasados = useMemo(() => eventosData.filter(e => e.status === 'pasado'), []);

    const tabs: {id: TabId, label: string}[] = [
        {id: 'eventos', label: 'Eventos'},
        {id: 'videos', label: 'Videos'},
        {id: 'galeria', label: 'Galería'},
        {id: 'enoturismo', label: 'Enoturismo'},
    ];

    const mediaForTab = useMemo(() => {
        const categoryMap: { [key in TabId]?: MediaCategory } = {
            videos: 'Videos',
            galeria: 'Galería',
            enoturismo: 'Enoturismo',
        };
        const category = categoryMap[activeTab];
        return category ? mediaData.filter(m => m.category === category) : [];
    }, [activeTab]);

    return (
        <>
            <section className="flex w-full h-screen bg-black text-white pt-20 overflow-hidden">
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
                        <div className="flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden">
                            {activeTab === 'eventos' && (
                                <>
                                    <div className="flex p-2 shrink-0">
                                        <button onClick={() => setActiveSubTab('proximo')} className={`flex-1 py-2 text-center ${activeSubTab === 'proximo' ? 'text-bodega-gold border-b-2 border-bodega-gold' : 'text-bodega-stone/50'}`}>
                                            Próximos
                                        </button>
                                        <button onClick={() => setActiveSubTab('pasado')} className={`flex-1 py-2 text-center ${activeSubTab === 'pasado' ? 'text-bodega-gold border-b-2 border-bodega-gold' : 'text-bodega-stone/50'}`}>
                                            Crónicas
                                        </button>
                                    </div>
                                    <div className="p-2">
                                        {activeSubTab === 'proximo' && proximosEventos.map(e => <EventCard key={e.id} evento={e} onClick={() => setSelectedEvento(e)} />)}
                                        {activeSubTab === 'pasado' && eventosPasados.map(e => <EventCard key={e.id} evento={e} onClick={() => setSelectedEvento(e)} />)}
                                    </div>
                                </>
                            )}
                            {activeTab !== 'eventos' && (
                                <div className="p-6 text-bodega-stone/70">
                                    <p>Seleccione una categoría para ver las crónicas visuales en el Lienzo.</p>
                                </div>
                            )}
                        </div>
                    </PergaminoMaestro>
                </div>
                <div className="w-7/10 h-full relative">
                    <div className="absolute inset-0 z-0 bg-black" />
                    <div className="relative z-10 w-full h-full p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full"
                            >
                                {activeTab === 'eventos' ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                                        <h2 className="text-5xl font-serif text-bodega-gold/80">Más que una Bodega, un Escenario</h2>
                                        <p className="mt-4 text-bodega-stone text-xl max-w-2xl">Selecciona una crónica en el Pergamino para revivir la historia.</p>
                                    </div>
                                ) : (
                                    <MediaGrid items={mediaForTab || []} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            
            {/* El Holograma del Recuerdo será forjado aquí */}
        </>
    );
};

export default EventosSantuario;