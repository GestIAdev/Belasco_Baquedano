import { MediaItem } from '@/app/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const MediaCard: React.FC<{ item: MediaItem }> = ({ item }) => {
  return (
    <motion.div 
      className="relative block w-full rounded-lg overflow-hidden group mb-4 shadow-lg shadow-black/50 aspect-video"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {item.type === 'image' ? (
        <Image src={item.url} alt={item.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <video src={item.url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-white font-bold text-lg drop-shadow-lg">{item.title}</p>
        {item.description && <p className="text-white/80 text-sm mt-1 drop-shadow-lg">{item.description}</p>}
      </div>
    </motion.div>
  );
};

const MediaGrid: React.FC<{ items: MediaItem[] }> = ({ items = [] }) => {
  if (items.length === 0) {
    return <div className="text-center text-bodega-stone/50">No hay crónicas visuales para esta categoría.</div>;
  }
  return (
    <div className="w-full h-full overflow-y-auto hide-scrollbar p-1" style={{ columnCount: 3, columnGap: '1.5rem' }}>
      {items.map(item => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MediaGrid;
