import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5555',
          changeOrigin: true,
          secure:false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
})
