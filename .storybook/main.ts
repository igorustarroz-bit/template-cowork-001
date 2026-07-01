import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    // docs desactivado dentro de essentials: se registra aparte (abajo) para
    // poder pasarle mdxPluginOptions (remark-gfm → tablas Markdown en MDX).
    { name: "@storybook/addon-essentials", options: { docs: false } },
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-docs",
      options: {
        // MDX2 (Storybook 7+) no interpreta tablas GFM (`| ... |`) por
        // defecto: sin este plugin se renderizan como texto plano en una
        // sola línea. Necesario para las tablas de Tokens/Propiedades en
        // los .mdx de tokens y componentes.
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
};

export default config;
