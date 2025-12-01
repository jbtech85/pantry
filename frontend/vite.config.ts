import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react()
  ],
  preview: {
    port: 5100,
    strictPort: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://pantryapi:4100',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    },
    port: 5100,
    strictPort: true,
    host: true,
    watch: {
      usePolling: true
    }
  }
})
