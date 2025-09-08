import { MediaItem } from '@/app/types';

// Nuestra armería de contenido visual para la demo
export const mediaData: MediaItem[] = [
  // Videos
  { id: 'vid001', type: 'video', url: '/videos/tango_evento.mp4', title: 'Noche de Tango y Malbec', category: 'Videos' },
  { id: 'vid002', type: 'video', url: '/videos/erotic_wine.mp4', title: 'Erotic Wine Teaser', category: 'Videos' },
  { id: 'vid003', type: 'video', url: '/videos/cata_enoturismo.mp4', title: 'Cata en la Sala Privada', category: 'Enoturismo' },
  
  // Galería
  { id: 'img001', type: 'image', url: '/images/galeria/plato_arte.jpg', title: 'Arte en el Plato', category: 'Galería' },
  { id: 'img002', type: 'image', url: '/images/galeria/viniedo_amanecer.jpg', title: 'Amanecer en el Viñedo', category: 'Galería' },
  { id: 'img003', type: 'image', url: '/images/galeria/detalle_copa.jpg', title: 'Reflejos Dorados', category: 'Galería' },
  
  // Enoturismo
  { id: 'eno001', type: 'image', url: '/images/enoturismo/visita_guiada.jpg', title: 'Recorrido por la Bodega', category: 'Enoturismo' },
  { id: 'eno002', type: 'image', url: '/images/enoturismo/picada_terraza.jpg', title: 'Atardecer en la Terraza', category: 'Enoturismo' },
];