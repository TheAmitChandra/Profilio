import type { ThemeDefinition } from "@/themes/types";

export const corporateCleanTheme: ThemeDefinition = {
  id: "corporate-clean",
  name: "Corporate-clean",
  description: "Recruiter-facing: tech-stack badges organized by category are prominent, disciplined spacing.",
  tokens: {
    dark: {
      bg: "#101418",
      fg: "#eef1f4",
      muted: "#8a949e",
      accent: "#2f6fed",
      border: "#232a31",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "6px",
      spacingUnit: "10px",
    },
    light: {
      bg: "#ffffff",
      fg: "#14181c",
      muted: "#5b6570",
      accent: "#1d4ed8",
      border: "#dfe3e8",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: 'var(--font-jetbrains-mono), monospace',
      radius: "6px",
      spacingUnit: "10px",
    },
  },
  style: {
    headingStyle: "plain",
    dividerStyle: "line",
    techStackLayout: "badges-grouped",
    projectLayout: "table",
    layout: "single-column",
  },
};
