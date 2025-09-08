import { ClubTier } from '@/app/types';

export const clubVinoTiers: ClubTier[] = [
  {
    id: 'iniciado',
    nombre: 'Iniciado de Belasco',
    descripcion: 'La puerta de entrada a un mundo de privilegios. Perfecto para el entusiasta que desea explorar los secretos de nuestra bodega.',
    beneficios: [
      'Descuento del 15% en tu próxima visita al restaurante.',
      'Acceso prioritario a nuevos lanzamientos de vinos.',
      'Invitación a un evento anual exclusivo para miembros.',
      'Boletín mensual con inteligencia de la viña.',
    ],
  },
  {
    id: 'guardian',
    nombre: 'Guardián de la Cosecha',
    descripcion: 'Para el conocedor que busca una conexión más profunda. Un viaje al corazón de nuestras cosechas más preciadas.',
    beneficios: [
      'Todos los privilegios de Iniciado.',
      'Acceso a la preventa de vinos de parcela única.',
      'Dos visitas guiadas privadas al año.',
      'Acceso a la biblioteca de añadas antiguas para catas.',
    ],
  },
];