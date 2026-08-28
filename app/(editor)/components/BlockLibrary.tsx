"use client";

import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/store";
import { BLOCK_TYPES, type BlockType } from "@/lib/schema";
import { BLOCK_TYPE_LABELS } from "@/app/(editor)/components/blocks/BlockEditor";
import {
  Code2,
  Layers,
  LayoutGrid,
  LineChart,
  Share2,
  Text,
  User,
} from "lucide-react";

const BLOCK_ICONS: Record<BlockType, typeof User> = {
  header: User,
  bio: Text,
  techStack: Layers,
  pinnedProjects: LayoutGrid,
  statsWidget: LineChart,
  socials: Share2,
  customMarkdown: Code2,
};

export function BlockLibrary() {
  const addBlock = useProfileStore((s) => s.addBlock);

  return (
    <div className="flex flex-col gap-1.5">
      <h2 className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Add a block
      </h2>
      {BLOCK_TYPES.map((type) => {
        const Icon = BLOCK_ICONS[type];
        return (
          <Button
            key={type}
            type="button"
            variant="outline"
            className="justify-start gap-2"
            onClick={() => addBlock(type)}
          >
            <Icon className="h-4 w-4" />
            {BLOCK_TYPE_LABELS[type]}
          </Button>
        );
      })}
    </div>
  );
}
