import { getTheme } from "@/themes/registry";
import { buildBannerSvg } from "@/lib/banner/buildBannerSvg";

export async function GET(request: Request, { params }: { params: Promise<{ themeId: string }> }) {
  const { themeId } = await params;
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Your Name";
  const subtitle = searchParams.get("subtitle") ?? "";
  const mode = searchParams.get("mode") === "light" ? "light" : "dark";

  const theme = getTheme(themeId);
  const svg = buildBannerSvg(theme, mode, title, subtitle);

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
