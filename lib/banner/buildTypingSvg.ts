import type { ThemeDefinition } from "@/themes/types";
import { escapeXml } from "@/lib/banner/escapeXml";

const FONT_FAMILY = "'Courier New', ui-monospace, monospace";
const FONT_SIZE = 22;
const CHAR_WIDTH = FONT_SIZE * 0.6; // monospace width approximation
const HEIGHT = 50;
const START_X = 8;

/** Reveal/hold/erase keyframe schedule shared by the text clip-path and the cursor position, so they stay in sync. */
const KEY_TIMES = "0;0.55;0.72;0.75;1";

export function buildTypingSvg(theme: ThemeDefinition, mode: "dark" | "light", text: string): string {
  const tokens = theme.tokens[mode];
  const textWidth = Math.max(text.length * CHAR_WIDTH, CHAR_WIDTH);
  const width = START_X + textWidth + 24;
  const endX = START_X + textWidth;

  const widthValues = `0;${textWidth};${textWidth};0;0`;
  const cursorXValues = `${START_X};${endX};${endX};${START_X};${START_X}`;
  const safeText = escapeXml(text);

  return `<svg width="${width}" height="${HEIGHT}" viewBox="0 0 ${width} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${safeText}">
  <defs>
    <clipPath id="reveal">
      <rect x="0" y="0" height="${HEIGHT}">
        <animate attributeName="width" keyTimes="${KEY_TIMES}" values="${widthValues}" dur="4.5s" repeatCount="indefinite" />
      </rect>
    </clipPath>
  </defs>
  <text x="${START_X}" y="${HEIGHT * 0.65}" font-family="${FONT_FAMILY}" font-size="${FONT_SIZE}" fill="${tokens.accent}" clip-path="url(#reveal)">${safeText}</text>
  <rect y="${HEIGHT * 0.2}" width="3" height="${FONT_SIZE * 1.15}" fill="${tokens.accent}">
    <animate attributeName="x" keyTimes="${KEY_TIMES}" values="${cursorXValues}" dur="4.5s" repeatCount="indefinite" />
    <animate attributeName="opacity" keyTimes="0;0.4;0.5;0.9;1" values="1;1;0;0;1" dur="1s" repeatCount="indefinite" />
  </rect>
</svg>`;
}
