import type { ThemeDefinition } from "@/themes/types";

export const retroComputingTheme: ThemeDefinition = {
  id: "retro-computing",
  name: "Retro-computing",
  description: "Pixel-accent iconography with a subtle CRT-scanline texture behind the header; playful but structured.",
  tokens: {
    dark: {
      bg: "#0a0a1a",
      fg: "#f5f5ff",
      muted: "#8888aa",
      accent: "#ff2e88",
      border: "#2a2a55",
      fontHeading: '"Press Start 2P", "JetBrains Mono", monospace',
      fontBody: '"JetBrains Mono", monospace',
      fontMono: '"JetBrains Mono", monospace',
      radius: "2px",
      spacingUnit: "8px",
    },
    light: {
      bg: "#eef0ff",
      fg: "#1a1a33",
      muted: "#55557a",
      accent: "#b3195e",
      border: "#c9ccee",
      fontHeading: '"Press Start 2P", "JetBrains Mono", monospace',
      fontBody: '"JetBrains Mono", monospace',
      fontMono: '"JetBrains Mono", monospace',
      radius: "2px",
      spacingUnit: "8px",
    },
  },
  style: {
    headingStyle: "pixel",
    dividerStyle: "scanline",
    techStackLayout: "badges-flat",
    projectLayout: "list-metric",
    layout: "single-column",
  },
};
