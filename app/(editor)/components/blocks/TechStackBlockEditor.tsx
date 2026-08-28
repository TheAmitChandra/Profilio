"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import type { TechStackBlock } from "@/lib/schema";
import { Plus, X } from "lucide-react";

export function TechStackBlockEditor({ block }: { block: TechStackBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);

  function withBlock(updater: (b: TechStackBlock) => TechStackBlock) {
    updateBlock(block.id, (b) => (b.type === "techStack" ? updater(b) : b));
  }

  return (
    <div className="space-y-3">
      {block.categories.map((category, catIndex) => (
        <div key={catIndex} className="space-y-1.5 rounded-md border border-border p-2.5">
          <div className="flex items-center gap-2">
            <Input
              value={category.label}
              placeholder="Category (e.g. Frontend)"
              className="h-8 text-sm font-medium"
              onChange={(e) =>
                withBlock((b) => ({
                  ...b,
                  categories: b.categories.map((c, i) => (i === catIndex ? { ...c, label: e.target.value } : c)),
                }))
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              aria-label="Remove category"
              onClick={() =>
                withBlock((b) => ({ ...b, categories: b.categories.filter((_, i) => i !== catIndex) }))
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={category.items.join(", ")}
            placeholder="TypeScript, React, Next.js"
            className="h-8 text-sm"
            onChange={(e) =>
              withBlock((b) => ({
                ...b,
                categories: b.categories.map((c, i) =>
                  i === catIndex
                    ? { ...c, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }
                    : c,
                ),
              }))
            }
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          withBlock((b) => ({ ...b, categories: [...b.categories, { label: "", items: [] }] }))
        }
      >
        <Plus className="mr-1 h-4 w-4" /> Add category
      </Button>
    </div>
  );
}
