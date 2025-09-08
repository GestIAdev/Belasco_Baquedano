import { motion } from 'framer-motion';
import { Aroma } from '@/app/types';
import Image from 'next/image';

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
  },
};

const AromaBubble: React.FC<{ aroma: Aroma; onClick: () => void }> = ({ aroma, onClick }) => (
  <motion.div
    className="relative aspect-square rounded-full cursor-pointer group overflow-hidden shadow-lg shadow-black/50"
    onClick={onClick}
    variants={bubbleVariants}
    initial="hidden"
    animate={{
      opacity: 1,
      scale: [1, 1.03, 1], // Apply continuous scale animation directly here
      transition: {
        scale: {
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
    }}
    whileHover={{ scale: 1.1, zIndex: 10 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Image
      src={aroma.imageUrl}
      alt={aroma.nombre}
      layout="fill"
      className="object-cover transition-transform duration-300 group-hover:scale-110"
    />
    {/* EL VELO HA SIDO PURGADO. En su lugar, un degradado sutil SÓLO en hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
      <p className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {aroma.nombre}
      </p>
    </div>
  </motion.div>
);

export default AromaBubble;