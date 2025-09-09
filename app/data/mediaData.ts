import { MediaItem } from '@/app/types';

// Esta es nuestra armería de contenido visual para la demo.
// Mariscal: Asegúrate de que tienes imágenes y videos en estas rutas en tu carpeta /public.
export const mediaData: MediaItem[] = [
  // Videos
  { id: 'vid001', type: 'video', url: '/videos/tango_evento.mp4', title: 'Noche de Tango y Malbec', category: 'Videos', description: 'La pasión del tango se encuentra con el alma de nuestros vinos de guarda.', thumbnailUrl: '/images/video_placeholder.jpg' },
  { id: 'vid002', type: 'video', url: '/videos/erotic_wine.mp4', title: 'Erotic Wine Teaser', category: 'Videos', description: 'Un viaje sensorial que fusiona el arte de la enología con el de la performance.', thumbnailUrl: '/images/video_placeholder.jpg' },
  { id: 'vid003', type: 'video', url: '/videos/cata_enoturismo.mp4', title: 'Cata en la Sala Privada', category: 'Enoturismo', description: 'Una inmersión en los secretos mejor guardados de nuestras añadas.', thumbnailUrl: '/images/video_placeholder.jpg' },
  
  // Galería
  { id: 'img001', type: 'image', url: '/images/galeria/plato_arte.jpg', title: 'Arte en el Plato', category: 'Galería', description: 'Cada plato, una obra. Cada vino, su perfecto compañero.' },
  { id: 'img002', type: 'image', url: '/images/galeria/viniedo_amanecer.jpg', title: 'Amanecer en el Viñedo', category: 'Galería', description: 'Donde nace la magia. Los primeros rayos de sol sobre el terroir de Mendoza.' },
  { id: 'img003', type: 'image', url: '/images/galeria/detalle_copa.jpg', title: 'Reflejos Dorados', category: 'Galería', description: 'La promesa de una experiencia inolvidable en cada copa.' },
  
  // Enoturismo
  { id: 'eno001', type: 'image', url: '/images/enoturismo/visita_guiada.jpg', title: 'Recorrido por la Bodega', category: 'Enoturismo', description: 'Un viaje desde la uva hasta la botella, desvelando los secretos de nuestra forja.' },
  { id: 'eno002', type: 'image', url: '/images/enoturismo/picada_terraza.jpg', title: 'Atardecer en la Terraza', category: 'Enoturismo', description: 'El sol se despide tras los Andes, con una copa de nuestro Rosé como testigo.' },
];