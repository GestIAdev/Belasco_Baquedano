import { Privilegio } from '@/app/types';

export const privilegiosData: Privilegio[] = [
  {
    id: 'desc-restaurante',
    icon: 'descuento',
    titulo: '15% Descuento en Restaurante',
    descripcion: 'Disfruta de un descuento permanente en todas tus visitas a nuestro restaurante de alta cocina.'
  },
  {
    id: 'env-trimestral',
    icon: 'envio',
    titulo: 'Envíos Trimestrales Exclusivos',
    descripcion: 'Recibe en tu hogar una selección curada por nuestro enólogo de vinos que no encontrarás en ningún otro lugar.'
  },
  {
    id: 'prev-lanzamiento',
    icon: 'preventa',
    titulo: 'Acceso a Preventas Únicas',
    descripcion: 'Sé el primero en adquirir nuestras cosechas más limitadas y vinos de parcela antes de que salgan al mercado.'
  },
  {
    id: 'evt-anual',
    icon: 'evento',
    titulo: 'Invitación a Eventos Privados',
    descripcion: 'Participa en catas verticales, cenas con el enólogo y eventos exclusivos solo para miembros de la Cofradía.'
  }
];