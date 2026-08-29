let cachedInterRegular: ArrayBuffer | null = null;
let cachedInterBold: ArrayBuffer | null = null;

async function fetchGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const cssRes = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
    { headers: { "User-Agent": "Mozilla/5.0 (Satori font fetch)" } },
  );
  const css = await cssRes.text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:woff2|truetype|opentype)'\)/);
  if (!match) throw new Error(`Could not resolve a font URL for ${family} ${weight}`);
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

/** Cached per warm serverless instance — Satori needs fonts as raw ArrayBuffers, not URLs. */
export async function getSatoriFonts() {
  if (!cachedInterRegular) {
    cachedInterRegular = await fetchGoogleFont("Inter", 400);
  }
  if (!cachedInterBold) {
    cachedInterBold = await fetchGoogleFont("Inter", 700);
  }
  return [
    { name: "Inter", data: cachedInterRegular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: cachedInterBold, weight: 700 as const, style: "normal" as const },
  ];
}
