import type { Preview, Decorator } from "@storybook/react";
import "../src/index.css";

/** Temas semánticos (data-theme) y marca (data-brand) como globals de la toolbar. */
const THEME_ITEMS = [
  { value: "light-white", title: "Light · White" },
  { value: "light-grey", title: "Light · Grey" },
  { value: "dark-red-primary", title: "Dark · Red Primary" },
  { value: "dark-secondary-blue", title: "Dark · Secondary Blue" },
  { value: "dark-black-brand", title: "Dark · Black Brand" },
  { value: "dark-black-neutral", title: "Dark · Black Neutral" },
];

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light-white";
  const brand = context.globals.brand ?? "euro600";
  return (
    <div
      data-theme={theme}
      data-brand={brand}
      style={{
        background: "var(--sem-backgrounds-base)",
        color: "var(--sem-texts-base)",
        minHeight: "100vh",
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Modo de color (tema semántico)",
      defaultValue: "light-white",
      toolbar: {
        title: "Modo de color",
        icon: "paintbrush",
        items: THEME_ITEMS,
        dynamicTitle: true,
      },
    },
    brand: {
      description: "Marca (primitivas)",
      defaultValue: "euro600",
      toolbar: {
        title: "Marca",
        icon: "category",
        items: [
          { value: "euro600", title: "Euro6000" },
          { value: "bankinter", title: "Bankinter" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "centered",
  },
};

export default preview;
