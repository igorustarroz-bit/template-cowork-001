import type { Meta, StoryObj } from "@storybook/react";
import { ActionLinkButton } from "./ActionLinkButton";

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const meta = {
  title: "Componentes/Action Link Button",
  component: ActionLinkButton,
  parameters: { layout: "centered" },
  args: { children: "Button", size: "l", disabled: false, iconRight: Arrow },
  argTypes: {
    size: { control: "inline-radio", options: ["l", "m", "s", "xs"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof ActionLinkButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Sizes: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {(["l", "m", "s", "xs"] as const).map((s) => (
        <ActionLinkButton key={s} size={s} iconRight={Arrow}>Link {s.toUpperCase()}</ActionLinkButton>
      ))}
    </div>
  ),
};
