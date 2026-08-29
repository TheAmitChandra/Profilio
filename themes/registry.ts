import type { ThemeDefinition } from "@/themes/types";
import { terminalTheme } from "@/themes/terminal";
import { blueprintTheme } from "@/themes/blueprint";
import { editorialTheme } from "@/themes/editorial";
import { brutalistTheme } from "@/themes/brutalist";
import { minimalistTheme } from "@/themes/minimalist";
import { neoDarkTheme } from "@/themes/neo-dark";
import { bentoTheme } from "@/themes/bento";
import { retroComputingTheme } from "@/themes/retro-computing";
import { corporateCleanTheme } from "@/themes/corporate-clean";
import { dataDashboardTheme } from "@/themes/data-dashboard";

export const themeRegistry: ThemeDefinition[] = [
  terminalTheme,
  blueprintTheme,
  editorialTheme,
  brutalistTheme,
  minimalistTheme,
  neoDarkTheme,
  bentoTheme,
  retroComputingTheme,
  corporateCleanTheme,
  dataDashboardTheme,
];

const themesById = new Map(themeRegistry.map((theme) => [theme.id, theme]));

export function getTheme(id: string): ThemeDefinition {
  return themesById.get(id) ?? terminalTheme;
}
