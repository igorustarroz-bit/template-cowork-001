import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const X = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
);

const meta = {
  title: "Componentes/Input",
  component: Input,
  parameters: { layout: "centered" },
  args: { label: "Label", placeholder: "Input text", inputSize: "big", status: "default", disabled: false, message: "" },
  argTypes: {
    inputSize: { control: "inline-radio", options: ["big", "small"] },
    status: { control: "inline-radio", options: ["default", "error", "validated"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, fontFamily: "system-ui, sans-serif", maxWidth: 720 }}>
      <Input label="Default" placeholder="Input text" />
      <Input label="Con valor" defaultValue="Texto introducido" />
      <Input label="Error" defaultValue="Valor inválido" status="error" message="Mensaje de error" icon={X} />
      <Input label="Validado" defaultValue="Valor correcto" status="validated" message="Todo correcto" />
      <Input label="Disabled" placeholder="No editable" disabled />
      <Input label="Small" inputSize="small" placeholder="Input text" />
    </div>
  ),
};
