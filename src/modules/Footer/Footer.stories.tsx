import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { semanticThemes } from "../../tokens/semantic-colors";

const meta = {
  title: "Módulos/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  args: { brand: "EURO 6000", theme: "dark-black-neutral" },
  argTypes: { brand: { control: "text" }, theme: { control: "select", options: semanticThemes.map((t) => t.slug) } },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
