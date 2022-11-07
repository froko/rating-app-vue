import { test, expect } from '@playwright/experimental-ct-vue';
import { Locator } from '@playwright/test';

import { allProducts } from './ProductModel';
import RatingApp from './RatingApp.vue';

const props = {
  products: allProducts
};

test.describe('Elements', () => {
  test('should render title', async ({ mount }) => {
    const component = await mount(RatingApp, { props });
    await expect(component.locator('h1')).toHaveText('Vite - Vue.js');
  });

  test('should render Vite product card', async ({ mount }) => {
    const component = await mount(RatingApp, { props });
    const viteCard = component.locator('#vite');
    const viteTitle = viteCard.locator('a');
    await expect(viteTitle).toHaveText('Vite');
    await expect(viteTitle).toHaveAttribute('href', 'https://vitejs.dev/');
  });

  test('should render vue product card', async ({ mount }) => {
    const component = await mount(RatingApp, { props });
    const vueCard = component.locator('#vue');
    const vueTitle = vueCard.locator('a');
    await expect(vueTitle).toHaveText('Vue.js');
    await expect(vueTitle).toHaveAttribute('href', 'https://vuejs.org/');
  });

  test('should render Overall Satisfaction card', async ({ mount }) => {
    const component = await mount(RatingApp, { props });
    const overallSatisfactionCard = component.locator('#overall-satisfaction');
    const overallSatisfactionTitle = overallSatisfactionCard.locator('h2');
    await expect(overallSatisfactionTitle).toHaveText('Overall Satisfaction');
  });
});

test.describe('Responsive Design', () => {
  test.describe('Desktop', () => {
    test.use({
      viewport: { width: 1024, height: 768 }
    });

    test('should display cards in a row', async ({ mount }) => {
      const component = await mount(RatingApp, { props });
      await expect(component.locator('#products')).toHaveCSS('grid-auto-flow', 'column');
    });
  });

  test.describe('Mobile', () => {
    test.use({
      viewport: { width: 375, height: 667 }
    });

    test('should display cards in a row', async ({ mount }) => {
      const component = await mount(RatingApp, { props });
      await expect(component.locator('#products')).toHaveCSS('grid-auto-flow', 'row');
    });
  });
});

test.describe('Star Rating', () => {
  test('Overall Satisfaction has average satisfaction of products', async ({ mount }) => {
    const component = await mount(RatingApp, { props });

    const getStar = (productId: 'vite' | 'vue' | 'overall-satisfaction', position: number) =>
      component.locator(`#${productId}-${position}`);

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

    await getStar('vite', 1).click();
    await getStar('vue', 1).click();
    await expectToBeChecked(getStar('overall-satisfaction', 1));
    await expectToBeUnchecked(getStar('overall-satisfaction', 2));

    await getStar('vue', 2).click();
    await expectToBeChecked(getStar('overall-satisfaction', 1));
    await expectToBeUnchecked(getStar('overall-satisfaction', 2));

    await getStar('vue', 3).click();
    await expectToBeChecked(getStar('overall-satisfaction', 2));
    await expectToBeUnchecked(getStar('overall-satisfaction', 3));

    await getStar('vue', 4).click();
    await expectToBeChecked(getStar('overall-satisfaction', 2));
    await expectToBeUnchecked(getStar('overall-satisfaction', 3));

    await getStar('vue', 5).click();
    await expectToBeChecked(getStar('overall-satisfaction', 3));
    await expectToBeUnchecked(getStar('overall-satisfaction', 4));
  });
});
