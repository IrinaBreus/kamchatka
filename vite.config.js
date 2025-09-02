// для многостраничных сайтов

// import { dirname, resolve } from 'node:path'
// import { fileURLToPath } from 'node:url'
// import { defineConfig } from 'vite'

// const __dirname = dirname(fileURLToPath(import.meta.url))

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html'),
//         // nested: resolve(__dirname, 'nested/index.html'),
//       },
//     },
//   },
// })


// оптимизация изображений

import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      // Опции (можно настроить качество и формат)
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80, lossless: false, convert: 'webp' },
    }),
  ],
});
