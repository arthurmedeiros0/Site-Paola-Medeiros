import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("conteúdo, links, privacidade e metadados", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Dra. Paola Medeiros | Ortodontia em Curitiba",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Cada sorriso",
  );
  await expect(
    page.getByRole("heading", { name: "Nossa forma de cuidar" }),
  ).toBeVisible();
  expect(await page.locator('img[src*="depoimentos"]').count()).toBe(0);
  for (const link of await page.locator('a[target="_blank"]').all()) {
    expect(await link.getAttribute("rel")).toContain("noopener");
    expect(await link.getAttribute("rel")).toContain("noreferrer");
  }
  const whatsapp = new URL(
    (await page
      .getByRole("link", { name: "Agendar pelo WhatsApp", exact: true })
      .getAttribute("href"))!,
  );
  expect(whatsapp.pathname).toBe("/5541985136349");
  expect(whatsapp.searchParams.get("text")).toBe(
    "Olá! Gostaria de agendar uma consulta com a Dra. Paola.",
  );
  for (const path of [
    "/depoimentos/dep1.png",
    "/depoimentos/dep2.png",
    "/depoimentos/dep3.png",
    "/depoimentos/dep4.png",
    "/images/depoimentos/depoimento-1.png",
    "/_next/image?url=%2Fdepoimentos%2Fdep1.png&w=640&q=75",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect((await request.get("/sitemap.xml")).ok()).toBe(true);
  expect(
    (await request.get("/social-image")).headers()["content-type"],
  ).toContain("image/png");
  expect(errors).toEqual([]);
});

test("layout responsivo e imagens", async ({ page }) => {
  for (const width of [320, 375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow em ${width}px`,
    ).toBe(true);
    const face = page.getByAltText("Dra. Paola Medeiros, cirurgiã-dentista", {
      exact: true,
    });
    await expect(face).toBeVisible();
    await expect(face).toHaveJSProperty("complete", true);
    expect(
      await face.evaluate(
        (element: HTMLImageElement) => element.naturalWidth > 0,
      ),
    ).toBe(true);
    if ([375, 1440].includes(width)) {
      await page.evaluate(() =>
        document.querySelectorAll("img").forEach((image) => {
          image.loading = "eager";
        }),
      );
      await page.evaluate(async () => {
        await Promise.all(
          Array.from(document.images, (image) =>
            image.decode().catch(() => {}),
          ),
        );
      });
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.screenshot({
        path: `artifacts/site-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    }
  }
});

test("menu mobile, teclado e navegação", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Abrir menu" });
  await open.click();
  await expect(
    page.getByRole("navigation", { name: "Navegação mobile" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(open).toBeFocused();
  await expect(open).toHaveAttribute("aria-expanded", "false");
  await open.click();
  await page
    .getByRole("navigation", { name: "Navegação mobile" })
    .getByRole("link", { name: "Sobre" })
    .click();
  await expect(page).toHaveURL(/#sobre$/);
  await expect(open).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
  await open.click();
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(
    page.getByRole("navigation", { name: "Navegação mobile" }),
  ).toHaveCount(0);
});

test("acessibilidade WCAG em desktop e mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
});

test("preferência por movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
