import { defineConfig } from "vite";
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

import react from "@vitejs/plugin-react";

import path from "path";

export default defineConfig({
  
  plugins: [react(),TanStackRouterVite()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@server": path.resolve(__dirname, "../server/"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
