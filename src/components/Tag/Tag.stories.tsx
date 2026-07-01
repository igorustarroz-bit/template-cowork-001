import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta = {
  title: "Componentes/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  args: { size: "l", type: "transaction", label: "Label" },
  argTypes: {
    size: { control: "inline-radio", options: ["l", "xs"] },
    type: { control: "inline-radio", options: ["transaction", "new", "aseptic"] },
    label: { control: "text" },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const sizes = ["l", "xs"] as const;
const types = ["transaction", "new", "aseptic"] as const;

export const Matriz: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gap: 20, fontFamily: "system-ui, sans-serif" }}>
      {sizes.map((s) => (
        <div key={s} style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ width: 40, textTransform: "uppercase", fontSize: 12 }}>{s}</span>
          {types.map((t) => (
            <Tag key={t} size={s} type={t} label="Label" />
          ))}
        </div>
      ))}
    </div>
  ),
};
