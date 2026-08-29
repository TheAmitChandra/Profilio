"use client";

import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from "@/lib/store";
import type { CustomMarkdownBlock } from "@/lib/schema";

export function CustomMarkdownBlockEditor({ block }: { block: CustomMarkdownBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);

  return (
    <Textarea
      value={block.raw}
      rows={4}
      className="font-mono text-sm"
      placeholder="Any raw markdown you want to drop in as-is."
      onChange={(e) =>
        updateBlock(block.id, (b) => (b.type === "customMarkdown" ? { ...b, raw: e.target.value } : b))
      }
    />
  );
}
