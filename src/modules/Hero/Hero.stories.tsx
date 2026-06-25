import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";
import { Nav } from "../Nav";

const meta = {
  title: "Módulos/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  args: {
    title: "EURO 6000 servicios y ventajas para el día a día",
    subtitle: "Saca dinero, paga con confianza y ahorra con EURO 6000 Plus. Más comodidad, más ventajas y la seguridad de operar desde tu banco de siempre.",
    autoplayMs: 5000,
  },
  argTypes: { title: { control: "text" }, subtitle: { control: "text" }, autoplayMs: { control: "number" } },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Hero con la navegación encima (modo Light-White sobre el hero rojo). */
export const ConNavegacion: Story = {
  render: (args) => (
    <div className="bg-sem-backgrounds-base" data-theme="dark-red-primary">
      <Nav hideOnScroll={false} />
      <Hero {...args} />
    </div>
  ),
};
