import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: "/",
    plugins: [
      react()
    ],
    preview: {
      port: process.env.CLIENT_PORT,
      strictPort: true
    },
    server: {
      proxy: {
        '/api': {
          target: `http://pantryapi:${env.SERVER_PORT}`,
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/,'')
        }        
      },
      port: env.CLIENT_PORT,
      strictPort: true,
      host: true,
      watch: {
        usePolling: true
      }
    }
  };
});
