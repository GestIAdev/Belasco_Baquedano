import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Evento, MediaItem } from '@/app/types';

// Creamos un tipo que pueda manejar tanto un Evento completo como un MediaItem
// para la flexibilidad de la tarjeta.
type CardItem = Evento | MediaItem; // Simplified type

interface ChronicleCardProps {
  item: CardItem;
  onClick: () => void;
}

const ChronicleCard: React.FC<ChronicleCardProps> = ({ item, onClick }) => {
  let imageUrl: string;
  if ('coverImage' in item) { // Check if it's an Evento
    imageUrl = item.coverImage;
  } else { // Otherwise, it's a MediaItem
    // For MediaItem, use thumbnailUrl if it's a video, otherwise use url
    imageUrl = item.type === 'video' && item.thumbnailUrl ? item.thumbnailUrl : item.url;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="relative rounded-md overflow-hidden cursor-pointer group shadow-lg bg-stone-900"
    >
      <div className="relative" style={{ paddingBottom: '100%' }}> {/* Custom aspect ratio container */}
        <Image src={imageUrl} alt={item.title} fill className="transition-transform duration-300 group-hover:scale-110 object-cover absolute inset-0" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <h3 className="absolute bottom-0 left-0 right-0 p-2 text-white font-bold text-sm bg-gradient-to-t from-black/90 to-transparent">
        {item.title}
      </h3>
    </motion.div>
  );
};

export default ChronicleCard;
