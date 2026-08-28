import type { ThemeDefinition } from "@/themes/types";

export const brutalistTheme: ThemeDefinition = {
  id: "brutalist",
  name: "Brutalist",
  description: "Heavy solid borders, high-contrast blocks, oversized headings, zero border-radius, no shadows.",
  tokens: {
    dark: {
      bg: "#000000",
      fg: "#ffffff",
      muted: "#9a9a9a",
      accent: "#ffdd00",
      border: "#ffffff",
      fontHeading: '"Arial Black", "Inter", sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      radius: "0px",
      spacingUnit: "6px",
    },
    light: {
      bg: "#ffffff",
      fg: "#000000",
      muted: "#4a4a4a",
      accent: "#0057ff",
      border: "#000000",
      fontHeading: '"Arial Black", "Inter", sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      radius: "0px",
      spacingUnit: "6px",
    },
  },
  style: {
    headingStyle: "bordered",
    dividerStyle: "double-line",
    techStackLayout: "badges-flat",
    projectLayout: "bento-cards",
    layout: "single-column",
  },
};
