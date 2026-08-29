import { describe, expect, it } from "vitest";
import { renderMarkdown } from "@/lib/markdown/render";
import { createDefaultDocument } from "@/lib/defaults";

describe("renderMarkdown", () => {
  it("renders the header name and tagline", () => {
    const doc = createDefaultDocument();
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain(doc.blocks[0].type === "header" ? doc.blocks[0].name : "");
  });

  it("renders the header as an animated banner image by default", () => {
    const doc = createDefaultDocument();
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain(`<img width="100%" src="/api/banner/${doc.themeId}?title=`);
  });

  it("falls back to a plain heading when bannerStyle is 'none'", () => {
    const doc = createDefaultDocument();
    doc.blocks[0] = { ...doc.blocks[0], bannerStyle: "none" } as (typeof doc.blocks)[0];
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain("# Your Name");
    expect(markdown).not.toContain("/api/banner/");
  });

  it("renders a typing-effect image when bannerStyle is 'typing'", () => {
    const doc = createDefaultDocument();
    doc.blocks[0] = { ...doc.blocks[0], bannerStyle: "typing" } as (typeof doc.blocks)[0];
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain("# Your Name");
    expect(markdown).toContain(`/api/typing/${doc.themeId}?text=`);
  });

  it("uses the terminal theme's prompt-style heading for section titles", () => {
    const doc = createDefaultDocument();
    doc.themeId = "terminal";
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain("$ About");
  });

  it("renders a markdown table for the blueprint theme's tech stack", () => {
    const doc = createDefaultDocument();
    doc.themeId = "blueprint";
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain("| Category | Stack |");
  });

  it("renders shields.io badges for corporate-clean tech stack", () => {
    const doc = createDefaultDocument();
    doc.themeId = "corporate-clean";
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain("img.shields.io/badge");
  });

  it("points hosted stats widgets at the themed /api/og route", () => {
    const doc = createDefaultDocument();
    doc.blocks.push({ id: "sw", type: "statsWidget", widget: "stats", mode: "hosted" });
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain(`/api/og/${doc.themeId}?widget=stats&mode=${doc.colorMode}`);
  });

  it("includes the githubUsername as a user query param when set", () => {
    const doc = createDefaultDocument();
    doc.githubUsername = "octocat";
    doc.blocks.push({ id: "sw", type: "statsWidget", widget: "stats", mode: "hosted" });
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain("&user=octocat");
  });

  it("points actions-export stats widgets at a local svg file", () => {
    const doc = createDefaultDocument();
    doc.blocks.push({ id: "sw", type: "statsWidget", widget: "streak", mode: "actions-export" });
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain("./profile-streak.svg");
  });
});
