import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Grayscale
        "gs-10":  "var(--color-gs-10)",
        "gs-15":  "var(--color-gs-15)",
        "gs-20":  "var(--color-gs-20)",
        "gs-30":  "var(--color-gs-30)",
        "gs-40":  "var(--color-gs-40)",
        "gs-50":  "var(--color-gs-50)",
        "gs-60":  "var(--color-gs-60)",
        "gs-70":  "var(--color-gs-70)",
        "gs-80":  "var(--color-gs-80)",
        "gs-90":  "var(--color-gs-90)",
        "gs-97":  "var(--color-gs-97)",
        // Primary-1
        "p1-01":  "var(--color-p1-01)",
        "p1-02":  "var(--color-p1-02)",
        "p1-03":  "var(--color-p1-03)",
        "p1-04":  "var(--color-p1-04)",
        "p1-05":  "var(--color-p1-05)",
        "p1-06":  "var(--color-p1-06)",
        // Secondary
        "s1-01":  "var(--color-s1-01)",
        "s1-03":  "var(--color-s1-03)",
        "s2-02":  "var(--color-s2-02)",
        "s3-02":  "var(--color-s3-02)",
        "s4-02":  "var(--color-s4-02)",
        // Semánticos
        "text-01":   "var(--color-text-01)",
        "text-02":   "var(--color-text-02)",
        "bg-01":     "var(--color-bg-01)",
      },
      letterSpacing: {
        body:  "var(--letter-spacing-body)",
        cta:   "var(--letter-spacing-cta)",
        label: "var(--letter-spacing-label)",
        title: "var(--letter-spacing-title)",
        forms: "var(--letter-spacing-forms)",
      },
    },
  },
  plugins: [],
};

export default config;
