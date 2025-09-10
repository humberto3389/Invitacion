import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false
      },
      mangle: true,
      keep_classnames: false,
      keep_fnames: false
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            if (id.includes('swiper')) {
              return 'gallery';
            }
          }
        }
      }
    }
  }
})
