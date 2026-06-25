import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { semanticThemes } from "../../tokens/semantic-colors";

const meta = {
  title: "Componentes/Card (solución)",
  component: Card,
  parameters: { layout: "centered" },
  args: { title: "Solución destacada", description: "Descripción de la tarjeta.", expanded: true, theme: "light-white" },
  argTypes: {
    title: { control: "text" }, description: { control: "text" }, expanded: { control: "boolean" },
    theme: { control: "select", options: semanticThemes.map((t) => t.slug) },
  },
  decorators: [(Story, ctx) => (
    <div style={{ display: "flex", width: ctx.args.expanded ? 680 : 360 }}><Story /></div>
  )],
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
