import type { Meta, StoryObj } from "@storybook/react";
import { Entidades } from "./Entidades";

const meta = {
  title: "Módulos/Entidades",
  component: Entidades,
  parameters: { layout: "fullscreen" },
  args: { title: "Entidades asociadas a EURO 6000" },
  argTypes: { title: { control: "text" } },
} satisfies Meta<typeof Entidades>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
