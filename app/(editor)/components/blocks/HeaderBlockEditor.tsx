"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileStore } from "@/lib/store";
import type { HeaderBlock } from "@/lib/schema";

export function HeaderBlockEditor({ block }: { block: HeaderBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor={`${block.id}-name`}>Name</Label>
        <Input
          id={`${block.id}-name`}
          value={block.name}
          placeholder="Your Name"
          onChange={(e) =>
            updateBlock(block.id, (b) => (b.type === "header" ? { ...b, name: e.target.value } : b))
          }
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${block.id}-tagline`}>Tagline</Label>
        <Input
          id={`${block.id}-tagline`}
          value={block.tagline}
          placeholder="What you build, in one sentence."
          onChange={(e) =>
            updateBlock(block.id, (b) => (b.type === "header" ? { ...b, tagline: e.target.value } : b))
          }
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${block.id}-avatar`}>Avatar URL (optional)</Label>
        <Input
          id={`${block.id}-avatar`}
          value={block.avatarUrl ?? ""}
          placeholder="https://github.com/you.png"
          onChange={(e) =>
            updateBlock(block.id, (b) => (b.type === "header" ? { ...b, avatarUrl: e.target.value } : b))
          }
        />
      </div>
    </div>
  );
}
