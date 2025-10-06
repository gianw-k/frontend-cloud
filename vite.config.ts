import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/cursos': {
        target: 'http://microservicios-lb-635095926.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cursos/, '/cursos'),
      },
      '/api/estudiantes': {
        target: 'http://microservicios-lb-635095926.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/estudiantes/, '/estudiantes'),
      },
      '/api/inscripciones': {
        target: 'http://microservicios-lb-635095926.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/inscripciones/, '/inscripciones'),
      },
      '/api/agregador': {
        target: 'http://microservicios-lb-635095926.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/agregador/, '/agregador'),
      },
    },
  },
})

