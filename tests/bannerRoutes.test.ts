import { describe, expect, it } from "vitest";
import { GET as bannerGET } from "@/app/api/banner/[themeId]/route";
import { GET as typingGET } from "@/app/api/typing/[themeId]/route";

describe("/api/banner/[themeId]", () => {
  it("returns an SVG with the requested title baked in", async () => {
    const request = new Request(
      "http://localhost/api/banner/bento?title=Test+User&subtitle=hello&mode=dark",
    );
    const response = await bannerGET(request, { params: Promise.resolve({ themeId: "bento" }) });
    expect(response.headers.get("Content-Type")).toBe("image/svg+xml");
    const body = await response.text();
    expect(body).toContain("Test User");
    expect(body).toContain("<svg");
  });

  it("falls back to the terminal theme for an unknown themeId rather than erroring", async () => {
    const request = new Request("http://localhost/api/banner/not-a-real-theme?title=X");
    const response = await bannerGET(request, { params: Promise.resolve({ themeId: "not-a-real-theme" }) });
    expect(response.status).toBe(200);
  });
});

describe("/api/typing/[themeId]", () => {
  it("returns an SVG with the requested text baked in", async () => {
    const request = new Request("http://localhost/api/typing/blueprint?text=Hello+World&mode=light");
    const response = await typingGET(request, { params: Promise.resolve({ themeId: "blueprint" }) });
    expect(response.headers.get("Content-Type")).toBe("image/svg+xml");
    const body = await response.text();
    expect(body).toContain("Hello World");
  });
});
