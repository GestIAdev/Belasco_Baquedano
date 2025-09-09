'use client';

import { useSantuario } from "./components/SantuarioContext";
import HeroSection from "./components/sections/HeroSection";
import AromasSantuario from "./components/santuarios/AromasSantuario";
import TiendaSantuario from "./components/santuarios/TiendaSantuario";
import RestauranteSantuario from "./components/santuarios/RestauranteSantuario";
import ClubVinoSantuario from "./components/santuarios/ClubVinoSantuario"; // <-- IMPORTACIÓN AÑADIDA
import EventosSantuario from "./components/santuarios/EventosSantuario"; // <-- IMPORTAMOS EL NUEVO BASTIÓN
import { AnimatePresence, motion, Transition } from "framer-motion";

export default function Home() {
  const { activeSantuario } = useSantuario();

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition: Transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.75,
  };

  return (
    <main>
      <AnimatePresence mode="wait">
        {activeSantuario === 'aromas' ? (
          <motion.div
            key="santuario-aromas"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AromasSantuario />
          </motion.div>
        ) : activeSantuario === 'tienda' ? (
          <motion.div
            key="santuario-tienda"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <TiendaSantuario />
          </motion.div>
        ) : activeSantuario === 'restaurante' ? (
          <motion.div 
            key="santuario-restaurante"
            initial="initial" 
            animate="in" 
            exit="out" 
            variants={pageVariants} 
            transition={pageTransition}
          >
            <RestauranteSantuario />
          </motion.div>  
    ) : activeSantuario === 'club' ? (
          <motion.div
      key="santuario-club"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ClubVinoSantuario />
          </motion.div>
        // --- LA NUEVA LÍNEA DE FRENTE ---
        ) : activeSantuario === 'eventos' ? (
          <motion.div
            key="santuario-eventos"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <EventosSantuario />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HeroSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}