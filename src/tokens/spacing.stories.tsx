import type { Meta, StoryObj } from "@storybook/react";
import { breakpoints, space, radii, spacers, grids, colsSize, type Breakpoint } from "./spacing";

const BPS: Breakpoint[] = ["xs", "sm", "m", "lg", "xl", "xxl", "xxxl"];
const BP_LABEL: Record<Breakpoint, string> = {
  xs: "XS · 375", sm: "SM · 480", m: "M · 768", lg: "LG · 1024",
  xl: "XL · 1440", xxl: "XXL · 1620", xxxl: "XXXL · 1920",
};
const mono = { fontFamily: "monospace", fontSize: 12 } as const;

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
      <span style={{ ...mono, width: 70 }}>{label}</span>
      <div style={{ height: 12, width: value, background: color, transition: "width .2s" }} />
      <span style={{ ...mono, color: "#888" }}>{value}px</span>
    </div>
  );
}

function ResponsiveTable({ data, bp }: { data: Record<string, Record<Breakpoint, number>>; bp: Breakpoint }) {
  return (
    <table style={{ ...mono, borderCollapse: "collapse", marginTop: 8 }}>
      <thead>
        <tr>
          <th />
          {BPS.map((b) => (
            <th key={b} style={{ padding: "2px 10px", textAlign: "right", color: b === bp ? "var(--color-primary-1-50)" : "#bbb", fontWeight: b === bp ? 700 : 400 }}>{b}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([k, vals]) => (
          <tr key={k}>
            <td style={{ color: "#666", paddingRight: 10 }}>{k}</td>
            {BPS.map((b) => (
              <td key={b} style={{ padding: "2px 10px", textAlign: "right", color: b === bp ? "var(--color-primary-1-50)" : "#999", fontWeight: b === bp ? 700 : 400 }}>{vals[b]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Spacing({ breakpoint }: { breakpoint: Breakpoint }) {
  const bp = breakpoint;
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 1100 }}>
      <h2 style={{ marginBottom: 4 }}>Espaciado · Radios · Breakpoints</h2>
      <div style={{ ...mono, color: "#666", marginBottom: 16 }}>
        Breakpoint: <strong style={{ color: "var(--color-primary-1-50)" }}>{BP_LABEL[bp]}</strong>{" "}
        — usa el control «Breakpoint» (abajo) para previsualizar los tokens responsive.
      </div>

      <h3 style={{ fontSize: 13, color: "#555" }}>Breakpoints (anchos de viewport, px)</h3>
      <div style={{ display: "flex", gap: 16, ...mono, marginBottom: 24 }}>
        {Object.entries(breakpoints).map(([k, v]) => (
          <span key={k} style={{ color: k === bp ? "var(--color-primary-1-50)" : "#333", fontWeight: k === bp ? 700 : 400 }}>{k}: {v}</span>
        ))}
      </div>

      <h3 style={{ fontSize: 13, color: "#555" }}>Spacers responsive @ {bp}</h3>
      <div style={{ marginBottom: 12 }}>
        {Object.entries(spacers).map(([k, vals]) => (
          <Bar key={k} label={k} value={vals[bp]} color="var(--color-secondary-1-50)" />
        ))}
      </div>
      <ResponsiveTable data={spacers} bp={bp} />

      <h3 style={{ fontSize: 13, color: "#555", marginTop: 28 }}>Grids (wrappers + gutter) @ {bp}</h3>
      <div style={{ marginBottom: 12 }}>
        {Object.entries(grids).map(([k, vals]) => (
          <Bar key={k} label={k} value={vals[bp]} color="var(--color-secondary-2-50)" />
        ))}
      </div>
      <ResponsiveTable data={grids} bp={bp} />

      <h3 style={{ fontSize: 13, color: "#555", marginTop: 28 }}>Anchos de columna @ {bp}</h3>
      <ResponsiveTable data={colsSize} bp={bp} />

      <h3 style={{ fontSize: 13, color: "#555", marginTop: 28 }}>Escala fija (fx · constante)</h3>
      <div style={{ marginBottom: 24 }}>
        {Object.entries(space).map(([k, v]) => (
          <Bar key={k} label={k} value={v} color="var(--color-primary-1-50)" />
        ))}
      </div>

      <h3 style={{ fontSize: 13, color: "#555" }}>Radios (constante)</h3>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {Object.entries(radii).map(([k, v]) => (
          <div key={k} style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, background: "var(--color-neutral-90)", borderRadius: Math.min(v, 32) }} />
            <div style={mono}>{k}</div>
            <div style={{ ...mono, color: "#888" }}>{v}px</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Tokens/Espaciado y breakpoints",
  component: Spacing,
  parameters: { layout: "fullscreen" },
  args: { breakpoint: "xl" },
  argTypes: {
    breakpoint: { name: "Breakpoint", control: "select", options: BPS },
  },
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
