"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { useProfileStore } from "@/lib/store";
import { runSignalCheck } from "@/lib/linter/signalCheck";
import { cn } from "@/lib/utils";

export function SignalCheckPanel() {
  const document = useProfileStore((s) => s.document);
  const { results, score, maxScore } = runSignalCheck(document);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(true);

  const visibleFailing = results.filter((r) => !r.passed && !dismissed.has(r.id));

  return (
    <div className="rounded-lg border border-border">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Signal Check</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
              score === maxScore ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground",
            )}
          >
            {score} / {maxScore}
          </span>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="space-y-2 border-t border-border px-4 py-3">
          {visibleFailing.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing to flag right now — this reads as a focused, scannable profile.
            </p>
          ) : (
            visibleFailing.map((result) => (
              <div key={result.id} className="flex items-start justify-between gap-3 rounded-md bg-muted/50 p-2.5">
                <p className="text-sm">{result.message}</p>
                <button
                  type="button"
                  className="shrink-0 rounded p-1 text-muted-foreground hover:bg-accent"
                  aria-label={`Dismiss suggestion: ${result.title}`}
                  onClick={() => setDismissed((prev) => new Set(prev).add(result.id))}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
          {results
            .filter((r) => r.passed)
            .map((result) => (
              <div key={result.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                {result.title}
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
}
