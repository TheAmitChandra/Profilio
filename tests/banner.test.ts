import { describe, expect, it } from "vitest";
import { buildBannerSvg } from "@/lib/banner/buildBannerSvg";
import { buildTypingSvg } from "@/lib/banner/buildTypingSvg";
import { buildRepeatingWavePath } from "@/lib/banner/wavePath";
import { escapeXml } from "@/lib/banner/escapeXml";
import { mixHex, lighten, darken } from "@/lib/banner/color";
import { getTheme } from "@/themes/registry";

describe("buildBannerSvg", () => {
  const theme = getTheme("terminal");

  it("includes the title and subtitle text, escaped for safe SVG embedding", () => {
    const svg = buildBannerSvg(theme, "dark", "Avery <Chen>", "builds & ships");
    expect(svg).toContain("Avery &lt;Chen&gt;");
    expect(svg).toContain("builds &amp; ships");
    expect(svg).not.toContain("<Chen>");
  });

  it("animates the wave layers via animateTransform, not a static frame", () => {
    const svg = buildBannerSvg(theme, "dark", "Name", "tagline");
    expect(svg).toContain("<animateTransform");
    expect(svg).toContain('repeatCount="indefinite"');
  });

  it("uses the theme's own colors for the background gradient", () => {
    const svg = buildBannerSvg(theme, "dark", "Name", "tagline");
    expect(svg).toContain(theme.tokens.dark.bg);
    expect(svg).toContain(theme.tokens.dark.accent);
  });
});

describe("buildTypingSvg", () => {
  const theme = getTheme("neo-dark");

  it("escapes the typed text and includes a synchronized reveal + cursor animation", () => {
    const svg = buildTypingSvg(theme, "dark", "AI & ML <Engineer>");
    expect(svg).toContain("AI &amp; ML &lt;Engineer&gt;");
    expect(svg).toContain('attributeName="width"');
    expect(svg).toContain('attributeName="opacity"');
  });
});

describe("buildRepeatingWavePath", () => {
  it("produces a path spanning exactly twice the visible width, for a seamless loop", () => {
    const d = buildRepeatingWavePath(400, 100, 80, 10, 100);
    const match = d.match(/L(\d+(?:\.\d+)?)\s/);
    expect(match).not.toBeNull();
    expect(Number(match?.[1])).toBe(800);
  });
});

describe("escapeXml", () => {
  it("escapes all five reserved XML characters", () => {
    expect(escapeXml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&apos;&amp;&apos;&lt;/a&gt;");
  });
});

describe("color helpers", () => {
  it("mixHex(0) returns the original color and mixHex(1) returns the target", () => {
    expect(mixHex("#000000", "#ffffff", 0)).toBe("#000000");
    expect(mixHex("#000000", "#ffffff", 1)).toBe("#ffffff");
  });

  it("lighten and darken move toward white/black respectively", () => {
    expect(lighten("#000000", 0.5)).toBe("#808080");
    expect(darken("#ffffff", 0.5)).toBe("#808080");
  });
});
