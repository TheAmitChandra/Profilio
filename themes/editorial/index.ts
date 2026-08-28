import type { ThemeDefinition } from "@/themes/types";

export const editorialTheme: ThemeDefinition = {
  id: "editorial",
  name: "Editorial",
  description: "Serif display headings with a clean sans body, generous whitespace, magazine-style two-column layout.",
  tokens: {
    dark: {
      bg: "#1b1a17",
      fg: "#f2ede4",
      muted: "#a89f8f",
      accent: "#c9a227",
      border: "#3a352c",
      fontHeading: '"Lora", "Source Serif Pro", serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      radius: "2px",
      spacingUnit: "14px",
    },
    light: {
      bg: "#faf7f0",
      fg: "#201c15",
      muted: "#6b6152",
      accent: "#8a6d1f",
      border: "#e4dcc9",
      fontHeading: '"Lora", "Source Serif Pro", serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      radius: "2px",
      spacingUnit: "14px",
    },
  },
  style: {
    headingStyle: "serif",
    dividerStyle: "line",
    techStackLayout: "plain-grouped-list",
    projectLayout: "narrative-list",
    layout: "two-column",
  },
};
