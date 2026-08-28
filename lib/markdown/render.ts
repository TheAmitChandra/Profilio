import type { ProfileBlock, ProfileDocument } from "@/lib/schema";
import { getTheme } from "@/themes/registry";
import type { ThemeStyle } from "@/themes/types";
import { toSmallCaps } from "@/lib/markdown/smallcaps";
import { badgeMarkdown } from "@/lib/markdown/badges";

/**
 * GitHub strips <style> tags and most inline `style` attributes from
 * profile READMEs, so a theme's "look" in the exported markdown comes only
 * from structural/textual conventions each theme's `style` config picks —
 * heading decoration, divider glyphs, tables vs. lists vs. badges — never
 * from CSS. See DECISIONS.md for why the rich CSS-token renderers in
 * themes/blockRenderers.tsx are used for the in-app preview/Satori cards
 * instead.
 */

function renderHeading(text: string, headingStyle: ThemeStyle["headingStyle"]): string {
  switch (headingStyle) {
    case "prompt":
      return `## \`$ ${text}\``;
    case "serif":
      return `## *${text}*`;
    case "bordered":
      return `## **${text.toUpperCase()}**`;
    case "smallcaps":
      return `**${toSmallCaps(text)}**`;
    case "chart":
      return `## 📊 ${text}`;
    case "pixel":
      return `## 👾 ${text.toUpperCase()}`;
    case "plain":
    default:
      return `## ${text}`;
  }
}

function renderDivider(dividerStyle: ThemeStyle["dividerStyle"]): string {
  switch (dividerStyle) {
    case "none":
      return "";
    case "ascii":
      return `\`${"// " + "-".repeat(40)}\`\n`;
    case "dots":
      return `\`${"·".repeat(30)}\`\n`;
    case "double-line":
      return "---\n---\n";
    case "scanline":
      return "`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`\n";
    case "line":
    default:
      return "---\n";
  }
}

function renderHeaderBlock(block: Extract<ProfileBlock, { type: "header" }>): string {
  const avatar = block.avatarUrl
    ? `<img src="${block.avatarUrl}" alt="${block.name}" width="96" align="left" style="margin-right: 16px" />\n\n`
    : "";
  return `${avatar}# ${block.name}\n${block.tagline}`;
}

function renderBioBlock(block: Extract<ProfileBlock, { type: "bio" }>, style: ThemeStyle): string {
  return `${renderHeading("About", style.headingStyle)}\n\n${block.text}`;
}

function renderTechStackBlock(
  block: Extract<ProfileBlock, { type: "techStack" }>,
  style: ThemeStyle,
): string {
  const heading = renderHeading("Tech Stack", style.headingStyle);
  switch (style.techStackLayout) {
    case "grouped-table": {
      const rows = block.categories
        .map((c) => `| ${c.label} | ${c.items.join(", ")} |`)
        .join("\n");
      return `${heading}\n\n| Category | Stack |\n| --- | --- |\n${rows}`;
    }
    case "badges-flat": {
      const badges = block.categories
        .flatMap((c) => c.items)
        .map((item) => badgeMarkdown(item))
        .join(" ");
      return `${heading}\n\n${badges}`;
    }
    case "badges-grouped": {
      const groups = block.categories
        .map((c) => `**${c.label}**\n${c.items.map((item) => badgeMarkdown(item)).join(" ")}`)
        .join("\n\n");
      return `${heading}\n\n${groups}`;
    }
    case "bento-grid": {
      const cells = block.categories.map((c) => `**${c.label}**<br/>${c.items.join(", ")}`);
      const cols = 3;
      const rows: string[] = [];
      for (let i = 0; i < cells.length; i += cols) {
        rows.push(`| ${cells.slice(i, i + cols).join(" | ")} |`);
      }
      const header = `| ${Array(Math.min(cols, cells.length)).fill(" ").join(" | ")} |`;
      const sep = `| ${Array(Math.min(cols, cells.length)).fill("---").join(" | ")} |`;
      return `${heading}\n\n${header}\n${sep}\n${rows.join("\n")}`;
    }
    case "plain-grouped-list":
    default: {
      const list = block.categories.map((c) => `- **${c.label}**: ${c.items.join(", ")}`).join("\n");
      return `${heading}\n\n${list}`;
    }
  }
}

function renderPinnedProjectsBlock(
  block: Extract<ProfileBlock, { type: "pinnedProjects" }>,
  style: ThemeStyle,
): string {
  const heading = renderHeading("Projects", style.headingStyle);
  switch (style.projectLayout) {
    case "table": {
      const rows = block.projects
        .map((p) => `| [${p.name}](${p.url}) | ${p.description} | ${p.metric ?? ""} |`)
        .join("\n");
      return `${heading}\n\n| Project | Description | Metric |\n| --- | --- | --- |\n${rows}`;
    }
    case "bento-cards": {
      const cells = block.projects.map(
        (p) => `**[${p.name}](${p.url})**<br/>${p.description}${p.metric ? `<br/>_${p.metric}_` : ""}`,
      );
      const cols = 2;
      const rows: string[] = [];
      for (let i = 0; i < cells.length; i += cols) {
        rows.push(`| ${cells.slice(i, i + cols).join(" | ")} |`);
      }
      const header = `| ${Array(Math.min(cols, cells.length)).fill(" ").join(" | ")} |`;
      const sep = `| ${Array(Math.min(cols, cells.length)).fill("---").join(" | ")} |`;
      return `${heading}\n\n${header}\n${sep}\n${rows.join("\n")}`;
    }
    case "narrative-list": {
      const items = block.projects
        .map((p) => `**[${p.name}](${p.url})**\n${p.description}${p.metric ? ` — ${p.metric}` : ""}`)
        .join("\n\n");
      return `${heading}\n\n${items}`;
    }
    case "list-metric":
    default: {
      const items = block.projects
        .map((p) => `- **[${p.name}](${p.url})** — ${p.description}${p.metric ? ` \`${p.metric}\`` : ""}`)
        .join("\n");
      return `${heading}\n\n${items}`;
    }
  }
}

function renderSocialsBlock(block: Extract<ProfileBlock, { type: "socials" }>, style: ThemeStyle): string {
  const heading = renderHeading("Connect", style.headingStyle);
  const links = block.links
    .map((link, i) => (i === block.primaryCtaIndex ? `**[${link.platform}](${link.url})**` : `[${link.platform}](${link.url})`))
    .join(" · ");
  return `${heading}\n\n${links}`;
}

function renderStatsWidgetBlock(block: Extract<ProfileBlock, { type: "statsWidget" }>): string {
  if (block.mode === "actions-export") {
    return `![${block.widget}](./profile-${block.widget}.svg)`;
  }
  return `![${block.widget}](/api/og/${block.widget})`;
}

function renderCustomMarkdownBlock(block: Extract<ProfileBlock, { type: "customMarkdown" }>): string {
  return block.raw;
}

export function renderBlock(block: ProfileBlock, style: ThemeStyle): string {
  switch (block.type) {
    case "header":
      return renderHeaderBlock(block);
    case "bio":
      return renderBioBlock(block, style);
    case "techStack":
      return renderTechStackBlock(block, style);
    case "pinnedProjects":
      return renderPinnedProjectsBlock(block, style);
    case "socials":
      return renderSocialsBlock(block, style);
    case "statsWidget":
      return renderStatsWidgetBlock(block);
    case "customMarkdown":
      return renderCustomMarkdownBlock(block);
  }
}

export function renderMarkdown(document: ProfileDocument): string {
  const theme = getTheme(document.themeId);
  const divider = renderDivider(theme.style.dividerStyle);
  const sections = document.blocks.map((block) => renderBlock(block, theme.style));
  return sections.join(divider ? `\n\n${divider}\n` : "\n\n").trim() + "\n";
}
