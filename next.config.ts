import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // satori's harfbuzz dependency ships a sibling .wasm file it loads via a
  // relative path at runtime; both Turbopack and webpack mis-resolve that
  // path when they bundle/trace it. Keeping these packages external makes
  // Next.js load them with a normal `require()` from node_modules instead.
  serverExternalPackages: ["satori", "harfbuzzjs", "@resvg/resvg-wasm"],
};

export default nextConfig;
