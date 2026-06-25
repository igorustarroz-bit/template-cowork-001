import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta = {
  title: "Componentes/Search Bar",
  component: SearchBar,
  parameters: { layout: "centered" },
  args: { placeholder: "Buscar un cajero…" },
  argTypes: { placeholder: { control: "text" } },
  decorators: [(Story) => (<div className="bg-sem-backgrounds-neutral-2" style={{ padding: 48, borderRadius: 16 }}><Story /></div>)],
} satisfies Meta<typeof SearchBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
