import { newE2EPage } from '@stencil/core/testing';

describe('cia-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cia-container></cia-container>');

    const element = await page.find('cia-container');
    expect(element).toHaveClass('hydrated');
  });

  it('renders children', async () => {
    const page = await newE2EPage();
    await page.setContent('<cia-container><h1>test</h1></cia-container>');

    const element = await page.find('h1');
    expect(element).toBeTruthy();
  });
});
