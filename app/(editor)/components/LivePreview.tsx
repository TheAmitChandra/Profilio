"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useProfileStore } from "@/lib/store";
import { renderMarkdown } from "@/lib/markdown/render";

export function LivePreview() {
  const document = useProfileStore((s) => s.document);
  const markdown = renderMarkdown(document);

  return (
    <div
      className="markdown-body rounded-lg border border-border p-6"
      data-theme={document.colorMode === "dark" ? "dark" : "light"}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
