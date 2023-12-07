import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  server: {
    watch: {
      usePolling: true
    }
  }
})
