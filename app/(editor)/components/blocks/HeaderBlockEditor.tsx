"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfileStore } from "@/lib/store";
import { HEADER_BANNER_STYLES, type HeaderBlock } from "@/lib/schema";

const BANNER_STYLE_LABELS: Record<(typeof HEADER_BANNER_STYLES)[number], string> = {
  none: "Plain text",
  wave: "Animated wave banner",
  typing: "Typing effect",
};

export function HeaderBlockEditor({ block }: { block: HeaderBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);
  const bannerStyle = block.bannerStyle ?? "none";

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
      <div className="space-y-1.5 rounded-md border border-border p-2.5">
        <Label htmlFor={`${block.id}-banner`}>Header style</Label>
        <p className="text-xs text-muted-foreground">
          Render your name/tagline as a themed animated image instead of plain text.
        </p>
        <Select
          value={bannerStyle}
          onValueChange={(value) =>
            value &&
            updateBlock(block.id, (b) =>
              b.type === "header"
                ? { ...b, bannerStyle: value as HeaderBlock["bannerStyle"] }
                : b,
            )
          }
        >
          <SelectTrigger id={`${block.id}-banner`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {HEADER_BANNER_STYLES.map((style) => (
              <SelectItem key={style} value={style}>
                {BANNER_STYLE_LABELS[style]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
