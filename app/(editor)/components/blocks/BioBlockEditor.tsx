"use client";

import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from "@/lib/store";
import { countWords } from "@/lib/linter/words";
import type { BioBlock } from "@/lib/schema";

const SOFT_CAP = 250;

export function BioBlockEditor({ block }: { block: BioBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);
  const words = countWords(block.text);

  return (
    <div className="space-y-1.5">
      <Textarea
        value={block.text}
        rows={5}
        placeholder="Write a short, present-tense bio."
        onChange={(e) =>
          updateBlock(block.id, (b) => (b.type === "bio" ? { ...b, text: e.target.value } : b))
        }
      />
      <p className={`text-xs ${words > SOFT_CAP ? "text-destructive" : "text-muted-foreground"}`}>
        {words} / {SOFT_CAP} words
      </p>
    </div>
  );
}
