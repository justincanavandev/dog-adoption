import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
  },
  resolve: {
    alias: {
      "~": "/Users/justin/Desktop/dog-adoption/src",
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});
