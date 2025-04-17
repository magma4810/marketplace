import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,  // Чтобы не импортировать describe, it, expect и т.д.
    environment: 'jsdom',  // или 'happy-dom' для тестов с DOM
    coverage: {
      provider: 'v8',  // или 'istanbul'
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: './src/setupTests.ts',  // Файл с настройками
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
