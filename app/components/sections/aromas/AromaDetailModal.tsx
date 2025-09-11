import { AnimatePresence, motion } from 'framer-motion';
import { Aroma, Vino } from '@/app/types';
import { vinosData } from '@/app/data/vinosData';
import Image from 'next/image';
// 1. IMPORTAMOS EL ARMA DE NAVEGACIÓN
import { useSantuario } from '@/app/components/SantuarioContext';

// El componente ahora necesita el contexto para cambiar de Santuario
const VinoLink: React.FC<{ vino: Vino }> = ({ vino }) => {
  // 2. INVOCAMOS NUESTRA ARMA
  const { setActiveSantuario } = useSantuario();

  return (
    // 3. EL <Link> HA SIDO PURGADO. AHORA ES UN BOTÓN DE COMANDO.
    <button 
      onClick={() => setActiveSantuario('tienda')}
      className="flex items-center gap-x-3 p-2 rounded-lg hover:bg-bodega-gold/10 transition-colors w-full text-left"
    >
      <div className="w-10 h-16 relative shrink-0">
        <Image src={vino.imagen_url} alt={vino.nombre} fill className="object-contain" unoptimized />
      </div>
      <div>
        <p className="font-bold text-bodega-stone">{vino.nombre}</p>
        <p className="text-xs text-bodega-stone/60">{vino.varietal}</p>
      </div>
    </button>
  );
};

const AromaDetailModal: React.FC<{ aroma: Aroma | null; isOpen: boolean; onClose: () => void; }> = ({ aroma, isOpen, onClose }) => {
  if (!aroma) return null;

  const vinosConEsteAroma = vinosData.filter(vino => vino.aromas.includes(aroma.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-4xl h-auto max-h-[90vh] lg:h-[80vh] bg-bodega-dark border border-bodega-gold/20 rounded-2xl flex flex-col lg:flex-row overflow-hidden"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-full lg:w-1/2 relative h-48 lg:h-auto">
              <Image src={aroma.imageUrl} alt={aroma.nombre} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <h2 className="font-serif text-2xl lg:text-4xl text-bodega-gold mb-4">{aroma.nombre}</h2>
              <p className="text-bodega-stone/80 leading-relaxed text-sm lg:text-base">{aroma.descripcion}</p>

              <div className="border-t border-bodega-gold/10 my-6" />

              <h3 className="font-bold text-bodega-gold/90 mb-4 uppercase tracking-wider">Presente en Estos Vinos</h3>
              {vinosConEsteAroma.length > 0 ? (
                <div className="space-y-3">
                  {vinosConEsteAroma.map(vino => <VinoLink key={vino.id} vino={vino} />)}
                </div>
              ) : (
                <p className="text-bodega-stone/50 italic">Un aroma exclusivo, reservado para futuras cosechas.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AromaDetailModal;
