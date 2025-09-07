import { Vino } from '@/app/types';
import { aromasData } from '@/app/data/aromasData';
import { motion } from 'framer-motion';
import React from 'react';

// ... (MicroAroma sin cambios) ...
const MicroAroma: React.FC<{ aromaId: number | string }> = ({ aromaId }) => {
    const aroma = aromasData.find(a => a.id === aromaId);
    if (!aroma) return null;
    return <div className="flex items-center gap-x-1.5 bg-black/30 rounded-full px-2 py-0.5 text-xs border border-bodega-gold/10"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: aroma.color }} /><span className="text-bodega-stone/70">{aroma.nombre}</span></div>;
};


const WineDetail: React.FC<{vino: Vino, onClose: () => void, currency: 'usd' | 'ars'}> = ({ vino, onClose, currency }) => {
    const notasList = vino.notas_cata.split(',').map(n => n.trim());
    const price = currency === 'ars' ? vino.precio.ars.toLocaleString('es-AR', {minimumFractionDigits: 0, maximumFractionDigits: 0}) : vino.precio.usd.toFixed(2);
    const prefix = currency === 'usd' ? '$' : 'ARS';

    return (
        <div className="w-full h-full flex flex-col text-white relative font-sans">
            <button onClick={onClose} className="absolute top-4 right-4 text-bodega-gold/50 hover:text-bodega-gold transition-colors z-30"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <div className="w-full h-1/2 flex items-center justify-center pt-8">
                <motion.div className="relative h-full w-full flex items-center justify-center" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                    <div className="absolute w-[70%] h-full rounded-full border-2 border-bodega-gold/10 shadow-lg shadow-black/30" />
                    <motion.img src={vino.imagen_url} alt={`Botella de ${vino.nombre}`} className="relative max-h-full object-contain z-10" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} onError={(e) => e.currentTarget.src = 'https://placehold.co/400x600/1a1a1a/a88b57?text=Vino'} />
                </motion.div>
            </div>
            <div className="w-full flex-1 flex flex-col p-4 overflow-hidden min-h-0">
                <div className="text-center">
                    <h2 className="font-serif text-3xl text-bodega-gold mb-1">{vino.nombre}</h2>
                    <p className="text-md text-bodega-stone/80 mb-4">{vino.tipo} | {vino.varietal} | {vino.anada}</p>
                    <p className="text-bodega-stone/90 mb-6 text-sm max-w-lg mx-auto leading-relaxed">{vino.descripcion}</p>
                </div>
                <div className="flex justify-between gap-x-4 text-xs text-left max-w-lg mx-auto w-full border-t border-bodega-gold/10 pt-4">
                    <div className="flex-1"><h4 className="font-bold text-bodega-gold/90 mb-2 uppercase tracking-wider">Notas de Cata</h4><ul className="list-disc list-inside text-bodega-stone/80 font-light space-y-1">{notasList.map((nota, i) => <li key={i}>{nota}</li>)}</ul></div>
                    <div className="flex-1"><h4 className="font-bold text-bodega-gold/90 mb-2 uppercase tracking-wider">Maridaje</h4><ul className="list-disc list-inside text-bodega-stone/80 font-light space-y-1">{vino.maridaje.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
                    <div className="flex-1"><h4 className="font-bold text-bodega-gold/90 mb-2 uppercase tracking-wider">Aromas</h4><div className="flex flex-wrap gap-1.5">{vino.aromas.map((aromaId, i) => <MicroAroma key={i} aromaId={aromaId} />)}</div></div>
                </div>
                <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between gap-x-6 border-t border-bodega-gold/10 pt-4">
                         <div className="flex-1 text-left"><p className="text-2xl font-bold text-white/80 whitespace-nowrap">{prefix} {price}</p></div>
                        <motion.button className="bg-bodega-gold text-bodega-dark font-bold py-3 px-6 rounded-full flex items-center justify-center gap-x-2 hover:bg-white transition-colors whitespace-nowrap" whileTap={{ scale: 0.95 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.921.778H13.41a1 1 0 00.921-.778L15.47 3H17a1 1 0 100-2H3zM16 8a1 1 0 011 1v1H3V9a1 1 0 011-1h12zM3 13a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1z" /></svg>
                            <span>Añadir a la Cesta</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WineDetail;