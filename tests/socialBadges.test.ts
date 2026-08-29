import { describe, expect, it } from "vitest";
import { socialBadgeMarkdown } from "@/lib/markdown/socialBadge";
import { renderMarkdown } from "@/lib/markdown/render";
import { createDefaultDocument } from "@/lib/defaults";

describe("socialBadgeMarkdown", () => {
  it("wraps a colorful, logo'd for-the-badge shield in a link to the platform URL", () => {
    const markdown = socialBadgeMarkdown("LinkedIn", "https://linkedin.com/in/x");
    expect(markdown).toBe(
      "[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=fff)](https://linkedin.com/in/x)",
    );
  });

  it("still produces a clickable badge for an unrecognized platform name", () => {
    const markdown = socialBadgeMarkdown("MyObscureForum", "https://forum.example.com");
    expect(markdown).toContain("style=for-the-badge");
    expect(markdown).toContain("](https://forum.example.com)");
  });
});

describe("renderMarkdown socials", () => {
  it("puts the primary CTA badge on its own line, separate from the rest", () => {
    const doc = createDefaultDocument();
    doc.blocks.push({
      id: "socials",
      type: "socials",
      links: [
        { platform: "GitHub", url: "https://github.com/x" },
        { platform: "LinkedIn", url: "https://linkedin.com/in/x" },
      ],
      primaryCtaIndex: 1,
    });
    const markdown = renderMarkdown(doc);
    const linkedinLine = markdown.split("\n").find((line) => line.includes("LinkedIn"));
    const githubLine = markdown.split("\n").find((line) => line.includes("GitHub") && line.includes("shields.io"));
    expect(linkedinLine).not.toBe(githubLine);
  });
});
