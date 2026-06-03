import type { Meta, StoryObj } from "@storybook/react";

const primitives = [
  { group: "Grayscale", tokens: [
    { name: "Black",    var: "--color-black" },
    { name: "GS 10",   var: "--color-gs-10" },
    { name: "GS 15",   var: "--color-gs-15" },
    { name: "GS 20",   var: "--color-gs-20" },
    { name: "GS 30",   var: "--color-gs-30" },
    { name: "GS 40",   var: "--color-gs-40" },
    { name: "GS 50",   var: "--color-gs-50" },
    { name: "GS 60",   var: "--color-gs-60" },
    { name: "GS 70",   var: "--color-gs-70" },
    { name: "GS 80",   var: "--color-gs-80" },
    { name: "GS 90",   var: "--color-gs-90" },
    { name: "GS 97",   var: "--color-gs-97" },
    { name: "White",   var: "--color-white" },
  ]},
  { group: "Primary-1", tokens: [
    { name: "P1-01", var: "--color-p1-01" },
    { name: "P1-02", var: "--color-p1-02" },
    { name: "P1-03", var: "--color-p1-03" },
    { name: "P1-04", var: "--color-p1-04" },
    { name: "P1-05", var: "--color-p1-05" },
    { name: "P1-06", var: "--color-p1-06" },
  ]},
  { group: "Secondary-1 (Magenta)", tokens: [
    { name: "S1-01", var: "--color-s1-01" },
    { name: "S1-02", var: "--color-s1-02" },
    { name: "S1-03", var: "--color-s1-03" },
    { name: "S1-04", var: "--color-s1-04" },
    { name: "S1-05", var: "--color-s1-05" },
  ]},
  { group: "Secondary-2 (Verde)", tokens: [
    { name: "S2-01", var: "--color-s2-01" },
    { name: "S2-02", var: "--color-s2-02" },
    { name: "S2-03", var: "--color-s2-03" },
  ]},
  { group: "Secondary-3 (Cyan)", tokens: [
    { name: "S3-01", var: "--color-s3-01" },
    { name: "S3-02", var: "--color-s3-02" },
    { name: "S3-03", var: "--color-s3-03" },
  ]},
  { group: "Secondary-4 (Violeta)", tokens: [
    { name: "S4-01", var: "--color-s4-01" },
    { name: "S4-02", var: "--color-s4-02" },
    { name: "S4-03", var: "--color-s4-03" },
  ]},
  { group: "Sistema", tokens: [
    { name: "Error 01",   var: "--color-error-01" },
    { name: "Error 02",   var: "--color-error-02" },
    { name: "Error 03",   var: "--color-error-03" },
    { name: "Success 01", var: "--color-success-01" },
    { name: "Success 02", var: "--color-success-02" },
    { name: "Success 03", var: "--color-success-03" },
    { name: "Warning 01", var: "--color-warning-01" },
    { name: "Warning 02", var: "--color-warning-02" },
    { name: "Warning 03", var: "--color-warning-03" },
  ]},
];

function ColorPalette() {
  return (
    <div style={{ padding: 32, fontFamily: "sans-serif", background: "#fff" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>T01 · Color Tokens</h1>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 32 }}>
        Fuente: Figma · Librería-Pruebas Claude · colección Theme (modo Base)
      </p>
      {primitives.map(({ group, tokens }) => (
        <div key={group} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: 12 }}>
            {group}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tokens.map((t) => (
              <div key={t.var} style={{ width: 100 }}>
                <div
                  style={{
                    background: `var(${t.var})`,
                    width: 100,
                    height: 64,
                    borderRadius: 8,
                    border: "1px solid rgba(0,0,0,0.10)",
                  }}
                />
                <div style={{ fontSize: 11, marginTop: 6, fontWeight: 600, color: "#111" }}>{t.name}</div>
                <div style={{ fontSize: 10, color: "#aaa", marginTop: 1 }}>{t.var}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: "Tokens/T01 Colors",
  component: ColorPalette,
};
export default meta;

export const Palette: StoryObj = {};
