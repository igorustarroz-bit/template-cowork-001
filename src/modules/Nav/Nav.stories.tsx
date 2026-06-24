import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "./Nav";

const meta = {
  title: "Módulos/Navegación",
  component: Nav,
  parameters: { layout: "fullscreen" },
  args: { activeLabel: "Inicio", hideOnScroll: true },
  argTypes: {
    activeLabel: { control: "select", options: ["Inicio", "EURO 6000", "Red de cajeros", "Programa EURO 6000 Plus"] },
    hideOnScroll: { control: "boolean" },
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

const Filler = () => (
  <div style={{ padding: "40px var(--wrapper-default, 32px)" }}>
    <h1 className="type-title-04 text-sem-texts-base">Contenido de ejemplo</h1>
    <p className="type-body-03 text-sem-texts-neutral-1" style={{ maxWidth: 680, marginTop: 16 }}>
      Haz scroll hacia abajo y la navegación se oculta; al subir, reaparece.
      Pulsa «EURO 6000», «Red de cajeros» o «Programa EURO 6000 Plus» para abrir su
      menú (solo uno a la vez; se cierra con Esc o clic fuera).
    </p>
    <div style={{ height: 1800 }} />
    <p className="type-body-03 text-sem-texts-neutral-1">Fin del contenido.</p>
  </div>
);

export const Default: Story = {
  render: (args) => (
    <div className="bg-sem-backgrounds-base" style={{ minHeight: "100vh" }}>
      <Nav {...args} />
      <Filler />
    </div>
  ),
};

/** Estado con el dropdown de «EURO 6000» abierto. */
export const ConDropdown: Story = {
  args: { activeLabel: "EURO 6000" },
  render: (args) => (
    <div className="bg-sem-backgrounds-base" style={{ minHeight: "100vh" }}>
      <Nav {...args} />
      <Filler />
    </div>
  ),
};
