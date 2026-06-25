import type { Meta, StoryObj } from "@storybook/react";
import { ImageTexto } from "./ImageTexto";
import { SearchBar } from "./SearchBar";
import { semanticThemes, type SemanticTheme } from "../../tokens/semantic-colors";
import imgBelleza from "@/assets/images/imagetexto-belleza.webp";

const THEME_OPTIONS: string[] = ["inherit", ...semanticThemes.map((t) => t.slug)];
const norm = (v?: string): SemanticTheme | undefined => (!v || v === "inherit" ? undefined : (v as SemanticTheme));

interface Args {
  title: string; description: string; buttonLabel: string; cashbackTheme: string;
}

const meta: Meta<Args> = {
  title: "Módulos/Image + Texto",
  component: ImageTexto as unknown as React.ComponentType<Args>,
  parameters: { layout: "fullscreen" },
  args: {
    title: "Programa EURO 6000 Plus: compra como siempre, ahorra como nunca",
    description: "Activa el Programa EURO 6000 Plus y disfruta de descuentos y cashback en cientos de marcas y tiendas que utilizas cada día.",
    buttonLabel: "Activar programa",
    cashbackTheme: "dark-red-primary",
  },
  argTypes: {
    title: { control: "text", name: "Texto · título" },
    description: { control: "text", name: "Texto · descripción" },
    buttonLabel: { control: "text", name: "Texto · botón" },
    cashbackTheme: { control: "select", options: THEME_OPTIONS, name: "Modo · CashbackCard" },
  },
  render: (a) => (
    <ImageTexto title={a.title} description={a.description} buttonLabel={a.buttonLabel} cashbackTheme={norm(a.cashbackTheme)} />
  ),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Invertido: Story = {
  name: "Invertido (SearchBar)",
  render: () => (
    <ImageTexto
      reverse
      image={imgBelleza}
      title="Un cajero siempre cerca de ti"
      description="Con la red de cajeros EURO 6000 puedes retirar dinero y realizar operaciones diarias desde miles de puntos distribuidos por toda España."
      buttonLabel="Localizar cajeros"
      overlay={<SearchBar placeholder="Buscar un cajero…" />}
    />
  ),
};
