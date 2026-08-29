import { describe, expect, it } from "vitest";
import { runSignalCheck } from "@/lib/linter/signalCheck";
import { createDefaultDocument } from "@/lib/defaults";
import type { ProfileDocument } from "@/lib/schema";

function baseDoc(overrides: Partial<ProfileDocument> = {}): ProfileDocument {
  return { ...createDefaultDocument(), ...overrides };
}

describe("signalCheck", () => {
  it("gives the default document a passing score on most rules", () => {
    const report = runSignalCheck(baseDoc());
    expect(report.maxScore).toBe(11);
    expect(report.score).toBeGreaterThanOrEqual(8);
  });

  it("fails primary-cta when there are no socials links", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        { id: "2", type: "socials", links: [] },
      ],
    });
    const report = runSignalCheck(doc);
    const rule = report.results.find((r) => r.id === "primary-cta");
    expect(rule?.passed).toBe(false);
  });

  it("fails primary-cta with 3+ links and no primary marked", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        {
          id: "2",
          type: "socials",
          links: [
            { platform: "X", url: "https://x.com/a" },
            { platform: "Y", url: "https://y.com/a" },
            { platform: "Z", url: "https://z.com/a" },
          ],
        },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "primary-cta")?.passed).toBe(false);
  });

  it("passes primary-cta with one link marked primary", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        {
          id: "2",
          type: "socials",
          links: [{ platform: "X", url: "https://x.com/a" }],
          primaryCtaIndex: 0,
        },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "primary-cta")?.passed).toBe(true);
  });

  it("fails pinned-project-count for 0 or 1 projects", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        { id: "2", type: "pinnedProjects", projects: [{ name: "Solo", description: "d", url: "https://x.com" }] },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "pinned-project-count")?.passed).toBe(false);
  });

  it("fails pinned-project-count for 6+ projects", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        {
          id: "2",
          type: "pinnedProjects",
          projects: Array.from({ length: 6 }, (_, i) => ({
            name: `P${i}`,
            description: "d",
            url: "https://x.com",
          })),
        },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "pinned-project-count")?.passed).toBe(false);
  });

  it("fails header-first when header is missing or not first", () => {
    const doc = baseDoc({
      blocks: [{ id: "1", type: "bio", text: "hi" }],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "header-first")?.passed).toBe(false);
  });

  it("fails bio-length when the bio exceeds 250 words", () => {
    const longBio = Array(300).fill("word").join(" ");
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        { id: "2", type: "bio", text: longBio },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "bio-length")?.passed).toBe(false);
  });

  it("fails single-stats-widget with duplicate widgets", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        { id: "2", type: "statsWidget", widget: "stats", mode: "hosted" },
        { id: "3", type: "statsWidget", widget: "streak", mode: "hosted" },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "single-stats-widget")?.passed).toBe(false);
  });

  it("suggests actions-export mode when a stats widget is hosted", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        { id: "2", type: "statsWidget", widget: "stats", mode: "hosted" },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "actions-export-mode")?.passed).toBe(false);
  });

  it("passes actions-export-mode check when mode is actions-export", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        { id: "2", type: "statsWidget", widget: "stats", mode: "actions-export" },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "actions-export-mode")?.passed).toBe(true);
  });

  it("flags undated 'currently learning' language", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        { id: "2", type: "bio", text: "I am currently learning Rust." },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "dated-milestones")?.passed).toBe(false);
  });

  it("passes dated milestones when a date is present in the same sentence", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        { id: "2", type: "bio", text: "Since March 2026 I've been learning Rust." },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "dated-milestones")?.passed).toBe(true);
  });

  it("fails tech-stack-grouped for one flat category with many items", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        {
          id: "2",
          type: "techStack",
          categories: [{ label: "Everything", items: Array.from({ length: 12 }, (_, i) => `Tool${i}`) }],
        },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "tech-stack-grouped")?.passed).toBe(false);
  });

  it("fails no-redundant-socials on duplicate URLs", () => {
    const doc = baseDoc({
      blocks: [
        { id: "1", type: "header", name: "A", tagline: "B" },
        {
          id: "2",
          type: "socials",
          links: [
            { platform: "X", url: "https://example.com" },
            { platform: "Y", url: "https://example.com" },
          ],
          primaryCtaIndex: 0,
        },
      ],
    });
    const report = runSignalCheck(doc);
    expect(report.results.find((r) => r.id === "no-redundant-socials")?.passed).toBe(false);
  });
});
