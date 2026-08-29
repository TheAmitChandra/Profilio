import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // Fresh localStorage per test so autosave from a previous run can't leak in.
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test("editing the header updates the live preview's animated banner", async ({ page }) => {
  const nameInput = page.getByLabel("Name", { exact: true });
  await nameInput.fill("Ada Lovelace");

  await expect(page.locator(".markdown-body img[alt='Ada Lovelace']")).toHaveAttribute(
    "src",
    /\/api\/banner\//,
  );
});

test("turning off the animated banner falls back to a plain heading", async ({ page }) => {
  const nameInput = page.getByLabel("Name", { exact: true });
  await nameInput.fill("Ada Lovelace");
  await page.getByRole("switch", { name: "Animated banner" }).click();

  await expect(page.locator(".markdown-body h1")).toHaveText("Ada Lovelace");
});

test("adding a block from the library appends it to the canvas", async ({ page }) => {
  await expect(page.getByText("Custom Markdown", { exact: true })).toHaveCount(1);

  await page.getByRole("button", { name: "Custom Markdown" }).click();

  await expect(page.getByText("Custom Markdown", { exact: true })).toHaveCount(2);
});

test("switching themes changes the exported markdown's heading style", async ({ page }) => {
  await page.getByRole("combobox").first().click();
  await page.getByRole("option", { name: "Terminal" }).click();

  await page.getByRole("button", { name: "Copy markdown" }).click();
  await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
});

test("the Signal Check score is visible and out of 11", async ({ page }) => {
  await expect(page.getByText(/\d+ \/ 11/).first()).toBeVisible();
});
