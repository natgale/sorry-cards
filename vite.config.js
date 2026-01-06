import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/sorry-cards/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/index.html'
    }
  },
  server: {
    open: true
  }
})