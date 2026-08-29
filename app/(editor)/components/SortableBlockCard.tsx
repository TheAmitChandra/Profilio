"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ProfileBlock } from "@/lib/schema";
import { BlockEditor, BLOCK_TYPE_LABELS } from "@/app/(editor)/components/blocks/BlockEditor";
import { useProfileStore } from "@/lib/store";

export function SortableBlockCard({ block }: { block: ProfileBlock }) {
  const removeBlock = useProfileStore((s) => s.removeBlock);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="gap-3 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-accent active:cursor-grabbing"
            aria-label={`Reorder ${BLOCK_TYPE_LABELS[block.type]} block`}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold">{BLOCK_TYPE_LABELS[block.type]}</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          aria-label={`Remove ${BLOCK_TYPE_LABELS[block.type]} block`}
          onClick={() => removeBlock(block.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <BlockEditor block={block} />
    </Card>
  );
}
