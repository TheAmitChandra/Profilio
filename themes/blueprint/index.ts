import type { ThemeDefinition } from "@/themes/types";

export const blueprintTheme: ThemeDefinition = {
  id: "blueprint",
  name: "Blueprint",
  description: "Subtle dot-grid background, technical drafting labels, tabular numerals, single blue accent.",
  tokens: {
    dark: {
      bg: "#0b1220",
      fg: "#e7edf5",
      muted: "#7c8aa0",
      accent: "#3b82f6",
      border: "#1e2a3d",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "4px",
      spacingUnit: "10px",
    },
    light: {
      bg: "#f7f9fc",
      fg: "#101826",
      muted: "#5b6b82",
      accent: "#2563eb",
      border: "#d7e0ec",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "4px",
      spacingUnit: "10px",
    },
  },
  style: {
    headingStyle: "smallcaps",
    dividerStyle: "line",
    techStackLayout: "grouped-table",
    projectLayout: "table",
    layout: "single-column",
  },
};
