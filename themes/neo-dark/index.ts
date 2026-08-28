import type { ThemeDefinition } from "@/themes/types";

export const neoDarkTheme: ThemeDefinition = {
  id: "neo-dark",
  name: "Neo-dark / Glow",
  description: "Dark canvas, single neon accent, soft gradient blobs behind the header, glassmorphism cards.",
  tokens: {
    dark: {
      bg: "#05060a",
      fg: "#eef1ff",
      muted: "#8b90b3",
      accent: "#a855f7",
      border: "#23263a",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      radius: "16px",
      spacingUnit: "10px",
    },
    light: {
      bg: "#f5f4ff",
      fg: "#16162a",
      muted: "#6b6b8f",
      accent: "#7c3aed",
      border: "#e2defc",
      fontHeading: '"Inter", ui-sans-serif, sans-serif',
      fontBody: '"Inter", ui-sans-serif, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      radius: "16px",
      spacingUnit: "10px",
    },
  },
  style: {
    headingStyle: "plain",
    dividerStyle: "dots",
    techStackLayout: "badges-grouped",
    projectLayout: "bento-cards",
    layout: "bento",
  },
};
