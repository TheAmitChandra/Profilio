"use client";

import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";

export function GithubUsernameField() {
  const githubUsername = useProfileStore((s) => s.document.githubUsername);
  const setGithubUsername = useProfileStore((s) => s.setGithubUsername);

  return (
    <Input
      value={githubUsername ?? ""}
      placeholder="GitHub username"
      className="h-9 w-40"
      aria-label="GitHub username, used to fetch real stats for hosted widgets"
      onChange={(e) => setGithubUsername(e.target.value)}
    />
  );
}
