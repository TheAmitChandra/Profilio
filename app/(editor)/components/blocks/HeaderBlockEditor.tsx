"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProfileStore } from "@/lib/store";
import type { HeaderBlock } from "@/lib/schema";

export function HeaderBlockEditor({ block }: { block: HeaderBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);
  const bannerEnabled = block.bannerStyle === "wave";

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
      <div className="flex items-center justify-between rounded-md border border-border p-2.5">
        <div>
          <Label htmlFor={`${block.id}-banner`}>Animated banner</Label>
          <p className="text-xs text-muted-foreground">
            Renders your name and tagline as a themed, animated wave banner image instead of plain text.
          </p>
        </div>
        <Switch
          id={`${block.id}-banner`}
          checked={bannerEnabled}
          onCheckedChange={(checked) =>
            updateBlock(block.id, (b) =>
              b.type === "header" ? { ...b, bannerStyle: checked ? "wave" : "none" } : b,
            )
          }
        />
      </div>
    </div>
  );
}
