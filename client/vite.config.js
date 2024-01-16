import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import pluginRewriteAll from 'vite-plugin-rewrite-all'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Esto mapea '@' a la carpeta 'src' en tu proyecto
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})