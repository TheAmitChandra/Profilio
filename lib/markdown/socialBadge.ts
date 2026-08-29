import { getSocialPreset } from "@/lib/markdown/socialPresets";
import { fallbackColor } from "@/lib/markdown/badgePresets";

function encodeBadgeSegment(text: string): string {
  return encodeURIComponent(text).replace(/-/g, "--").replace(/_/g, "__");
}

/** A clickable for-the-badge shield linking out to `url`, colored/logo'd for known platforms. */
export function socialBadgeMarkdown(platform: string, url: string): string {
  const preset = getSocialPreset(platform);
  const color = preset?.color ?? fallbackColor(platform);
  const params = new URLSearchParams({ style: "for-the-badge" });
  if (preset) {
    params.set("logo", preset.logo);
    params.set("logoColor", preset.logoColor);
  }
  const badgeUrl = `https://img.shields.io/badge/${encodeBadgeSegment(platform)}-${color}?${params.toString()}`;
  return `[![${platform}](${badgeUrl})](${url})`;
}
