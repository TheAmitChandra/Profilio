import { describe, expect, it } from "vitest";
import { renderMarkdown } from "@/lib/markdown/render";
import { createDefaultDocument } from "@/lib/defaults";

describe("renderMarkdown", () => {
  it("renders the header name and tagline", () => {
    const doc = createDefaultDocument();
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain(doc.blocks[0].type === "header" ? doc.blocks[0].name : "");
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

  it("points actions-export stats widgets at a local svg file", () => {
    const doc = createDefaultDocument();
    doc.blocks.push({ id: "sw", type: "statsWidget", widget: "streak", mode: "actions-export" });
    const markdown = renderMarkdown(doc);
    expect(markdown).toContain("./profile-streak.svg");
  });
});
