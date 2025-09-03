import { ReactNode } from 'react';
import Portal from './Portal';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const ModalPanel = ({ isOpen, onClose, children, title }: ModalPanelProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-7xl max-h-[90vh] rounded-lg border border-bodega-gold shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Layer 1: Pergamino Background */}
          <div className="absolute inset-0 bg-bodega-ivory/70 z-0" />

          {/* Layer 2: Blazon Watermark */}
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-15 z-10"
            style={{ backgroundImage: "url('/images/belascos_blason_transparente.png')", backgroundSize: '40%', backgroundPosition: '20% center' }}
          />

          {/* Layer 3: Content */}
          <div className="relative z-20 flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-bodega-gold/80">
              <h2 className="text-lg font-bold text-bodega-maroon">{title || 'Holograma'}</h2>
              <button onClick={onClose} className="text-bodega-dark hover:text-bodega-maroon transition-colors">
                <X size={24} />
              </button>
            </div>
            {/* El contenedor de children, ahora purgado */}
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Portal>
  );
};

export default ModalPanel;
