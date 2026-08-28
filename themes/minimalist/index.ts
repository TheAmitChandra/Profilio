import type { ThemeDefinition } from "@/themes/types";

export const minimalistTheme: ThemeDefinition = {
  id: "minimalist",
  name: "Minimalist / Swiss",
  description: "Strict grid, Inter/Helvetica, maximal whitespace, one tiny accent color used sparingly.",
  tokens: {
    dark: {
      bg: "#0e0e10",
      fg: "#f5f5f5",
      muted: "#8a8a8f",
      accent: "#ff3b30",
      border: "#232326",
      fontHeading: '"Inter", "Helvetica Neue", sans-serif',
      fontBody: '"Inter", "Helvetica Neue", sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      radius: "2px",
      spacingUnit: "16px",
    },
    light: {
      bg: "#ffffff",
      fg: "#111111",
      muted: "#6b6b6f",
      accent: "#cc2f27",
      border: "#e5e5e5",
      fontHeading: '"Inter", "Helvetica Neue", sans-serif',
      fontBody: '"Inter", "Helvetica Neue", sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      radius: "2px",
      spacingUnit: "16px",
    },
  },
  style: {
    headingStyle: "plain",
    dividerStyle: "none",
    techStackLayout: "plain-grouped-list",
    projectLayout: "narrative-list",
    layout: "single-column",
  },
};
