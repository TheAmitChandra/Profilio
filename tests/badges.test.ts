import { describe, expect, it } from "vitest";
import { badgeMarkdown } from "@/lib/markdown/badges";
import { getBadgePreset, fallbackColor } from "@/lib/markdown/badgePresets";

describe("badgeMarkdown", () => {
  it("uses the known brand color, logo, and for-the-badge style for a preset tech", () => {
    const markdown = badgeMarkdown("Python");
    expect(markdown).toContain("style=for-the-badge");
    expect(markdown).toContain("logo=python");
    expect(markdown).toContain("3776AB");
  });

  it("resolves common aliases to the same preset", () => {
    expect(getBadgePreset("Node.js")).toEqual(getBadgePreset("node"));
    expect(getBadgePreset("JS")).toEqual(getBadgePreset("JavaScript"));
  });

  it("still renders for-the-badge style without a logo for unknown tech names", () => {
    const markdown = badgeMarkdown("SomeObscureInternalTool");
    expect(markdown).toContain("style=for-the-badge");
    expect(markdown).not.toContain("logo=");
  });

  it("produces a deterministic fallback color for the same unknown name", () => {
    expect(fallbackColor("SomeObscureInternalTool")).toBe(fallbackColor("SomeObscureInternalTool"));
  });
});
