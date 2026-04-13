import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Merge Firebase into a single chunk to ensure correct initialization order
          if (id.includes('firebase')) return 'vendor-firebase';

          // Split react-icons into per-set chunks so tree-shaking works
          if (id.includes('react-icons/io5')) return 'vendor-icons-io5';
          if (id.includes('react-icons/go')) return 'vendor-icons-go';
          if (id.includes('react-icons/lu')) return 'vendor-icons-lu';
          if (id.includes('react-icons/hi')) return 'vendor-icons-hi';
          if (id.includes('react-icons')) return 'vendor-icons-other';
          if (id.includes('lucide-react')) return 'vendor-lucide';

          // Combine React framework as a single chunk to ensure stability
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
             return 'vendor-react';
          }

          // Graphics / animations
          if (id.includes('ogl') || id.includes('gsap')) return 'vendor-graphics';
        }
      }
    }
  }
})
