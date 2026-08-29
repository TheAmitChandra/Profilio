"use client";

import type { ProfileBlock } from "@/lib/schema";
import { HeaderBlockEditor } from "@/app/(editor)/components/blocks/HeaderBlockEditor";
import { BioBlockEditor } from "@/app/(editor)/components/blocks/BioBlockEditor";
import { TechStackBlockEditor } from "@/app/(editor)/components/blocks/TechStackBlockEditor";
import { PinnedProjectsBlockEditor } from "@/app/(editor)/components/blocks/PinnedProjectsBlockEditor";
import { SocialsBlockEditor } from "@/app/(editor)/components/blocks/SocialsBlockEditor";
import { StatsWidgetBlockEditor } from "@/app/(editor)/components/blocks/StatsWidgetBlockEditor";
import { CustomMarkdownBlockEditor } from "@/app/(editor)/components/blocks/CustomMarkdownBlockEditor";

export const BLOCK_TYPE_LABELS: Record<ProfileBlock["type"], string> = {
  header: "Header",
  bio: "Bio",
  techStack: "Tech Stack",
  pinnedProjects: "Pinned Projects",
  statsWidget: "Stats Widget",
  socials: "Socials",
  customMarkdown: "Custom Markdown",
};

export function BlockEditor({ block }: { block: ProfileBlock }) {
  switch (block.type) {
    case "header":
      return <HeaderBlockEditor block={block} />;
    case "bio":
      return <BioBlockEditor block={block} />;
    case "techStack":
      return <TechStackBlockEditor block={block} />;
    case "pinnedProjects":
      return <PinnedProjectsBlockEditor block={block} />;
    case "socials":
      return <SocialsBlockEditor block={block} />;
    case "statsWidget":
      return <StatsWidgetBlockEditor block={block} />;
    case "customMarkdown":
      return <CustomMarkdownBlockEditor block={block} />;
  }
}
