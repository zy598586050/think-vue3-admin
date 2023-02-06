import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Windicss from "vite-plugin-windicss";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Windicss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5985/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
