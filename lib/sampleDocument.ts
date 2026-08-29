import type { ProfileDocument } from "@/lib/schema";

/** Fixed sample content used across all themes so a side-by-side gallery is a fair comparison. */
export const SAMPLE_DOCUMENT: ProfileDocument = {
  version: 1,
  themeId: "minimalist",
  colorMode: "dark",
  githubUsername: "avery-chen",
  blocks: [
    {
      id: "header",
      type: "header",
      name: "Avery Chen",
      tagline: "Backend engineer building fast, boring, reliable systems.",
    },
    {
      id: "bio",
      type: "bio",
      text: "I work on distributed systems and developer tooling. Currently building queueing infrastructure at a Series B startup, previously at a cloud provider. I like systems that fail loudly and recover quietly.",
    },
    {
      id: "techStack",
      type: "techStack",
      categories: [
        { label: "Languages", items: ["Go", "Rust", "TypeScript"] },
        { label: "Infra", items: ["Kubernetes", "Terraform", "Postgres"] },
      ],
    },
    {
      id: "pinnedProjects",
      type: "pinnedProjects",
      projects: [
        {
          name: "queuely",
          description: "A durable job queue with exactly-once delivery semantics.",
          url: "https://github.com/avery-chen/queuely",
          metric: "2.1k stars",
        },
        {
          name: "pgshard",
          description: "Zero-downtime Postgres resharding toolkit.",
          url: "https://github.com/avery-chen/pgshard",
          metric: "640 stars",
        },
      ],
    },
  ],
};
