import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta = {
  title: "Componentes/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  args: { label: "Label", size: "medium", disabled: false, name: "playground" },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "small"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Radio>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, fontFamily: "system-ui, sans-serif", maxWidth: 480 }}>
      <Radio label="Default" name="estados-1" />
      <Radio label="Selected" name="estados-2" defaultChecked />
      <Radio label="Disabled" name="estados-3" disabled />
      <Radio label="Disabled + Selected" name="estados-4" disabled defaultChecked />
    </div>
  ),
};

export const Grupo: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <fieldset style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "system-ui, sans-serif", border: 0, padding: 0 }}>
      <legend style={{ marginBottom: 8 }}>Selección única</legend>
      <Radio label="Opción A" name="grupo" defaultChecked />
      <Radio label="Opción B" name="grupo" />
      <Radio label="Opción C" name="grupo" />
    </fieldset>
  ),
};

export const Tamanos: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "system-ui, sans-serif" }}>
      <Radio label="Medium" size="medium" name="tam-1" defaultChecked />
      <Radio label="Small" size="small" name="tam-2" defaultChecked />
    </div>
  ),
};
