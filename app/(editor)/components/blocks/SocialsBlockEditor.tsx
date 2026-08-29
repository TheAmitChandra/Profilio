"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import type { SocialsBlock } from "@/lib/schema";
import { Plus, Star, X } from "lucide-react";

export function SocialsBlockEditor({ block }: { block: SocialsBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);

  function withBlock(updater: (b: SocialsBlock) => SocialsBlock) {
    updateBlock(block.id, (b) => (b.type === "socials" ? updater(b) : b));
  }

  return (
    <div className="space-y-2">
      {block.links.map((link, i) => (
        <div key={i} className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            aria-label={i === block.primaryCtaIndex ? "Primary call-to-action" : "Set as primary call-to-action"}
            onClick={() => withBlock((b) => ({ ...b, primaryCtaIndex: i }))}
          >
            <Star className={`h-4 w-4 ${i === block.primaryCtaIndex ? "fill-current text-primary" : ""}`} />
          </Button>
          <Input
            value={link.platform}
            placeholder="Platform"
            className="h-8 w-32 shrink-0 text-sm"
            onChange={(e) =>
              withBlock((b) => ({
                ...b,
                links: b.links.map((l, j) => (j === i ? { ...l, platform: e.target.value } : l)),
              }))
            }
          />
          <Input
            value={link.url}
            placeholder="https://..."
            className="h-8 text-sm"
            onChange={(e) =>
              withBlock((b) => ({
                ...b,
                links: b.links.map((l, j) => (j === i ? { ...l, url: e.target.value } : l)),
              }))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            aria-label="Remove link"
            onClick={() =>
              withBlock((b) => ({
                ...b,
                links: b.links.filter((_, j) => j !== i),
                primaryCtaIndex:
                  b.primaryCtaIndex === i ? undefined : b.primaryCtaIndex && b.primaryCtaIndex > i ? b.primaryCtaIndex - 1 : b.primaryCtaIndex,
              }))
            }
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => withBlock((b) => ({ ...b, links: [...b.links, { platform: "", url: "" }] }))}
      >
        <Plus className="mr-1 h-4 w-4" /> Add link
      </Button>
    </div>
  );
}
