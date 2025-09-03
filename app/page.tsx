'use client';

import { useSantuario } from "./components/SantuarioContext";
import HeroSection from "./components/sections/HeroSection";
import AromasSantuario from "./components/santuarios/AromasSantuario";
import TiendaSantuario from "./components/santuarios/TiendaSantuario"; // <-- IMPORTACIÓN AÑADIDA
import { AnimatePresence, motion, Transition } from "framer-motion"; // <-- 1. IMPORTAMOS EL TIPO 'TRANSITION'

export default function Home() {
  const { activeSantuario } = useSantuario();

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  // 2. APLICAMOS EL SELLO DE AUTORIDAD (Tipado Explícito)
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
        ) : activeSantuario === 'tienda' ? ( // <-- CONDICIÓN AÑADIDA
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