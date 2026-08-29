import { getTheme } from "@/themes/registry";
import { buildTypingSvg } from "@/lib/banner/buildTypingSvg";

export async function GET(request: Request, { params }: { params: Promise<{ themeId: string }> }) {
  const { themeId } = await params;
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text") ?? "Hello, world!";
  const mode = searchParams.get("mode") === "light" ? "light" : "dark";

  const theme = getTheme(themeId);
  const svg = buildTypingSvg(theme, mode, text);

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
