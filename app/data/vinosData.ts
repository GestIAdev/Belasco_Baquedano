import { Vino } from '@/app/types';

export const vinosData: Vino[] = [
  {
    id: 'arga-reserva-2020',
    nombre: 'Arga Reserva Malbec',
    añada: 2020,
    varietal: 'Malbec',
    descripcion: 'Un Malbec de alta gama, con notas de frutos rojos maduros, vainilla y tabaco. Crianza de 18 meses en barricas de roble francés.',
    precio: 45.00,
    stock: 120,
    notas_cata: 'Color rojo rubí intenso. Aromas complejos a ciruela, mora, especias y un toque ahumado. En boca es elegante, con taninos suaves y un final persistente.',
    maridaje: 'Carnes rojas asadas, quesos curados, guisos de caza.',
    imagen_url: '/images/vinos/arga-reserva.webp',
    aromas: [1, 8, 9], // IDs de aromas relevantes
  },
  {
    id: 'belasco-malbec-2021',
    nombre: 'Belasco Malbec Joven',
    añada: 2021,
    varietal: 'Malbec',
    descripcion: 'Un Malbec fresco y frutal, ideal para el consumo diario. Sin paso por madera, resalta la expresión varietal.',
    precio: 20.00,
    stock: 250,
    notas_cata: 'Color violeta brillante. Aromas a frambuesa y violetas. En boca es ligero, con taninos amables y un final frutal.',
    maridaje: 'Pastas, empanadas, carnes blancas.',
    imagen_url: '/images/vinos/belasco-joven.webp',
    aromas: [2, 5], // IDs de aromas relevantes
  },
];
