import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dynamicImport from "vite-plugin-dynamic-import";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ["**/*.md"],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 3024,
  },
});
