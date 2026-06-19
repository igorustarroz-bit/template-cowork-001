import type { Meta, StoryObj } from "@storybook/react";
import { semanticTokenCatalog, cssVar } from "./semantic-colors";

function Swatch({ token }: { token: string }) {
  const isStroke = token.startsWith("Strokes-Icons");
  return (
    <div style={{ width: 150 }}>
      <div
        style={{
          height: 44,
          borderRadius: 6,
          background: isStroke ? "transparent" : cssVar(token),
          border: isStroke ? `3px solid ${cssVar(token)}` : "1px solid var(--sem-strokes-icons-neutral-2)",
        }}
      />
      <div style={{ fontSize: 10, marginTop: 4, fontFamily: "monospace", color: "var(--sem-texts-base)" }}>
        {token.replace(/^[^/]+\//, "")}
      </div>
    </div>
  );
}

function Category({ title, tokens }: { title: string; tokens: readonly string[] }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, margin: "0 0 10px", color: "var(--sem-texts-base)" }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {tokens.map((t) => (<Swatch key={t} token={t} />))}
      </div>
    </section>
  );
}

function SemanticPalette() {
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontFamily: "system-ui, sans-serif", color: "var(--sem-texts-base)" }}>Colores semánticos</h2>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "var(--sem-texts-neutral-1)", fontSize: 13 }}>
        Cambia «Modo de color» (tema) y «Marca» en la barra superior para ver la paleta en cada combinación.
      </p>
      {Object.entries(semanticTokenCatalog).map(([cat, tokens]) => (<Category key={cat} title={cat} tokens={tokens} />))}
    </div>
  );
}

const meta = {
  title: "Tokens/Colores semánticos",
  component: SemanticPalette,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SemanticPalette>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
