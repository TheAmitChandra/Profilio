import type { ThemeDefinition } from "@/themes/types";

export const dataDashboardTheme: ThemeDefinition = {
  id: "data-dashboard",
  name: "Data-dashboard",
  description: "Chart-forward layout for stats-heavy profiles, sparkline-style stats treatment, tabular metrics.",
  tokens: {
    dark: {
      bg: "#0b0f14",
      fg: "#e6edf3",
      muted: "#7d8b99",
      accent: "#22c55e",
      border: "#1c2530",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "8px",
      spacingUnit: "10px",
    },
    light: {
      bg: "#f8fafc",
      fg: "#0f172a",
      muted: "#64748b",
      accent: "#16a34a",
      border: "#e2e8f0",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "8px",
      spacingUnit: "10px",
    },
  },
  style: {
    headingStyle: "chart",
    dividerStyle: "line",
    techStackLayout: "grouped-table",
    projectLayout: "table",
    layout: "two-column",
  },
};
