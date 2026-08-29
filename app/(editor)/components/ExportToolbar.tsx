"use client";

import { useRef, useState } from "react";
import { Copy, Download, FolderOpen, Redo2, Save, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/store";
import { renderMarkdown } from "@/lib/markdown/render";
import { copyToClipboard, downloadDesignJson, downloadReadme, parseDesignJson } from "@/lib/export";

export function ExportToolbar() {
  const document = useProfileStore((s) => s.document);
  const undo = useProfileStore((s) => s.undo);
  const redo = useProfileStore((s) => s.redo);
  const canUndo = useProfileStore((s) => s.canUndo());
  const canRedo = useProfileStore((s) => s.canRedo());
  const replaceDocument = useProfileStore((s) => s.replaceDocument);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleCopy() {
    await copyToClipboard(renderMarkdown(document));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleLoadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      replaceDocument(parseDesignJson(text));
    } catch {
      // Malformed/foreign JSON is a user-input error, not a bug — silently no-op
      // rather than crash; the file input is cleared below so re-selecting works.
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="ghost" size="icon" aria-label="Undo" disabled={!canUndo} onClick={undo}>
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" aria-label="Redo" disabled={!canRedo} onClick={redo}>
        <Redo2 className="h-4 w-4" />
      </Button>
      <div className="mx-1 h-5 w-px bg-border" />
      <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
        <Copy className="mr-1.5 h-4 w-4" />
        {copied ? "Copied!" : "Copy markdown"}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => downloadReadme(renderMarkdown(document))}>
        <Download className="mr-1.5 h-4 w-4" />
        README.md
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => downloadDesignJson(document)}>
        <Save className="mr-1.5 h-4 w-4" />
        Save design
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
        <FolderOpen className="mr-1.5 h-4 w-4" />
        Load design
      </Button>
      <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleLoadFile} />
    </div>
  );
}
