import { expect, test } from "@playwright/test";
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";

const privatePath = path.join(process.cwd(), ".local", "testimonials.json");
async function localEntries(): Promise<
  { id: string; text: string; authorized: boolean; published: boolean }[]
> {
  try {
    return JSON.parse(await readFile(privatePath, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}
async function files(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(path.join(directory, entry.name))
          : [path.join(directory, entry.name)],
      ),
    )
  ).flat();
}

test("produção bloqueia prévia, arquivos privados e textos não autorizados", async ({
  page,
  request,
}) => {
  const response = await request.get("/previa/depoimentos");
  expect(response.status()).toBe(404);
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Nossa forma de cuidar" }),
  ).toBeVisible();
  await expect(page.locator(".testimonial-card")).toHaveCount(0);
  const html = await page.content();
  for (const entry of await localEntries()) {
    expect(entry.authorized).toBe(false);
    expect(entry.published).toBe(false);
    // Não colocar o texto privado na mensagem de falha ou em snapshot.
    expect(
      html.includes(entry.text),
      `Texto privado exposto: ${entry.id}`,
    ).toBe(false);
  }
  for (const url of [
    "/.local/testimonials.json",
    "/.local/depoimentos/dep1.png",
    "/depoimentos/dep1.png",
    "/_next/image?url=%2F.local%2Fdepoimentos%2Fdep1.png&w=640&q=90",
  ]) {
    expect((await request.get(url)).status()).toBe(404);
  }
  await expect(
    access(path.join(process.cwd(), "public", "depoimentos")),
  ).rejects.toThrow();
});

test("build de produção não contém textos privados nem inclui arquivos locais nos traces", async () => {
  const entries = await localEntries();
  for (const directory of [".next/server", ".next/static"]) {
    for (const filename of await files(path.resolve(directory))) {
      if (!/\.(js|json|html|rsc|body|map)$/.test(filename)) continue;
      const data = await readFile(filename);
      for (const entry of entries)
        expect(
          data.includes(Buffer.from(entry.text)),
          `Conteúdo privado no build: ${entry.id}`,
        ).toBe(false);
      if (filename.endsWith(".nft.json")) {
        const trace = JSON.parse(data.toString("utf8"));
        expect(
          trace.files.some((file: string) =>
            /(^|[\\/])\.local([\\/]|$)/.test(file),
          ),
        ).toBe(false);
      }
    }
  }
});

test("prévia de desenvolvimento usa os quatro cards atuais sem liberar publicação", async ({
  page,
}) => {
  const previewBase = process.env.TEST_PREVIEW_BASE_URL;
  test.skip(
    !previewBase,
    "Informe TEST_PREVIEW_BASE_URL apontando para o servidor de desenvolvimento local.",
  );
  const entries = await localEntries();
  test.skip(!entries.length, "Requer o arquivo privado local de prévia.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${previewBase}/previa/depoimentos`);
    await expect(page.locator(".testimonial-card")).toHaveCount(4);
    const actual = await page
      .locator(".testimonial-card blockquote")
      .allTextContents();
    for (const [index, entry] of entries.entries())
      expect(
        actual[index]?.trim() === entry.text,
        `Texto divergente no card ${entry.id}`,
      ).toBe(true);
    await expect(
      page.getByRole("img", { name: "Avaliação de 5 de 5 estrelas" }),
    ).toHaveCount(1);
    await expect(
      page.locator(".testimonial-card").nth(2).locator(".testimonial-stars"),
    ).toHaveCount(1);
    await expect(
      page.getByText("Relato indireto:", { exact: false }),
    ).toHaveCount(1);
    await expect(
      page.getByText("Prévia local · Aguardando autorização", { exact: true }),
    ).toHaveCount(4);
    expect(
      await page.getByText("Relato autorizado", { exact: true }).count(),
    ).toBe(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations.map((item) => item.id)).toEqual([]);
  }
});
