import type { Meta, StoryObj } from "@storybook/react";
import { textStyles, allTextStyles, type TextStyle, type Breakpoint } from "./typography";

const BPS: Breakpoint[] = ["xs", "sm", "m", "lg", "xl", "xxl", "xxxl"];
const BP_LABEL: Record<Breakpoint, string> = {
  xs: "XS · 375", sm: "SM · 480", m: "M · 768", lg: "LG · 1024",
  xl: "XL · 1440", xxl: "XXL · 1620", xxxl: "XXXL · 1920",
};
const mono = { fontFamily: "monospace", fontSize: 11 } as const;

function ValuesTable({ s, bp }: { s: TextStyle; bp: Breakpoint }) {
  return (
    <table style={{ ...mono, borderCollapse: "collapse", marginTop: 8 }}>
      <thead>
        <tr style={{ color: "#888" }}>
          <th />
          {BPS.map((b) => (
            <th key={b} style={{ padding: "2px 8px", textAlign: "right", color: b === bp ? "var(--color-primary-1-50)" : "#bbb", fontWeight: b === bp ? 700 : 400 }}>{b}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ color: "#888", paddingRight: 10 }}>size</td>
          {BPS.map((b) => (
            <td key={b} style={{ padding: "2px 8px", textAlign: "right", color: b === bp ? "var(--color-primary-1-50)" : "#888", fontWeight: b === bp ? 700 : 400 }}>{s.fontSize[b]}</td>
          ))}
        </tr>
        <tr>
          <td style={{ color: "#888", paddingRight: 10 }}>line-h</td>
          {BPS.map((b) => (
            <td key={b} style={{ padding: "2px 8px", textAlign: "right", color: b === bp ? "var(--color-primary-1-50)" : "#888", fontWeight: b === bp ? 700 : 400 }}>{s.lineHeight[b]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function StyleRow({ s, bp }: { s: TextStyle; bp: Breakpoint }) {
  return (
    <div style={{ borderBottom: "1px solid #eee", padding: "18px 0" }}>
      <div style={{ ...mono, color: "#888", marginBottom: 6 }}>
        {s.name} · <code>.{s.className}</code> · w{s.fontWeight} · ls {s.letterSpacing}px ·{" "}
        <strong>{s.fontSize[bp]}/{s.lineHeight[bp]}px</strong> @ {bp}
      </div>
      <div
        style={{
          fontFamily: "var(--font-family-base)",
          fontWeight: s.fontWeight,
          fontSize: s.fontSize[bp],
          lineHeight: `${s.lineHeight[bp]}px`,
          letterSpacing: s.letterSpacing,
        }}
      >
        Euro6000 — El cajero de tu banco
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        <ValuesTable s={s} bp={bp} />
        <div style={{ ...mono, color: "#aaa", marginTop: 8 }}>
          <div>↳ size: {s.boundTo.fontSize}</div>
          <div>↳ line-height: {s.boundTo.lineHeight}</div>
        </div>
      </div>
    </div>
  );
}

function Typography({ breakpoint }: { breakpoint: Breakpoint }) {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 1100 }}>
      <h2 style={{ marginBottom: 4 }}>Estilos tipográficos · Geist</h2>
      <div style={{ ...mono, color: "#666", marginBottom: 8 }}>
        Breakpoint: <strong style={{ color: "var(--color-primary-1-50)" }}>{BP_LABEL[breakpoint]}</strong>{" "}
        — usa el control «Breakpoint» (abajo) para cambiarlo, como los modos en colores.
      </div>
      <p style={{ color: "#666", fontSize: 14, maxWidth: 680 }}>
        Los estilos se definen vía variables de Figma: tamaño/interlineado se enlazan a
        la colección <code>Responsive</code> (cambian por breakpoint); familia/peso/letter-spacing
        a primitivos <code>Tipography/*</code>. {allTextStyles.length} estilos.
      </p>
      {Object.entries(textStyles).map(([group, styles]) => (
        <section key={group} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 13, color: "#444", textTransform: "uppercase", letterSpacing: 1 }}>{group}</h3>
          {Object.values(styles).map((s) => (
            <StyleRow key={(s as TextStyle).name} s={s as TextStyle} bp={breakpoint} />
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
  args: { breakpoint: "xl" },
  argTypes: {
    breakpoint: { name: "Breakpoint", control: "select", options: BPS },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
