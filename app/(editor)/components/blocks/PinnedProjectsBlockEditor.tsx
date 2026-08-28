"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import type { PinnedProjectsBlock } from "@/lib/schema";
import { Plus, X } from "lucide-react";

export function PinnedProjectsBlockEditor({ block }: { block: PinnedProjectsBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);

  function withBlock(updater: (b: PinnedProjectsBlock) => PinnedProjectsBlock) {
    updateBlock(block.id, (b) => (b.type === "pinnedProjects" ? updater(b) : b));
  }

  return (
    <div className="space-y-3">
      {block.projects.map((project, i) => (
        <div key={i} className="space-y-1.5 rounded-md border border-border p-2.5">
          <div className="flex items-center gap-2">
            <Input
              value={project.name}
              placeholder="Project name"
              className="h-8 text-sm font-medium"
              onChange={(e) =>
                withBlock((b) => ({
                  ...b,
                  projects: b.projects.map((p, j) => (j === i ? { ...p, name: e.target.value } : p)),
                }))
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              aria-label="Remove project"
              onClick={() => withBlock((b) => ({ ...b, projects: b.projects.filter((_, j) => j !== i) }))}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={project.description}
            placeholder="One line: what it does and who it's for."
            className="h-8 text-sm"
            onChange={(e) =>
              withBlock((b) => ({
                ...b,
                projects: b.projects.map((p, j) => (j === i ? { ...p, description: e.target.value } : p)),
              }))
            }
          />
          <div className="flex gap-2">
            <Input
              value={project.url}
              placeholder="https://github.com/you/project"
              className="h-8 text-sm"
              onChange={(e) =>
                withBlock((b) => ({
                  ...b,
                  projects: b.projects.map((p, j) => (j === i ? { ...p, url: e.target.value } : p)),
                }))
              }
            />
            <Input
              value={project.metric ?? ""}
              placeholder="1.2k stars"
              className="h-8 w-32 shrink-0 text-sm"
              onChange={(e) =>
                withBlock((b) => ({
                  ...b,
                  projects: b.projects.map((p, j) => (j === i ? { ...p, metric: e.target.value } : p)),
                }))
              }
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          withBlock((b) => ({
            ...b,
            projects: [...b.projects, { name: "", description: "", url: "" }],
          }))
        }
      >
        <Plus className="mr-1 h-4 w-4" /> Add project
      </Button>
    </div>
  );
}
