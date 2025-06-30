import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/projet-final-react/', // Important pour GitHub Pages
  plugins: [react()],
  server: {
    port: 5174
  }
})
