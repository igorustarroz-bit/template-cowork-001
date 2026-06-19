import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const Heart = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
);

const meta = {
  title: "Componentes/Icon Button",
  component: IconButton,
  parameters: { layout: "centered" },
  args: { icon: Heart, label: "Favorito", variant: "primary", size: "l", selected: false, disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "terciary"] },
    size: { control: "inline-radio", options: ["xl", "l", "m", "s", "xs"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Matriz: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gap: 20, fontFamily: "system-ui, sans-serif" }}>
      {(["primary", "secondary", "terciary"] as const).map((v) => (
        <div key={v} style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ width: 90, textTransform: "capitalize" }}>{v}</span>
          {(["xl", "l", "m", "s", "xs"] as const).map((s) => (
            <IconButton key={s} variant={v} size={s} icon={Heart} label={`${v} ${s}`} />
          ))}
        </div>
      ))}
    </div>
  ),
};
