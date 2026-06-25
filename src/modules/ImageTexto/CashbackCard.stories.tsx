import type { Meta, StoryObj } from "@storybook/react";
import { CashbackCard } from "./CashbackCard";
import { semanticThemes } from "../../tokens/semantic-colors";

const meta = {
  title: "Componentes/Cashback Card",
  component: CashbackCard,
  parameters: { layout: "centered" },
  args: { label: "Cashback acumulado", amount: "+128,40 €", theme: "dark-red-primary" },
  argTypes: {
    label: { control: "text" }, amount: { control: "text" },
    theme: { control: "select", options: semanticThemes.map((t) => t.slug) },
  },
  decorators: [(Story) => (<div style={{ width: 362 }}><Story /></div>)],
} satisfies Meta<typeof CashbackCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
