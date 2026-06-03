import type { Meta, StoryObj } from "@storybook/react";
import { ActionButton } from "./ActionButton";

// ─── Icono SVG placeholder ───────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof ActionButton> = {
  title: "Components/C01 Action Button",
  component: ActionButton,
  parameters: {
    layout: "centered",
    backgrounds: { default: "white" },
  },
  argTypes: {
    type:     { control: "select", options: ["Primary", "Secondary", "Terciary"] },
    size:     { control: "select", options: ["L", "M", "S", "XS"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    type: "Primary",
    size: "L",
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof ActionButton>;

// ─── Stories individuales ────────────────────────────────────────────────────

export const Primary: Story = { args: { type: "Primary" } };
export const Secondary: Story = { args: { type: "Secondary" } };
export const Terciary: Story = { args: { type: "Terciary" } };
export const Disabled: Story = { args: { type: "Primary", disabled: true } };

export const WithIconRight: Story = {
  args: { type: "Primary", iconRight: <ArrowRight /> },
};
export const WithIcons: Story = {
  args: { type: "Primary", iconLeft: <ArrowRight />, iconRight: <ArrowRight /> },
};

// ─── Grid: todas las variantes × tamaños ─────────────────────────────────────

export const AllVariants: Story = {
  name: "Todas las variantes",
  render: () => (
    <div style={{ fontFamily: "Manrope, sans-serif", padding: 32, background: "#fff" }}>
      <h2 style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: 24 }}>
        UI01 · Action Button — Figma: Type × Size
      </h2>
      {(["Primary", "Secondary", "Terciary"] as const).map(type => (
        <div key={type} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#aaa", marginBottom: 12, fontWeight: 600 }}>{type}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {(["L", "M", "S", "XS"] as const).map(size => (
              <ActionButton key={size} type={type} size={size}>{size}</ActionButton>
            ))}
            <ActionButton type={type} size="M" disabled>Disabled</ActionButton>
            <ActionButton type={type} size="M" iconLeft={<ArrowRight />} iconRight={<ArrowRight />}>Icons</ActionButton>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Sobre fondo oscuro (para Terciary) ──────────────────────────────────────
export const OnDarkBackground: Story = {
  name: "Sobre fondo oscuro",
  render: () => (
    <div style={{ background: "var(--color-p1-06)", padding: 40, borderRadius: 8, display: "flex", gap: 16, flexWrap: "wrap" }}>
      {(["Primary", "Secondary", "Terciary"] as const).map(type => (
        <ActionButton key={type} type={type} size="M">{type}</ActionButton>
      ))}
    </div>
  ),
  parameters: { backgrounds: { default: "dark" } },
};
