import { getBadgePreset, fallbackColor } from "@/lib/markdown/badgePresets";

function encodeBadgeSegment(text: string): string {
  return encodeURIComponent(text).replace(/-/g, "--").replace(/_/g, "__");
}

/**
 * Real GitHub profiles that "pop" lean on shields.io's for-the-badge style
 * with each technology's actual brand logo and color (see badgePresets.ts) —
 * a flat grayscale badge with no logo reads as a form-generator afterthought.
 */
export function badgeMarkdown(label: string): string {
  const preset = getBadgePreset(label);
  const color = preset?.color ?? fallbackColor(label);
  const params = new URLSearchParams({ style: "for-the-badge" });
  if (preset) {
    params.set("logo", preset.logo);
    params.set("logoColor", preset.logoColor);
  }
  const url = `https://img.shields.io/badge/${encodeBadgeSegment(label)}-${color}?${params.toString()}`;
  return `![${label}](${url})`;
}
