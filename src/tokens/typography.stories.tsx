import type { Meta, StoryObj } from "@storybook/react";
import { textStyles, allTextStyles, type TextStyle, type Breakpoint } from "./typography";
import { semanticThemes, type SemanticTheme } from "./semantic-colors";

type Brand = "euro600" | "bankinter";
const BPS: Breakpoint[] = ["xs", "sm", "m", "lg", "xl", "xxl", "xxxl"];
const BP_LABEL: Record<Breakpoint, string> = {
  xs: "XS · 375", sm: "SM · 480", m: "M · 768", lg: "LG · 1024",
  xl: "XL · 1440", xxl: "XXL · 1620", xxxl: "XXXL · 1920",
};
const mono = { fontFamily: "monospace", fontSize: 11 } as const;
const muted = { color: "var(--sem-texts-neutral-1)" };

function ValuesTable({ s, bp }: { s: TextStyle; bp: Breakpoint }) {
  return (
    <table style={{ ...mono, ...muted, borderCollapse: "collapse", marginTop: 8 }}>
      <thead>
        <tr>
          <th />
          {BPS.map((b) => (
            <th key={b} style={{ padding: "2px 8px", textAlign: "right", color: b === bp ? "var(--sem-texts-accent-base)" : undefined, fontWeight: b === bp ? 700 : 400 }}>{b}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ paddingRight: 10 }}>size</td>
          {BPS.map((b) => (<td key={b} style={{ padding: "2px 8px", textAlign: "right", color: b === bp ? "var(--sem-texts-accent-base)" : undefined, fontWeight: b === bp ? 700 : 400 }}>{s.fontSize[b]}</td>))}
        </tr>
        <tr>
          <td style={{ paddingRight: 10 }}>line-h</td>
          {BPS.map((b) => (<td key={b} style={{ padding: "2px 8px", textAlign: "right", color: b === bp ? "var(--sem-texts-accent-base)" : undefined, fontWeight: b === bp ? 700 : 400 }}>{s.lineHeight[b]}</td>))}
        </tr>
      </tbody>
    </table>
  );
}

function StyleRow({ s, bp }: { s: TextStyle; bp: Breakpoint }) {
  return (
    <div style={{ borderBottom: "1px solid var(--sem-strokes-icons-neutral-2)", padding: "18px 0" }}>
      <div style={{ ...mono, ...muted, marginBottom: 6 }}>
        {s.name} · <code>.{s.className}</code> · w{s.fontWeight} · ls {s.letterSpacing}px ·{" "}
        <strong style={{ color: "var(--sem-texts-base)" }}>{s.fontSize[bp]}/{s.lineHeight[bp]}px</strong> @ {bp}
      </div>
      <div style={{ fontFamily: "var(--font-family-base)", fontWeight: s.fontWeight, fontSize: s.fontSize[bp], lineHeight: `${s.lineHeight[bp]}px`, letterSpacing: s.letterSpacing, color: "var(--sem-texts-base)" }}>
        Euro6000 — El cajero de tu banco
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        <ValuesTable s={s} bp={bp} />
        <div style={{ ...mono, ...muted, marginTop: 8 }}>
          <div>↳ size: {s.boundTo.fontSize}</div>
          <div>↳ line-height: {s.boundTo.lineHeight}</div>
        </div>
      </div>
    </div>
  );
}

function Typography({ breakpoint, theme, brand }: { breakpoint: Breakpoint; theme: SemanticTheme; brand: Brand }) {
  return (
    <div data-theme={theme} data-brand={brand} style={{ padding: 24, fontFamily: "system-ui, sans-serif", background: "var(--sem-backgrounds-base)", color: "var(--sem-texts-base)", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: 4 }}>Estilos tipográficos · Geist</h2>
      <div style={{ ...mono, ...muted, marginBottom: 8 }}>
        Breakpoint: <strong style={{ color: "var(--sem-texts-accent-base)" }}>{BP_LABEL[breakpoint]}</strong>{" · "}
        Modo de color: <strong style={{ color: "var(--sem-texts-accent-base)" }}>{semanticThemes.find((t) => t.slug === theme)?.label}</strong>{" · "}
        Marca: <strong style={{ color: "var(--sem-texts-accent-base)" }}>{brand}</strong>
      </div>
      <p style={{ ...muted, fontSize: 14, maxWidth: 680 }}>
        Usa los controles «Breakpoint», «Modo de color» y «Marca» para ver los estilos en
        cada combinación. El fondo y el texto usan tokens semánticos (<code>--sem-backgrounds-base</code> /
        <code>--sem-texts-base</code>), así compruebas que los colores funcionan. {allTextStyles.length} estilos.
      </p>
      {Object.entries(textStyles).map(([group, styles]) => (
        <section key={group} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1, ...muted }}>{group}</h3>
          {Object.values(styles).map((s) => (<StyleRow key={(s as TextStyle).name} s={s as TextStyle} bp={breakpoint} />))}
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: "Tokens/Tipografía",
  component: Typography,
  parameters: { layout: "fullscreen" },
  args: { breakpoint: "xl", theme: "light-white", brand: "euro600" },
  argTypes: {
    breakpoint: { name: "Breakpoint", control: "select", options: BPS },
    theme: { name: "Modo de color", control: "select", options: semanticThemes.map((t) => t.slug) },
    brand: { name: "Marca (primitivas)", control: "inline-radio", options: ["euro600", "bankinter"] },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
