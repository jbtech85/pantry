import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    react()
  ],
  preview: {
    port: 5100,
    strictPort: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4100',
        changeOrigin:true
      }
    },
    port: 5100,
    strictPort: true,
    host: "0.0.0.0",
    watch: {
      usePolling: true
    }
  }
})
