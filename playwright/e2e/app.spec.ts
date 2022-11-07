import { test, expect, Page, Locator } from '@playwright/test';

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test.describe('Elements', () => {
    test('should render title', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Vite - Vue.js');
    });

    test('should render Vite product card', async ({ page }) => {
      const viteCard = page.locator('#vite');
      const viteTitle = viteCard.locator('a');
      await expect(viteTitle).toHaveText('Vite');
      await expect(viteTitle).toHaveAttribute('href', 'https://vitejs.dev/');
    });

    test('should render Vue.js product card', async ({ page }) => {
      const vueCard = page.locator('#vue');
      const vueTitle = vueCard.locator('a');
      await expect(vueTitle).toHaveText('Vue.js');
      await expect(vueTitle).toHaveAttribute('href', 'https://vuejs.org/');
    });

    test('should render Overall Satisfaction card', async ({ page }) => {
      const overallSatisfactionCard = page.locator('#overall-satisfaction');
      const overallSatisfactionTitle = overallSatisfactionCard.locator('h2');
      await expect(overallSatisfactionTitle).toHaveText('Overall Satisfaction');
    });
  });

  test.describe('Responsive Design', () => {
    test.describe('Desktop', () => {
      test.use({
        viewport: { width: 1024, height: 768 }
      });

      test('should display cards in a row', async ({ page }) => {
        await expect(page.locator('#products')).toHaveCSS('grid-auto-flow', 'column');
      });
    });

    test.describe('Mobile', () => {
      test.use({
        viewport: { width: 375, height: 667 }
      });

      test('should display cards in a row', async ({ page }) => {
        await expect(page.locator('#products')).toHaveCSS('grid-auto-flow', 'row');
      });
    });
  });

  test.describe('Star Rating', () => {
    const getStar = (page: Page, id: 'vite' | 'vue' | 'overall-satisfaction', position: number) =>
      page.locator(`#${id}-${position}`);

    const getClasses = async (locator: Locator) => {
      const classAttribute = await locator.getAttribute('class');
      return classAttribute ? classAttribute.split(' ') : [];
    };

    const expectToBeChecked = async (locator: Locator) => {
      const classes = await getClasses(locator);
      expect(classes.includes('checked')).toBeTruthy();
    };

    const expectToBeUnchecked = async (locator: Locator) => {
      const classes = await getClasses(locator);
      expect(classes.includes('checked')).toBeFalsy();
    };

    test('Overall Satisfaction has average satisfaction of products', async ({ page }) => {
      await getStar(page, 'vite', 1).click();
      await getStar(page, 'vue', 1).click();
      await expectToBeChecked(getStar(page, 'overall-satisfaction', 1));
      await expectToBeUnchecked(getStar(page, 'overall-satisfaction', 2));

      await getStar(page, 'vue', 2).click();
      await expectToBeChecked(getStar(page, 'overall-satisfaction', 1));
      await expectToBeUnchecked(getStar(page, 'overall-satisfaction', 2));

      await getStar(page, 'vue', 3).click();
      await expectToBeChecked(getStar(page, 'overall-satisfaction', 2));
      await expectToBeUnchecked(getStar(page, 'overall-satisfaction', 3));

      await getStar(page, 'vue', 4).click();
      await expectToBeChecked(getStar(page, 'overall-satisfaction', 2));
      await expectToBeUnchecked(getStar(page, 'overall-satisfaction', 3));

      await getStar(page, 'vue', 5).click();
      await expectToBeChecked(getStar(page, 'overall-satisfaction', 3));
      await expectToBeUnchecked(getStar(page, 'overall-satisfaction', 4));
    });
  });
});
