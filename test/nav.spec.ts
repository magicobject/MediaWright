import { test, expect, type Page } from '@playwright/test';
import { PAGES, NAV_ITEMS } from './support/pages';

async function activeNavLabel(page: Page): Promise<string> {
  const active = page.locator('nav.mainnav a[aria-current="page"]');
  await expect(active).toHaveCount(1);
  return (await active.textContent())?.trim() ?? '';
}

test('landing on the site shows the homepage with Home highlighted in the nav', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/MediaWright/);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('nav.mainnav')).toBeVisible();
  expect(await activeNavLabel(page)).toBe('Home');

  const links = page.locator('nav.mainnav a');
  await expect(links).toHaveText(NAV_ITEMS.map((p) => p.label));
  for (const item of NAV_ITEMS) {
    await expect(
      page.locator('nav.mainnav').getByRole('link', { name: item.label, exact: true }),
    ).toHaveAttribute('href', item.href);
  }
});

for (const target of PAGES) {
  test(`clicking "${target.navLabel}" in the nav opens ${target.path} and highlights only that item`, async ({
    page,
  }) => {
    await page.goto('/');

    await page.locator('nav.mainnav').getByRole('link', { name: target.navLabel, exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`${target.path}$`));
    await expect(page).toHaveTitle(new RegExp(target.titleContains));
    await expect(page.locator('h1')).toHaveText(target.heading);
    expect(await activeNavLabel(page)).toBe(target.navLabel);
  });
}

test('the brand logo links back to the homepage from every page', async ({ page }) => {
  for (const sitePage of PAGES.filter((p) => p.path !== '/index.html')) {
    await page.goto(sitePage.path);
    await page.locator('a.brand').click();
    await expect(page).toHaveURL(/\/index\.html$/);
    expect(await activeNavLabel(page)).toBe('Home');
  }
});
