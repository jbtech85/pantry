import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), '..'), '');
  const clientPort = parseInt(env.CLIENT_PORT || process.env.CLIENT_PORT!);
  const serverPort = parseInt(env.SERVER_PORT || process.env.SERVER_PORT!);

  return {
    base: "/",
    plugins: [
      react()
    ],
    preview: {
      port: clientPort,
      strictPort: true
    },
    server: {
      proxy: {
        '/api': {
          target: `http://api:${serverPort}`,
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/,'')
        }        
      },
      port: clientPort,
      strictPort: true,
      host: true,
      allowedHosts: ['client', 'pantryclient'],
      watch: {
        usePolling: true
      }
    }
  };
});
