import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// standard Vite config, nothing fancy
export default defineConfig({
  plugins: [react()],
})
