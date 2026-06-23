import type { Meta, StoryObj } from "@storybook/react";
import { Cards } from "./Cards";
import { semanticThemes, type SemanticTheme } from "../../tokens/semantic-colors";

const THEME_OPTIONS = ["inherit", ...semanticThemes.map((t) => t.slug)] as const;
const themeCtrl = { control: "select" as const, options: THEME_OPTIONS };
const norm = (v: string): SemanticTheme | undefined => (v === "inherit" ? undefined : (v as SemanticTheme));

type Args = {
  heading: string; buttonLabel: string;
  card1Title: string; card1Desc: string; card1Theme: string;
  card2Title: string; card2Desc: string; card2Theme: string;
  card3Title: string; card3Desc: string; card3Theme: string;
};

const meta = {
  title: "Módulos/Cards",
  parameters: { layout: "fullscreen" },
  args: {
    heading: "Tarjetas y soluciones de pago",
    buttonLabel: "Ver todo",
    card1Title: "Solución destacada", card1Desc: "Descripción de la tarjeta destacada con más detalle.", card1Theme: "light-white",
    card2Title: "Título de la card", card2Desc: "Detalle de la segunda tarjeta.", card2Theme: "light-white",
    card3Title: "Título de la card", card3Desc: "Detalle de la tercera tarjeta.", card3Theme: "light-white",
  },
  argTypes: {
    heading: { control: "text", name: "Texto · cabecera" },
    buttonLabel: { control: "text", name: "Texto · botón" },
    card1Theme: { ...themeCtrl, name: "Modo · card 1" },
    card1Title: { control: "text", name: "Texto · card 1 título" },
    card1Desc: { control: "text", name: "Texto · card 1 desc" },
    card2Theme: { ...themeCtrl, name: "Modo · card 2" },
    card2Title: { control: "text", name: "Texto · card 2 título" },
    card2Desc: { control: "text", name: "Texto · card 2 desc" },
    card3Theme: { ...themeCtrl, name: "Modo · card 3" },
    card3Title: { control: "text", name: "Texto · card 3 título" },
    card3Desc: { control: "text", name: "Texto · card 3 desc" },
  },
  render: (a: Args) => (
    <Cards
      heading={a.heading}
      buttonLabel={a.buttonLabel}
      cards={[
        { title: a.card1Title, description: a.card1Desc, theme: norm(a.card1Theme) },
        { title: a.card2Title, description: a.card2Desc, theme: norm(a.card2Theme) },
        { title: a.card3Title, description: a.card3Desc, theme: norm(a.card3Theme) },
      ]}
    />
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
