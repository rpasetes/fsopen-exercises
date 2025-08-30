import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // (1031) using server proxy over cors for part3 backend
  // (1035) but first let's make sure cors works...
  // server: {
  //   proxy: {
  //     '/api': {
  //       target:'http://localhost:3001',
  //       changeOrigin: true
  //     }
  //   }
  // }
})
