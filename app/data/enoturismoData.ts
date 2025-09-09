import { Evento } from '@/app/types';
import { mediaData } from './mediaData';

export const enoturismoData: Evento[] = [
  {
    id: 'visita-brasil-2024',
    status: 'pasado',
    title: 'Visita Delegación Brasil',
    date: '10 de Septiembre, 2024',
    description: 'Una delegación de importadores brasileños exploró nuestros viñedos y bodegas, culminando en una cata exclusiva de nuestras cosechas más preciadas. Un puente entre culturas a través del vino.',
    coverImage: '/images/enoturismo/visita_guiada.jpg', // Reusing existing image
    gallery: [
      mediaData.find(m => m.id === 'eno001')!,
      mediaData.find(m => m.id === 'eno002')!,
      mediaData.find(m => m.id === 'vid003')!,
    ].filter(Boolean)
  },
  {
    id: 'municipalidad-mendoza-2023',
    status: 'pasado',
    title: 'Jornada con la Municipalidad de Mendoza',
    date: '15 de Noviembre, 2023',
    description: 'Colaboración y diálogo con autoridades locales para fortalecer el enoturismo en la región. Un compromiso con el desarrollo sostenible y la promoción de Mendoza como destino vitivinícola.',
    coverImage: '/images/enoturismo/picada_terraza.jpg', // Reusing existing image
    gallery: [
      mediaData.find(m => m.id === 'eno002')!,
      mediaData.find(m => m.id === 'eno001')!,
    ].filter(Boolean)
  },
];