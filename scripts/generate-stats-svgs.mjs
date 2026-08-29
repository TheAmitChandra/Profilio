#!/usr/bin/env node
/**
 * Generates static SVG stat cards from real, authenticated GitHub data and
 * writes them to the repo root. Meant to run inside the user's own
 * `<username>/<username>` profile repo via
 * .github/workflows/stats-export-template.yml, so it has GITHUB_TOKEN
 * access to the GraphQL contributionsCollection that the unauthenticated
 * hosted /api/og route can't reach — this is what makes "actions-export"
 * mode both accurate (real streak data) and immune to shared rate limits.
 */
import { writeFile } from "node:fs/promises";
import satori from "satori";

const token = process.env.GITHUB_TOKEN;
const username = process.env.PROFILIO_GITHUB_USERNAME || process.env.GITHUB_REPOSITORY_OWNER;
const accent = process.env.PROFILIO_ACCENT_COLOR || "#3b82f6";
const mode = process.env.PROFILIO_COLOR_MODE === "light" ? "light" : "dark";

if (!token || !username) {
  console.error("Missing GITHUB_TOKEN or username; skipping stat card generation.");
  process.exit(1);
}

const tokens =
  mode === "dark"
    ? { bg: "#0b0f14", fg: "#e6edf3", muted: "#7d8b99", border: "#1c2530" }
    : { bg: "#f8fafc", fg: "#0f172a", muted: "#64748b", border: "#e2e8f0" };

async function graphql(query) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

async function rest(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`REST request failed for ${path}: ${res.status}`);
  return res.json();
}

function computeStreaks(weeks) {
  const days = weeks.flatMap((w) => w.contributionDays).map((d) => ({
    date: d.date,
    count: d.contributionCount,
  }));
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) currentStreak++;
    else break;
  }
  let longestStreak = 0;
  let running = 0;
  for (const day of days) {
    running = day.count > 0 ? running + 1 : 0;
    longestStreak = Math.max(longestStreak, running);
  }
  return { currentStreak, longestStreak };
}

async function loadFont() {
  const cssRes = await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@400;700", {
    headers: { "User-Agent": "Mozilla/5.0 (Profilio stats export)" },
  });
  const css = await cssRes.text();
  const matches = [...css.matchAll(/src: url\(([^)]+)\) format\('(?:woff2|truetype|opentype)'\)/g)];
  const buffers = await Promise.all(matches.slice(0, 2).map((m) => fetch(m[1]).then((r) => r.arrayBuffer())));
  return [
    { name: "Inter", data: buffers[0], weight: 400, style: "normal" },
    { name: "Inter", data: buffers[1] ?? buffers[0], weight: 700, style: "normal" },
  ];
}

function card(children) {
  return {
    type: "div",
    props: {
      style: {
        width: 480,
        height: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: tokens.bg,
        color: tokens.fg,
        padding: 24,
        border: `1px solid ${tokens.border}`,
        fontFamily: "Inter",
      },
      children,
    },
  };
}

function stat(value, label) {
  return {
    type: "div",
    props: {
      style: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
      children: [
        {
          type: "div",
          props: { style: { fontSize: 28, fontWeight: 700, color: accent }, children: String(value) },
        },
        { type: "div", props: { style: { fontSize: 13, color: tokens.muted }, children: label } },
      ],
    },
  };
}

async function main() {
  const fonts = await loadFont();

  const [user, repos, contributions] = await Promise.all([
    rest(`/users/${username}`),
    rest(`/users/${username}/repos?per_page=100`),
    graphql(`{
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks { contributionDays { date contributionCount } }
          }
        }
      }
    }`),
  ]);

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);
  const languageCounts = new Map();
  for (const repo of repos) {
    if (!repo.language || repo.fork) continue;
    languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }
  const topLanguages = [...languageCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([l]) => l);

  const weeks = contributions.user.contributionsCollection.contributionCalendar.weeks;
  const { currentStreak, longestStreak } = computeStreaks(weeks);

  const header = (title) => ({
    type: "div",
    props: {
      style: { display: "flex", justifyContent: "space-between" },
      children: [
        { type: "div", props: { style: { fontSize: 15, fontWeight: 700 }, children: title } },
        { type: "div", props: { style: { fontSize: 11, color: tokens.muted }, children: "via profilio actions-export" } },
      ],
    },
  });

  const cards = {
    stats: card([
      header(`${username}'s GitHub`),
      {
        type: "div",
        props: {
          style: { display: "flex", gap: 28 },
          children: [
            stat(user.followers, "followers"),
            stat(user.public_repos, "public repos"),
            stat(totalStars, "total stars"),
          ],
        },
      },
    ]),
    streak: card([
      header(`${username}'s streak`),
      {
        type: "div",
        props: {
          style: { display: "flex", gap: 28 },
          children: [stat(currentStreak, "current streak (days)"), stat(longestStreak, "longest streak (days)")],
        },
      },
    ]),
    languages: card([
      header("top languages"),
      {
        type: "div",
        props: {
          style: { display: "flex", gap: 10 },
          children: topLanguages.map((lang) => ({
            type: "div",
            props: {
              style: { fontSize: 13, color: accent, border: `1px solid ${tokens.border}`, padding: "4px 10px" },
              children: lang,
            },
          })),
        },
      },
    ]),
    activityGraph: card([
      header("recent activity"),
      stat(weeks.at(-1)?.contributionDays.reduce((s, d) => s + d.contributionCount, 0) ?? 0, "contributions this week"),
    ]),
  };

  for (const [widget, element] of Object.entries(cards)) {
    const svg = await satori(element, { width: 480, height: 160, fonts });
    await writeFile(`profile-${widget}.svg`, svg, "utf-8");
    console.log(`Wrote profile-${widget}.svg`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
