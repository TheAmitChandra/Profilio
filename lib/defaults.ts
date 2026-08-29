import { generateBlockId } from "@/lib/id";
import type { ProfileBlock, ProfileDocument, BlockType } from "@/lib/schema";

export function createDefaultBlock(type: BlockType): ProfileBlock {
  const id = generateBlockId();
  switch (type) {
    case "header":
      return {
        id,
        type,
        name: "Your Name",
        tagline: "What you build, in one sentence.",
        bannerStyle: "wave",
      };
    case "bio":
      return {
        id,
        type,
        text: "Write a short, present-tense bio. What do you work on, and what are you looking to do next?",
      };
    case "techStack":
      return {
        id,
        type,
        categories: [
          { label: "Languages", items: ["TypeScript", "Python"] },
          { label: "Frameworks", items: ["Next.js", "React"] },
        ],
      };
    case "pinnedProjects":
      return {
        id,
        type,
        projects: [
          {
            name: "Project Name",
            description: "One line on what it does and who it's for.",
            url: "https://github.com/you/project",
            metric: "1.2k stars",
          },
        ],
      };
    case "statsWidget":
      return {
        id,
        type,
        widget: "stats",
        mode: "hosted",
      };
    case "socials":
      return {
        id,
        type,
        links: [{ platform: "Website", url: "https://example.com" }],
        primaryCtaIndex: 0,
      };
    case "customMarkdown":
      return {
        id,
        type,
        raw: "<!-- Add any custom markdown here -->",
      };
  }
}

export function createDefaultDocument(): ProfileDocument {
  return {
    version: 1,
    themeId: "minimalist",
    colorMode: "dark",
    blocks: [
      createDefaultBlock("header"),
      createDefaultBlock("bio"),
      createDefaultBlock("techStack"),
      createDefaultBlock("pinnedProjects"),
      createDefaultBlock("socials"),
    ],
  };
}
