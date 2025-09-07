import { useState, useMemo, useEffect } from 'react';
import { Vino, TipoVino, MaridajeIdeal } from '@/app/types';

// Definiendo el tipo de divisa para todo el Códice
export type Currency = 'usd' | 'ars';

// La función ahora necesita saber en qué divisa calcular los límites
const getBounds = (vinos: Vino[], currency: Currency) => {
    if (vinos.length === 0) return { min: 0, max: 100 };
    // Leemos el precio correcto del objeto
    const prices = vinos.map(v => v.precio[currency]);
    return { 
      min: Math.floor(Math.min(...prices)), 
      max: Math.ceil(Math.max(...prices)) 
    };
};

export const useWineFilter = (initialVinos: Vino[]) => {
  // 1. AÑADIMOS ESTADO PARA CONTROLAR LA DIVISA ACTUAL
  const [currency, setCurrency] = useState<Currency>('usd');

  // 2. LOS LÍMITES DE PRECIO AHORA REACCIONAN AL CAMBIO DE DIVISA
  const priceBounds = useMemo(() => getBounds(initialVinos, currency), [initialVinos, currency]);

  const vintageBounds = useMemo(() => {
    if (initialVinos.length === 0) return { min: 2000, max: 2024 };
    const vintages = initialVinos.map(v => v.anada);
    return { min: Math.min(...vintages), max: Math.max(...vintages) };
  }, [initialVinos]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipos, setSelectedTipos] = useState<TipoVino[]>([]);
  const [selectedVarietals, setSelectedVarietals] = useState<string[]>([]);
  const [selectedMaridajes, setSelectedMaridajes] = useState<MaridajeIdeal[]>([]);
  const [priceRange, setPriceRange] = useState(priceBounds);
  const [vintageRange, setVintageRange] = useState(vintageBounds);

  // 3. SINCRONIZAMOS EL RANGO DEL SLIDER CUANDO LA DIVISA CAMBIA
  useEffect(() => {
    setPriceRange(priceBounds);
  }, [priceBounds]);

  const filteredVinos = useMemo(() => {
    return initialVinos.filter(vino => {
      const nameMatch = searchTerm === '' || vino.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const tipoMatch = selectedTipos.length === 0 || selectedTipos.includes(vino.tipo);
      const varietalMatch = selectedVarietals.length === 0 || selectedVarietals.includes(vino.varietal);
      const maridajeMatch = selectedMaridajes.length === 0 || selectedMaridajes.some(m => vino.maridaje.includes(m));
      // 4. LA CONDICIÓN DEL FILTRO AHORA LEE LA DIVISA CORRECTA
      const priceMatch = vino.precio[currency] >= priceRange.min && vino.precio[currency] <= priceRange.max;
      const vintageMatch = vino.anada >= vintageRange.min && vino.anada <= vintageRange.max;
      return nameMatch && tipoMatch && varietalMatch && maridajeMatch && priceMatch && vintageMatch;
    });
  }, [searchTerm, selectedTipos, selectedVarietals, selectedMaridajes, priceRange, vintageRange, initialVinos, currency]);

  const handleToggle = <T extends string>(setter: React.Dispatch<React.SetStateAction<T[]>>, value: T) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  // 5. EXPONEMOS LA DIVISA Y SU 'SETTER' PARA QUE EL SANTUARIO PUEDA CONTROLARLA
  return {
    filteredVinos, searchTerm, selectedTipos, selectedVarietals, selectedMaridajes, priceRange, vintageRange,
    priceBounds, vintageBounds, currency,
    setSearchTerm, handleToggle, setPriceRange, setVintageRange, setCurrency,
    setSelectedTipos, setSelectedVarietals, setSelectedMaridajes,
  };
};