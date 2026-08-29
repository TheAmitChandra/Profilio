import Image from "next/image";
import Link from "next/link";
import { themeRegistry } from "@/themes/registry";
import { SAMPLE_DOCUMENT } from "@/lib/sampleDocument";
import { ThemedPreviewCard } from "@/app/themes-gallery/ThemedPreviewCard";

export const metadata = {
  title: "Profilio — Themes Gallery",
};

export default function ThemesGalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/" className="mb-6 flex w-fit items-center gap-2">
        <Image src="/logo.png" alt="" width={24} height={24} />
        <span className="text-base font-bold tracking-tight">Profilio</span>
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">Themes Gallery</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        The same sample profile, rendered in all {themeRegistry.length} themes — a layout and typography
        system each, not a color swap.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {themeRegistry.map((theme) => (
          <ThemedPreviewCard key={theme.id} theme={theme} document={{ ...SAMPLE_DOCUMENT, themeId: theme.id }} />
        ))}
      </div>
    </div>
  );
}
