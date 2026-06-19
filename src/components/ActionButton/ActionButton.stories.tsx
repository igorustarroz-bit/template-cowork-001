import type { Meta, StoryObj } from "@storybook/react";
import { ActionButton } from "./ActionButton";

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const meta = {
  title: "Componentes/Action Button",
  component: ActionButton,
  parameters: { layout: "centered" },
  args: { children: "Button", variant: "primary", size: "l", selected: false, disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "terciary"] },
    size: { control: "inline-radio", options: ["l", "m", "s", "xs"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithIcons: Story = {
  args: { iconLeft: Arrow, iconRight: Arrow },
};

const types = ["primary", "secondary", "terciary"] as const;
const sizes = ["l", "m", "s", "xs"] as const;
const states = [
  { label: "Default", props: {} },
  { label: "Selected", props: { selected: true } },
  { label: "Disabled", props: { disabled: true } },
] as const;

export const Matriz: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gap: 28, fontFamily: "system-ui, sans-serif" }}>
      {types.map((t) => (
        <div key={t}>
          <h4 style={{ textTransform: "capitalize", margin: "0 0 12px" }}>{t}</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 16, alignItems: "center", justifyItems: "start" }}>
            {sizes.map((s) =>
              states.map((st) => (
                <ActionButton key={`${t}-${s}-${st.label}`} variant={t} size={s} {...st.props}>
                  {st.label} {s.toUpperCase()}
                </ActionButton>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  ),
};
