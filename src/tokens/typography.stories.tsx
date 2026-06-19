import type { Meta, StoryObj } from "@storybook/react";
import { textStyles, allTextStyles, type TextStyle, type Breakpoint } from "./typography";

const BPS: Breakpoint[] = ["xs", "sm", "m", "lg", "xl", "xxl", "xxxl"];
const mono = { fontFamily: "monospace", fontSize: 11 } as const;

function ValuesTable({ s }: { s: TextStyle }) {
  return (
    <table style={{ ...mono, borderCollapse: "collapse", marginTop: 8 }}>
      <thead>
        <tr style={{ color: "#888" }}>
          <th style={{ textAlign: "left", padding: "2px 10px 2px 0" }} />
          {BPS.map((b) => (
            <th key={b} style={{ padding: "2px 8px", textAlign: "right" }}>{b}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ color: "#888", paddingRight: 10 }}>size</td>
          {BPS.map((b) => (
            <td key={b} style={{ padding: "2px 8px", textAlign: "right" }}>{s.fontSize[b]}</td>
          ))}
        </tr>
        <tr>
          <td style={{ color: "#888", paddingRight: 10 }}>line-h</td>
          {BPS.map((b) => (
            <td key={b} style={{ padding: "2px 8px", textAlign: "right" }}>{s.lineHeight[b]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function StyleRow({ s }: { s: TextStyle }) {
  return (
    <div style={{ borderBottom: "1px solid #eee", padding: "18px 0" }}>
      <div style={{ ...mono, color: "#888", marginBottom: 6 }}>
        {s.name} · <code>.{s.className}</code> · w{s.fontWeight} · ls {s.letterSpacing}px
      </div>
      <div className={s.className}>Euro6000 — El cajero de tu banco</div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        <ValuesTable s={s} />
        <div style={{ ...mono, color: "#aaa", marginTop: 8 }}>
          <div>↳ size: {s.boundTo.fontSize}</div>
          <div>↳ line-height: {s.boundTo.lineHeight}</div>
        </div>
      </div>
    </div>
  );
}

function Typography() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 1100 }}>
      <h2>Estilos tipográficos · Geist</h2>
      <p style={{ color: "#666", fontSize: 14, maxWidth: 680 }}>
        Los estilos están definidos a través de variables de Figma. El tamaño y el
        interlineado se enlazan a la colección <code>Responsive</code> (cambian por
        breakpoint), y familia/peso/letter-spacing a los primitivos <code>Tipography/*</code>.
        Cada muestra usa su clase <code>.type-*</code> responsive: redimensiona la
        ventana para ver el escalado. Total: {allTextStyles.length} estilos.
      </p>
      {Object.entries(textStyles).map(([group, styles]) => (
        <section key={group} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 13, color: "#444", textTransform: "uppercase", letterSpacing: 1 }}>{group}</h3>
          {Object.values(styles).map((s) => (
            <StyleRow key={(s as TextStyle).name} s={s as TextStyle} />
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
