"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClubTier } from '@/app/types';
import { clubVinoTiers } from '@/app/data/clubVinoData';
import PergaminoMaestro from '@/app/components/ui/PergaminoMaestro';

// --- Componentes Tácticos Locales ---
const TierCard: React.FC<{ tier: ClubTier; onSelect: () => void; isSelected: boolean }> = ({ tier, onSelect, isSelected }) => (
  <motion.div
    className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 ${isSelected ? 'border-bodega-gold bg-bodega-dark' : 'border-bodega-gold/10 hover:border-bodega-gold/50 hover:bg-black/20'}`}
    onClick={onSelect}
    layout
  >
    <h2 className="text-2xl font-bold text-bodega-gold">{tier.nombre}</h2>
    <p className="text-bodega-stone/70 mt-2 text-sm">{tier.descripcion}</p>
    {/* EL LLAMADO A LA COFRADÍA */}
    <div className="mt-4 text-right text-bodega-gold hover:text-white transition-colors font-bold">
      Ver Privilegios &rarr;
    </div>
  </motion.div>
);

const TierDetailDisplay: React.FC<{ tier: ClubTier }> = ({ tier }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ nombre, email, telefono, tier: tier.id });
        setIsSubmitted(true);
    };

    return (
        <motion.div
            className="w-full max-w-2xl bg-black/50 backdrop-blur-md border border-bodega-gold/20 rounded-2xl p-8 flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <AnimatePresence mode="wait">
            {isSubmitted ? (
                <motion.div key="success" initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-12">
                     <h2 className="text-3xl font-bold text-green-400">¡Juramento Aceptado!</h2>
                    <p className="mt-4 text-white/80 text-lg">Bienvenido a la Cofradía, Guardián. Tus privilegios han sido activados.</p>
                </motion.div>
            ) : (
                <motion.div key="form" exit={{opacity: 0}}>
                    <h3 className="text-3xl font-serif text-bodega-gold text-center">{tier.nombre}</h3>
                    <div className="border-t border-bodega-gold/10 my-6"></div>
                    <ul className="space-y-4 text-bodega-stone text-lg">
                        {tier.beneficios.map((beneficio, i) => (
                            <motion.li key={i} className="flex items-start gap-x-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                                <svg className="w-6 h-6 text-bodega-gold/80 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{beneficio}</span>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="border-t border-bodega-gold/10 my-6"></div>
                    {/* EL JURAMENTO */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Nombre y Apellido" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full bg-bodega-dark/50 text-bodega-ivory p-3 rounded-md border border-bodega-gold/20 focus:ring-2 focus:ring-bodega-gold/50 focus:outline-none transition" />
                        <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-bodega-dark/50 text-bodega-ivory p-3 rounded-md border border-bodega-gold/20 focus:ring-2 focus:ring-bodega-gold/50 focus:outline-none transition" />
                        <input type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required className="w-full bg-bodega-dark/50 text-bodega-ivory p-3 rounded-md border border-bodega-gold/20 focus:ring-2 focus:ring-bodega-gold/50 focus:outline-none transition" />
                        <motion.button type="submit" className="w-full bg-bodega-gold text-bodega-dark font-bold py-3 rounded-lg text-lg hover:bg-white transition-colors" whileTap={{ scale: 0.95 }}>
                            UNIRSE A LA COFRADÍA
                        </motion.button>
                    </form>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    );
};

const ClubVinoSantuario: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<ClubTier | null>(null);

  return (
    <section className="flex w-full h-screen bg-black text-white pt-20 overflow-hidden">
      <div className="w-1/3 h-full flex-shrink-0">
        <PergaminoMaestro>
            <h1 className="text-4xl font-bold text-bodega-gold mb-8">El Círculo Interno</h1>
            <div className="space-y-6">
              {clubVinoTiers.map((tier: ClubTier) => (
                <TierCard 
                  key={tier.id} 
                  tier={tier}
                  isSelected={selectedTier?.id === tier.id}
                  onSelect={() => setSelectedTier(tier)}
                />
              ))}
            </div>
        </PergaminoMaestro>
      </div>
      
      <div className="w-2/3 h-full relative">
        <div className="absolute inset-0 z-0">
            {/* MARISCAL: Aquí va el video que encuentres. Recomiendo 'bodega-barricas.mp4' o similar. */}
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/videos/bodega-barricas.mp4" type="video/mp4" />
            </video>
        </div>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center text-white/80">
          <AnimatePresence mode="wait">
            {selectedTier ? (
              <TierDetailDisplay 
                key={selectedTier.id} 
                tier={selectedTier}
              />
            ) : (
              <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-5xl font-serif text-bodega-gold/80">Bienvenido a la Cofradía</h2>
                <p className="mt-4 text-bodega-stone text-xl max-w-lg">
                  Selecciona un nivel en nuestro códice para descubrir los privilegios que te esperan.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ClubVinoSantuario;