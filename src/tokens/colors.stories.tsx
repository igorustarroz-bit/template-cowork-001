import type { Meta, StoryObj } from "@storybook/react";
import { primitiveColors } from "./colors";

type Swatches = Record<string, string>;

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ width: 96 }}>
      <div
        style={{
          height: 56,
          borderRadius: 8,
          background: value,
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      />
      <div style={{ fontSize: 11, marginTop: 4, fontFamily: "monospace" }}>
        {name}
      </div>
      <div style={{ fontSize: 10, color: "#777", fontFamily: "monospace" }}>
        {value}
      </div>
    </div>
  );
}

function Group({ title, swatches }: { title: string; swatches: Swatches }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, margin: "0 0 10px" }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {Object.entries(swatches).map(([step, value]) => (
          <Swatch key={step} name={step} value={value} />
        ))}
      </div>
    </section>
  );
}

function Palette() {
  const groups: Record<string, Swatches> = primitiveColors as never;
  const labels: Record<string, string> = {
    neutral: "Neutral",
    primary1: "Primary-1",
    secondary1: "Secondary-1",
    secondary2: "Secondary-2",
    secondary3: "Secondary-3",
    opacityBlack: "Opacity / Black",
    opacityWhite: "Opacity / White",
    systemError: "System / Error",
    systemSuccess: "System / Success",
    systemWarning: "System / Warning",
  };
  return (
    <div style={{ padding: 8 }}>
      <h2 style={{ fontFamily: "system-ui, sans-serif" }}>
        Colores primitivos · Euro600
      </h2>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#666", fontSize: 13 }}>
        Fuente: colección «Primitives» del Figma. Marca Bankinter solo difiere en
        Primary-1 / 50.
      </p>
      {Object.keys(groups).map((g) => (
        <Group key={g} title={labels[g] ?? g} swatches={groups[g]} />
      ))}
    </div>
  );
}

const meta = {
  title: "Tokens/Colores primitivos",
  component: Palette,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Palette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
