import type { Meta, StoryObj } from "@storybook/react";
import { Cards } from "./Cards";
import { semanticThemes, type SemanticTheme } from "../../tokens/semantic-colors";

const THEME_OPTIONS: string[] = ["inherit", ...semanticThemes.map((t) => t.slug)];
const norm = (v?: string): SemanticTheme | undefined => (!v || v === "inherit" ? undefined : (v as SemanticTheme));

interface Args {
  heading: string;
  buttonLabel: string;
  card1Title: string; card1Desc: string; card1Theme: string;
  card2Title: string; card2Desc: string; card2Theme: string;
  card3Title: string; card3Desc: string; card3Theme: string;
}

const meta: Meta<Args> = {
  title: "Módulos/Cards",
  component: Cards as unknown as React.ComponentType<Args>,
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
    card1Theme: { control: "select", options: THEME_OPTIONS, name: "Modo · card 1" },
    card1Title: { control: "text", name: "Texto · card 1 título" },
    card1Desc: { control: "text", name: "Texto · card 1 desc" },
    card2Theme: { control: "select", options: THEME_OPTIONS, name: "Modo · card 2" },
    card2Title: { control: "text", name: "Texto · card 2 título" },
    card2Desc: { control: "text", name: "Texto · card 2 desc" },
    card3Theme: { control: "select", options: THEME_OPTIONS, name: "Modo · card 3" },
    card3Title: { control: "text", name: "Texto · card 3 título" },
    card3Desc: { control: "text", name: "Texto · card 3 desc" },
  },
  render: (a) => (
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
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

/** Demo con ancho fijo de 1440 (para ver bien el comportamiento en la página de docs). */
export const Demo1440: Story = {
  name: "Demo (1440)",
  render: (a) => (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <div style={{ width: 1440 }}>
        <Cards
          heading={a.heading}
          buttonLabel={a.buttonLabel}
          cards={[
            { title: a.card1Title, description: a.card1Desc, theme: norm(a.card1Theme) },
            { title: a.card2Title, description: a.card2Desc, theme: norm(a.card2Theme) },
            { title: a.card3Title, description: a.card3Desc, theme: norm(a.card3Theme) },
          ]}
        />
      </div>
    </div>
  ),
};

/** Demostración estática: módulo en Dark·Red, cada card en un modo distinto. */
export const ModosMezclados: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div data-theme="dark-red-primary" style={{ background: "var(--sem-backgrounds-base)" }}>
      <Cards
        heading="Módulo rojo · cards con su propio modo"
        cards={[
          { title: "Light · White", description: "Panel en modo claro.", theme: "light-white" },
          { title: "Dark · Secondary", description: "Panel en azul.", theme: "dark-secondary-blue" },
          { title: "Light · Grey", description: "Panel en gris claro.", theme: "light-grey" },
        ]}
      />
    </div>
  ),
};
