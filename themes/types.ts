/**
 * A theme is a layout + typography SYSTEM, not a color swap: `style` controls
 * structural rendering decisions (heading treatment, divider glyphs, how tech
 * stacks and projects are laid out) while `tokens` controls the surface
 * (color/type/spacing) for each color mode. Both markdown export and the
 * live-preview renderer read the same definition so they never drift apart.
 */
export type ThemeTokens = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  border: string;
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  radius: string;
  spacingUnit: string;
};

export type HeadingStyle = "plain" | "prompt" | "serif" | "bordered" | "smallcaps" | "chart" | "pixel";
export type DividerStyle = "none" | "line" | "ascii" | "dots" | "double-line" | "scanline";
export type TechStackLayout = "grouped-table" | "badges-flat" | "badges-grouped" | "plain-grouped-list" | "bento-grid";
export type ProjectLayout = "table" | "list-metric" | "bento-cards" | "narrative-list";
export type PageLayout = "single-column" | "two-column" | "bento";

export type ThemeStyle = {
  headingStyle: HeadingStyle;
  dividerStyle: DividerStyle;
  techStackLayout: TechStackLayout;
  projectLayout: ProjectLayout;
  layout: PageLayout;
};

export type ThemeDefinition = {
  id: string;
  name: string;
  description: string;
  tokens: {
    dark: ThemeTokens;
    light: ThemeTokens;
  };
  style: ThemeStyle;
};
