// en app/components/sections/aromas/AromaBubble.tsx
"use client";

import { motion, Variants } from 'framer-motion';
import React from 'react';
import { Aroma } from './types';

const bubbleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  }
};

interface AromaBubbleProps {
  aroma: Aroma;
  onClick: () => void;
  layoutMode?: 'constellation' | 'detail';
}

const AromaBubble: React.FC<AromaBubbleProps> = ({ aroma, onClick, layoutMode = 'constellation' }) => {
  const isConstellation = layoutMode === 'constellation';

  const containerClasses = isConstellation 
    ? `absolute ${aroma.position} ${aroma.size} transform -translate-x-1/2 -translate-y-1/2`
    : 'relative w-full h-full';

  return (
    <motion.div
      key={aroma.id}
      className={containerClasses}
      variants={bubbleVariants}
      whileHover={{ scale: 1.15, zIndex: 10, transition: { type: 'spring', stiffness: 300 } }}
    >
      <motion.div
        layoutId={`aroma-bubble-${aroma.id}`}
        onClick={onClick}
        className="relative w-full h-full rounded-full overflow-hidden cursor-pointer group hover:[filter:drop-shadow(0_0_12px_var(--color-bodega-gold))]"
        animate={{ 
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: Math.random() * 4 + 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110" 
          style={{ backgroundImage: `url(${aroma.imageUrl})` }} 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h3 className="text-bodega-ivory font-bold text-center p-2">{aroma.nombre}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AromaBubble;