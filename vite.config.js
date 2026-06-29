import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,           // no need to import describe/it/expect
    environment: 'jsdom',    // simulates browser DOM in Node
    setupFiles: './src/test/setup.ts',
  },
})