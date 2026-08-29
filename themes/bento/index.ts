import type { ThemeDefinition } from "@/themes/types";

export const bentoTheme: ThemeDefinition = {
  id: "bento",
  name: "Bento",
  description: "Modular card-grid layout with uniform rounded tiles; strongest for many small proof-points at once.",
  tokens: {
    dark: {
      bg: "#121212",
      fg: "#f5f5f5",
      muted: "#9a9a9a",
      accent: "#fb923c",
      border: "#2a2a2a",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "20px",
      spacingUnit: "12px",
    },
    light: {
      bg: "#f7f7f5",
      fg: "#161616",
      muted: "#6f6f6f",
      accent: "#b84f0d",
      border: "#e5e5e0",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "20px",
      spacingUnit: "12px",
    },
  },
  style: {
    headingStyle: "plain",
    dividerStyle: "none",
    techStackLayout: "bento-grid",
    projectLayout: "bento-cards",
    layout: "bento",
  },
};
