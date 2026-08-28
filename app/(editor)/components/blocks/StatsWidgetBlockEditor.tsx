"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfileStore } from "@/lib/store";
import { STATS_WIDGET_TYPES, type StatsWidgetBlock } from "@/lib/schema";

export function StatsWidgetBlockEditor({ block }: { block: StatsWidgetBlock }) {
  const updateBlock = useProfileStore((s) => s.updateBlock);

  function withBlock(updater: (b: StatsWidgetBlock) => StatsWidgetBlock) {
    updateBlock(block.id, (b) => (b.type === "statsWidget" ? updater(b) : b));
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="space-y-1.5">
        <Label>Widget</Label>
        <Select value={block.widget} onValueChange={(value) => withBlock((b) => ({ ...b, widget: value as StatsWidgetBlock["widget"] }))}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATS_WIDGET_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Mode</Label>
        <Select value={block.mode} onValueChange={(value) => withBlock((b) => ({ ...b, mode: value as StatsWidgetBlock["mode"] }))}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hosted">Hosted (live image)</SelectItem>
            <SelectItem value="actions-export">GitHub Actions export</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
