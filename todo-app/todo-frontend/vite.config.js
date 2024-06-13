import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all available network interfaces
    hmr: {
      overlay: true, // Show full-screen errors during development
    },
  },
});
