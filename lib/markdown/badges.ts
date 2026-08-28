function encodeBadgeSegment(text: string): string {
  return encodeURIComponent(text).replace(/-/g, "--").replace(/_/g, "__");
}

export function shieldsBadgeUrl(label: string, color = "0a0a0a", style: "flat" | "flat-square" = "flat-square"): string {
  return `https://img.shields.io/badge/${encodeBadgeSegment(label)}-${color}?style=${style}`;
}

export function badgeMarkdown(label: string, color?: string, style?: "flat" | "flat-square"): string {
  return `![${label}](${shieldsBadgeUrl(label, color, style)})`;
}
