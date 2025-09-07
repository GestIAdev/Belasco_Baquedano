import { useState, useMemo } from 'react';
import { Vino, TipoVino, MaridajeIdeal } from '@/app/types';

const getBounds = (vinos: Vino[]) => {
    if (vinos.length === 0) return { priceBounds: { min: 0, max: 100 }, vintageBounds: { min: 2000, max: 2024 } };
    const prices = vinos.map(v => v.precio);
    const vintages = vinos.map(v => v.anada);
    return {
      priceBounds: { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) },
      vintageBounds: { min: Math.min(...vintages), max: Math.max(...vintages) }
    };
};

export const useWineFilter = (initialVinos: Vino[]) => {
  const { priceBounds, vintageBounds } = useMemo(() => getBounds(initialVinos), [initialVinos]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipos, setSelectedTipos] = useState<TipoVino[]>([]);
  const [selectedVarietals, setSelectedVarietals] = useState<string[]>([]);
  const [selectedMaridajes, setSelectedMaridajes] = useState<MaridajeIdeal[]>([]);
  const [priceRange, setPriceRange] = useState(priceBounds);
  const [vintageRange, setVintageRange] = useState(vintageBounds);

  const filteredVinos = useMemo(() => {
    return initialVinos.filter(vino => {
      const nameMatch = searchTerm === '' || vino.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const tipoMatch = selectedTipos.length === 0 || selectedTipos.includes(vino.tipo);
      const varietalMatch = selectedVarietals.length === 0 || selectedVarietals.includes(vino.varietal);
      const maridajeMatch = selectedMaridajes.length === 0 || selectedMaridajes.some(m => vino.maridaje.includes(m));
      const priceMatch = vino.precio >= priceRange.min && vino.precio <= priceRange.max;
      const vintageMatch = vino.anada >= vintageRange.min && vino.anada <= vintageRange.max;
      return nameMatch && tipoMatch && varietalMatch && maridajeMatch && priceMatch && vintageMatch;
    });
  }, [searchTerm, selectedTipos, selectedVarietals, selectedMaridajes, priceRange, vintageRange, initialVinos]);

  // Se devuelve CADA función 'setter' para que el componente las pueda usar
  return {
    filteredVinos, searchTerm, selectedTipos, selectedVarietals, selectedMaridajes, priceRange, vintageRange,
    priceBounds, vintageBounds,
    setSearchTerm, 
    setSelectedTipos, // <-- AUTORIDAD RESTAURADA
    setSelectedVarietals, // <-- AUTORIDAD RESTAURADA
    setSelectedMaridajes, // <-- AUTORIDAD RESTAURADA
    setPriceRange, 
    setVintageRange,
  };
};