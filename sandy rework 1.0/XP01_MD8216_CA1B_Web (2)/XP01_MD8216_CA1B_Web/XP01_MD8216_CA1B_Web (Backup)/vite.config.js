import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [topLevelAwait()],
  base: './',

  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Main entry point
        page1: 'product.html', // Additional page 1
        page2: 'senpreorder.html', // Additional page 2
      },
    },
  },
});
