import { Vino } from '@/app/types';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const WineCard: React.FC<{vino: Vino, onSelect: (vino: Vino) => void}> = ({ vino, onSelect }) => (
    <motion.div
        className="cursor-pointer group bg-transparent rounded-lg overflow-hidden flex flex-col h-full border border-transparent hover:border-bodega-gold/20 hover:bg-black/20 transition-all duration-300"
        onClick={() => onSelect(vino)}
        variants={cardVariants}
        layout
    >
        <div className="w-full aspect-[3/4] overflow-hidden p-2">
            <img 
              src={vino.imagen_url} 
              alt={`Botella de ${vino.nombre}`} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
              onError={(e) => e.currentTarget.src = 'https://placehold.co/300x400/1a1a1a/a88b57?text=Vino'} 
            />
        </div>
        <div className="p-3 text-center mt-auto">
            <h3 className="font-serif text-base text-bodega-gold group-hover:text-white transition-colors truncate">{vino.nombre}</h3>
            <p className="text-2xl font-bold text-bodega-stone">${vino.precio.toFixed(2)}</p>
        </div>
    </motion.div>
);

export default WineCard;