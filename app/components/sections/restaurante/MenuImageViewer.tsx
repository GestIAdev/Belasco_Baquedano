// app/components/sections/restaurante/MenuImageViewer.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface MenuImageViewerProps {
  imageUrl: string;
  altText: string;
}

const MenuImageViewer: React.FC<MenuImageViewerProps> = ({ imageUrl, altText }) => {
  return (
    <motion.div
      key={imageUrl} // La key fuerza la re-animación al cambiar de imagen
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
  className="w-full h-full flex items-center justify-center p-4 lg:p-6 box-border min-h-0 overflow-hidden"
    >
  <div className="relative w-full max-w-2xl h-full">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-contain rounded-lg shadow-2xl shadow-black/50"
          unoptimized
        />
      </div>
    </motion.div>
  );
};

export default MenuImageViewer;
