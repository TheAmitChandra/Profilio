export type GithubUserSummary = {
  username: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  topLanguages: string[];
};

type GithubRepo = {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
};

/**
 * Uses the unauthenticated GitHub REST API (60 req/hr per IP) rather than
 * GraphQL, since v1 has no accounts/tokens to authenticate a GraphQL call
 * with. This is exactly the kind of rate-limit exposure the Signal Check
 * linter nudges users away from via the "actions-export" mode, which runs
 * inside the user's own authenticated GitHub Action instead.
 */
export async function fetchGithubUserSummary(username: string): Promise<GithubUserSummary | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
        headers: { Accept: "application/vnd.github+json" },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as { followers: number; public_repos: number };
    const repos = (await reposRes.json()) as GithubRepo[];

    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);
    const languageCounts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language || repo.fork) continue;
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }
    const topLanguages = [...languageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang]) => lang);

    return {
      username,
      followers: user.followers,
      publicRepos: user.public_repos,
      totalStars,
      topLanguages,
    };
  } catch {
    return null;
  }
}
