import type { ProfileDocument } from "@/lib/schema";
import type { ThemeDefinition } from "@/themes/types";
import {
  BioBlockView,
  PinnedProjectsBlockView,
  TechStackBlockView,
} from "@/themes/blockRenderers";

export function ThemedPreviewCard({ theme, document }: { theme: ThemeDefinition; document: ProfileDocument }) {
  const header = document.blocks.find((b) => b.type === "header");
  const bio = document.blocks.find((b) => b.type === "bio");
  const bannerUrl =
    header?.type === "header"
      ? `/api/banner/${theme.id}?title=${encodeURIComponent(header.name)}&subtitle=${encodeURIComponent(header.tagline)}&mode=${document.colorMode}`
      : null;
  const techStack = document.blocks.find((b) => b.type === "techStack");
  const pinnedProjects = document.blocks.find((b) => b.type === "pinnedProjects");

  return (
    <div
      data-profilio-theme={theme.id}
      data-profilio-mode={document.colorMode}
      className="space-y-5 overflow-hidden rounded-lg border p-6"
      style={{
        backgroundColor: "var(--profilio-bg)",
        color: "var(--profilio-fg)",
        borderColor: "var(--profilio-border)",
        fontFamily: "var(--profilio-font-body)",
      }}
    >
      {bannerUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bannerUrl} alt="" className="-m-6 mb-1 block w-[calc(100%+3rem)] max-w-none" />
      ) : null}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold" style={{ color: "var(--profilio-fg)" }}>
          {theme.name}
        </h3>
        <span className="text-xs" style={{ color: "var(--profilio-muted)" }}>
          {document.colorMode}
        </span>
      </div>
      {bio?.type === "bio" ? <BioBlockView block={bio} /> : null}
      {techStack?.type === "techStack" ? <TechStackBlockView block={techStack} style={theme.style} /> : null}
      {pinnedProjects?.type === "pinnedProjects" ? (
        <PinnedProjectsBlockView block={pinnedProjects} style={theme.style} />
      ) : null}
    </div>
  );
}
