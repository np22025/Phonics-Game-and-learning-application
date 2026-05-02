import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for Phonics Quest.
// Lovable / Vercel / Netlify compatible. The base "./" makes the build work
// when served from any subpath (e.g. GitHub Pages project sites).
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2020",
  },
});
