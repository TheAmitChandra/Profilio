import { z } from "zod";

export const HEADER_BANNER_STYLES = ["none", "wave", "typing"] as const;

export const headerBlockSchema = z.object({
  id: z.string(),
  type: z.literal("header"),
  name: z.string(),
  tagline: z.string(),
  avatarUrl: z.string().optional(),
  bannerStyle: z.enum(HEADER_BANNER_STYLES).optional(),
});

export const bioBlockSchema = z.object({
  id: z.string(),
  type: z.literal("bio"),
  text: z.string(),
});

export const techStackBlockSchema = z.object({
  id: z.string(),
  type: z.literal("techStack"),
  categories: z.array(
    z.object({
      label: z.string(),
      items: z.array(z.string()),
    }),
  ),
});

export const pinnedProjectsBlockSchema = z.object({
  id: z.string(),
  type: z.literal("pinnedProjects"),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      url: z.string(),
      metric: z.string().optional(),
    }),
  ),
});

export const STATS_WIDGET_TYPES = [
  "stats",
  "streak",
  "languages",
  "activityGraph",
] as const;

export const statsWidgetBlockSchema = z.object({
  id: z.string(),
  type: z.literal("statsWidget"),
  widget: z.enum(STATS_WIDGET_TYPES),
  mode: z.enum(["hosted", "actions-export"]),
});

export const socialsBlockSchema = z.object({
  id: z.string(),
  type: z.literal("socials"),
  links: z.array(
    z.object({
      platform: z.string(),
      url: z.string(),
    }),
  ),
  primaryCtaIndex: z.number().optional(),
});

export const customMarkdownBlockSchema = z.object({
  id: z.string(),
  type: z.literal("customMarkdown"),
  raw: z.string(),
});

export const profileBlockSchema = z.discriminatedUnion("type", [
  headerBlockSchema,
  bioBlockSchema,
  techStackBlockSchema,
  pinnedProjectsBlockSchema,
  statsWidgetBlockSchema,
  socialsBlockSchema,
  customMarkdownBlockSchema,
]);

export const BLOCK_TYPES = [
  "header",
  "bio",
  "techStack",
  "pinnedProjects",
  "statsWidget",
  "socials",
  "customMarkdown",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const profileDocumentSchema = z.object({
  version: z.literal(1),
  themeId: z.string(),
  colorMode: z.enum(["dark", "light"]),
  githubUsername: z.string().optional(),
  blocks: z.array(profileBlockSchema),
});

export type HeaderBlock = z.infer<typeof headerBlockSchema>;
export type BioBlock = z.infer<typeof bioBlockSchema>;
export type TechStackBlock = z.infer<typeof techStackBlockSchema>;
export type PinnedProjectsBlock = z.infer<typeof pinnedProjectsBlockSchema>;
export type StatsWidgetBlock = z.infer<typeof statsWidgetBlockSchema>;
export type SocialsBlock = z.infer<typeof socialsBlockSchema>;
export type CustomMarkdownBlock = z.infer<typeof customMarkdownBlockSchema>;
export type ProfileBlock = z.infer<typeof profileBlockSchema>;
export type ProfileDocument = z.infer<typeof profileDocumentSchema>;

export function parseProfileDocument(data: unknown): ProfileDocument {
  return profileDocumentSchema.parse(data);
}

export function safeParseProfileDocument(data: unknown) {
  return profileDocumentSchema.safeParse(data);
}
