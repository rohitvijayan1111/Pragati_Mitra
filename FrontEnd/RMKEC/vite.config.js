import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/Pragati_Mitra/",
  build: {
    outDir: 'build', // This specifies the output directory
  },
})

