export type SocialPreset = { logo: string; color: string; logoColor: string };

const PRESETS: Record<string, SocialPreset> = {
  linkedin: { logo: "linkedin", color: "0A66C2", logoColor: "fff" },
  github: { logo: "github", color: "181717", logoColor: "fff" },
  x: { logo: "x", color: "000000", logoColor: "fff" },
  gmail: { logo: "gmail", color: "D14836", logoColor: "fff" },
  website: { logo: "googlechrome", color: "FF5722", logoColor: "fff" },
  leetcode: { logo: "leetcode", color: "FFA116", logoColor: "000" },
  hackerrank: { logo: "hackerrank", color: "00EA64", logoColor: "000" },
  devto: { logo: "devdotto", color: "0A0A0A", logoColor: "fff" },
  discord: { logo: "discord", color: "5865F2", logoColor: "fff" },
  youtube: { logo: "youtube", color: "FF0000", logoColor: "fff" },
  instagram: { logo: "instagram", color: "E4405F", logoColor: "fff" },
  medium: { logo: "medium", color: "000000", logoColor: "fff" },
  stackoverflow: { logo: "stackoverflow", color: "F58025", logoColor: "fff" },
  telegram: { logo: "telegram", color: "26A5E4", logoColor: "fff" },
  slack: { logo: "slack", color: "4A154B", logoColor: "fff" },
  twitch: { logo: "twitch", color: "9146FF", logoColor: "fff" },
  reddit: { logo: "reddit", color: "FF4500", logoColor: "fff" },
  facebook: { logo: "facebook", color: "1877F2", logoColor: "fff" },
  kaggle: { logo: "kaggle", color: "20BEFF", logoColor: "fff" },
  npm: { logo: "npm", color: "CB3837", logoColor: "fff" },
  pypi: { logo: "pypi", color: "3775A9", logoColor: "fff" },
  codepen: { logo: "codepen", color: "000000", logoColor: "fff" },
  dribbble: { logo: "dribbble", color: "EA4C89", logoColor: "fff" },
  behance: { logo: "behance", color: "1769FF", logoColor: "fff" },
};

const ALIASES: Record<string, string> = {
  twitter: "x",
  "x.com": "x",
  email: "gmail",
  mail: "gmail",
  portfolio: "website",
  blog: "website",
  homepage: "website",
  "dev.to": "devto",
  "dev community": "devto",
};

function normalize(name: string): string {
  return name.toLowerCase().trim();
}

export function getSocialPreset(platform: string): SocialPreset | null {
  const key = normalize(platform);
  const canonicalKey = ALIASES[key] ?? key;
  return PRESETS[canonicalKey] ?? null;
}
