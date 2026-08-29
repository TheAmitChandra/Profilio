import type { ThemeDefinition } from "@/themes/types";

export const terminalTheme: ThemeDefinition = {
  id: "terminal",
  name: "Terminal",
  description: "Monospace everywhere, ASCII dividers, $ prompt-style headers, green-on-black.",
  tokens: {
    dark: {
      bg: "#0a0e0a",
      fg: "#d7ffd9",
      muted: "#5f9e6a",
      accent: "#39ff88",
      border: "#1d3b23",
      fontHeading: 'var(--font-jetbrains-mono), monospace',
      fontBody: 'var(--font-jetbrains-mono), monospace',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "0px",
      spacingUnit: "8px",
    },
    light: {
      bg: "#f3fbf3",
      fg: "#10240f",
      muted: "#4a7a4f",
      accent: "#1f9d4a",
      border: "#c3ddc4",
      fontHeading: 'var(--font-jetbrains-mono), monospace',
      fontBody: 'var(--font-jetbrains-mono), monospace',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "0px",
      spacingUnit: "8px",
    },
  },
  style: {
    headingStyle: "prompt",
    dividerStyle: "ascii",
    techStackLayout: "plain-grouped-list",
    projectLayout: "list-metric",
    layout: "single-column",
  },
};
