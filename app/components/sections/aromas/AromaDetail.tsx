// en app/components/sections/aromas/AromaDetail.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface Aroma {
  id: string | number;
  nombre: string;
  descripcion: string;
}

interface Props {
  aroma: Aroma;
  onClose: () => void;
}

const AromaDetail: React.FC<Props> = ({ aroma, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={`aroma-bubble-${aroma.id}`}
        className="w-full max-w-lg aspect-square bg-bodega-ivory p-8 rounded-2xl shadow-2xl flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-4xl font-bold text-bodega-maroon mb-4">{aroma.nombre}</h2>
        <p className="text-lg text-bodega-dark">{aroma.descripcion}</p>
      </motion.div>
    </div>
  );
};

export default AromaDetail;