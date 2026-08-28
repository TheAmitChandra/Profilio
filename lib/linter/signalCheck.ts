import type { ProfileDocument } from "@/lib/schema";
import { countWords } from "@/lib/linter/words";

export type SignalCheckResult = {
  id: string;
  title: string;
  passed: boolean;
  message: string;
};

export type SignalCheckReport = {
  results: SignalCheckResult[];
  score: number;
  maxScore: number;
};

const LEARNING_PHRASE = /\b(currently\s+)?learning\b/i;
const DATE_NEARBY = /\b(20\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i;

function checkPrimaryCta(doc: ProfileDocument): SignalCheckResult {
  const socials = doc.blocks.find((b) => b.type === "socials");
  const id = "primary-cta";
  const title = "One clear call-to-action";
  if (!socials || socials.links.length === 0) {
    return { id, title, passed: false, message: "Add a socials block with at least one link — visitors need somewhere to go next." };
  }
  const hasPrimary = socials.primaryCtaIndex !== undefined && socials.primaryCtaIndex >= 0 && socials.primaryCtaIndex < socials.links.length;
  if (socials.links.length >= 3 && !hasPrimary) {
    return { id, title, passed: false, message: "You have 3+ links with equal visual weight — mark one as the primary CTA so visitors know where to click first." };
  }
  if (!hasPrimary) {
    return { id, title, passed: false, message: "Mark one social link as the primary call-to-action." };
  }
  return { id, title, passed: true, message: "One primary call-to-action is clearly marked." };
}

function checkPinnedProjectCount(doc: ProfileDocument): SignalCheckResult {
  const block = doc.blocks.find((b) => b.type === "pinnedProjects");
  const id = "pinned-project-count";
  const title = "2-4 pinned projects";
  const count = block?.projects.length ?? 0;
  if (count <= 1) {
    return { id, title, passed: false, message: "Add at least 2 pinned projects — proof is stronger than claims." };
  }
  if (count >= 6) {
    return { id, title, passed: false, message: "Consider trimming to 2-4 pinned projects — visitors scan, they don't read everything." };
  }
  return { id, title, passed: true, message: `${count} pinned project${count === 1 ? "" : "s"} — a scannable amount.` };
}

function checkProjectHasProof(doc: ProfileDocument): SignalCheckResult {
  const block = doc.blocks.find((b) => b.type === "pinnedProjects");
  const id = "project-proof";
  const title = "At least one project has a real number or link";
  const hasProof = (block?.projects ?? []).some((p) => Boolean(p.metric?.trim()) || Boolean(p.url?.trim()));
  return hasProof
    ? { id, title, passed: true, message: "At least one pinned project has a real number or live link." }
    : { id, title, passed: false, message: "Add a star count, user count, or live link to at least one project." };
}

function checkHeaderFirst(doc: ProfileDocument): SignalCheckResult {
  const id = "header-first";
  const title = "Identity appears first";
  const first = doc.blocks[0];
  if (!first || first.type !== "header") {
    return { id, title, passed: false, message: "Put your header block (name + tagline) first — it's the first thing visitors read." };
  }
  if (!first.name.trim() || !first.tagline.trim()) {
    return { id, title, passed: false, message: "Fill in both a name and a tagline in your header block." };
  }
  return { id, title, passed: true, message: "Header with name and tagline leads the profile." };
}

function checkBioLength(doc: ProfileDocument): SignalCheckResult {
  const block = doc.blocks.find((b) => b.type === "bio");
  const id = "bio-length";
  const title = "Bio stays under ~250 words";
  const words = block ? countWords(block.text) : 0;
  if (words > 250) {
    return { id, title, passed: false, message: `Your bio is ${words} words — trim toward ~250 to avoid the "passion paragraph" anti-pattern.` };
  }
  return { id, title, passed: true, message: block ? `Bio is a concise ${words} words.` : "No bio block yet." };
}

function checkSingleStatsWidget(doc: ProfileDocument): SignalCheckResult {
  const widgets = doc.blocks.filter((b) => b.type === "statsWidget");
  const id = "single-stats-widget";
  const title = "No more than one stats widget";
  if (widgets.length > 1) {
    return { id, title, passed: false, message: `You have ${widgets.length} stats widgets — duplicate stats cards read as clutter, keep one.` };
  }
  return { id, title, passed: true, message: "Stats widget count is restrained." };
}

function checkActionsExportSuggestion(doc: ProfileDocument): SignalCheckResult {
  const widget = doc.blocks.find((b) => b.type === "statsWidget");
  const id = "actions-export-mode";
  const title = "Prefer GitHub Actions export for reliability";
  if (widget && widget.mode === "hosted") {
    return {
      id,
      title,
      passed: false,
      message: "Consider switching this stats widget to \"actions-export\" mode — it renders a static SVG in your own repo so it never breaks from a rate limit.",
    };
  }
  return { id, title, passed: true, message: widget ? "Stats widget uses the reliable Actions-export mode." : "No stats widget to worry about." };
}

function checkDatedMilestones(doc: ProfileDocument): SignalCheckResult {
  const id = "dated-milestones";
  const title = "Learning claims are dated";
  const textBlocks = doc.blocks.filter((b) => b.type === "bio" || b.type === "customMarkdown");
  for (const block of textBlocks) {
    const text = block.type === "bio" ? block.text : block.raw;
    const sentences = text.split(/(?<=[.!?])\s+/);
    for (const sentence of sentences) {
      if (LEARNING_PHRASE.test(sentence) && !DATE_NEARBY.test(sentence)) {
        return {
          id,
          title,
          passed: false,
          message: 'Vague "currently learning X" language found — pair it with a date or a concrete, provable milestone.',
        };
      }
    }
  }
  return { id, title, passed: true, message: "No undated learning claims found." };
}

function checkAboveTheFold(doc: ProfileDocument): SignalCheckResult {
  const id = "above-the-fold";
  const title = "Pinned projects appear without excessive scrolling";
  const pinnedIndex = doc.blocks.findIndex((b) => b.type === "pinnedProjects");
  if (pinnedIndex === -1) {
    return { id, title, passed: false, message: "Add a pinned projects block so visitors see proof early." };
  }
  let wordsBefore = 0;
  for (let i = 0; i < pinnedIndex; i++) {
    const b = doc.blocks[i];
    if (b.type === "bio") wordsBefore += countWords(b.text);
    if (b.type === "customMarkdown") wordsBefore += countWords(b.raw);
    if (b.type === "header") wordsBefore += countWords(b.tagline);
  }
  if (wordsBefore > 220) {
    return { id, title, passed: false, message: "There's a lot of text before your pinned projects — move them up so visitors don't have to scroll past it." };
  }
  return { id, title, passed: true, message: "Pinned projects appear early, without excess scrolling." };
}

function checkTechStackGrouped(doc: ProfileDocument): SignalCheckResult {
  const block = doc.blocks.find((b) => b.type === "techStack");
  const id = "tech-stack-grouped";
  const title = "Tech stack is grouped, not a flat badge wall";
  if (!block) {
    return { id, title, passed: true, message: "No tech stack block yet." };
  }
  const totalItems = block.categories.reduce((sum, c) => sum + c.items.length, 0);
  if (block.categories.length <= 1 && totalItems > 8) {
    return { id, title, passed: false, message: "Group your tech stack into categories (Frontend/Backend/DevOps) instead of one flat badge wall." };
  }
  return { id, title, passed: true, message: "Tech stack is organized into categories." };
}

function checkNoRedundantSocials(doc: ProfileDocument): SignalCheckResult {
  const block = doc.blocks.find((b) => b.type === "socials");
  const id = "no-redundant-socials";
  const title = "Socials don't duplicate the primary CTA";
  if (!block) {
    return { id, title, passed: true, message: "No socials block yet." };
  }
  const normalized = block.links.map((l) => l.url.trim().toLowerCase());
  const hasDuplicate = new Set(normalized).size !== normalized.length;
  if (hasDuplicate) {
    return { id, title, passed: false, message: "Two social links point to the same destination — remove the redundant one." };
  }
  return { id, title, passed: true, message: "Every social link points somewhere distinct." };
}

const RULES = [
  checkPrimaryCta,
  checkPinnedProjectCount,
  checkProjectHasProof,
  checkHeaderFirst,
  checkBioLength,
  checkSingleStatsWidget,
  checkActionsExportSuggestion,
  checkDatedMilestones,
  checkAboveTheFold,
  checkTechStackGrouped,
  checkNoRedundantSocials,
];

export function runSignalCheck(doc: ProfileDocument): SignalCheckReport {
  const results = RULES.map((rule) => rule(doc));
  const score = results.filter((r) => r.passed).length;
  return { results, score, maxScore: RULES.length };
}
