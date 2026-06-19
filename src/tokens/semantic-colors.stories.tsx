import type { Meta, StoryObj } from "@storybook/react";
import {
  semanticThemes,
  semanticTokenCatalog,
  cssVar,
  type SemanticTheme,
} from "./semantic-colors";

type Brand = "euro600" | "bankinter";

function Swatch({ token }: { token: string }) {
  const isStroke = token.startsWith("Strokes-Icons");
  return (
    <div style={{ width: 150 }}>
      <div
        style={{
          height: 44,
          borderRadius: 6,
          background: isStroke ? "transparent" : cssVar(token),
          border: isStroke
            ? `3px solid ${cssVar(token)}`
            : "1px solid var(--sem-strokes-icons-neutral-2)",
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
      <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, margin: "0 0 10px", color: "var(--sem-texts-base)" }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {tokens.map((t) => (
          <Swatch key={t} token={t} />
        ))}
      </div>
    </section>
  );
}

function SemanticPalette({ theme, brand }: { theme: SemanticTheme; brand: Brand }) {
  return (
    <div
      data-theme={theme}
      data-brand={brand}
      style={{ padding: 20, background: "var(--sem-backgrounds-base)", minHeight: "100vh" }}
    >
      <h2 style={{ fontFamily: "system-ui, sans-serif", color: "var(--sem-texts-base)" }}>
        Colores semánticos · {semanticThemes.find((t) => t.slug === theme)?.label}
      </h2>
      {Object.entries(semanticTokenCatalog).map(([cat, tokens]) => (
        <Category key={cat} title={cat} tokens={tokens} />
      ))}
    </div>
  );
}

const meta = {
  title: "Tokens/Colores semánticos",
  component: SemanticPalette,
  parameters: { layout: "fullscreen" },
  args: { theme: "light-white", brand: "euro600" },
  argTypes: {
    theme: { control: "select", options: semanticThemes.map((t) => t.slug) },
    brand: { control: "inline-radio", options: ["euro600", "bankinter"] },
  },
} satisfies Meta<typeof SemanticPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
