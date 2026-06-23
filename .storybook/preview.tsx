import type { Preview, Decorator } from "@storybook/react";
import "../src/index.css";

const THEME_ITEMS = [
  { value: "light-white", title: "Light · White" },
  { value: "light-grey", title: "Light · Grey" },
  { value: "dark-red-primary", title: "Dark · Red Primary" },
  { value: "dark-secondary-blue", title: "Dark · Secondary Blue" },
  { value: "dark-black-brand", title: "Dark · Black Brand" },
  { value: "dark-black-neutral", title: "Dark · Black Neutral" },
];

/** Breakpoints Euro6000 como viewports (selector en la toolbar). */
const VIEWPORTS = {
  xs: { name: "XS · 375", styles: { width: "375px", height: "1000px" } },
  sm: { name: "SM · 480", styles: { width: "480px", height: "1000px" } },
  m: { name: "M · 768", styles: { width: "768px", height: "1000px" } },
  lg: { name: "LG · 1024", styles: { width: "1024px", height: "1000px" } },
  xl: { name: "XL · 1440", styles: { width: "1440px", height: "1000px" } },
  xxl: { name: "XXL · 1620", styles: { width: "1620px", height: "1000px" } },
  xxxl: { name: "XXXL · 1920", styles: { width: "1920px", height: "1000px" } },
};

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light-white";
  const brand = context.globals.brand ?? "euro600";
  return (
    <div
      data-theme={theme}
      data-brand={brand}
      style={{ background: "var(--sem-backgrounds-base)", color: "var(--sem-texts-base)", minHeight: "100vh" }}
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
      toolbar: { title: "Modo de color", icon: "paintbrush", items: THEME_ITEMS, dynamicTitle: true },
    },
    brand: {
      description: "Marca (primitivas)",
      defaultValue: "euro600",
      toolbar: {
        title: "Marca", icon: "category",
        items: [{ value: "euro600", title: "Euro6000" }, { value: "bankinter", title: "Bankinter" }],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "centered",
    viewport: { viewports: VIEWPORTS },
  },
};

export default preview;
