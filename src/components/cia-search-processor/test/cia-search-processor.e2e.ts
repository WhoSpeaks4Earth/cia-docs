import { newE2EPage } from '@stencil/core/testing';

describe('cia-search-processor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cia-search-processor></cia-search-processor>');

    const element = await page.find('cia-search-processor');
    expect(element).toHaveClass('hydrated');
  });
});
