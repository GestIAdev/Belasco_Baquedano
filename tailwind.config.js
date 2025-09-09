/** @type {import('tailwindcss').Config} */
module.exports = {
  // Dejamos el 'content' vacío o con las rutas básicas.
  // Next.js y PostCSS son lo suficientemente inteligentes para saber qué escanear.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Mantenemos esto vacío para que todas nuestras extensiones de tema
      // sigan viviendo en el archivo globals.css, como dicta nuestra doctrina.
    },
  },
  // --- LA DIRECTIVA DE COMBATE ---
  // Aquí es donde desplegamos nuestra artillería pesada.
  // Este es el único propósito de este archivo.
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // Aquí podríamos añadir futuras armas especializadas si la misión lo requiere.
  ],
}