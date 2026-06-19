import type { Meta, StoryObj } from "@storybook/react";
import { textStyles, type TextStyle } from "./typography";

function Row({ name, s }: { name: string; s: TextStyle }) {
  return (
    <div style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", marginBottom: 6 }}>
        {name} · {s.fontSize}/{s.lineHeight}px · w{s.fontWeight} · ls {s.letterSpacing}px
      </div>
      <div
        style={{
          fontFamily: s.fontFamily,
          fontWeight: s.fontWeight,
          fontSize: s.fontSize,
          lineHeight: `${s.lineHeight}px`,
          letterSpacing: s.letterSpacing,
        }}
      >
        Euro6000 — El cajero de tu banco
      </div>
    </div>
  );
}

function Typography() {
  const groups = textStyles as unknown as Record<string, Record<string, TextStyle>>;
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h2>Tipografía · Geist</h2>
      {Object.entries(groups).map(([g, styles]) => (
        <section key={g} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 13, color: "#555" }}>{g}</h3>
          {Object.entries(styles).map(([step, s]) => (
            <Row key={`${g}/${step}`} name={`${g}/${step}`} s={s} />
          ))}
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: "Tokens/Tipografía",
  component: Typography,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
