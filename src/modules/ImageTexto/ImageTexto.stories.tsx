import type { Meta, StoryObj } from "@storybook/react";
import { ImageTexto } from "./ImageTexto";

const meta = {
  title: "Módulos/Image + Texto",
  component: ImageTexto,
  parameters: { layout: "fullscreen" },
  args: {
    title: "Programa EURO 6000 Plus: compra como siempre, ahorra como nunca",
    description: "Activa el Programa EURO 6000 Plus y disfruta de descuentos y cashback en cientos de marcas y tiendas que utilizas cada día.",
    buttonLabel: "Activar programa",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    buttonLabel: { control: "text" },
    image: { control: "text" },
  },
} satisfies Meta<typeof ImageTexto>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
