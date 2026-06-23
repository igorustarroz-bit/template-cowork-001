import type { Meta, StoryObj } from "@storybook/react";
import { Cards } from "./Cards";
import { Card } from "./Card";

const meta = {
  title: "Módulos/Cards",
  component: Cards,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Cards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SoloCard: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-12 gap-[var(--gutter)]" style={{ maxWidth: 1376 }}>
      <Card size="big" title="Card destacada" description="6 columnas." />
      <Card size="small" title="Card pequeña" />
      <Card size="small" title="Card pequeña" />
    </div>
  ),
};
