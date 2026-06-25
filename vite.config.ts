import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // `svgr` permite importar SVG como componentes React: `import Logo from "./logo.svg?react"`.
  // Los SVG deben usar `currentColor` para que el color lo ponga el token (regla: vector = slot).
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
