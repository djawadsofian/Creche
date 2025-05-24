import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/users': {
        target: 'http://192.168.15.50:8080',
        changeOrigin: true,
        secure: false
      },
      '/login': {
        target: 'http://192.168.15.50:8080',
        changeOrigin: true,
        secure: false
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
