import type { Meta, StoryObj } from "@storybook/react";
import { LogoCard } from "./LogoCard";
import { semanticThemes } from "../../tokens/semantic-colors";

const meta = {
  title: "Componentes/Logo Card",
  component: LogoCard,
  parameters: { layout: "centered" },
  args: { label: "Bankinter", theme: "light-grey" },
  argTypes: { label: { control: "text" }, theme: { control: "select", options: semanticThemes.map((t) => t.slug) } },
} satisfies Meta<typeof LogoCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
