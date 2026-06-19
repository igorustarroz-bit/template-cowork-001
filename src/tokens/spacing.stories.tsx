import type { Meta, StoryObj } from "@storybook/react";
import { breakpoints, space, radii, spacers, grids } from "./spacing";

const mono = { fontFamily: "monospace", fontSize: 12 } as const;

function Spacing() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h2>Espaciado · Radios · Breakpoints</h2>

      <h3 style={{ fontSize: 13, color: "#555" }}>Breakpoints (px)</h3>
      <div style={{ display: "flex", gap: 16, ...mono, marginBottom: 24 }}>
        {Object.entries(breakpoints).map(([k, v]) => (
          <span key={k}>{k}: {v}</span>
        ))}
      </div>

      <h3 style={{ fontSize: 13, color: "#555" }}>Escala fija (fx)</h3>
      <div style={{ marginBottom: 24 }}>
        {Object.entries(space).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ ...mono, width: 70 }}>{k}</span>
            <div style={{ height: 12, width: v, background: "var(--color-primary-1-50)" }} />
            <span style={{ ...mono, color: "#888" }}>{v}px</span>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 13, color: "#555" }}>Radios</h3>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        {Object.entries(radii).map(([k, v]) => (
          <div key={k} style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, background: "var(--color-neutral-90)", borderRadius: Math.min(v, 32) }} />
            <div style={mono}>{k}</div>
            <div style={{ ...mono, color: "#888" }}>{v}px</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 13, color: "#555" }}>Spacers responsive (var --space-*)</h3>
      <p style={{ ...mono, color: "#888" }}>
        El ancho usa la CSS var: redimensiona la ventana para ver el cambio por breakpoint.
      </p>
      <div>
        {Object.keys(spacers).map((k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ ...mono, width: 36 }}>{k}</span>
            <div style={{ height: 12, width: `var(--space-${k})`, background: "var(--color-secondary-1-50)" }} />
            <span style={{ ...mono, color: "#888" }}>xs {spacers[k].xs} → xxxl {spacers[k].xxxl}px</span>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 13, color: "#555", marginTop: 24 }}>Grids (wrappers + gutter)</h3>
      <div style={mono}>
        {Object.keys(grids).map((k) => (
          <div key={k}>{k}: xs {grids[k].xs} → xxxl {grids[k].xxxl}px</div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Tokens/Espaciado y breakpoints",
  component: Spacing,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
