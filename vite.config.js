import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User site (rajdeep-g.github.io) is served from the domain root, so base is '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
