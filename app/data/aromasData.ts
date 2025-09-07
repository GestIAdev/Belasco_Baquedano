export interface Aroma {
  id: number;
  nombre: string;
  color: string; // El color para las burbujas del Altar
  imageUrl: string; // La imagen para el Santuario de Aromas
  descripcion: string;
  size: string;
  position: string;
}

export const aromasData: Aroma[] = [
    // --- Frutas Rojas y Florales ---
    { id: 1, nombre: 'Ciruela Negra', color: '#5e2129', imageUrl: '/images/aromas/ciruela_negra.jpg', descripcion: 'Una nota profunda y madura, característica de los grandes Malbec.', size: 'w-36 h-36', position: 'top-[28%] left-[18%]' },
    { id: 2, nombre: 'Fresa', color: '#ff7675', imageUrl: '/images/aromas/fresa.jpg', descripcion: 'Un toque de dulzura y frescura que evoca frutas rojas de verano.', size: 'w-32 h-32', position: 'top-[20%] left-[38%]' },
    { id: 3, nombre: 'Cereza', color: '#d63031', imageUrl: '/images/aromas/cereza.jpg', descripcion: 'Vibrante y jugosa, una explosión de fruta en nariz.', size: 'w-32 h-32', position: 'top-[16%] left-[55%]' },
    { id: 4, nombre: 'Frambuesa', color: '#e84393', imageUrl: '/images/aromas/frambuesa.jpg', descripcion: 'Delicada y perfumada, aporta elegancia al conjunto.', size: 'w-32 h-32', position: 'top-[20%] left-[75%]' },
    { id: 5, nombre: 'Violeta', color: '#6c5ce7', imageUrl: '/images/aromas/violeta.jpg', descripcion: 'La firma floral inconfundible de los Malbec de altura de Mendoza.', size: 'w-36 h-36', position: 'top-[28%] left-[90%]' },
    { id: 6, nombre: 'Rosa', color: '#fd79a8', imageUrl: '/images/aromas/rosa.jpg', descripcion: 'Un aroma clásico que aporta una capa de complejidad y romanticismo.', size: 'w-28 h-28', position: 'top-[50%] left-[8%]' },

    // --- Herbales y Frescos ---
    { id: 7, nombre: 'Menta', color: '#00b894', imageUrl: '/images/aromas/menta.jpg', descripcion: 'Una nota herbal y refrescante que levanta el perfil del vino.', size: 'w-28 h-28', position: 'top-[50%] left-[92%]' },

    // --- Crianza y Terciarios (Protagonistas) ---
    { id: 8, nombre: 'Vainilla', color: '#f Diciembreb6', imageUrl: '/images/aromas/vainilla.jpg', descripcion: 'El dulce beso del roble francés, resultado de una crianza paciente.', size: 'w-44 h-44', position: 'top-[50%] left-[50%]' },
    { id: 9, nombre: 'Cuero', color: '#8d6e63', imageUrl: '/images/aromas/cuero.jpg', descripcion: 'Un aroma terciario noble, indicativo de evolución y guarda.', size: 'w-40 h-40', position: 'top-[45%] left-[30%]' },
    { id: 10, nombre: 'Cedro', color: '#a1887f', imageUrl: '/images/aromas/cedro.jpg', descripcion: 'Elegantes notas de madera fina y caja de puros.', size: 'w-40 h-40', position: 'top-[45%] left-[70%]' },

    // --- Dulces y Complejos ---
    { id: 11, nombre: 'Miel', color: '#f9ca24', imageUrl: '/images/aromas/miel.jpg', descripcion: 'Un toque de dulzor y complejidad que aparece con el tiempo.', size: 'w-32 h-32', position: 'top-[78%] left-[15%]' },
    { id: 12, nombre: 'Levadura', color: '#ffeaa7', imageUrl: '/images/aromas/levadura.jpg', descripcion: 'Un recuerdo sutil del proceso de fermentación, aportando carácter.', size: 'w-36 h-36', position: 'top-[82%] left-[35%]' },

    // --- Especiados y Minerales ---
    { id: 13, nombre: 'Romero', color: '#2d3436', imageUrl: '/images/aromas/romero.jpg', descripcion: 'Una especia herbal y mediterránea que añade una dimensión intrigante.', size: 'w-32 h-32', position: 'top-[88%] left-[58%]' },
    { id: 14, nombre: 'Alquitrán', color: '#2c3e50', imageUrl: '/images/aromas/alquitran.jpg', descripcion: 'Una nota mineral intensa, presente en vinos de gran estructura.', size: 'w-36 h-36', position: 'top-[82%] left-[78%]' },

    // --- Defectos (El Lado Oscuro) ---
    { id: 15, nombre: 'Vinagre', color: '#b2bec3', imageUrl: '/images/aromas/vinagre.jpg', descripcion: 'Una lección sobre los defectos: el avinagramiento es una señal de alerta.', size: 'w-32 h-32', position: 'top-[78%] left-[90%]' },
];