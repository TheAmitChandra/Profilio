import satori from "satori";
import { getTheme } from "@/themes/registry";
import { STATS_WIDGET_TYPES } from "@/lib/schema";
import { fetchGithubUserSummary } from "@/lib/github";
import { getSatoriFonts } from "@/lib/satori/fonts";
import { buildStatsCard, CARD_HEIGHT, CARD_WIDTH } from "@/lib/satori/statsCard";

// Deliberately the default Node.js runtime, not "edge" — Next.js 16
// deprecates the edge route segment config outright. See DECISIONS.md.

export async function GET(
  request: Request,
  { params }: { params: Promise<{ themeId: string }> },
) {
  const { themeId } = await params;
  const { searchParams } = new URL(request.url);

  const widgetParam = searchParams.get("widget") ?? "stats";
  const widget = (STATS_WIDGET_TYPES as readonly string[]).includes(widgetParam)
    ? (widgetParam as (typeof STATS_WIDGET_TYPES)[number])
    : "stats";
  const mode = searchParams.get("mode") === "light" ? "light" : "dark";
  const user = searchParams.get("user");

  const theme = getTheme(themeId);
  const summary = user ? await fetchGithubUserSummary(user) : null;
  const fonts = await getSatoriFonts();

  const svg = await satori(buildStatsCard(theme, mode, widget, summary), {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts,
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
