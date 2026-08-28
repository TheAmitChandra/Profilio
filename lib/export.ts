import { safeParseProfileDocument, type ProfileDocument } from "@/lib/schema";

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

function downloadTextFile(filename: string, contents: string, mimeType: string) {
  const blob = new Blob([contents], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = window.document.createElement("a");
  link.href = url;
  link.download = filename;
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadReadme(markdown: string) {
  downloadTextFile("README.md", markdown, "text/markdown");
}

export function downloadDesignJson(document: ProfileDocument) {
  downloadTextFile("profilio-design.json", JSON.stringify(document, null, 2), "application/json");
}

export function parseDesignJson(raw: string): ProfileDocument {
  const parsed = safeParseProfileDocument(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error("This file doesn't look like a valid Profilio design.");
  }
  return parsed.data;
}
