import { MenuChapter } from '@/app/types';

export const menuData: MenuChapter[] = [
  {
    id: 'a-la-carta',
    nombre: 'A la Carta',
    subcategorias: [
      {
        id: 'entrantes',
        nombre: 'Entrantes',
        platos: [
          {
            id: 3,
            nombre: 'Empanadas de Osobuco (2 u.)',
            descripcion: 'Cortadas a cuchillo y cocinadas a fuego lento durante 8 horas. Un secreto de la familia.',
            precio: 35,
            categoria: 'entrante',
            imageUrl: '/images/platos/empanadas.webp',
            imagenMiniatura: '/images/platos/empanadas-thumb.webp',
            historiaPlato: 'La receta de estas empanadas ha pasado de generación en generación en la familia Belasco.',
            alergenos: ['gluten'],
            reseñas: [
              { autor: 'Ana G.', comentario: 'Increíblemente jugosas. Se nota la cocción lenta.', rating: 5 }
            ],
            vino_maridaje_id: 'belasco-malbec-2021',
          },
        ],
      },
      {
        id: 'principales',
        nombre: 'Platos Principales',
        platos: [
          {
            id: 1,
            nombre: 'Ojo de Bife con Papas Andinas',
            descripcion: '300g de nuestro mejor corte, madurado 30 días, sellado a las brasas y acompañado de papas andinas confitadas en hierbas.',
            precio: 95,
            categoria: 'principal',
            imageUrl: '/images/platos/ojo-de-bife.webp',
            imagenMiniatura: '/images/platos/ojo-de-bife-thumb.webp',
            historiaPlato: 'Este corte es el preferido de nuestro chef, inspirado en las parrillas tradicionales de Mendoza.',
            alergenos: [],
            reseñas: [
              { autor: 'GourmetViajero', comentario: 'El mejor bife que he probado en años. La maduración es perfecta.', rating: 5 },
              { autor: 'CriticoLocal', comentario: 'Un plato contundente y lleno de sabor. Recomendado.', rating: 4 }
            ],
            vino_maridaje_id: 'arga-reserva-2020',
          },
        ],
      },
      {
        id: 'postres',
        nombre: 'Postres',
        platos: [
          {
            id: 4,
            nombre: 'Volcán de Dulce de Leche',
            descripcion: 'Con corazón líquido de dulce de leche casero y helado de crema americana.',
            precio: 40,
            categoria: 'postre',
            imageUrl: '/images/platos/volcan.webp',
            imagenMiniatura: '/images/platos/volcan-thumb.webp',
            alergenos: ['gluten', 'lactosa'],
            vino_maridaje_id: null,
          },
        ],
      },
    ],
  },
  {
    id: 'menus',
    nombre: 'Nuestros Menus',
    platos: [
      {
        id: 100,
        nombre: 'Menú del dia del padre',
        descripcion: 'Una selección de nuestros platos más emblemáticos, maridados con vinos de nuestra bodega.',
        precio: 150,
        categoria: 'menu',
        imageUrl: '/images/platos/menu-diapadre.webp',
        imagenMiniatura: '/images/platos/menu-diapadre-min.webp',
        historiaPlato: 'Diseñado para ofrecer una experiencia completa de la gastronomía mendocina.',
        alergenos: [],
        reseñas: [],
        vino_maridaje_id: null,
      },
      {
        id: 101,
        nombre: 'Menú del Chef (Temporada)',
        descripcion: 'Una propuesta única que celebra los ingredientes de estación, creada por nuestro Chef Ejecutivo.',
        precio: 120,
        categoria: 'menu',
        imageUrl: '/images/platos/menudia.webp',
        imagenMiniatura: '/images/platos/menudia-min.webp',
        historiaPlato: 'Una sorpresa culinaria que cambia con cada estación.',
        alergenos: [],
        reseñas: [],
        vino_maridaje_id: null,
      },
    ],
  },
  {
    id: 'vinos-bebidas',
    nombre: 'Vinos / Bebidas',
    // This chapter will directly list wines, not subcategories of dishes
    // For now, it will be a placeholder, as the vinosData is separate.
    // Later, we might integrate vinosData here or link to the shop.
  },
];