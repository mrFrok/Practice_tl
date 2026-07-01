import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // слушать 0.0.0.0 — нужно для запуска внутри Docker
    watch: {
      usePolling: true, // надёжный hot-reload для примонтированного тома
    },
  },
})
