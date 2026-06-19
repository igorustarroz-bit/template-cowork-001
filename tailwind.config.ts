import type { Config } from "tailwindcss";

/**
 * La estética la definen los Figmas, no Tailwind.
 * Los tokens (colores, tipografía, spacing) se inyectan como CSS custom
 * properties desde src/tokens y se referencian aquí vía var(--token).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Se completará al implementar los tokens (Fase 1).
      },
    },
  },
  plugins: [],
};

export default config;
