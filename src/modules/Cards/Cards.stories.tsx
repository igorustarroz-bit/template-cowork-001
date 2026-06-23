import type { Meta, StoryObj } from "@storybook/react";
import { Cards } from "./Cards";

type Args = {
  heading: string; buttonLabel: string;
  card1Title: string; card1Desc: string;
  card2Title: string; card2Desc: string;
  card3Title: string; card3Desc: string;
};

const meta = {
  title: "Módulos/Cards",
  parameters: { layout: "fullscreen" },
  args: {
    heading: "Tarjetas y soluciones de pago",
    buttonLabel: "Ver todo",
    card1Title: "Solución destacada", card1Desc: "Descripción de la tarjeta destacada con más detalle.",
    card2Title: "Título de la card", card2Desc: "Detalle de la segunda tarjeta.",
    card3Title: "Título de la card", card3Desc: "Detalle de la tercera tarjeta.",
  },
  argTypes: {
    heading: { control: "text" }, buttonLabel: { control: "text" },
    card1Title: { control: "text" }, card1Desc: { control: "text" },
    card2Title: { control: "text" }, card2Desc: { control: "text" },
    card3Title: { control: "text" }, card3Desc: { control: "text" },
  },
  render: (a: Args) => (
    <Cards
      heading={a.heading}
      buttonLabel={a.buttonLabel}
      cards={[
        { title: a.card1Title, description: a.card1Desc },
        { title: a.card2Title, description: a.card2Desc },
        { title: a.card3Title, description: a.card3Desc },
      ]}
    />
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
