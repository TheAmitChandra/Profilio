"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfileStore } from "@/lib/store";
import { themeRegistry } from "@/themes/registry";

export function ThemeSwitcher() {
  const document = useProfileStore((s) => s.document);
  const setTheme = useProfileStore((s) => s.setTheme);
  const setColorMode = useProfileStore((s) => s.setColorMode);

  return (
    <div className="flex items-center gap-2">
      <Select value={document.themeId} onValueChange={setTheme}>
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {themeRegistry.map((theme) => (
            <SelectItem key={theme.id} value={theme.id}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={document.colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setColorMode(document.colorMode === "dark" ? "light" : "dark")}
      >
        {document.colorMode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
