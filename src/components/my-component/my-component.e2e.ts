import { E2EElement, newE2EPage } from '@stencil/core/testing';
import { ElementHandle } from 'puppeteer';

describe('my-component', () => {
  const testHTML = `<my-component style="--my-component-text-color: rgb(255, 0, 0);"></my-component>`


  it('using E2E APIs', async () => {
    const page = await newE2EPage();
    await page.setContent(testHTML);

    const el = await page.find('my-component');
    expect((await el.getComputedStyle()).getPropertyValue('--my-component-text-color')).toEqual('rgb(255, 0, 0)');

    const shadowEl = await page.find('my-component');
    expect((await shadowEl.getComputedStyle()).getPropertyValue('--my-component-text-color')).toEqual('rgb(255, 0, 0)');
  });

  it('using workaround function', async () => {
    async function getComputedStylePropertyValue(element: E2EElement, property: string): Promise<string> {
      type E2EElementInternal = E2EElement & {
        _elmHandle: ElementHandle;
      };

      return await (element as E2EElementInternal)._elmHandle.evaluate(
        (el, targetProp): string => window.getComputedStyle(el).getPropertyValue(targetProp),
        property,
      );
    }


    const page = await newE2EPage();
    await page.setContent(testHTML);

    const el = await page.find('my-component');
    expect(await getComputedStylePropertyValue(el, '--my-component-text-color')).toEqual('rgb(255, 0, 0)');

    const shadowEl = await page.find('my-component');
    expect(await getComputedStylePropertyValue(shadowEl, '--my-component-text-color')).toEqual('rgb(255, 0, 0)');
  });
});
