// en app/data/menuData.ts
    import { Plato } from '../components/sections/aromas/types';

    export const menuData: Plato[] = [
      {
        id: 1,
        nombre: 'Ojo de Bife con Papas Andinas',
        descripcion: '300g de nuestro mejor corte, madurado 30 días, sellado a las brasas y acompañado de papas andinas confitadas en hierbas.',
        precio: 95,
        categoria: 'principal',
        imageUrl: '/images/platos/ojo-de-bife.webp',
        alergenos: [],
        vino_maridaje_id: 'arga-reserva-2020', // ID del Arga de Belasco Reserva
      },
      {
        id: 3,
        nombre: 'Empanadas de Osobuco (2 u.)',
        descripcion: 'Cortadas a cuchillo y cocinadas a fuego lento durante 8 horas. Un secreto de la familia.',
        precio: 35,
        categoria: 'entrante',
        imageUrl: '/images/platos/empanadas.webp',
        alergenos: ['gluten'],
        vino_maridaje_id: 'belasco-malbec-2021',
      },
      {
        id: 4,
        nombre: 'Volcán de Dulce de Leche',
        descripcion: 'Con corazón líquido de dulce de leche casero y helado de crema americana.',
        precio: 40,
        categoria: 'postre',
        imageUrl: '/images/platos/volcan.webp',
        alergenos: ['gluten', 'lactosa'],
        vino_maridaje_id: null, // Sin maridaje recomendado
      },
    ];