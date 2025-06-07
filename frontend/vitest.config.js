/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["src/setupTests.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["html", "text-summary", "text", "lcov"],
      include: ["src/components/*.{ts,tsx}"],
      clean: true,
      thresholds: {
        lines: 30,
        functions: 30,
        branches: 30,
        statements: 30,
      },
    },
    globals: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
