import { Evento } from '@/app/types';
import { mediaData } from './mediaData';

export const eventosData: Evento[] = [
  {
    id: 'erotic-wine-2025',
    status: 'proximo',
    title: 'Erotic Wine Night 2025',
    date: '25 de Octubre, 2025',
    description: 'Una noche de misterio, seducción y vino. Despierta tus sentidos en una experiencia que fusiona el arte de la enología con el de la performance, explorando los aromas y texturas más provocadores de nuestras cosechas secretas.',
    coverImage: '/images/eventos/erotic_wine_cover.jpg',
    gallery: [
        mediaData.find(m => m.id === 'vid002')!,
        mediaData.find(m => m.id === 'img003')!
    ]
  },
  {
    id: 'tango-terraza-2024',
    status: 'pasado',
    title: 'Tango en la Terraza',
    date: '15 de Diciembre, 2024',
    description: 'El bandoneón, el Malbec y la Cordillera de los Andes como testigos. Una crónica de nuestra noche más memorable, donde la pasión del tango se encontró con el alma de nuestros vinos de guarda.',
    coverImage: '/images/eventos/tango_cover.jpg',
    gallery: [
        mediaData.find(m => m.id === 'vid001')!
    ]
  },
];