import { ReactNode, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ModalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const ModalPanel: React.FC<ModalPanelProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // --- Hooks de control con registros de depuración para detectar cierres inesperados ---
  useEffect(() => {
    console.log('[ModalPanel] useEffect mount, isOpen=', isOpen);

    const handleClickOutside = (event: MouseEvent) => {
      try {
        console.log('[ModalPanel] handleClickOutside fired, isOpen=', isOpen, 'target=', event.target);
        if (modalRef.current && modalRef.current.contains(event.target as Node)) {
          console.log('[ModalPanel] click inside modal -> ignore');
          return;
        }
  console.log('[ModalPanel] click outside modal -> calling onClose');
        onClose();
      } catch (err) {
        console.log('[ModalPanel] handleClickOutside error', err);
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      console.log('[ModalPanel] handleEscapeKey fired, key=', event.key);
      if (event.key === 'Escape') {
        console.log('[ModalPanel] Escape -> calling onClose');
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      console.log('[ModalPanel] cleanup remove listeners, isOpen=', isOpen);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // El backdrop se mantiene, es correcto.
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            // REFORJADO: Breakpoints responsivos para el ancho. Mobile-first.
            className="relative w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] flex flex-col bg-bodega-ivory/80 backdrop-blur-lg rounded-2xl border border-bodega-gold/30 shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* --- CABECERA DEL HOLOGRAMA --- */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-bodega-gold">
              {/* REFORJADO: Tipografía adaptativa. */}
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-bodega-maroon">{title}</h3>
              <button onClick={onClose} className="text-bodega-gold/70 hover:text-bodega-gold transition-colors z-10">
                <X size={28} />
              </button>
            </div>

            {/* CAPA 0: El Blasón domado y sutil */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
              {/* REFORJADO: Blasón domado para no ser abrumador en móvil y con opacidad reducida. */}
              <div className="w-2/3 h-2/3 relative opacity-10">
                <Image src="/images/belascos_blason_transparente.png" alt="" fill className="object-contain" />
              </div>
            </div>
            
            {/* --- CONTENIDO DEL HOLOGRAMA (CON SCROLL INTERNO) --- */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalPanel;