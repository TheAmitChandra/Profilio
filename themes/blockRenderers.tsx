import type {
  BioBlock,
  CustomMarkdownBlock,
  HeaderBlock,
  PinnedProjectsBlock,
  SocialsBlock,
  StatsWidgetBlock,
  TechStackBlock,
} from "@/lib/schema";
import type { ThemeStyle } from "@/themes/types";

/**
 * These renderers are shared by every theme and parameterized by the
 * theme's `style` config (heading treatment, divider glyph, tech-stack and
 * project layout). This keeps ten themes from becoming ten copy-pasted
 * component trees while still producing visibly distinct layouts, since the
 * style enums change structure, not just color.
 */

export function Divider({ style }: { style: ThemeStyle["dividerStyle"] }) {
  switch (style) {
    case "none":
      return null;
    case "ascii":
      return <div className="my-3 select-none text-[var(--profilio-muted)]">{"// " + "-".repeat(40)}</div>;
    case "dots":
      return (
        <div className="my-3 flex gap-1.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[var(--profilio-border)]" />
          ))}
        </div>
      );
    case "double-line":
      return <div className="my-3 border-t-4 border-double border-[var(--profilio-border)]" />;
    case "scanline":
      return (
        <div
          className="my-3 h-1 w-full"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--profilio-accent) 0 6px, transparent 6px 12px)",
          }}
        />
      );
    case "line":
    default:
      return <div className="my-3 border-t border-[var(--profilio-border)]" />;
  }
}

export function Heading({
  children,
  style,
}: {
  children: React.ReactNode;
  style: ThemeStyle["headingStyle"];
}) {
  const base = "font-[var(--profilio-font-heading)]";
  switch (style) {
    case "prompt":
      return (
        <h2 className={`${base} text-lg font-bold text-[var(--profilio-accent)]`}>
          <span className="text-[var(--profilio-muted)]">$ </span>
          {children}
        </h2>
      );
    case "serif":
      return <h2 className={`${base} text-3xl font-normal tracking-tight`}>{children}</h2>;
    case "bordered":
      return (
        <h2
          className={`${base} inline-block border-4 border-[var(--profilio-border)] px-3 py-1 text-2xl font-black uppercase`}
        >
          {children}
        </h2>
      );
    case "smallcaps":
      return (
        <h2 className={`${base} text-xs font-semibold tracking-[0.2em] text-[var(--profilio-muted)] uppercase`}>
          {children}
        </h2>
      );
    case "chart":
      return (
        <h2 className={`${base} flex items-center gap-2 text-lg font-semibold`}>
          <span className="inline-block h-3 w-3 rounded-sm bg-[var(--profilio-accent)]" />
          {children}
        </h2>
      );
    case "pixel":
      return (
        <h2 className={`${base} text-sm tracking-widest text-[var(--profilio-accent)] uppercase`}>
          {children}
        </h2>
      );
    case "plain":
    default:
      return <h2 className={`${base} text-xl font-semibold`}>{children}</h2>;
  }
}

export function HeaderBlockView({ block, style }: { block: HeaderBlock; style: ThemeStyle }) {
  return (
    <div className="flex items-center gap-4">
      {block.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.avatarUrl}
          alt={block.name}
          className="h-16 w-16 shrink-0 object-cover"
          style={{ borderRadius: "var(--profilio-radius)" }}
        />
      ) : null}
      <div>
        <Heading style={style.headingStyle}>{block.name || "Your Name"}</Heading>
        <p className="mt-1 text-sm text-[var(--profilio-muted)]">{block.tagline}</p>
      </div>
    </div>
  );
}

export function BioBlockView({ block }: { block: BioBlock }) {
  return <p className="text-[15px] leading-relaxed text-[var(--profilio-fg)]">{block.text}</p>;
}

export function TechStackBlockView({ block, style }: { block: TechStackBlock; style: ThemeStyle }) {
  switch (style.techStackLayout) {
    case "grouped-table":
      return (
        <table className="w-full border-collapse text-sm">
          <tbody>
            {block.categories.map((cat) => (
              <tr key={cat.label} className="border-b border-[var(--profilio-border)]">
                <td className="w-32 py-2 pr-4 align-top font-medium text-[var(--profilio-muted)]">
                  {cat.label}
                </td>
                <td className="py-2 font-[var(--profilio-font-mono)] tabular-nums">
                  {cat.items.join(" · ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "badges-flat":
      return (
        <div className="flex flex-wrap gap-2">
          {block.categories.flatMap((c) => c.items).map((item) => (
            <span
              key={item}
              className="border px-2.5 py-1 text-xs font-medium"
              style={{ borderColor: "var(--profilio-border)", borderRadius: "var(--profilio-radius)" }}
            >
              {item}
            </span>
          ))}
        </div>
      );
    case "badges-grouped":
      return (
        <div className="space-y-2">
          {block.categories.map((cat) => (
            <div key={cat.label} className="flex flex-wrap items-center gap-2">
              <span className="w-28 shrink-0 text-xs font-semibold text-[var(--profilio-muted)]">
                {cat.label}
              </span>
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--profilio-accent) 15%, transparent)",
                    color: "var(--profilio-accent)",
                    borderRadius: "var(--profilio-radius)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    case "bento-grid":
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {block.categories.map((cat) => (
            <div
              key={cat.label}
              className="border p-3"
              style={{ borderColor: "var(--profilio-border)", borderRadius: "var(--profilio-radius)" }}
            >
              <div className="mb-1 text-xs font-semibold text-[var(--profilio-muted)]">{cat.label}</div>
              <div className="text-sm">{cat.items.join(", ")}</div>
            </div>
          ))}
        </div>
      );
    case "plain-grouped-list":
    default:
      return (
        <div className="space-y-1.5 text-sm">
          {block.categories.map((cat) => (
            <div key={cat.label}>
              <span className="text-[var(--profilio-muted)]">{cat.label}: </span>
              <span>{cat.items.join(", ")}</span>
            </div>
          ))}
        </div>
      );
  }
}

export function PinnedProjectsBlockView({ block, style }: { block: PinnedProjectsBlock; style: ThemeStyle }) {
  switch (style.projectLayout) {
    case "table":
      return (
        <table className="w-full border-collapse text-sm">
          <tbody>
            {block.projects.map((p) => (
              <tr key={p.name} className="border-b border-[var(--profilio-border)]">
                <td className="py-2 pr-4 font-medium">{p.name}</td>
                <td className="py-2 pr-4 text-[var(--profilio-muted)]">{p.description}</td>
                <td className="py-2 text-right font-[var(--profilio-font-mono)] tabular-nums text-[var(--profilio-accent)]">
                  {p.metric}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "bento-cards":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {block.projects.map((p) => (
            <div
              key={p.name}
              className="border p-4"
              style={{ borderColor: "var(--profilio-border)", borderRadius: "var(--profilio-radius)" }}
            >
              <div className="font-semibold">{p.name}</div>
              <p className="mt-1 text-sm text-[var(--profilio-muted)]">{p.description}</p>
              {p.metric ? (
                <div className="mt-2 text-xs font-[var(--profilio-font-mono)] text-[var(--profilio-accent)]">
                  {p.metric}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      );
    case "narrative-list":
      return (
        <div className="space-y-4">
          {block.projects.map((p) => (
            <div key={p.name}>
              <div className="font-semibold">{p.name}</div>
              <p className="text-sm leading-relaxed text-[var(--profilio-muted)]">
                {p.description} {p.metric ? `— ${p.metric}` : ""}
              </p>
            </div>
          ))}
        </div>
      );
    case "list-metric":
    default:
      return (
        <ul className="space-y-1.5 text-sm">
          {block.projects.map((p) => (
            <li key={p.name}>
              <span className="font-medium">{p.name}</span>
              <span className="text-[var(--profilio-muted)]"> — {p.description}</span>
              {p.metric ? (
                <span className="text-[var(--profilio-accent)] font-[var(--profilio-font-mono)]"> [{p.metric}]</span>
              ) : null}
            </li>
          ))}
        </ul>
      );
  }
}

export function SocialsBlockView({ block }: { block: SocialsBlock }) {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {block.links.map((link, i) => (
        <span
          key={link.url}
          className={
            i === block.primaryCtaIndex
              ? "font-semibold text-[var(--profilio-accent)] underline underline-offset-4"
              : "text-[var(--profilio-muted)]"
          }
        >
          {link.platform}
        </span>
      ))}
    </div>
  );
}

export function StatsWidgetBlockView({ block }: { block: StatsWidgetBlock }) {
  return (
    <div
      className="border px-4 py-6 text-center text-xs text-[var(--profilio-muted)]"
      style={{ borderColor: "var(--profilio-border)", borderRadius: "var(--profilio-radius)" }}
    >
      {block.widget} widget ({block.mode === "hosted" ? "hosted image" : "GitHub Actions export"})
    </div>
  );
}

export function CustomMarkdownBlockView({ block }: { block: CustomMarkdownBlock }) {
  return <pre className="whitespace-pre-wrap text-xs text-[var(--profilio-muted)]">{block.raw}</pre>;
}
