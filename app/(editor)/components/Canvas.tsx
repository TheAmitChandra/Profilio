"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useProfileStore } from "@/lib/store";
import { SortableBlockCard } from "@/app/(editor)/components/SortableBlockCard";

export function Canvas() {
  const document = useProfileStore((s) => s.document);
  const reorderBlocks = useProfileStore((s) => s.reorderBlocks);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = document.blocks.findIndex((b) => b.id === active.id);
    const toIndex = document.blocks.findIndex((b) => b.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;
    reorderBlocks(fromIndex, toIndex);
  }

  if (document.blocks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Your canvas is empty. Add a block from the library to get started.
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={document.blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {document.blocks.map((block) => (
            <SortableBlockCard key={block.id} block={block} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
