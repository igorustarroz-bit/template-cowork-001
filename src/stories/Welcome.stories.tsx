import type { Meta, StoryObj } from "@storybook/react";

/**
 * Página de bienvenida del design system.
 * Sirve como punto de entrada en Storybook mientras se construyen
 * los tokens, componentes y módulos definidos en PLAN.md.
 */
function Welcome() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: 640,
        lineHeight: 1.5,
        color: "#1a1a1a",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        Euro6000 · Design System
      </h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        Figma&nbsp;→&nbsp;Code · React · Tailwind CSS · GSAP · Storybook
      </p>
      <p>
        Este es el scaffold base del proyecto. El trabajo sigue el orden
        definido en <code>PLAN.md</code>:
      </p>
      <ol>
        <li>Tokens — colores, tipografía, spacing, breakpoints.</li>
        <li>Componentes UI — botones, inputs, tags, etc.</li>
        <li>Módulos — header, footer, heros, etc.</li>
      </ol>
      <p style={{ color: "#777", fontSize: 14 }}>
        Fuente de diseño: Euro6000 — Library (Figma).
      </p>
    </div>
  );
}

const meta = {
  title: "Introducción/Welcome",
  component: Welcome,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
