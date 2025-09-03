"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AromasUmbralProps {
  onConfirm: () => void;
}

const AromasUmbral: React.FC<AromasUmbralProps> = ({ onConfirm }) => {
  return (
    <div className="flex flex-row items-center gap-x-8 h-full p-4">
      {/* Columna de Texto */}
      <div className="w-1/2 flex flex-col items-center text-center">
        <h2 className="font-serif text-4xl font-bold text-bodega-maroon mb-4">
          El Santuario de los Sentidos
        </h2>
        <p className="text-xl text-bodega-dark/90 mb-8">
          46 aromas esperan para contarte la historia secreta de nuestros vinos.
        </p>
        <motion.button
          onClick={onConfirm}
          className="px-8 py-3 bg-bodega-maroon text-bodega-ivory font-bold rounded-md shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cruzar el Umbral
        </motion.button>
      </div>
      {/* Columna Visual */}
      <div className="w-1/2 h-[450px]">
        <img
          src="/images/aromas_santuario_preview.webp" // Una imagen evocadora de la sala
          alt="Santuario de Aromas"
          className="w-full h-full object-cover rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default AromasUmbral;
