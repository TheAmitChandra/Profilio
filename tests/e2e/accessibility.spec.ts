import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test("blocks can be reordered with the keyboard alone", async ({ page }) => {
  // Default document order: Header, Bio, Tech Stack, Pinned Projects, Socials.
  const dragHandle = page.getByRole("button", { name: "Reorder Bio block" });
  await dragHandle.focus();
  await expect(dragHandle).toBeFocused();

  await page.keyboard.press("Space"); // pick up
  await page.waitForTimeout(200);
  await page.keyboard.press("ArrowDown"); // move down one slot
  await page.waitForTimeout(200);
  await page.keyboard.press("Space"); // drop
  await page.waitForTimeout(200);

  const blockTitles = page.locator('[data-slot="card"] span.font-semibold');
  await expect(blockTitles.nth(0)).toHaveText("Header");
  await expect(blockTitles.nth(1)).toHaveText("Tech Stack");
  await expect(blockTitles.nth(2)).toHaveText("Bio");
});

test("every drag handle has an accessible name", async ({ page }) => {
  const handles = page.getByRole("button", { name: /^Reorder .+ block$/ });
  await expect(handles).toHaveCount(5);
});

test("theme select and color-mode toggle are keyboard-focusable", async ({ page }) => {
  const themeSelect = page.getByRole("combobox").first();
  await themeSelect.focus();
  await expect(themeSelect).toBeFocused();

  const modeToggle = page.getByRole("button", { name: /Switch to (dark|light) mode/ });
  await modeToggle.focus();
  await expect(modeToggle).toBeFocused();
});
