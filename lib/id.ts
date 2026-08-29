export function generateBlockId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
