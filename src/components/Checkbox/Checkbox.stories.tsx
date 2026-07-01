import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Componentes/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  args: { label: "Label", size: "medium", disabled: false, indeterminate: false },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "small"] },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, fontFamily: "system-ui, sans-serif", maxWidth: 480 }}>
      <Checkbox label="Default" />
      <Checkbox label="Selected" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + Selected" disabled defaultChecked />
      <Checkbox label="Disabled + Indeterminate" disabled indeterminate />
    </div>
  ),
};

export const Tamanos: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "system-ui, sans-serif" }}>
      <Checkbox label="Medium" size="medium" defaultChecked />
      <Checkbox label="Small" size="small" defaultChecked />
    </div>
  ),
};
