import type { ThemeDefinition } from "@/themes/types";
import { buildRepeatingWavePath } from "@/lib/banner/wavePath";
import { bannerFontFamily } from "@/lib/banner/bannerFonts";
import { lighten, darken } from "@/lib/banner/color";
import { escapeXml } from "@/lib/banner/escapeXml";

export const BANNER_WIDTH = 1200;
export const BANNER_HEIGHT = 220;

export function buildBannerSvg(
  theme: ThemeDefinition,
  mode: "dark" | "light",
  title: string,
  subtitle: string,
): string {
  const tokens = theme.tokens[mode];
  const fontFamily = bannerFontFamily(theme.style.headingStyle);
  const bgFrom = tokens.bg;
  const bgTo = mode === "dark" ? lighten(tokens.bg, 0.12) : darken(tokens.bg, 0.06);
  const waveBack = theme.style.dividerStyle === "none" ? tokens.muted : tokens.accent;

  const backWave = buildRepeatingWavePath(BANNER_WIDTH, BANNER_HEIGHT, BANNER_HEIGHT * 0.82, 14, 220);
  const frontWave = buildRepeatingWavePath(BANNER_WIDTH, BANNER_HEIGHT, BANNER_HEIGHT * 0.88, 10, 180);

  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);

  return `<svg width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" viewBox="0 0 ${BANNER_WIDTH} ${BANNER_HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${safeTitle}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgFrom}" />
      <stop offset="100%" stop-color="${bgTo}" />
    </linearGradient>
  </defs>
  <rect width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" fill="url(#bg)" />
  <g opacity="0.16" fill="${waveBack}">
    <path d="${backWave}">
      <animateTransform attributeName="transform" type="translate" from="0 0" to="${-BANNER_WIDTH} 0" dur="14s" repeatCount="indefinite" />
    </path>
  </g>
  <g opacity="0.22" fill="${tokens.accent}">
    <path d="${frontWave}">
      <animateTransform attributeName="transform" type="translate" from="${-BANNER_WIDTH} 0" to="0 0" dur="9s" repeatCount="indefinite" />
    </path>
  </g>
  <text x="50%" y="42%" text-anchor="middle" font-family="${fontFamily}" font-size="46" font-weight="700" fill="${tokens.fg}">${safeTitle}</text>
  <text x="50%" y="58%" text-anchor="middle" font-family="${fontFamily}" font-size="19" fill="${tokens.muted}">${safeSubtitle}</text>
</svg>`;
}
