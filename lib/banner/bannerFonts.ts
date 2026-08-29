import type { HeadingStyle } from "@/themes/types";

/**
 * The banner is served as a standalone SVG image (embedded via <img>), so it
 * can't reference this app's `var(--font-*)` CSS custom properties — those
 * only exist inside our own page. Literal, universally-available font
 * stacks are used instead, chosen to still feel distinct per theme.
 */
export function bannerFontFamily(headingStyle: HeadingStyle): string {
  switch (headingStyle) {
    case "prompt":
    case "pixel":
      return "'Courier New', ui-monospace, monospace";
    case "serif":
      return "Georgia, 'Times New Roman', serif";
    default:
      return "-apple-system, 'Segoe UI', system-ui, sans-serif";
  }
}
