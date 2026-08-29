import type { GithubUserSummary } from "@/lib/github";
import type { ThemeDefinition, ThemeTokens } from "@/themes/types";

export const CARD_WIDTH = 480;
export const CARD_HEIGHT = 160;

const PLACEHOLDER_SUMMARY: GithubUserSummary = {
  username: "you",
  followers: 128,
  publicRepos: 24,
  totalStars: 512,
  topLanguages: ["TypeScript", "Rust", "Go"],
};

function Stat({ label, value, tokens }: { label: string; value: string | number; tokens: ThemeTokens }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div
        style={{
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 28,
          color: tokens.accent,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div style={{ fontFamily: "Inter", fontSize: 13, color: tokens.muted, marginTop: 2 }}>{label}</div>
    </div>
  );
}

export function buildStatsCard(
  theme: ThemeDefinition,
  mode: "dark" | "light",
  widget: "stats" | "streak" | "languages" | "activityGraph",
  summary: GithubUserSummary | null,
) {
  const tokens = theme.tokens[mode];
  const data = summary ?? PLACEHOLDER_SUMMARY;
  const isReliable = widget === "stats" || widget === "languages";

  return (
    <div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: tokens.bg,
        color: tokens.fg,
        padding: 24,
        borderRadius: Number.parseInt(tokens.radius, 10) || 0,
        border: `1px solid ${tokens.border}`,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 15 }}>{data.username}'s GitHub</div>
        <div style={{ fontFamily: "Inter", fontSize: 11, color: tokens.muted }}>{theme.name}</div>
      </div>
      {isReliable ? (
        <div style={{ display: "flex", gap: 28 }}>
          {widget === "stats" ? (
            <>
              <Stat label="followers" value={data.followers} tokens={tokens} />
              <Stat label="public repos" value={data.publicRepos} tokens={tokens} />
              <Stat label="total stars" value={data.totalStars} tokens={tokens} />
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "Inter", fontSize: 13, color: tokens.muted, marginBottom: 8 }}>
                top languages
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {data.topLanguages.map((lang) => (
                  <div
                    key={lang}
                    style={{
                      fontFamily: "Inter",
                      fontSize: 13,
                      color: tokens.accent,
                      border: `1px solid ${tokens.border}`,
                      borderRadius: 4,
                      padding: "4px 10px",
                    }}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Inter", fontSize: 13, color: tokens.muted }}>
            {widget === "streak" ? "Contribution streak" : "Activity graph"} needs authenticated GraphQL
            data.
          </div>
          <div style={{ fontFamily: "Inter", fontSize: 12, color: tokens.accent, marginTop: 4 }}>
            Switch this widget to &quot;actions-export&quot; mode for accurate data.
          </div>
        </div>
      )}
    </div>
  );
}
