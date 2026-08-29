"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlockLibrary } from "@/app/(editor)/components/BlockLibrary";
import { Canvas } from "@/app/(editor)/components/Canvas";
import { LivePreview } from "@/app/(editor)/components/LivePreview";
import { SignalCheckPanel } from "@/app/(editor)/components/SignalCheckPanel";
import { ThemeSwitcher } from "@/app/(editor)/components/ThemeSwitcher";
import { ExportToolbar } from "@/app/(editor)/components/ExportToolbar";
import { GithubUsernameField } from "@/app/(editor)/components/GithubUsernameField";

export default function EditorPage() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">Profilio</span>
          <span className="text-sm text-muted-foreground">design your GitHub profile</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <GithubUsernameField />
          <ThemeSwitcher />
          <ExportToolbar />
        </div>
      </header>

      {/* Desktop: three-panel layout */}
      <div className="hidden min-h-0 flex-1 md:grid md:grid-cols-[240px_1fr_1fr]">
        <ScrollArea className="border-r border-border p-4">
          <BlockLibrary />
        </ScrollArea>
        <ScrollArea className="border-r border-border p-4">
          <div className="mb-3">
            <SignalCheckPanel />
          </div>
          <Canvas />
        </ScrollArea>
        <ScrollArea className="p-4">
          <LivePreview />
        </ScrollArea>
      </div>

      {/* Mobile / narrow: tabbed Edit / Preview */}
      <Tabs defaultValue="edit" className="flex min-h-0 flex-1 flex-col md:hidden">
        <TabsList className="mx-4 mt-3">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="min-h-0 flex-1">
          <ScrollArea className="h-full p-4">
            <div className="mb-4">
              <BlockLibrary />
            </div>
            <div className="mb-3">
              <SignalCheckPanel />
            </div>
            <Canvas />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="preview" className="min-h-0 flex-1">
          <ScrollArea className="h-full p-4">
            <LivePreview />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
