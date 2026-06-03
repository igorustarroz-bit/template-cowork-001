import type { Meta, StoryObj } from "@storybook/react";
import { titleScale, bodyScale, labelScale, ctaScale } from "./typography";

const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"] as const;
type BP = typeof BREAKPOINTS[number];

type ScaleEntry = { [K in BP]: { sz: number; lh: number } };

function TypeRow({ name, scale, sample }: { name: string; scale: ScaleEntry; sample: string }) {
  return (
    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
      <td style={{ padding: "12px 16px 12px 0", fontFamily: "monospace", fontSize: 12, color: "#666", whiteSpace: "nowrap" }}>{name}</td>
      <td style={{ padding: "12px 16px" }}>
        <span style={{ fontSize: scale.xl.sz, lineHeight: `${scale.xl.lh}px`, fontFamily: "sans-serif" }}>{sample}</span>
      </td>
      {BREAKPOINTS.map(bp => (
        <td key={bp} style={{ padding: "12px 8px", fontFamily: "monospace", fontSize: 11, color: "#555", textAlign: "center" }}>
          {scale[bp].sz}/{scale[bp].lh}
        </td>
      ))}
    </tr>
  );
}

function TypographyTable() {
  return (
    <div style={{ padding: 32, fontFamily: "sans-serif", background: "#fff", overflowX: "auto" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>T02 · Typography Tokens</h1>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 32 }}>
        Valores: fontSize/lineHeight (px) · Preview al tamaño XL-1440
      </p>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #eee" }}>
            <th style={{ textAlign: "left", padding: "8px 16px 8px 0", fontSize: 11, color: "#999", fontWeight: 600, textTransform: "uppercase" }}>Token</th>
            <th style={{ textAlign: "left", padding: "8px 16px", fontSize: 11, color: "#999", fontWeight: 600, textTransform: "uppercase" }}>Preview</th>
            {BREAKPOINTS.map(bp => (
              <th key={bp} style={{ padding: "8px 8px", fontSize: 11, color: "#999", fontWeight: 600, textTransform: "uppercase", textAlign: "center" }}>{bp}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(titleScale).map(([name, scale]) => (
            <TypeRow key={name} name={name} scale={scale as ScaleEntry} sample="Hanzo Design" />
          ))}
          {Object.entries(bodyScale).map(([name, scale]) => (
            <TypeRow key={name} name={name} scale={scale as ScaleEntry} sample="The quick brown fox" />
          ))}
          {Object.entries(labelScale).map(([name, scale]) => (
            <TypeRow key={name} name={name} scale={scale as ScaleEntry} sample="LABEL TEXT" />
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: 14, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>CTA (fijos)</h2>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {Object.entries(ctaScale).map(([name, val]) => (
          <div key={name} style={{ fontFamily: "sans-serif" }}>
            <div style={{ fontSize: 11, color: "#999", marginBottom: 6, textTransform: "uppercase", fontWeight: 600 }}>{name}</div>
            <span style={{ fontSize: val.sz, lineHeight: `${val.lh}px` }}>Click here →</span>
            <div style={{ fontSize: 10, color: "#bbb", marginTop: 4 }}>{val.sz}/{val.lh}px</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Tokens/T02 Typography",
  component: TypographyTable,
};
export default meta;

export const Scale: StoryObj = {};
