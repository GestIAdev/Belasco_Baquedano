export interface Aroma {
  id: number | string;
  nombre: string;
  imageUrl: string;
  descripcion: string;
}

// El Manifiesto Cósmico, ahora en su hogar definitivo
export const aromasData: Aroma[] = [
  // Fila Central (Protagonistas - sin cambios)
  { id: 8, nombre: 'Vainilla', imageUrl: '/images/aromas/vainilla.jpg', descripcion: 'El dulce beso del roble francés, resultado de una crianza paciente.' },
  { id: 9, nombre: 'Cuero', imageUrl: '/images/aromas/cuero.jpg', descripcion: 'Un aroma terciario noble, indicativo de evolución y guarda.' },
  { id: 10, nombre: 'Cedro', imageUrl: '/images/aromas/cedro.jpg', descripcion: 'Elegantes notas de madera fina y caja de puros.' },
  
  // Fila Superior (AJUSTADA - desplazadas hacia abajo e izquierda)
  { id: 1, nombre: 'Ciruela Negra', imageUrl: '/images/aromas/ciruela_negra.jpg', descripcion: 'Una nota profunda y madura, característica de los grandes Malbec.' }, // Baja un poco
  { id: 2, nombre: 'Fresa', imageUrl: '/images/aromas/fresa.jpg', descripcion: 'Un toque de dulzura y frescura que evoca frutas rojas de verano.' }, // Baja más
  { id: 3, nombre: 'Cereza', imageUrl: '/images/aromas/cereza.jpg', descripcion: 'Vibrante y jugosa, una explosión de fruta en nariz.' }, // Baja y se mueve un poco izquierda
  { id: 4, nombre: 'Frambuesa', imageUrl: '/images/aromas/frambuesa.jpg', descripcion: 'Delicada y perfumada, aporta elegancia al conjunto.' }, // Baja y se mueve un poco izquierda
  { id: 5, nombre: 'Violeta', imageUrl: '/images/aromas/violeta.jpg', descripcion: 'La firma floral inconfundible de los Malbec de altura de Mendoza.' }, // Baja un poco

  // Fila Inferior (sin cambios - ya estaban bien posicionadas)
  { id: 11, nombre: 'Miel', imageUrl: '/images/aromas/miel.jpg', descripcion: 'Un toque de dulzor y complejidad que aparece con el tiempo.' },
  { id: 12, nombre: 'Levadura', imageUrl: '/images/aromas/levadura.jpg', descripcion: 'Un recuerdo sutil del proceso de fermentación, aportando carácter.' },
  { id: 13, nombre: 'Romero', imageUrl: '/images/aromas/romero.jpg', descripcion: 'Una especia herbal y mediterránea que añade una dimensión intrigante.' },
  { id: 14, nombre: 'Alquitrán', imageUrl: '/images/aromas/alquitran.jpg', descripcion: 'Una nota mineral intensa, presente en vinos de gran estructura.' },
  { id: 15, nombre: 'Vinagre', imageUrl: '/images/aromas/vinagre.jpg', descripcion: 'Una lección sobre los defectos: el avinagramiento es una señal de alerta.' },
  
  // Relleno lateral (sin cambios)
  { id: 6, nombre: 'Rosa', imageUrl: '/images/aromas/rosa.jpg', descripcion: 'Un aroma clásico que aporta una capa de complejidad y romanticismo.' },
  { id: 7, nombre: 'Menta', imageUrl: '/images/aromas/menta.jpg', descripcion: 'Una nota herbal y refrescante que levanta el perfil del vino.' },
];

export type TipoVino = "Tinto" | "Blanco" | "Rosado" | "Espumoso";
export type MaridajeIdeal = "Carnes Rojas" | "Pescados y Mariscos" | "Pastas" | "Quesos" | "Postres" | "Comida Asiática";

export interface Vino {
  id: number | string;
  nombre: string;
  anada: number;
  tipo: TipoVino;
  varietal: string;
  descripcion: string;
  // LA BÓVEDA BIMONETARIA
  precio: {
    usd: number;
    ars: number;
  };
  stock: number;
  notas_cata: string;
  maridaje: MaridajeIdeal[];
  imagen_url: string;
  aromas: (number | string)[];
}

export interface Plato {
  id: number | string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'entrante' | 'principal' | 'postre' | 'menu';
  imageUrl: string; // Imagen Protagonista
  imagenMiniatura: string; // Para el hover
  historiaPlato?: string; // Opcional
  alergenos: string[];
  reseñas?: { autor: string; comentario: string; rating: number }[]; // Opcional
  vino_maridaje_id: number | string | null;
}

// Nuevas interfaces para la navegación del menú
export type SantuarioId = 'aromas' | 'tienda' | 'restaurante' | 'club';
export type HologramId = 'history' | 'enoturismo' | 'contacto' | 'reservations';

interface SantuarioLink {
  id: SantuarioId;
  title: string;
  type: 'santuario';
}

interface HologramLink {
  id: HologramId;
  title: string;
  type: 'hologram';
}

export type NavLink = SantuarioLink | HologramLink;

export type MediaCategory = 'Videos' | 'Galería' | 'Enoturismo';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  category: MediaCategory;
  description?: string;
  thumbnailUrl?: string; // Added for video thumbnails
}

export interface Evento {
  id: string;
  status: 'proximo' | 'pasado';
  title: string;
  date: string;
  description: string;
  coverImage: string;
  gallery: MediaItem[]; // Galería de MediaItems para el Holograma
}

export interface MenuSubcategory {
  id: string;
  nombre: string;
  platos: Plato[];
}

export interface MenuChapter {
  id: string;
  nombre: string;
  subcategorias?: MenuSubcategory[];
  platos?: Plato[];
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  date: string;
  source?: string; // Fuente de la noticia (ej. "La Nación")
  url?: string; // Enlace al artículo original
}

export interface ClubTier {
  id: string;
  nombre: string;
  // EL PRECIO HA SIDO ANIQUILADO
  descripcion: string;
  beneficios: string[];
}

export interface Privilegio {
  id: string;
  icon: 'descuento' | 'envio' | 'evento' | 'preventa';
  titulo: string;
  descripcion: string;
}